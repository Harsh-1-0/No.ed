import React from "react";
import Image from "next/image";
import Link from "next/link";
import home from "@/images/home.png";
import resume from "@/images/resume.png";
import jobs from "@/images/jobs.png";

const Navbar = () => {
  return (
    <div className="h-screen w-64 border border-black  bg-white  fixed left-0 top-0 flex flex-col p-4 shadow-lg">
      <nav className="flex flex-col space-y-6 gap-4 ">
        {/* Home */}
        <Link
          href="/home"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col items-center ">
            <Image height={36} width={36} src={home} alt="Home" />
            <span className="font-tripSansMono">Home</span>
          </div>
        </Link>

        {/* Resume */}
        <Link
          href="/resume"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col items-center ">
            <Image height={36} width={36} src={resume} alt="Resume" />
            <span className="font-tripSansMono">Resume</span>
          </div>
        </Link>

        {/* Jobs */}
        <Link
          href="/jobs"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col items-center ">
            <Image height={36} width={36} src={jobs} alt="Jobs" />
            <span className="font-tripSansMono text-lg ">Jobs</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
