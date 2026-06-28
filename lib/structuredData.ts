const SITE_URL = "https://domain.com";

export function homePageStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Practice store",
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Practice store",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/some_logo.png`,
      },
    },
  ];
}

type Category = {
  name?: string | null;
  products?: {
    items?: Array<{
      name?: string | null;
      url_key?: string | null;
      thumbnail?: { url?: string | null } | null;
      price_range?: {
        minimum_price?: {
          final_price?: {
            value?: number | null;
            currency?: string | null;
          } | null;
        } | null;
      } | null;
    } | null> | null;
  } | null;
};

export function categoryPageStructuredData(
  category: Category,
  categorySlug: string,
) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category.name,
          item: `${SITE_URL}/categories/${categorySlug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: category.name,
      itemListElement: (category.products?.items ?? [])
        .filter(Boolean)
        .map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: product!.name,
          url: `${SITE_URL}/products/${product!.url_key}`,
          image: product!.thumbnail?.url,
          offers: {
            "@type": "Offer",
            price: product!.price_range?.minimum_price?.final_price?.value,
            priceCurrency:
              product!.price_range?.minimum_price?.final_price?.currency,
          },
        })),
    },
  ];
}

type Product = {
  name?: string | null;
  url_key?: string | null;
  description?: { html?: string | null } | null;
  media_gallery?: Array<{
    url?: string | null;
    label?: string | null;
  } | null> | null;
  thumbnail?: { url?: string | null } | null;
  categories?: Array<{ name?: string | null } | null> | null;
  price_range?: {
    minimum_price?: {
      regular_price?: {
        value?: number | null;
        currency?: string | null;
      } | null;
      final_price?: { value?: number | null; currency?: string | null } | null;
    } | null;
  } | null;
};

export function productPageStructuredData(product: Product) {
  const finalPrice = product.price_range?.minimum_price?.final_price?.value;
  const currency = product.price_range?.minimum_price?.final_price?.currency;
  const images = (product.media_gallery ?? [])
    .filter(Boolean)
    .map((img) => img!.url)
    .filter(Boolean);
  const categoryName = product.categories?.[0]?.name;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        ...(categoryName
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: categoryName,
                item: `${SITE_URL}/categories/${categoryName.toLowerCase()}`,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: categoryName ? 3 : 2,
          name: product.name,
          item: `${SITE_URL}/products/${product.url_key}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description?.html?.replace(/<[^>]*>/g, ""),
      image: images.length > 0 ? images : [product.thumbnail?.url],
      offers: {
        "@type": "Offer",
        price: finalPrice,
        priceCurrency: currency,
        url: `${SITE_URL}/products/${product.url_key}`,
      },
    },
  ];
}
