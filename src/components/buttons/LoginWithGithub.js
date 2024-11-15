'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";

export default function LoginWithGithub() {
    return (
        <button
            onClick={() => signIn('github')}
            className="bg-white shadow w-full py-4 mt-2 flex gap-3 justify-center">
            <FontAwesomeIcon icon={faGithub} className="h-6" />
            <span>Sign In with GitHub</span>
        </button>
    )
}
