import { NextApiRequest, NextApiResponse } from "next";
import { CategoriesSlugDocument } from "@/graphql/CategoriesSlug.generated";
import { client } from "@/lib/ApolloClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=7200",
  );

  try {
    const { data } = await client.query({
      query: CategoriesSlugDocument,
    });
    const fullCategories = data?.categories?.items || [];
    const categories = fullCategories[0]?.children || [];
    return res.status(200).json({ categories });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Menu fetch failed:", error.message);
    return res.status(500).json({ error: "Menu fetch" });
  }
}
