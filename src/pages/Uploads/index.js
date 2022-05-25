import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import { Link, Redirect } from 'react-router-dom';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function Uploads(props) {
    const [files, setFiles] = useState([]);
    const apiUrl = 'http://127.0.0.1:8080/api/media/upload';
    return (
        <div style={{ padding: 10 }}>
            <div>
                <h1>Uploads</h1>
                <div className="uploadsPage">
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        maxFiles={3}
                        server={apiUrl}
                        name="files"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </div>
            </div>
        </div>
    )
}

export default Uploads