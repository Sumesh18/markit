'use client';
import { faCloudArrowUp, faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/RadioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import savePageSettings from "@/app/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";
import { upload } from "@/libs/upload";

export default function PageSettingsForm({ page, user }) {
    const [bgType, setBgType] = useState(page.bgType);
    const [bgColor, setBgColor] = useState(page.bgColor);
    const [bgImage, setBgImage] = useState(page.bgImage);
    const [avatar, setAvatar] = useState(user?.image);

    async function saveBaseSettings(formData) {
        const result = await savePageSettings(formData);
        if (result) {
            toast.success('Saved!');
        }
    }

    async function handleCoverImageChange(ev) {
        await upload(ev, link => {
            setBgImage(link);
        });
    }

    async function handleAvatarChange(ev) {
        await upload(ev, link => {
            setAvatar(link);
        });
    }

    return (
        <div>
            <SectionBox>
                <form action={saveBaseSettings}>
                    <div
                        className="py-4 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
                        style={
                            bgType === 'color'
                                ? { backgroundColor: bgColor }
                                : { backgroundImage: `url(${bgImage})` }
                        }
                    >
                        <div>
                            <RadioTogglers
                                defaultValue={page.bgType}
                                options={[
                                    { value: 'color', icon: faPalette, label: 'Color' },
                                    { value: 'image', icon: faImage, label: 'Image' }
                                ]}
                                onChange={val => setBgType(val)}
                            />
                            {bgType === 'color' && (
                                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                                    <div className="flex gap-2 justify-center">
                                        <span>Background Color:</span>
                                        <input
                                            type="color"
                                            name="bgColor"
                                            onChange={e => setBgColor(e.target.value)}
                                            defaultValue={page.bgColor} />
                                    </div>
                                </div>
                            )}
                            {bgType === 'image' && (
                                <div className="flex justify-center">
                                    <label
                                        className="mt-2 bg-white px-4 py-2 cursor-pointer"
                                    >
                                        <input type="hidden" name="bgImage" value={bgImage} />
                                        <input
                                            type="file"
                                            onChange={handleCoverImageChange}
                                            className="hidden" />
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faCloudArrowUp} className="text-gray-700" />
                                            <span>Change Image</span>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center -mb-12">
                        <div className="relative -top-8 w-[128px] h-[128px]">
                            <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                                <Image
                                    src={avatar}
                                    alt={"avatar"}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label
                                htmlFor="avatarIn"
                                className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer">
                                <FontAwesomeIcon size="xl" icon={faCloudArrowUp} />
                            </label>
                            <input
                                type="file"
                                id="avatarIn"
                                className="hidden"
                                onChange={handleAvatarChange} />
                            <input
                                type="hidden"
                                value={avatar}
                                name="avatar" />
                        </div>
                    </div>
                    <div className="p-0">
                        <label className="input-label" htmlFor="displayIn">Display Name</label>
                        <input
                            type="text"
                            id="displayIn"
                            name="displayName"
                            defaultValue={page.displayName}
                            placeholder="John Doe" />
                        <label className="input-label" htmlFor="locationIn">Location</label>
                        <input
                            type="text"
                            id="locationIn"
                            name="location"
                            defaultValue={page.location}
                            placeholder="Somewhere" />
                        <label className="input-label" htmlFor="bioIn">Bio</label>
                        <textarea
                            id="bioIn"
                            name="bio"
                            defaultValue={page.bio}
                            placeholder="Your bio goes here..." />
                        <div className="max-w-[200px] mx-auto">
                            <SubmitButton>
                                <FontAwesomeIcon icon={faSave} />
                                <span>Save</span>
                            </SubmitButton>
                        </div>
                    </div>
                </form >
            </SectionBox>
        </div >
    )
}
