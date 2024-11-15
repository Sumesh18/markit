'use client';

import grabUsername from "@/app/actions/grabUsername";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";

export default function UsernameForm({ desiredUsername }) {
    const [taken, setTaken] = useState(false);
    async function handleSubmit(formData) {
        const result = await grabUsername(formData);
        setTaken(result === false);
        if (result) {
            redirect('/account?created=' + formData.get('username'));
        }
    }
    return (
        <div className="unForm mx-auto">
            <form action={handleSubmit}>
                <h1 className="text-5xl text-center font-bold mb-2 text-white mt-8">Claim your username</h1>
                <p className="text-center mb-6 text-gray-500">Choose your username</p>
                <div className="max-w-xs mx-auto">
                    <input
                        name="username"
                        type="text"
                        placeholder="username"
                        className="block text-center p-2 border w-full mb-2 mx-auto"
                        defaultValue={desiredUsername}
                    />
                    {
                        taken && (
                            <div className="border border-red-500 text-center bg-red-200 p-2 mb-2">
                                This username is taken
                            </div>
                        )}
                    <SubmitButton>
                        <span>Claim it!</span>
                        <FontAwesomeIcon icon={faArrowRight} className="w-6 h-6 mt-1" />
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}
