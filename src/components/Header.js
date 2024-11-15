import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-slate-100 border-b py-2 relative z-10">
      <div className="max-w-5xl flex justify-between mx-auto px-6">
        <div className="flex items-center gap-6">
          <Link href={"/"} className="flex items-center gap-2 text-cyan-700">
            <FontAwesomeIcon icon={faBookBookmark} className="text-cyan-500"/>
            <span className="font-bold text-lg">Markit</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-slate-500 text-md">
          {!!session && (
            <>
              <Link href={"/account"}>
                Hello, {session?.user?.name}
              </Link>
              <LogoutButton />
            </>
          )}
          {!session && (
            <>
              <Link href={"/login"}>Sign In</Link>
              <Link href={"/login"}>Create Account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
