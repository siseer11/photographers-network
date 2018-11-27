import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const MyMapComp = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    defaultOptions={{
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }}
  />
));

export const MyFancyMap = ({ lat, long }) => (
  <MyMapComp
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `300px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    lat={lat}
    lng={long}
  />
);
