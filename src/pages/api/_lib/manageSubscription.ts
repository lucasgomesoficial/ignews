import { query as req } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export const saveSubscription = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  const userRef = await fauna.query(
    req.Select(
      "ref",
      req.Get(req.Match(req.Index("user_by_stripe_customer_id"), customerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    await fauna.query(
      req.Create(req.Collection("subscriptions"), { data: subscriptionData })
    );
  } else {
    await fauna.query(
      req.Replace(
        req.Select(
          "ref",
          req.Get(req.Match(req.Index("subscription_by_id"), subscriptionId))
        ),
        { data: subscriptionData }
      )
    );
  }
};
