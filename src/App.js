import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map";
import PlaceDetails from "./components/PlaceDetails";
import { useEffect, useState } from "react";
import { callGetPlaces, callGetPlacesByText } from "./services";
import SelectedPlaceModal from "./components/SelectedPlaceModal";

function App() {
    const [cordinates, setCordinates] = useState(null);
    const [bounds, setBounds] = useState(null);
    const [type, setType] = useState("restaurant");
    const [placesResults, setPlacesResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showList, setShowList] = useState(false);
    const [zoom, setZoom] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [recents, setRecents] = useState([]);
    const [selectedCordinates, setSelectedCordinates] = useState(null);
    const [isInputActive, setIsInputActive] = useState(false);
    const [showPlace, setShowPlace] = useState(false);
    const [showPlaceData, setShowPlaceData] = useState(null);
    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("recentList"));
        if (storedList) {
            setRecents(storedList);
        }
    }, []);

    const addToRecentList = (newItem) => {
        if (!recents.includes(newItem)) {
            const updatedList = [newItem, ...recents];
            setRecents(updatedList);
            localStorage.setItem("recentList", JSON.stringify(updatedList));
        }
    };

    const removeFromList = (index) => {
        const updatedList = [...recents];
        updatedList.splice(index, 1);
        setRecents(updatedList);
        localStorage.setItem("recentList", JSON.stringify(updatedList));
    };

    const searchClick = (textQuery) => {
        console.log("============", textQuery);
        if (textQuery) {
            setIsInputActive(false);
            addToRecentList(textQuery);
            setSearchQuery(textQuery);
            setIsLoading(true);

            callGetPlacesByText(textQuery).then((response) => {
                setIsLoading(false);
                setShowList(true);
                if (response.status) {
                    if (response.data?.places)
                        setPlacesResults(response.data.places);
                }
            });
        }
    };

    const searchWithType = (type) => {
        setIsInputActive(false);
        addToRecentList(type);
        setIsLoading(true);
        callGetPlaces(
            {
                lat: cordinates?.lat ?? 0,
                lng: cordinates?.lng ?? 0,
            },
            type
        ).then((response) => {
            setIsLoading(false);
            setShowList(true);
            if (response.status) {
                if (response.data?.places)
                    setPlacesResults(response.data.places);
            }
        });
    };

    const searchClose = () => {
        setShowList(false);
        setPlacesResults([]);
        setSearchQuery("");
        setZoom(10);
        setSelectedCordinates(null);
        setShowPlace(false);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCordinates({ lat: latitude, lng: longitude });
            }
        );
    }, []);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 800);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="App">
            <Header
                type={type}
                setType={setType}
                isLoading={isLoading}
                showList={showList}
                setShowList={setShowList}
                searchClick={searchClick}
                searchWithType={searchWithType}
                searchClose={searchClose}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setCordinates={setCordinates}
                recents={recents}
                removeFromRecentsList={removeFromList}
                isInputActive={isInputActive}
                setIsInputActive={setIsInputActive}
            />
            {cordinates && (
                <Map
                    cordinates={cordinates}
                    setCordinates={setCordinates}
                    bounds={bounds}
                    setBounds={setBounds}
                    places={placesResults}
                    zoom={zoom}
                    setZoom={setZoom}
                    selectedCordinates={selectedCordinates}
                    setSelectedCordinates={selectedCordinates}
                    setIsInputActive={setIsInputActive}
                />
            )}
            {showList && (
                <List
                    places={placesResults}
                    setCordinates={setCordinates}
                    selectedCordinates={selectedCordinates}
                    setSelectedCordinates={setSelectedCordinates}
                    setZoom={setZoom}
                    searchQuery={searchQuery}
                    setShowPlace={setShowPlace}
                    setShowPlaceData={setShowPlaceData}
                    showPlaceData={showPlaceData}
                    isMobileView={isMobileView}
                    showPlace={showPlace}
                />
            )}

            {showPlace && !isMobileView && (
                <SelectedPlaceModal
                    showPlaceData={showPlaceData}
                    setShowPlace={setShowPlace}
                    setShowPlaceData={setShowPlaceData}
                />
            )}
        </div>
    );
}

export default App;
