import HtmlComponent from "@/components/helpers/HtmlComponent";
import ProductCard, {
  ProductItem,
} from "@/components/product_card/ProductCard";
import { CategoriesSlugDocument } from "@/graphql/CategoriesSlug.generated";
import {
  CategoryDetailDocument,
  CategoryDetailQuery,
} from "@/graphql/CategoryDetail.generated";
import { client } from "@/lib/ApolloClient";
import { categoryPageStructuredData } from "@/lib/structuredData";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

type CategoryNode = {
  url_key: string | null | undefined;
  level?: number | null | undefined;
  children?: CategoryNode[] | null | undefined;
};

type CategoryItem = NonNullable<
  NonNullable<CategoryDetailQuery["categories"]>["items"]
>[number];

type Props = {
  category: CategoryItem;
  structuredData: object[];
};
export default function CategoryDetailPage({
  category,
  structuredData,
}: Props) {
  const products = category?.products?.items || [];
  const metaDescription =
    category?.meta_description ||
    category?.description ||
    "Some category description";

  return (
    <>
      <Head>
        <title>{category?.name || "Shop category"}</title>
        <meta name="description" content={metaDescription} />

        <meta property="og:title" content={category?.name || "Shop category"} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Typography variant="h1" sx={{ textAlign: "center" }}>
        {category?.name}
      </Typography>
      {category?.description ? (
        <Box
          sx={{
            height: { xs: "170px", md: "80px" },
            minHeight: { xs: "170px", md: "80px" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <HtmlComponent html={category?.description} />
        </Box>
      ) : null}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {products.map((product: ProductItem, index) => (
          <Grid size={{ xs: 6, md: 4 }} key={product?.url_key}>
            <ProductCard product={product} index={index} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: CategoriesSlugDocument,
    });
    const categoriesTree = data?.categories?.items ?? [];
    const slugs: string[] = [];

    function flattenCategories(items: CategoryNode[] | null | undefined) {
      items?.forEach((cat) => {
        if (
          cat &&
          cat.url_key &&
          ("level" in cat ? (cat.level ?? 0) > 1 : true)
        ) {
          slugs.push(cat.url_key);
        }

        if (cat?.children && cat.children.length > 0) {
          flattenCategories(cat.children);
        }
      });
    }
    flattenCategories(categoriesTree as CategoryNode[]);
    const limitedSlugs = slugs.slice(0, 10);

    const paths = limitedSlugs.map((slug) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) return { notFound: true };

  try {
    const { data } = await client.query({
      query: CategoryDetailDocument,
      variables: {
        filters: {
          url_key: { eq: slug },
        },
      },
    });
    const category = data?.categories?.items?.[0] ?? null;

    if (!category) return { notFound: true };
    const structuredData = categoryPageStructuredData(category, slug);

    return {
      props: { category, structuredData },
      revalidate: 60 * 10,
    };
  } catch (error) {
    console.error(`Failed to fetch category details for slug: ${slug}`, error);
    return { notFound: true };
  }
};
