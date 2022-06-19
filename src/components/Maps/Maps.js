import React, { useState, useRef, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import { Box, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const BtnItem = styled(Button)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // color: theme.palette.text.secondary,
    // padding: theme.spacing(1),
    // textAlign: 'center',
}));

const markers = [
    {
        id: 1,
        name: "Nikah : Bey Garden Düğün Davet Organizasyon",
        icon: "map-marker.png",
        position: { lat: 40.9941425, lng: 28.5980485 },
        zoom: 21,
    },
    {
        id: 2,
        name: "Kına : Ansu Davet Organizasyon",
        icon: "map-marker.png",
        position: { lat: 41.0002867, lng: 28.6450183 },
        zoom: 24,
    },
    {
        id: 3,
        name: "Kütahya Düğün : Serenat Düğün Salonu ve Kır Bahçesi",
        icon: "map-marker.png",
        position: { lat: 39.4367186, lng: 29.9854347 },
        zoom: 16,
    },
];

const infoWindowStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
}

const mapZoomAnimate = (map, targetZoom, currentZoom) => {
    currentZoom = currentZoom || map.getZoom();
    if (currentZoom != targetZoom) {
        window.google.maps.event.addListenerOnce(map, 'zoom_changed', (event) => {
            mapZoomAnimate(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
        });
        setTimeout(() => map.setZoom(currentZoom), 80);
    } else {
        // window.google.maps.Marker.setAnimation(window.google.maps.Animation.BOUNCE)
    }
}

const fitBounds = (selectedMarkers, currentMap) => {
    // console.log(currentMap);
    if (selectedMarkers.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        selectedMarkers.forEach(({ position }) => bounds.extend(position));
        currentMap.fitBounds(bounds);
    } else {
        // console.log(currentMap.getZoom());
        // currentMap.panTo(selectedMarkers[0].position)
        currentMap.setCenter(selectedMarkers[0].position);
        setTimeout(() => mapZoomAnimate(currentMap, selectedMarkers[0].zoom), 80);
    }
}

const Maps = () => {
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_KEY;

    if (!googleMapsApiKey) {
        throw new Error("Google token is not set");
    }

    const mapRef = useRef();
    const onMapLoad = useCallback((currentMap) => {
        mapRef.current = currentMap;
        fitBounds(markers, mapRef.current);
    }, []);

    const [activeMarkerId, setActiveMarkerId] = useState(null);
    const handleActiveMarker = (markerId) => {
        if (markerId === activeMarkerId) return;
        setActiveMarkerId(markerId);
    };

    const [selectedMarkerId, setSelectedMarkerId] = useState(null);
    useEffect(() => {
        if (!selectedMarkerId) return;

        let isMounted = true; // note mutable flag
        if (isMounted) { // add conditional check
            const selectedMarkers = markers.filter(marker => marker.id === selectedMarkerId);
            fitBounds(selectedMarkers, mapRef.current);
        } else console.log('aborted setState on unmounted component');

        return () => {
            isMounted = false;
        };
    }, [selectedMarkerId]);

    return (
        <>
            <Box>
                <Stack spacing={2} direction="row" justifyContent="center">
                    <BtnItem variant={selectedMarkerId === 2 ? 'contained' : 'outlined'} onClick={() => setSelectedMarkerId(2)}>İstanbul (Kına)</BtnItem>
                    <BtnItem variant={selectedMarkerId === 1 ? 'contained' : 'outlined'} onClick={() => setSelectedMarkerId(1)}>İstanbul (Nikah)</BtnItem>
                    <BtnItem variant={selectedMarkerId === 3 ? 'contained' : 'outlined'} onClick={() => setSelectedMarkerId(3)}>Kütahya (Düğün)</BtnItem>
                </Stack>
            </Box>

            <Box sx={{ mt: 3, width: "100%", height: "100%" }}>
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                    <GoogleMap
                        // zoom={6}
                        onLoad={onMapLoad}
                        onClick={() => setActiveMarkerId(null)}
                        mapContainerStyle={{ width: "100%", height: "calc(100vh - 280px)" }}
                    >
                        {markers.map(({ id, name, icon, position }) => (
                            <Marker
                                key={id}
                                position={position}
                                onClick={() => handleActiveMarker(id)}
                                icon={`${process.env.PUBLIC_URL}/${icon ?? '/map-marker.png'}`}
                                animation={1}
                            >
                                {activeMarkerId === id ? (
                                    <InfoWindow onCloseClick={() => setActiveMarkerId(null)}>
                                        <div style={infoWindowStyle}>{name}</div>
                                    </InfoWindow>
                                ) : null}
                            </Marker>
                        ))}
                    </GoogleMap>
                </LoadScript>
            </Box>
        </>
    );
};

export default React.memo(Maps);
