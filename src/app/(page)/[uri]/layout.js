import "../../globals.css";
import Header from "@/components/Header";
import { Lato } from 'next/font/google'

const lato = Lato({ subsets: ['latin'], weight: ["400", "700"] })

export const metadata = {
  title: "Markit",
  description: "All your links at one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
