'use client';

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutButton({
  iconLeft = false,
  className = "flex items-center gap-2 border px-4 p-2 shadow",
  iconClasses = ""
}) {
  return (
    <button
        className={className}
        onClick={() => signOut()}>
          {iconLeft && (
            <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses}/>
          )}
        <span>Logout</span>
        {!iconLeft && (
          <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses}/>
        )}
    </button>
  )
}
