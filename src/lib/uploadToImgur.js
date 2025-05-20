// lib/uploadToImgur.js
import axios from "axios";

const IMGUR_CLIENT_ID = "32994747bd05bc7"; // твой Client ID

export async function uploadToImgur(files) {
  const uploadedFiles = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("https://api.imgur.com/3/image", formData, {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      });

      const { link, type } = response.data.data;
      uploadedFiles.push({ url: link, type });
    } catch (error) {
      console.error("Ошибка загрузки на Imgur:", error);
      throw new Error("Upload failed");
    }
  }

  return uploadedFiles;
}