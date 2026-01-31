import axios from "axios";
import PdfToExcel from "../pages/convert/PdfToExcel";

// 🔹 single axios instance
const instance = axios.create({
  baseURL: "https://pdf-backend-proxy.gourav4633.workers.dev",
  timeout: 60000,
});

// =======================
// MERGE PDF
// =======================
const mergePdf = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));

  const response = await instance.post(
    "/api/pdf/merge",
    formData
  );

  return response.data; // JSON
};

// =======================
// COMPRESS PDF (later)
// =======================
const compressPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post(
    "/api/pdf/compress",
    formData
  );

  return response.data; // ✅ JSON
};

//pdf to image
// PDF TO IMAGE
const pdfToImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post(
    "/api/convert/pdf-to-image",
    formData
  );

  return response.data; // JSON
};


// =======================
// SPLIT PDF (later)
// =======================
const splitPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post(
    "/api/pdf/split",
    formData
  );

  return response.data; // JSON
};

// rotate pdf
const rotatePdf = async (file, angle = 90) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("angle", angle);

  const response = await instance.post(
    "/api/pdf/rotate",
    formData
  );

  return response.data;
};

// wordtopdfgaurav (FIXED)
const wordToPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post(
    "/api/convert/word-to-pdf",
    formData
  );

  return response.data; // JSON
};



//ppt to pdf
// =======================
const pptToPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post(
    "/api/convert/ppt-to-pdf",
    formData
  );

  return response.data; // JSON
};


// pdf to wordn gaurav
// =======================
// =======================
// PDF TO WORD
// =======================
const pdfToWord = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post(
    "/api/convert/pdf-to-word",
    formData
  );

  return response.data;
};
// IMAGE TO PDF
const imageToPdf = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append("images", file));

  const response = await instance.post(
    "/api/convert/image-to-pdf",
    formData
  );

  return response.data; // JSON
};

// excel to pdf
const excelToPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post(
    "/api/convert/excel-to-pdf",
    formData
  );

  return response.data; // JSON
};

//pdf to excel
// PDF TO EXCEL
const pdfToExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post(
    "/api/convert/pdf-to-excel",
    formData
  );

  return response.data; // ✅ JSON only
};



// 🔥 EXPORT ALL TOOLS FROM SAME FILE
export const api = {
  mergePdf,
  compressPdf,
  splitPdf,
  rotatePdf,
  wordToPdf,
  excelToPdf,
  pptToPdf,
  pdfToWord, 
  imageToPdf,
  pdfToImage,
  pdfToExcel,
};
