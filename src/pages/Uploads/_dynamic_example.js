// https://stackblitz.com/edit/lightgallery-react-dynamic-mode?file=index.tsx

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

function Uploads() {
    const [counter, setCounter] = useState(false);

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
        {
            video: {
                source: [
                    {
                        src: 'https://www.lightgalleryjs.com//videos/video1.mp4',
                        type: 'video/mp4',
                    },
                ],
                attributes: { preload: false, controls: true },
            },
            thumb:
                'https://www.lightgalleryjs.com//images/demo/html5-video-poster.jpg',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@brookecagle">Brooke Cagle</a></h4>
                        <p>Description of the slide 2</p>
                    </div>`,
        },
        {
            id: '2',
            size: '1400-933',
            src: 'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            thumb:
                'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                  <h4>Photo by <a href="https://unsplash.com/@kylepyt">Kyle Peyton</a></h4>
                  <p>Published on September 14, 2016</p>
              </div>`,
        },
        {
            id: '3',
            size: '1400-932',
            src: 'https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
            thumb:
                'https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                  <h4>Photo by <a href="https://unsplash.com/@jxnsartstudio">Garrett Jackson</a></h4>
                  <p>Published on May 8, 2020</p>
              </div>`,
        },
    ]);

    const openGallery = useCallback(() => {
        lightGallery.current.openGallery();
    }, []);

    const onInit = useCallback((detail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    // Add new slides

    const addItems = useCallback(() => {
        const updatedItems = [
            ...items,
            {
                id: '4',
                size: '1400-933',
                src: 'https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
                thumb:
                    'https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
                subHtml: `<div class="lightGallery-captions">
                  <h4>Photo by <a href="https://unsplash.com/@bruno_adam">Bruno Adam</a></h4>
                  <p>Published on January 6, 2021</p>
              </div>`,
            },
        ];
        setItems(updatedItems);
        lightGallery.current.refresh(updatedItems);
        lightGallery.current.openGallery();
    }, [items]);

    return (
        <div className="App">
            <button onClick={openGallery}>Open Gallery</button>
            <button onClick={addItems}>Add new slide and open gallery</button>
            <LightGallery
                elementClassNames="custom-classname"
                dynamic
                dynamicEl={items}
                onInit={onInit}
                plugins={[lgZoom, lgVideo]}
            ></LightGallery>
        </div>
    );
}

export default Uploads