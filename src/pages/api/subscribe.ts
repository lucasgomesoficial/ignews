/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { CONSTANTS } from "../../config/constants";
import { fauna } from "../../services/fauna";
import { query as reqFauna, Ref } from "faunadb";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

type Session = {
  expires?: string
  user: {
    name?: string
    email: string
    image?: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req }) as Session;

    const user = await fauna.query<User>(
      reqFauna.Get(
        reqFauna.Match(
          reqFauna.Index("user_by_email"),
          reqFauna.Casefold(session.user.email)
        )
      )
    );

    let customerId = user.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
      });

      await fauna.query(
        reqFauna.Update(
          reqFauna.Ref(reqFauna.Collection("users"), user.ref.id),
          {
            data: { stripe_customer_id: stripeCustomer.id },
          }
        )
      );

      customerId = stripeCustomer.id 
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [{ price: CONSTANTS.PRODUCT_ID, quantity: 1 }],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
