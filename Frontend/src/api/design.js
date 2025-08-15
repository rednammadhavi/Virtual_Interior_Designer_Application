import API from "./api";

export const saveDesign = ({ title, imageFile, furnitureData }) => {
    const fd = new FormData();
    fd.append("image", imageFile);
    fd.append("title", title);
    fd.append("furnitureData", JSON.stringify(furnitureData || {}));
    return API.post("/designs", fd, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getMyDesigns = () => API.get("/designs");
