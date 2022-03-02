import { GetStaticProps } from "next/types";
import { HeadBrowser } from "../components/headBrowser";
import { CONSTANTS } from "../config/constants";
import { stripe } from "../services/stripe";
import { HomeTemplate } from "../templates/home";
import { formatPrice } from "../utils/format";

type HomeProps = {
  priceId: string;
  amount: number;
};

export default function Home(product: HomeProps) {
  return (
    <>
      <HeadBrowser text="Home" />
      <HomeTemplate product={product} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const productId = CONSTANTS.PRODUCT_ID;
  const { id, unit_amount } = await stripe.prices.retrieve(productId);

  return {
    props: {
      priceId: id,
      amount: formatPrice(unit_amount / 100),
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
