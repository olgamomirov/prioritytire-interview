import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import { GetStaticProps } from "next";
import { client } from "@/lib/ApolloClient";
import {
  RecommendedProductsDocument,
  RecommendedProductsQuery,
} from "@/graphql/RecommendedProducts.generated";
import Slider from "@/components/slider/Slider";
import Typography from "@mui/material/Typography";
import { homePageStructuredData } from "@/lib/structuredData";

type RecommendedProduct = NonNullable<
  NonNullable<RecommendedProductsQuery["products"]>["items"]
>[number];

type HomePageProps = {
  products: RecommendedProduct[];
};
export default function Home({ products }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Practice Project</title>
        <meta name="description" content="Some cool description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          as="image"
          href="/hero_image.webp"
          imageSizes="100vw"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homePageStructuredData()),
          }}
        />
      </Head>

      <div>
        <Typography
          component="h1"
          sx={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Best socks
        </Typography>
        <Box
          sx={{
            position: "relative",
            aspectRatio: { xs: "4 / 4.5", md: "2.5 / 1" },
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            alt="Homepage hero"
            src="/hero_image.webp"
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            style={{
              objectFit: "cover",
              objectPosition: "bottom",
            }}
            quality={55}
          />
        </Box>
        <Slider products={products} title="Recommended products" />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const { data } = await client.query({
      query: RecommendedProductsDocument,
      variables: {
        filter: {
          category_uid: { eq: "MTIx" }, // uid for Home Page Favorites category
        },
      },
    });

    const items = data?.products?.items || [];
    return {
      props: {
        products: items as RecommendedProduct[],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Failed to fetch recommended products:", error);
    return {
      props: { products: [] },
    };
  }
};
