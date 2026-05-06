import axios from "axios";

const UPLOAD_LINK = import.meta.env.VITE_UPLOAD_LINK;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

const uploadImage = async (file: string | Blob) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", UPLOAD_PRESET);

  return await axios.post(UPLOAD_LINK, data);
};

export default uploadImage;
