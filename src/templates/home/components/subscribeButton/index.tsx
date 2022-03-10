import { signIn, useSession } from "next-auth/react";
import { api } from "../../../../services/api";
import { getStripeJS } from "../../../../services/stripe-js";
import styles from "./styles.module.scss";

type SubscribeButtonProps = {
  priceId: string;
};

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session } = useSession();
  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      // const response = await api.post("/subscribe");
      // const { sessionId } = response.data;

      // const stripeClient = await getStripeJS();
      // await stripeClient.redirectToCheckout({ sessionId });
      console.log('SubscribeButton --------------', session)
    } catch (err) {
      console.log('merdaaaaaaaaaaaaaa')
      alert(err.message);
    }
  };
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
};
