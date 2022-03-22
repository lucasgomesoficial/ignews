import { loadStripe } from "@stripe/stripe-js";

export const getStripeJS = async () => {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

  return stripeJs;
};
