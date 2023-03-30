import React from 'react';
import {Marker, MarkerF} from "@react-google-maps/api";
import {markerPaw} from "../../../utils/constants";

const CustomMarker = ({position}) => {
    return (
        <MarkerF position={position} icon={markerPaw}/>
    );
};

export default CustomMarker;