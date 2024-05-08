import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { callGetPhotoByPlaceId } from "../services";
const SelectedPlaceModal = ({
    showPlaceData,
    setShowPlaceData,
    setShowPlace,
}) => {
    const handleCloseModal = () => {
        setShowPlaceData(null);
        setShowPlace(false);
    };
    
    return (
        <div className="place_show_modal">
            {/* Selected places details */}

            <span
                class="material-symbols-outlined"
                id="close_button"
                onClick={handleCloseModal}
            >
                close
            </span>
            <img
                src={
                    showPlaceData?.loadedImage ?? "/images/place_no_image.jpeg"
                }
                className="place_show_modal_img"
            />
            <div className="place_show_modal-body">
                <div className="place_show_modal-article">
                    {showPlaceData?.displayName?.text}
                </div>
                <div style={{ display: "flex" }}>
                    <span class="material-symbols-outlined">location_on</span>
                    <span>{showPlaceData?.formattedAddress}</span>
                </div>
                {showPlaceData?.internationalPhoneNumber && (
                    <div style={{ display: "flex" }}>
                        <span class="material-symbols-outlined">call</span>
                        <span>{showPlaceData?.internationalPhoneNumber}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SelectedPlaceModal;
