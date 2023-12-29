import "./globals.css";
import Header from "../components/Header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata = {
  title: "Pablo Lafontaine",
  description: "Personal Website and Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="container relative mx-auto px-8 sm:px-32 md:px-48 lg:px-64 xl:px-96 pb-16">
          <Header />
          <div className="pt-24">{children}</div>
        </div>
      </body>
    </html>
  );
}
