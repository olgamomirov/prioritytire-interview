import { GetStaticPaths, GetStaticProps } from "next";

import { client } from "@/lib/ApolloClient";
import {
  ProductDetailDocument,
  ProductDetailQuery,
} from "../../graphql/ProductDetail.generated";
import { ProductsSlugDocument } from "@/graphql/ProductsSlug.generated";
import ImageGallery from "@/components/gallery/ImageGallery";
import Options from "@/components/options/Options";
import HtmlComponent from "@/components/helpers/HtmlComponent";
import Atc from "@/components/atc/Atc";
import { useCart } from "@/context/CartContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { productPageStructuredData } from "@/lib/structuredData";
import Specifications from "@/components/specifications/Specifications";

type ProductItem = NonNullable<
  NonNullable<ProductDetailQuery["products"]>["items"]
>[number];

type Props = {
  product: ProductItem;
  structuredData: object[];
};

export default function ProductDetailPage({ product, structuredData }: Props) {
  const { addItem } = useCart();

  const images = (product?.media_gallery ?? [])
    .filter(
      (item): item is NonNullable<typeof item> =>
        item !== null && item !== undefined,
    )
    .map((item) => ({
      url: item.url ?? "",
      label: item.label ?? "",
    }));
  const staticPrice =
    (product?.price_range?.minimum_price?.final_price?.value ??
      product?.price_range?.minimum_price?.regular_price?.value) ||
    0;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const qty = Number(formData.get("quantity")) || 1;

    addItem({
      id: product?.uid || "",
      quantity: qty,
    });
  };
  const productMetaDesc =
    product?.meta_description ||
    product?.description?.html.replace(/<[^>]*>/g, "");
  const categories =
    product?.categories?.map((cat) => cat?.name ?? "").filter(Boolean) ?? [];
  return (
    <>
      <Head>
        <title>{product?.name || "Shop product"}</title>
        <meta name="description" content={productMetaDesc} />

        <meta property="og:title" content={product?.name || "Shop product"} />
        <meta property="og:description" content={productMetaDesc} />
        <meta
          property="og:image"
          content={product?.thumbnail?.url || "/fallback.jpg"}
        />
        <meta property="og:type" content="product" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Box
        sx={(theme) => ({
          display: "flex",
          backgroundColor: "white",

          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          },
        })}
      >
        <ImageGallery images={images} />
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            position: "relative",
            userSelect: "none",
            display: "flex",
            flexDirection: "column",
            paddingY: 5,
            paddingX: 2,
          }}
        >
          <Typography component="div" variant="h3" gutterBottom>
            {product?.name}
          </Typography>
          {product?.short_description?.html ? (
            <HtmlComponent html={product?.short_description?.html} />
          ) : null}
          <Box component="form" onSubmit={handleFormSubmit}>
            {product &&
              "configurable_options" in product &&
              product.configurable_options?.map((option) => (
                <Options
                  key={`option ${option?.label}`}
                  label={option?.label}
                  values={option?.values || []}
                />
              ))}
            <Atc price={staticPrice} slug={product?.url_key || ""} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography variant="h1">{product?.name}</Typography>
        {product?.description?.html && (
          <HtmlComponent html={product?.description.html} />
        )}
      </Box>
      <Box>
        <Specifications specs={[{ name: "Category", values: categories }]} />
      </Box>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: ProductsSlugDocument,
      variables: {
        filter: {
          url_key: { eq: null },
        },
        pageSize: 5,
      },
    });

    const items = data?.products?.items ?? [];

    const paths = items
      .filter((p): p is NonNullable<typeof p> & { url_key: string } =>
        Boolean(p?.url_key),
      )
      .map((p) => ({
        params: { slug: p.url_key },
      }));

    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) return { notFound: true };

  try {
    const { data } = await client.query({
      query: ProductDetailDocument,
      variables: {
        filter: {
          url_key: { eq: slug },
        },
      },
    });
    const product = data?.products?.items?.[0] ?? null;

    if (!product) return { notFound: true };
    const structuredData = productPageStructuredData(product);

    return {
      props: { product, structuredData },
      revalidate: 60 * 10,
    };
  } catch (error) {
    console.error(`Failed to fetch product details for slug: ${slug}`, error);
    return { notFound: true };
  }
};
