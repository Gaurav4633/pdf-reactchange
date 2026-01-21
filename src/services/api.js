import axios from "axios";

// 🔹 single axios instance
const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/pdf",
  timeout: 60000,
});

// =======================
// MERGE PDF
// =======================
const mergePdf = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file); // backend expects "files"
  });

  const response = await instance.post("/merge", formData, {
    responseType: "blob",
  });

  return response.data;
};

// =======================
// COMPRESS PDF (later)
// =======================
const compressPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post("/compress", formData, {
    responseType: "blob",
  });

  return response.data;
};

// =======================
// SPLIT PDF (later)
// =======================
const splitPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post("/split", formData, {
    responseType: "blob",
  });

  return response.data;
};

// 🔥 EXPORT ALL TOOLS FROM SAME FILE
export const api = {
  mergePdf,
  compressPdf,
  splitPdf,
};
