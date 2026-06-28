import Footer from "../footer/Footer";
import Header from "../header/Header";
import { CategoryNode } from "../menu/Menu";

type LayoutProps = {
  children: React.ReactNode;
  categories: CategoryNode[];
};

export default function Layout({ children, categories }: LayoutProps) {
  return (
    <>
      <Header categoriesData={categories} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
