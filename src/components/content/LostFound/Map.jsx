import React, {useCallback, useMemo, useRef} from 'react';
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";
import s from './lostFoundContent.module.css'
import {defaultTheme} from "./Theme";

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons:false,
    keyboardShortcuts: false,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    fullscreenControl: false,
    styles: defaultTheme,
}

function Map() {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    const center = useMemo(() => ({ lat: 32.072162620371934, lng: 34.78794113915044}), [])
    const mapRef = useRef(undefined)

    const onLoad = useCallback(function callback(map){
        mapRef.current = map
    }, [])

    const onUnmount = useCallback(function callback(map){
        mapRef.current = map
    }, [])


    if (!isLoaded)
        return <div>Loading...</div>
    return (
        <div className={s.map}>
            <GoogleMap
                center={center}
                zoom={12}
                mapContainerClassName={s.mapContainer}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
            >
                <MarkerF position={center}/>
            </GoogleMap>
        </div>
    );
}

export default Map;