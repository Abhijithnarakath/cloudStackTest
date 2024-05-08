import React from "react";
import PlaceDetails from "./PlaceDetails";

const List = ({
  places,
  setCordinates,
  setSelectedCordinates,
  setZoom,
  searchQuery,
  setShowPlace,
  setShowPlaceData,
  isMobileView,
  showPlace,
  showPlaceData,
}) => {
  const handleCloseModal = () => {
    setShowPlaceData(null);
    setShowPlace(false);
  };
  return (
    <div className="sideBar">
      {/* Selected places details */}
      {showPlace && isMobileView && (
        <div className="sideBar_show_place">
          <span
            class="material-symbols-outlined"
            id="close_button"
            onClick={handleCloseModal}
            style={{
              top: "75px",
              right: "50px",
            }}
          >
            close
          </span>
          <img
            src={showPlaceData?.loadedImage ?? "/images/place_no_image.jpeg"}
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
      )}
      {/*  List of search results  */}
      {((showPlace && !isMobileView) || !showPlace) && (
        <div className="place_options">
          <div className="fontTitleLarge">Results</div>
          {places.length !== 0 ? (
            places.map((item, index) => (
              <PlaceDetails
                place={item}
                key={index}
                setCordinates={setCordinates}
                setSelectedCordinates={setSelectedCordinates}
                setZoom={setZoom}
                setShowPlace={setShowPlace}
                setShowPlaceData={setShowPlaceData}
              />
            ))
          ) : (
            <>
              <span
                className="list_not_found"
                style={{
                  fontWeight: "400",
                  fontSize: "1.25rem",
                }}
              >{`Google Maps can't find ${searchQuery}`}</span>
              <span className="list_not_found">
                {`Make sure your search is spelled correctly. Try
                            adding a city, state, or zip code.`}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default List;
