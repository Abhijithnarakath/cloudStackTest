import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { IoLocation } from "react-icons/io5";

const MarkerComponent = ({ lat, lng, size }) => (
    <div style={{ position: "relative" }}>
        <IoLocation color="red" fontSize={size ? size : 30} />
    </div>
);
const Map = ({
    cordinates,
    setCordinates,
    bounds,
    setBounds,
    places,
    zoom,
    setZoom,
    selectedCordinates,
    setSelectedCordinates,
    setIsInputActive,
}) => {
    const [mapInstance, setMapInstance] = useState(null);
    useEffect(() => {
        if (mapInstance) {
            mapInstance.setOptions({
                center: cordinates,
                zoom: zoom,
            });
        }
    }, [places, cordinates, mapInstance, zoom, selectedCordinates]);

    const handleMapReady = (map) => {
        setMapInstance(map);
    };

    const handleMapClick = ({ lat, lng }) => {
        setCordinates({
            lat,
            lng,
        });
        setIsInputActive(false);
    };

    const handleZoomAnimationEnd = (mapProps, map) => {
        setZoom(mapProps);
    };
    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyCv7-Tq0Z5nUwS8LiEQW8QG8Z15cQfKhGs",
                }}
                defaultCenter={cordinates}
                center={cordinates}
                defaultZoom={zoom}
                margin={[50, 50, 50, 50]}
                options={""}
                onChange={(e) => {
                    setCordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={() => {}}
                onGoogleApiLoaded={({ map }) => handleMapReady(map)}
                onZoomAnimationEnd={handleZoomAnimationEnd}
                onClick={handleMapClick}
            >
                <MarkerComponent lat={cordinates.lat} lng={cordinates.lng} />
                {selectedCordinates && (
                    <MarkerComponent
                        lat={selectedCordinates.lat}
                        lng={selectedCordinates.lng}
                        size={60}
                    />
                )}
                {/* {places?.map((place, index) => (
                    <MarkerComponent
                        key={index}
                        lat={place.location.latitude}
                        lng={place.location.longitude}
                    />
                ))} */}
            </GoogleMapReact>
        </div>
    );
};
export default Map;
