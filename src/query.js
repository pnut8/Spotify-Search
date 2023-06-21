import axios from "axios";


export const fetchPlaylist = (token, query, typeValue, callBack) => {
  axios("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
    params: {
      q: query,
      limit: 30,
      type: typeValue.toLowerCase(),
    },
  }).then((res) => {
    callBack((prev) => ({ ...prev, list: res.data }));
  });
};

export const fetchToken = (setOption) => {
  axios("https://accounts.spotify.com/api/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(import.meta.env.VITE_CLIENT_ID + ":" + import.meta.env.VITE_CLIENT_SECRET),
    },
    data: "grant_type=client_credentials",
    method: "POST",
  }).then((token) => {
    axios("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
      headers: {
        Authorization: "Bearer " + token.data?.access_token,
      },
      method: "GET",
    }).then((res) => {
      setOption((prev) => ({
        ...prev,
        token: token.data?.access_token,
        genre: res.data?.genres || [],
      }));
    });
  });
};
