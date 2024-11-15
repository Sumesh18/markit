import { useFormStatus } from "react-dom";

export default function SubmitButton({children, className=''}) {
    const {pending} = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className={"bg-cyan-600 disabled:bg-cyan-400 text-white py-4 px-6 block w-full mx-auto flex gap-2 items-center justify-center " + className}>
                {pending && (
                    <span>Saving...</span>
                )}
                {!pending && children}
        </button>
    )
}
