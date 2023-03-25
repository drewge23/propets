import React, {useMemo} from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import s from '../content.module.css'

function Map() {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey : process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })
    const center = useMemo(() => ({ lat: 32.087237865296956, lng: 34.79195762787939}), [])


    if (!isLoaded)
        return <div>Loading...</div>

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMap
                center={center}
                zoom={12}
                mapContainerClassName={s.mapContainer}
            >
                <Marker position={center}/>
            </GoogleMap>
        </div>
    );
}

export default Map;