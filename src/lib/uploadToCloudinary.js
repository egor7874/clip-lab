import axios from "axios";

export async function uploadToCloudinary(files) {
  const cloudName = "dzvesis0b";
  const uploadPreset = "unsigned_cliplab";
  const uploaded = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        formData
      );
      uploaded.push({
        url: response.data.secure_url,
        type: file.type
      });
    } catch (err) {
      console.error("Ошибка загрузки в Cloudinary:", err);
      throw new Error("Upload failed");
    }
  }

  return uploaded;
}