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

    const lightGallery = useRef(null);

    const [items, setItems] = useState([
        {
            id: '1',
            size: '1400-933',
            src: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            thumb:
                'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                <h4>Photo by <a href="https://unsplash.com/@dann">Dan</a></h4>
                <p>Published on November 13, 2018</p>
            </div>`,
        },
    ]);


    const lightGalleryInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
        console.log('LightGallery has been initialized')
    }, []);

    // const openGallery = useCallback(() => {
    //     lightGallery.current.openGallery();
    // }, []);

    // const addItems = useCallback(() => {
    //     const updatedItems = [
    //       ...items,
    //       ...newItems
    //     ];
    //     setItems(updatedItems);
    //     lightGallery.current.refresh(updatedItems);
    //     lightGallery.current.openGallery();
    //   }, [items]);

    const [fetching, setFetching] = useState(false);

    const [files, setFiles] = useState([]);
    const uploadUrl = `${config.apiUrl}/media/upload`;

    const { user, accessToken } = useAuthState();

    const dispatch = useMediaDispatch();
    const mediaState = useMediaState();
    // console.log(mediaState);
    
    const updateGallery = () => {
        console.log(fetching, mediaState);
        if (fetching && mediaState.files.description) {
            const newItems = []
            mediaState.files.description.map((item, i) => {
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

            setItems(newItems);
            lightGallery.current.refresh(newItems);
            lightGallery.current.openGallery();
        } else {
            console.log('yeni resim yok');
        }
    }

    useEffect(() => {
        logger('fetching files ...');

        let isMounted = true; // note mutable flag
        ; (async () => {
            try {
                await loadFiles(dispatch)
                if (isMounted) { // add conditional check
                    setFetching(true);
                    logger('fetched files');
                    // updateGallery()
                    console.log('mediaState', mediaState);
                } else logger("aborted files setState on unmounted component", 'e');
            } catch (err) {
                setFetching(true);
                console.error(err);
            }
        })();

        return () => { isMounted = false; };
    }, [items]);

    const filePondInit = () => console.log("FilePond has initialized");

    // const myGallery = (fetching && mediaState.files ? (
    //     mediaState.files.description
    // ) : [])

    return (
        <div style={{ padding: 10 }}>
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
            </div>

            <div className="myGallery">
                <LightGallery
                    elementClassNames="custom-classname"
                    dynamic
                    dynamicEl={items}
                    onInit={lightGalleryInit}
                    plugins={[lgZoom, lgVideo, lgThumbnail]}
                ></LightGallery>
            </div>
        </div>
    )
}

export default Uploads