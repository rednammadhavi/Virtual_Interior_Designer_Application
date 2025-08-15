import API from "./api";

export const redesignRoom = (payload) => API.post("/ai/redesign", payload);
