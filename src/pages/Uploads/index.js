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

import CONFIG from '../../config';
import { useAuthState } from '../../context/auth';
import { loadFiles, useMediaState, useMediaDispatch } from '../../context/media'

function Uploads(props) {
    const { user, accessToken } = useAuthState();
    // console.log(user);

    // Register the plugins
    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

    const [files, setFiles] = useState([]);
    const uploadUrl = `${CONFIG.apiUrl}/media/files`;
    const filePondInit = () => console.log("FilePond has initialized");
    // filePond End

    const [fetching, setFetching] = useState(false);
    const [galleryItems, setGalleryItems] = useState([]);

    const mediaState = useMediaState();
    const mediaDispatch = useMediaDispatch();

    const lightGallery = useRef(null);

    const openGallery = useCallback(() => {
        lightGallery.current.openGallery();
    }, []);

    const onInitGallery = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
            console.log("LightGallery has initialized")
            setFetching(true);
        }
    }, []);

    // Add new slides
    const addItems = useCallback((newGalleryItems) => {
        // console.log(newGalleryItems, 'newGalleryItems');
        const updatedItems = [
            ...galleryItems,
            ...newGalleryItems,
        ];
        setGalleryItems(updatedItems);
        lightGallery.current.refresh(updatedItems);
        // lightGallery.current.openGallery();
    }, [galleryItems]);

    useEffect(async () => {
        console.log('fetching', fetching);
        if (!fetching) return;

        const data = await loadFiles(mediaDispatch);
        setFetching(false);

        if (data?.status !== 'success' && data?.description.length < 1) {
            console.log('files not found', data);
            return;
        }

        const newItems = [];
        for await (const [index, item] of data.description.entries()) {
            newItems.push({
                id: item.id,
                // size: '1400-933',
                src: `${CONFIG.apiBaseUrl}/${item.fullPath}`,
                thumb: `${CONFIG.apiBaseUrl}/${item.fullPath}`,
                subHtml: `<div class="lightGallery-captions"><h4>${item.name}</h4><p>Published on ${item.updatedAt}</p></div>`,
            });
        }

        addItems(newItems);
    }, [fetching]);

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

                <div className='myGallery'>
                    {mediaState?.loading ? 'Yükleniyor...' : (<button onClick={openGallery}>Open Gallery</button>)}

                    <LightGallery
                        elementClassNames="custom-classname"
                        dynamic
                        dynamicEl={galleryItems}
                        onInit={onInitGallery}
                        plugins={[lgZoom, lgVideo]}>
                    </LightGallery>
                </div>
            </div>
        </div>
    )
}

export default Uploads