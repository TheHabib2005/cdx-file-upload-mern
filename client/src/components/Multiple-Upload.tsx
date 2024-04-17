

import axios from "axios";
import { useState } from "react";
function MultipleUpload() {
    let [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState([])
    const uploadFile = () => {


        setLoading(true);
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        console.log(formData);
        axios
            .post("http://localhost:8000/api/multipleUpload", formData)
            .then((response) => {
                console.log("server-response: " + response);
                console.log(response);
                if (response.status === 200) {
                    setLoading(false);
                    setUrls(response.data.urls);
                }


            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="">
            <h1>Multiple File Uploader</h1>
            <input
                type="file"
                name="files"
                multiple={true}
                onChange={(e) => {
                    setFiles(e.target.files)

                }}
            />
            {files.length > 0 && <button onClick={() => uploadFile()} disabled={loading}>{loading ? "Uploading..." : "Upload File"}</button>}
            {
                urls.length > 0 && urls.map((url, index: any) => (
                    <img src={url} key={index} alt="Uploaded Image" width={200} />
                ))
            }
        </div>
    );
}
export default MultipleUpload;
