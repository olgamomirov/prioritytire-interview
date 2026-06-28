import { client } from "@/lib/ApolloClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client/react";
import type { AppProps } from "next/app";
import "graphiql/graphiql.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { CartProvider } from "@/context/CartContext";
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { CategoryNode } from "@/components/menu/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  useEffect(() => {
    async function fetchGlobalMenu() {
      try {
        const res = await fetch("/api/get-menu");

        const contentType = res.headers.get("content-type");
        if (
          !res.ok ||
          !contentType ||
          !contentType.includes("application/json")
        ) {
          return;
        }

        const data = await res.json();
        if (data?.categories) {
          setCategories(data.categories as CategoryNode[]);
        }
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    }

    fetchGlobalMenu();
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Practice Project</title>
        <meta name="description" content="Some cool description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Layout categories={categories}>
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </ThemeProvider>
    </>
  );
}
