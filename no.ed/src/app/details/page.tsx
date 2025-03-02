"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import upload from "../../../public/upload.png";
import github from "../../../public/github.png";
import axios from "axios";

const Details: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [githubLink, setGithubLink] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const selectedRole = searchParams.get("selectedTag");
    if (selectedRole) setRole(selectedRole);
  }, [searchParams]);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setResume(file);
  };

  const handleGithubLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGithubLink(event.target.value);
  };

  const handleNext = async () => {
    if (!resume || !githubLink) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", resume);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STORAGE_API_URL}/api/roadmap/pdfparse`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      router.push(
        `/home?data=${encodeURIComponent(
          response.data.data
        )}&github=${encodeURIComponent(githubLink)}&role=${encodeURIComponent(
          role
        )}`
      );
    } catch (err) {
      console.error("Error uploading file:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <div className="mb-4 text-center pt-6 pb-6">
        <h1 className="font-tripSansMono text-2xl pb-2">
          We need one last thing from you
        </h1>
        <h1 className="text-8xl font-bold flex items-center justify-center">
          Choose
          <div
            className="button w-56 h-20 bg-[#B5FF3B] cursor-pointer select-none mx-2
              -rotate-12 active:translate-y-2 active:[box-shadow:0_0px_0_0_#000000,0_0px_0_0_#1b70f841]
              active:border-b-[0px] transition-all duration-150
              [box-shadow:0_10px_0_0_#000000,0_5px_0_0_#000000]
              rounded-full border-[3px] border-black"
          >
            <span className="flex flex-col justify-center items-center h-full text-black font-bold text-6xl">
              Your
            </span>
          </div>
          Role
        </h1>
      </div>

      <div className="flex-grow bg-black w-full relative">
        <div className="grid mt-10 grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full">
          <div className="p-3 rounded-lg shadow-sm font-tripSansMono font-bold transition-all text-2xl bg-white border-black border-dotted hover:bg-gray-50 border">
            <div className="flex items-center justify-center h-80 border-dashed border-black border-4 bg-[#9747FF40]">
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Image
                  src={upload}
                  alt="Upload Icon"
                  className="h-20 w-20 mb-2"
                />
                Upload Resume
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>
            </div>
            {resume && <p className="mt-2">{resume.name}</p>}
          </div>
          <div className="p-3 rounded-lg shadow-sm font-tripSansMono font-bold transition-all text-2xl bg-white hover:bg-gray-50 border border-gray-200 h-full">
            <div className="flex flex-col items-center justify-center h-80 border-dashed border-black border-4 bg-[#9747FF40]">
              <Image src={github} alt="Github Icon" className="h-20 w-20" />
              <h3>Github Link</h3>
              <input
                type="text"
                placeholder="Enter your Github ID"
                className="p-4 placeholder:text-black rounded-xl bg-transparent border-black border-4 mt-2"
                value={githubLink}
                onChange={handleGithubLinkChange}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleNext}
        className={`p-4 px-8 rounded-lg text-lg font-bold transition-colors font-tripSansMono ${
          resume && githubLink && !loading
            ? "text-black bg-[#B5FF3B] hover:bg-[#9fdc29]"
            : "bg-gray-200 text-black cursor-not-allowed"
        }`}
        disabled={loading || !resume || !githubLink}
      >
        {loading ? "Loading..." : "NEXT →"}
      </button>
    </div>
  );
};

export default Details;
