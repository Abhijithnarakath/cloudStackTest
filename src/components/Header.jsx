import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BiSearch,
  BiRestaurant,
  BiSolidHotel,
  BiCamera,
  BiTrain,
  BiPlusMedical,
} from "react-icons/bi";
const Header = ({
  setType,
  isLoading,
  showList,
  searchClick,
  searchWithType,
  searchClose,
  searchQuery,
  setSearchQuery,
  recents,
  removeFromRecentsList,
  isInputActive,
  setIsInputActive,
}) => {
  const handleserchTypeSelection = (value) => {
    setType(value);
    searchWithType(value);
    setSearchQuery(value);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setIsInputActive(true);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsInputActive(false);
    }
  };
  document.addEventListener("mousedown", handleOutsideClick);
  const modalRef = useRef(null);

  const SearchTypesListComponent = () => (
    <>
      <div
        className="search_type"
        style={{ marginLeft: "40px" }}
        onClick={() => {
          handleserchTypeSelection("restaurant");
        }}
      >
        <BiRestaurant />
        <span style={{ marginLeft: "4px", fontSize: "16" }}>Restaurants</span>
      </div>

      <div
        className="search_type"
        onClick={() => {
          handleserchTypeSelection("hotel");
        }}
      >
        <BiSolidHotel />
        <span style={{ marginLeft: "4px", fontSize: "16" }}>Hotels</span>
      </div>

      <div
        className="search_type"
        onClick={() => {
          handleserchTypeSelection("Things to do");
        }}
      >
        <BiCamera />
        <span style={{ marginLeft: "4px", fontSize: "16" }}>Things to do</span>
      </div>

      <div
        className="search_type"
        onClick={() => {
          handleserchTypeSelection("transist stations");
        }}
      >
        <BiTrain />
        <span style={{ marginLeft: "4px", fontSize: "16" }}>Transit</span>
      </div>

      <div
        className="search_type"
        onClick={() => {
          handleserchTypeSelection("health");
        }}
      >
        <BiPlusMedical />
        <span style={{ marginLeft: "4px", fontSize: "16" }}>Health</span>
      </div>
    </>
  );
  return (
    <div className="header">
      <div
        className="searchFeld"
        style={{
          borderRadius:
            isInputActive && recents.length > 0 ? "24px 24px 0px 0px" : "24px",
        }}
        ref={modalRef}
      >
        {/* searchbox to search with test query */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search Google Maps"
            className="searchFeld_input"
            value={searchQuery}
            onFocus={handleInputFocus}
            onChange={handleSearchQuery}
          />
          <BiSearch
            className="searchFeld_icon"
            onClick={() => {
              searchClick(searchQuery);
            }}
            style={(showList || isLoading) && { right: "45px" }}
          />
          {isLoading && <div className="search_loader"></div>}
          {showList && !isLoading && (
            <div className="search_cross" onClick={searchClose}>
              +
            </div>
          )}
        </div>

        {/* recents search log view */}
        {isInputActive && recents.length > 0 && (
          <div className="search_recents" tabIndex={10}>
            {recents?.map((item, index) => (
              <div className="recents">
                <div
                  style={{ display: "flex" }}
                  onClick={(e) => {
                    e.preventDefault();
                    searchClick(item);
                  }}
                >
                  <span class="material-symbols-outlined">schedule</span>
                  <div className="recents_word">{item}</div>
                </div>
                <div
                  className="recents_remove"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromRecentsList(index);
                  }}
                >
                  +
                </div>
              </div>
            ))}
          </div>
        )}
        {/* to search commonly searched categories */}
        {!showList && (
          <div className="search_type_header_mobile">
            <SearchTypesListComponent />
          </div>
        )}
      </div>

      <div className="search_type_header">
        <SearchTypesListComponent />
      </div>
    </div>
  );
};
export default Header;
