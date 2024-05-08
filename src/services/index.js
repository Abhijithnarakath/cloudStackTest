import axios from "axios";
import { API_Key } from "../config/config";

export const callGetPlaces = async ({ lat, lng }, type) => {
    const radius = 10000;
    let includedTypes = [];
    switch (type) {
        case "Things to do":
            includedTypes = [
                "amusement_center",
                "amusement_park",
                "aquarium",
                "banquet_hall",
                "bowling_alley",
                "casino",
                "community_center",
                "convention_center",
                "cultural_center",
                "dog_park",
                "event_venue",
                "hiking_area",
                "historical_landmark",
                "marina",
                "movie_rental",
                "movie_theater",
                "national_park",
                "night_club",
                "park",
                "tourist_attraction",
                "visitor_center",
                "wedding_venue",
                "zoo",
            ];
            break;
        case "transist stations":
            includedTypes = [
                "train_station",
                "transit_depot",
                "transit_station",
            ];
            break;
        case "health":
            includedTypes = [
                "dental_clinic",
                "dentist",
                "doctor",
                "drugstore",
                "hospital",
                "medical_lab",
                "pharmacy",
                "physiotherapist",
                "spa",
            ];
            break;
        default:
            includedTypes = [type];
            break;
    }
    const config = {
        method: "post",
        url: "https://places.googleapis.com/v1/places:searchNearby",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_Key,
            "X-Goog-FieldMask": "*",
        },
        data: {
            includedTypes: includedTypes,
            maxResultCount: 10,
            locationRestriction: {
                circle: {
                    center: {
                        latitude: lat,
                        longitude: lng,
                    },
                    radius,
                },
            },
        },
    };

    let data = await axios(config)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
    return data;
};

export const callGetPlacesByText = async (textQuery) => {
    const config = {
        method: "post",
        url: "https://places.googleapis.com/v1/places:searchText",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_Key,
            "X-Goog-FieldMask": "*",
        },
        data: {
            textQuery,
        },
    };

    let data = await axios(config)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
    return data;
};

export const callGetPhotoByPlaceId = async (photoReference) => {
    // const placeId = 'ChIJ2fzCmcW7j4AR2JzfXBBoh6E';
    // const photoReference = 'AUacShh3_Dd8yvV2JZMtNjjbbSbFhSv-0VmUN-uasQ2Oj00XB63irPTks0-A_1rMNfdTunoOVZfVOExRRBNrupUf8TY4Kw5iQNQgf2rwcaM8hXNQg7KDyvMR5B-HzoCE1mwy2ba9yxvmtiJrdV-xBgO8c5iJL65BCd0slyI1';
    // const maxHeight = 400;
    // const maxWidth = 400;

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    let data = axios
        .get(
            `https://places.googleapis.com/v1/${photoReference}/media?maxHeightPx=400&maxWidthPx=400&key=${API_Key}&skipHttpRedirect=true`,
            config
        )
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
        });
    return data;
};
