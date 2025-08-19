// Frontend/src/api/design.js
import API from "./api";

export const saveDesign = async ({ title, imageFile, furnitureData }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("furnitureData", JSON.stringify(furnitureData || []));
    if (imageFile) {
        formData.append("image", imageFile); // <-- key must match multer field
    }

    return API.post("/api/designs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const getUserDesigns = async () => {
    return API.get("/api/designs");
};
