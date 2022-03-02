import { SubscribeButton } from "./components/subscribeButton";
import styles from "./styles.module.scss";
import { HomeTemplateProps } from "./types";

export const HomeTemplate = ({ product }: HomeTemplateProps) => {
  const { priceId, amount } = product;

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>
          News about the <span>React</span> world.
        </h1>
        <p>
          Get acess to all the publications <br />
          <span>for {amount} month</span>
        </p>
        <SubscribeButton priceId={priceId} />
      </section>
      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
  );
};
