"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  CloudUpload,
  PlusIcon,
  Upload,
  UploadCloud,
  UploadIcon,
} from "lucide-react";
import React, { ChangeEvent, useState } from "react";
type uploadStatus = "idle" | "uploading" | "success" | "error";
export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<uploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  async function handleFileUpload() {
    if (!file) return;
    setStatus("uploading");
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://127.0.0.1:8000/file/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });
      setStatus("success");
      setUploadProgress(100);
    } catch {
      setStatus("error");
      setUploadProgress(0);
    }
  }
  return (
    <div className="max-w-md w-full p-4">
      <form method="post">
        <Label className="border-2 border-slate-400 border-dashed p-4 flex  justify-center items-center flex-col hover:bg-slate-100">
          <Input type="file" onChange={handleChange} className="hidden" />
          <div className="h-11 w-11 border rounded-full flex justify-center items-center shadow-sm">
            <Upload />
          </div>
          <p className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors duration-300">
            Browse File
          </p>
        </Label>

        {file && (
          <>
            <p>Filname: {file?.name}</p>
            <p>File Type: {file?.type}</p>
            <p>File-Size: {(file.size / 1024).toFixed(2)} KB</p>
          </>
        )}
        {file && status != "uploading" && (
          <Button onClick={handleFileUpload}>Upload</Button>
        )}

        {status == "uploading" && (
          <div className="space-y-2 mt-2">
            <div className="h-2.5 rounded bg-slate-200">
              <div
                className="h-2.5 rounded bg-green-500 transition-all duration-900"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-600">{uploadProgress}% Uploaded</p>
          </div>
        )}

        {status == "success" && (
          <div className="mt-2 text-sm text-green-700 bg-green-100 p-2">
            File Upload Successfully
          </div>
        )}

        {status == "error" && (
          <div className="mt-2 text-sm text-red-700 bg-red-100 p-2">
            Upload Failed, Please try again
          </div>
        )}
      </form>
    </div>
  );
}
