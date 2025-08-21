import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/queryClient";
import { ToastContainer } from "react-toastify";
import { PageWrapperClient } from "./pageWrapperClient";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blog - Access Time",
  description: "Dive into our world of web accessibility and software development. Our team of passionate experts shares insights, tips, and best practices to help you become a better developer and create more inclusive digital experiences.",
  authors: [{ name: "Access Time Team" }, { name: "Michelle Neysa", url: "https://www.linkedin.com/in/michelle-neysa-017486129/" }, { name: "Bogdan Sikora", url: "https://www.linkedin.com/in/sikora-bogdan/" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-neutral-950 antialiased">
      <body
        className={`${nunito.variable} flex min-h-full flex-col`}
      >
        <PageWrapperClient>
          <QueryClientProvider client={queryClient}>
            {children}
            <ToastContainer />
          </QueryClientProvider>
        </PageWrapperClient>
      </body>
    </html>
  );
}
