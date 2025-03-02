"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

function Job() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const role = localStorage.getItem("role");
    const fetchData = async () => {
      try {
        const data = { roles: `${role}`, experience_level: "Beginner" };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_AGENT_API_URL}/recommend_jobs`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (Err) {
        console.log(Err);
      }
    };

    fetchData();
  }, []);

  function split(job: string) {
    const splitString = job.split("/");
    return splitString[2];
  }

  if (data.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen font-tripSansBold">
      <div className="text-5xl mb-6">Recommended Jobs</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        {data.map((job, index) => (
          <div
            key={index}
            className="w-72 p-4 border rounded-lg shadow-md transition-all duration-500 group hover:bg-[#000000] hover:shadow-lg"
          >
            <Link href={job} target="_blank">
              <div className="cursor-pointer text-lg font-semibold text-[#0077B5] group-hover:underline">
                {split(job)}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Job;
