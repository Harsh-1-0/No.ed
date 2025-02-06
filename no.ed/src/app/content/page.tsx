"use client";
import Image from "next/image";
import crossImage from "@/images/chipchop.png";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function Content() {
    const [data, setData] = useState({});
    const searchParams = useSearchParams();
  
    useEffect(() => {
        const response = searchParams.get("data");

        try {
            if (response) {
                setData(JSON.parse(response));
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }, [searchParams]);

    if(!data){
        return <div>Loading....</div>
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-black shadow-lg w-[800px] h-[400px] border-2 border-black">
                <div className="flex  ">
                    <div className="bg-[#853BFF] border border-black rounded-lg p-2">
                        <Image src={crossImage} alt="Crisscross image" className="rounded-lg" />
                    </div>
                    <div className="flex bg-white flex-col gap-4 p-4 rounded-lg border border-black ">
                        <div className="text-5xl font-tripSansBold tracking-tight font-bold ">{data.topic}</div>
                        <div className="text-3xl font-tripSansBold tracking-tight font-bold ">{data.duration}</div>
                    </div>
                </div>
                <div className="bg-white border border-black rounded-lg ">
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold ">RECOMMENDED COURSES</div>
                </div>
                <div className="bg-white border border-black rounded-lg ">
                    <div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Content;
