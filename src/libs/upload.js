import toast from "react-hot-toast";

export async function upload(ev, callBackFn) {
    const file = ev.target.files?.[0];
    if (file) {

        const uploadPromise = new Promise((resolve, reject) => {
            const data = new FormData;
            data.set('file', file);
            fetch('/api/upload', {
                method: 'POST',
                body: data
            }).then(res => {
                if (res.ok) {
                    res.json().then(link => {
                        callBackFn(link);
                        resolve(link);
                    });
                } else {
                    reject();
                }
            });
        });

        toast.promise(uploadPromise, {
            loading: 'Uploading...',
            success: 'Uploaded!',
            error: 'Failed to upload'
        });

    }
}