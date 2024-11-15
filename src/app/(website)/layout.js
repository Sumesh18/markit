import "../globals.css";
import Header from "@/components/Header";
import { Lato } from 'next/font/google'
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";

const lato = Lato({ subsets: ['latin'], weight: ["400", "700"] })

export const metadata = {
  title: "Markit",
  description: "save and Share all your links at one place"
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

   return (
    <html lang="en">
      <body className={lato.className} style={{ overflow: "hidden" }}>
        <main>
          <Header />
          <HeroForm user={session?.user}/>
        </main>
      </body>
    </html>
  );
}
