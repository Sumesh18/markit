'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/app/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({ page, user }) {
    const [links, setLinks] = useState(page.links || []);
    async function save() {
        await savePageLinks(links);
        toast.success('Saved!')
    }

    function addNewLink() {
        setLinks(prev => {
            return [...prev, {
                key: Date.now().toString(),
                title: '',
                subtitle: '',
                icon: '',
                url: ''
            }]
        })
    }

    function handleUpload(ev, uploadLinkKey) {
        upload(ev, uploadedImageUrl => {
            setLinks(prevLinks => {
                const newLinks = [...prevLinks];
                newLinks.forEach((link, index) => {
                    if (link.key === uploadLinkKey) {
                        link.icon = uploadedImageUrl;
                    }
                });
                return newLinks;
            })
        });
    }

    function handleLinkChange(keyOfLinkToChange, prop, ev) {
        setLinks(prev => {
            const newLinks = [...prev];
            newLinks.forEach((link) => {
                if (link.key === keyOfLinkToChange) {
                    link[prop] = ev.target.value;
                }
            });
            return newLinks;
        })
    }

    function removeLink(linkKeyToRemove) {
        setLinks(prev =>
            [...prev].filter(l => l.key !== linkKeyToRemove)
        );
    }

    return (
        <SectionBox>
            <form action={save}>
                <h2 className="text-2xl font-semibold mb-4">Links</h2>
                <button
                    onClick={addNewLink}
                    type="button"
                    className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer" >
                    <FontAwesomeIcon icon={faPlus} className="bg-blue-500 text-white p-1 rounded-full aspect-square" />
                    <span>Add link</span>
                </button>
                <div className="">
                    <ReactSortable
                        handle={".handle"}
                        list={links}
                        setList={setLinks}>
                        {links.map(l => (
                            <div key={l.key} className="mt-8 md:flex gap-6 items-center">
                                <div className="handle">
                                    <FontAwesomeIcon icon={faGripLines} className="text-gray-700 mr-2 cursor-grab" />
                                </div>
                                <div className="text-center">
                                    <div className="bg-gray-300 inline-block relative aspect-square w-16 h-16 inline-flex justify-center items-center">
                                        {l.icon && (
                                            <Image
                                                className="object-cover w-full h-full"
                                                src={l.icon}
                                                alt={"icon"}
                                                width={64}
                                                height={64} />
                                        )}
                                        {!l.icon && (
                                            <FontAwesomeIcon size="xl" icon={faLink} />
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            onChange={ev => handleUpload(ev, l.key)}
                                            id={'icon-' + l.key}
                                            type="file"
                                            className="hidden" />
                                        <label htmlFor={'icon-' + l.key} type="button" className="border hover:bg-gray-300 text-gray-700 hover:text-gray-900 mt-2 p-2 flex items-center justify-center gap-1 rounded-md cursor-pointer mb-2">
                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                            <span>Change icon</span>
                                        </label>
                                        <button
                                            onClick={() => removeLink(l.key)}
                                            type="button"
                                            className="bg-gray-300 py-2 px-3 mb-2 w-full h-full flex gap-2 items-center justify-center rounded-md">
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span>Remove this link</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="grow">
                                    <label className="input-label">Title</label>
                                    <input
                                        value={l.title}
                                        onChange={ev => handleLinkChange(l.key, 'title', ev)}
                                        type="text" placeholder="Title" />
                                    <label className="input-label">Subtitle</label>
                                    <input
                                        value={l.subtitle}
                                        onChange={ev => handleLinkChange(l.key, 'subtitle', ev)}
                                        type="text" placeholder="Subtitle (optional)" />
                                    <label className="input-label">Url</label>
                                    <input
                                        value={l.url}
                                        onChange={ev => handleLinkChange(l.key, 'url', ev)}
                                        type="text" placeholder="url" />
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
                <div className="mt-8 border-t pt-4">
                    <SubmitButton className="max-w-xs mx-auto">
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    )
}
