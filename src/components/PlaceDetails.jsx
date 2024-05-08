import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { callGetPhotoByPlaceId } from "../services";
const PlaceDetails = ({
    place,
    setCordinates,
    setSelectedCordinates,
    setZoom,
    setShowPlace,
    setShowPlaceData,
}) => {
    let [photoData, setPhotoData] = useState(null);
    useEffect(() => {
        if (place.photos?.length) {
            callGetPhotoByPlaceId(place.photos[0].name).then((response) => {
                if (response && response.status) {
                    setPhotoData(response.data.photoUri);
                }
            });
        }
    }, [place]);

    const handlePlaceListClick = () => {
        setCordinates({
            lat: place.location.latitude,
            lng: place.location.longitude,
        });
        setSelectedCordinates({
            lat: place.location.latitude,
            lng: place.location.longitude,
        });

        setZoom(12);
        setShowPlaceData({ ...place, loadedImage: photoData });
        setShowPlace(true);
    };
    return (
        <div className="place_details">
            <div className="place_details_outer" onClick={handlePlaceListClick}>
                <div className="place_details_data">
                    <div className="place_details_name">
                        <span className="place_details_name">
                            {place.displayName.text}
                        </span>
                    </div>
                    <div className="place_details_name">
                        <span className="place_details_address">
                            {place.formattedAddress}
                        </span>
                    </div>
                </div>
                {photoData && (
                    <Image
                        src={photoData}
                        alt=""
                        height={"80px"}
                        width={"80px"}
                        preview={false}
                        style={{
                            borderRadius: "10px",
                        }}
                    />
                )}
            </div>
        </div>
    );
};
export default PlaceDetails;
