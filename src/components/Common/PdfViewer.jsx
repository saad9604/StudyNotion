import React from "react";

const PdfViewer = ({ pdfUrl }) => {
  const downloadPdf = () => {
    // Open the Cloudinary URL in a new tab to allow the browser to download it
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
    
      <button onClick={downloadPdf} className="bg-yellow-50 p-4 rounded-lg text-black font-bold hover:bg-yellow-200">
        DOWNLOAD PDF
      </button>
    </div>
  );
};

export default PdfViewer;
