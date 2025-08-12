import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";
import "photoswipe/dist/photoswipe.css";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
//import { routing } from "../../i18n/routing";

import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Property Listings",
  description: "Property Listings",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  console.log(locale);

  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang={locale} suppressHydrationWarning>
          <body
            suppressHydrationWarning
            className="bg-[#FCF8EF] min-h-screen flex flex-col"
          >
            <NextIntlClientProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ToastContainer />
            </NextIntlClientProvider>
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
}
