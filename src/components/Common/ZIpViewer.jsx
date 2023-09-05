import React, { useState } from "react"
import { saveAs } from "file-saver"
import JSZip from "jszip"

const ZipViewer = ({ zipUrl }) => {
  const [downloading, setDownloading] = useState(false)

  const downloadZipFile = async () => {
    setDownloading(true)

    console.log("zipUrl: ", zipUrl)
    try {
      const response = await fetch(zipUrl)
      const blob = await response.blob()

      // Create a new ZIP archive
      const zip = new JSZip()

      // Add the fetched content to the ZIP archive
      zip.file("downloaded.zip", blob)

      // Generate the ZIP content
      const zipContent = await zip.generateAsync({ type: "blob" })

      // Save the ZIP content as a file
      saveAs(zipContent, "downloaded.zip")
    } catch (error) {
      console.error("Error downloading or creating ZIP:", error)
    }

    setDownloading(false)
  }

  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <button
        onClick={downloadZipFile}
        className=" rounded-lg bg-yellow-50 p-4 font-bold text-black hover:bg-yellow-200"
        disabled={downloading}
      >
        {downloading ? "Downloading..." : "DOWNLOAD ZIP"}
      </button>
    </div>
  )
}

export default ZipViewer
