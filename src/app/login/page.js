import Banner from "@/components/Banner";
import LoginWithGithub from "@/components/buttons/LoginWithGithub";
import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function LoginPage() {

  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/account");
  }

  return (
    <div>
      <div className="divBody">
        <Banner />
        <div className="signinForm">
            <h1 className="text-5xl text-center font-bold mb-2">Sign In</h1>
            <p className="text-center mb-6 text-gray-500">Sign in using any one of the methods</p>
            <LoginWithGoogle />
            <LoginWithGithub />
          </div>
      </div>
    </div>
  )
}