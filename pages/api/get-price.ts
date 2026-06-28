import { ProductPriceDocument } from "@/graphql/ProductPrice.generated";
import { client } from "@/lib/ApolloClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Cache-Control", "no-store");

  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: "Missing slug" });
  try {
    const { data } = await client.query({
      query: ProductPriceDocument,
      variables: {
        filter: {
          url_key: { eq: slug.toString() },
        },
      },
    });
    const finalPrice =
      data?.products?.items?.[0]?.price_range?.minimum_price.final_price.value;
    const regularPrice =
      data?.products?.items?.[0]?.price_range?.minimum_price.regular_price
        .value;
    const livePrice = { finalPrice, regularPrice };

    const currency =
      data?.products?.items?.[0]?.price_range?.minimum_price?.regular_price
        ?.currency || null;
    return res.status(200).json({ livePrice, currency });
  } catch (err) {
    console.error("Failed to fetch price:", err);
    return res.status(500).json({ error: "Failed to fetch price" });
  }
}
