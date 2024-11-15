import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { faArrowLeft, faEnvelope, faExclamationTriangle, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faInstagram, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose"
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/models/Event";
import LinkModal from "@/components/modal/LinkModal";

const buttonsIcons = {
    email: faEnvelope,
    mobile: faPhone,
    instagram: faInstagram,
    facebook: faFacebook,
    whatsapp: faWhatsapp,
    github: faGithub,
    linkedin: faLinkedin,
}

function buttonLink(key, value) {
    if (key === "email") {
        return `mailto:${value}`
    }
    if (key === "mobile") {
        return `tel:${value}`
    }
    return value;
}

export default async function UserPage({ params }) {
    const uri = params.uri
    mongoose.connect(process.env.MONGO_URI);
    const page = await Page.findOne({ uri });
    if (!page) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 text-gray-800 p-8">
                <div className="flex flex-col items-center justify-center border-4 bg-gray-300 p-16 rounded-md">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-6xl mb-4 w-6 h-6" />
                    <h1 className="text-3xl font-bold text-red-600 mb-2">User Not Found</h1>
                    <p className="text-lg text-gray-600 text-center max-w-md mb-6">
                        We could not find a profile associated with the username <strong>{uri}</strong>.
                        Please check the username and try again.
                    </p>
                    <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-lime-600 text-white rounded-lg shadow transition-transform transform hover:scale-105 duration-200 ease-in-out">
                        Go to Homepage
                    </Link>
                </div>
            </div>
        );
    }
    const user = await User.findOne({ email: page.owner })

    await Event.create({ uri: uri, page: uri, type: "view" });

    return (
        <div className="bg-gradient-to-tl from-lime-300 to-yellow-400 text-white min-h-screen">
            <div className="h-36 bg-gray-300 bg-cover bg-center"
                style={
                    page.bgType === "color"
                        ? { backgroundColor: page.bgColor }
                        : {
                            backgroundImage: `url(${page.bgImage})`
                        }}
            >
                <Link href={"/"} className="flex items-center gap-2 text-md text-gray-600 border-t ml-4 pt-4">
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 text-black" />
                    <span>Back to website</span>
                </Link>
            </div>
            <div className="aspect-square w-48 h-48 mx-auto relative -top-16 -mb-12">
                <Image
                    className="rounded-full w-full h-full object-cover"
                    src={user.image}
                    alt={user.name}
                    width={256}
                    height={256} />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">{page.displayName}</h2>
            <h3 className="text-lg flex items-center gap-2 justify-center text-white/80">
                <FontAwesomeIcon className="h-6" icon={faLocationDot} />
                <span>
                    {page.location}
                </span>
            </h3>
            <div className="max-w-xs mx-auto text-center mt-2">
                <p>{page.bio}</p>
            </div>
            <div className="flex gap-2 justify-center mt-2">
                {Object.keys(page.buttons).map(buttonKey => (
                    <Link
                        key={buttonKey}
                        href={buttonLink(buttonKey, page.buttons[buttonKey])}
                        className="rounded-full bg-white text-cyan-600 mb-2 p-2 flex items-center justify-center" >
                        <FontAwesomeIcon className="h-5 w-5" icon={buttonsIcons[buttonKey]} />
                    </Link>
                ))}
            </div>
            <LinkModal links={page.links} />
        </div>
    )
}