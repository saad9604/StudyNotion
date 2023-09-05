import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function FileUpload({
  name,
  label,
  register,
  setValue,
  errors,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setValue(name, file); // Set the file object to the form value
    }
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: [".pdf", ".zip"], // Only accept PDF and zip files
    onDrop,
  });

  useEffect(() => {
    register(name, { required: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        <div
          className="flex w-full flex-col items-center p-6"
          {...getRootProps()}
        >
          <input {...getInputProps()} ref={inputRef} />
          <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
            <FiUploadCloud className="text-2xl text-yellow-50" />
          </div>
          <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
            Drag and drop a file (PDF or ZIP), or click to{" "}
            <span className="font-semibold text-yellow-50">Browse</span> a
            file
          </p>
        </div>
      </div>
      {selectedFile && (
        <p className="mt-2 text-richblack-400">{selectedFile.name}</p>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
