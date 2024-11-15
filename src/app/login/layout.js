import "../globals.css";
import Header from "@/components/Header";
import { Lato } from 'next/font/google'
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


const lato = Lato({ subsets: ['latin'], weight: ["400", "700"] })

export const metadata = {
  title: "Markit",
  description: "Share all your links at one place"
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

   return (
    <html lang="en">
      <body className={lato.className} style={{ overflow: "hidden" }}>
        <main>
          <Header />
          <div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
