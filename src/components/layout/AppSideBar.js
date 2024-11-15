'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

export default function AppSideBar() {
    const path = usePathname();
    return (
        <nav className="inline-flex flex-col text-center mt-8 gap-2 text-gray-500">
            <Link href={"/account"}
                className={"flex gap-4 mb-2 p-2" + (path === "/account" ? " text-blue-500 font-bold" : "")}
            >
                <FontAwesomeIcon fixedWidth={true} icon={faFileLines} className="w-6 h-6" />
                <span className="">My Page</span>
            </Link>
            <Link href={"/analytics"}
                className={"flex gap-4 mb-2 p-2" + (path === "/analytics" ? " text-blue-500 font-bold" : "")}
            >
                <FontAwesomeIcon fixedWidth={true} icon={faChartLine} className="w-6 h-6" />
                <span className="">Analytics</span>
            </Link>
            <LogoutButton
                iconLeft={true}
                className="flex gap-4 items-center mb-2 p-2"
                iconClasses={"w-6 h-6"}
            />
            <Link href={"/"} className="flex items-center gap-2 text-md text-gray-500 border-t pt-4">
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                <span>Back to website</span>
            </Link>
        </nav>
    )
}
