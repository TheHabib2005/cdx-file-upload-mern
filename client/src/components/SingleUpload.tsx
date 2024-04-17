

import axios from "axios";
import { useState } from "react";
function SingleUpload() {
    let [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("")
    const uploadFile = () => {


        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);
        console.log(formData);
        axios
            .post("http://localhost:8000/api/upload", formData)
            .then((response) => {
                console.log("server-response: " + response);
                console.log(response);
                if (response.status === 200) {
                    setLoading(false);
                    setUrl(response.data.url);
                }


            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="">
            <h1>File Uploader</h1>
            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files[0]);
                    const blobUrl = URL.createObjectURL(e.target.files[0]);
                    setUrl(blobUrl)
                }}
            />
            {file && <button onClick={() => uploadFile()} disabled={loading}>{loading ? "Uploading..." : "Upload File"}</button>}
            {
                url && <img src={url} alt="Uploaded Image" width={200} />
            }
        </div>
    );
}
export default SingleUpload;
