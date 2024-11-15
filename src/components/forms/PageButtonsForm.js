'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faEnvelope, faGripLines, faPhone, faPlus, faPlusCircle, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faInstagram, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/app/actions/pageActions";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

const allButtons = [
    { key: "email", icon: faEnvelope, 'label': "e-mail", placeholder: "test@email.com" },
    { key: "mobile", icon: faPhone, 'label': "mobile", placeholder: "+91 123 456 7890" },
    { key: "instagram", icon: faInstagram, 'label': "instagram", placeholder: "https://instagram.com/username" },
    { key: "facebook", icon: faFacebook, 'label': "facebook", placeholder: "https://facebook.com/username" },
    { key: "whatsapp", icon: faWhatsapp, 'label': "whatsapp", placeholder: "+91 123 456 7890" },
    { key: "github", icon: faGithub, 'label': "github", placeholder: "https://github.com/username" },
    { key: "linkedin", icon: faLinkedin, 'label': "linkedin", placeholder: "https://linkedin.com/username" },
]


export default function PageButtonsForm({ page, user }) {

    // if (!page || !page.buttons) return null;

    const pageSavedButtonsKeys = page?.buttons ? Object.keys(page.buttons) : [];
    const pageSavedButtonsInfo = pageSavedButtonsKeys.map(key => allButtons.find(b => b.key === key));
    const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

    const addButtonToProfile = (button) => {
        setActiveButtons([...activeButtons, button]);
    }

    const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.key === b2.key));

    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success("Settings saved!");
    }

    const removeButton = ({ key }) => {
        setActiveButtons(prevButtons => {
            return prevButtons.filter(b => b.key !== key);
        })
    }

    return (
        <SectionBox>
            <form action={saveButtons}>
                <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
                <ReactSortable
                    handle=".handle"
                    list={activeButtons}
                    setList={setActiveButtons} >
                    {activeButtons.map(b => (
                        <div key={b.key} className="mb-4 md:flex items-center">
                            <div className="w-48 flex h-full p-2 gap-2 items-center text-gray-700">
                                <FontAwesomeIcon icon={faGripLines} className="cursor-grab text-gray-500 p-2 handle" />
                                <FontAwesomeIcon icon={b.icon} />
                                <span className="capitalize">{b.label}:</span>
                            </div>
                            <div className="grow flex">
                                <input
                                    type="text"
                                    style={{ marginBottom: '0' }}
                                    name={b.key}
                                    defaultValue={page.buttons?.[b.key] || ""}
                                    placeholder={b.placeholder} />
                                <button
                                    onClick={() => removeButton(b)}
                                    type="button"
                                    className="py-2 px-4 bg-gray-300 cursor-pointer text-red-600">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </ReactSortable>
                <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
                    {availableButtons.map(b => (
                        <button
                            key={b.key}
                            type="button"
                            onClick={() => addButtonToProfile(b)}
                            className="flex items-center gap-1 bg-gray-200 p-2">
                            <FontAwesomeIcon icon={b.icon} />
                            <span className="capitalize">{b.label}</span>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    ))}
                </div>
                <div className="max-w-xs mx-auto mt-8">
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    )
}
