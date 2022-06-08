import React, { useState, useEffect, useCallback, useRef } from 'react';

import logger from '../../utils/logger';

// LightGallery
import LightGallery from 'lightgallery/react';
// import { LightGallerySettings } from 'lightgallery/lg-settings';
// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import config from '../../config';
import { useAuthState } from '../../context/auth';
import { loadFiles, useMediaState, useMediaDispatch } from '../../context/media'

function Uploads(props) {
    // Register the plugins
    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

    const [files, setFiles] = useState([]);
    const uploadUrl = `${config.apiUrl}/media/upload`;

    const filePondInit = () => console.log("FilePond has initialized");

    const lightGallery = useRef(null);
    const [fetchingImages, setFetchingImages] = useState(false);

    const [images, setImages] = useState([]);
    // console.log(images);

    const lightGalleryInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
            console.log('LightGallery has been initialized')
        }
    }, []);

    const openGallery = useCallback(() => {
        lightGallery.current.openGallery();
    }, []);

    // const addItems = useCallback(() => {
    //     const updatedItems = [
    //       ...images,
    //       ...newItems
    //     ];
    //     setImages(updatedItems);
    //     lightGallery.current.refresh(updatedItems);
    //     lightGallery.current.openGallery();
    //   }, [images]);

    const { user, accessToken } = useAuthState();
    // console.log(user);

    const dispatch = useMediaDispatch();
    const mediaState = useMediaState();
    // console.log(mediaState.files);

    const updateGallery = (mediaStateFiles) => {
        console.log('mediaStateFiles', mediaStateFiles);

        const newItems = []
        mediaStateFiles.map((item, i) => {
            // console.log(`${config.apiBaseUrl}/${item.fullPath}`);
            newItems.push({
                id: item.id,
                // size: '1400-933',
                src: `${config.apiBaseUrl}/${item.fullPath}`,
                thumb: `${config.apiBaseUrl}/${item.fullPath}`,
                subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@dann">Dan</a></h4>
                        <p>Published on November 13, 2018</p>
                    </div>`,
            })
        })

        // setImages(newItems);
        lightGallery.current.refresh(newItems);
        // lightGallery.current.openGallery();
    }

    if (mediaState.files?.description) {
        updateGallery(mediaState.files?.description)
    }

    useEffect(() => {
        logger(['fetching images files ...', fetchingImages]);

        let isMounted = true; // note mutable flag
        ; (async () => {
            try {
                await loadFiles(dispatch)
                if (isMounted) { // add conditional check
                    setFetchingImages(true);
                    logger(['fetched images !!!', fetchingImages]);
                } else logger("aborted files setState on unmounted component", 'e');
            } catch (err) {
                setFetchingImages(true);
                logger(err, 'e');
            }
        })();

        return () => { isMounted = false; };
    }, [files]);

    return (
        <div style={{ padding: 10 }}>
            {console.log('sayafa render edildi')}
            <div>
                <div className="uploadsPage">
                    <FilePond
                        files={files}
                        oninit={filePondInit}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        maxFiles={3}
                        server={{
                            url: uploadUrl,
                            process: {
                                headers: {
                                    'Authorization': accessToken,
                                },
                            }
                        }}
                        name="images"
                        labelIdle='Resiml Yükle & <span class="filepond--label-action">Yada Çek</span>'
                    />
                </div>


                <button onClick={openGallery}>Open Gallery</button>
                {/* <button onClick={addItems}>Add new slide and open gallery</button> */}
            </div>

            <div className="myGallery">
                <LightGallery
                    elementClassNames="custom-classname"
                    dynamic
                    dynamicEl={images}
                    onInit={lightGalleryInit}
                    plugins={[lgZoom, lgVideo]} // , lgThumbnail
                ></LightGallery>
            </div>
        </div>
    )
}

export default Uploads