"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "@/component/sidenavbar";
import Loading from "@/component/loading";
import { json } from "stream/consumers";
function Hello() {

    const [output, setOutput] = useState({ answer: [{topic:" ",outcome_of_learning_30_words:" "},{topic:" ",outcome_of_learning_30_words:" "},{topic:" ",subtopics:[" "," "," "," "," "," "],outcome_of_learning_30_words:" "},{topic:" ",outcome_of_learning_30_words:" "},{topic : " ",outcome_of_learning_30_words:" "},{topic:" ",outcome_of_learning_30_words:" "}] });
  const [data, setData1] = useState(null);

    const searchParams = useSearchParams();
  
    useEffect(() => {
    const response = searchParams.get("data");
    const role = searchParams.get("role");

    try {
        console.log(role);
        if (response) {
            setData1({ "resume": String(response), "role": role });
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
}, [searchParams]);

  
    useEffect(() => {
    const fetchData = async () => {

        try {
          if(!localStorage.getItem("roadMap")){
          console.log("Data",data)
            const response = await axios.post(
                "http://3.108.217.83:5000/roadmap", 
               data,
                {
                    headers: {
                        "Content-Type": "application/json" // Set the correct header for JSON
                    }
                }
            );
            console.log(response);
            setOutput(response.data);
            localStorage.setItem("roadMap",JSON.stringify(response.data));
          }else{
            setOutput(localStorage.getItem("roadMap"));
          }
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    if (data!=null) fetchData();
}, [data]);

    
    const router = useRouter();
    const handleClick = (data:any) => {
        const query = encodeURIComponent(JSON.stringify(data));
        router.push(`/content?data=${query}`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        },
        hover: { 
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };

    if(!output) return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-black text-center"
        >
            Loading....
        </motion.div>
    );
    if(!output.answer[0].subtopics){
      return <Loading/>
    }
    return ( 
      <div className="flex gap-x-28">
        <div>
        <Navbar/>
        </div>
        <div>
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex py-8 px-4  rounded bg-white border-black border-5 items-center justify-center h-screen"
        >
            <div className="w-1/3 h-full bg-black flex flex-col items-center justify-center">
                <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    onClick={() => handleClick(output.answer[0])} 
                    className="rounded-2xl bg-white flex flex-col gap-8 p-4 hover:bg-black hover:text-white duration-500 transition-all border border-black h-2/3 w-full cursor-pointer"
                >
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold">{output.answer[0]?.topic}</div>
                    <div>
                        <div className="font-tripSansMono font-bold text-3xl">Subtopics</div>
                       <ul className="list-disc list-inside font-tripSansMono">
    {output.answer[0]?.subtopics?.slice(0, 6).map((subtopic, key) => (
        <li key={key}>{subtopic}</li>
    ))}
</ul>

                    </div>
                    <div>
                        <div className="font-tripSansMono font-bold text-3xl">Outcome</div>
                        <div className="font-tripSansMono">{output.answer[0]?.outcome_of_learning_30_words}</div>
                    </div>
                </motion.div>
                <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    onClick={() => handleClick(output.answer[1])} 
                    className="rounded-2xl bg-white p-4 flex flex-col gap-4 hover:bg-black hover:text-white duration-500 transition-all border-black h-1/3 w-full cursor-pointer"
                >
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold">{output.answer[1]?.topic}</div>
                    <div>
                        <div className="font-tripSansMono font-bold text-3xl">Outcome</div>
                        <div className="font-tripSansMono">{output.answer[0]?.outcome_of_learning_30_words}</div>
                    </div>
                </motion.div>
            </div>
            <div className="w-1/3 h-full bg-black flex flex-col items-center justify-center">
                <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    onClick={() => handleClick(output.answer[2])} 
                    className="rounded-2xl bg-white border-black flex flex-col hover:text-white hover:bg-black duration-500 transition-all justify-center border w-full h-1/6 p-4 cursor-pointer"
                >
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold">{output.answer[2]?.topic}</div>
                </motion.div>
                <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    onClick={() => handleClick(output.answer[3])} 
                    className="rounded-2xl bg-white hover:text-white hover:bg-black duration-500 transition-all border-black border p-4 gap-8 flex flex-col w-full h-4/6 cursor-pointer"
                >
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold">{output.answer[3]?.topic}</div>
                    <div>
                        <div className="font-tripSansMono font-bold text-3xl">Subtopics</div>
                        <ul className="list-disc list-inside font-tripSansMono">
                            {output.answer[3]?.subtopics?.slice(0, 6).map((subtopic, key) => (
                                <li key={key}>{subtopic}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="font-tripSansMono font-bold text-3xl">Outcome</div>
                        <div className="font-tripSansMono">{output.answer[3]?.outcome_of_learning_30_words}</div>
                    </div>
                </motion.div>
                <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    onClick={() => handleClick(output.answer[4])} 
                    className="rounded-2xl bg-white border-black flex flex-col hover:text-white hover:bg-black duration-500 transition-all justify-center border w-full h-1/6 p-4 cursor-pointer"
                >
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold">{output.answer[4]?.topic}</div>
                </motion.div>
            </div>
            <div className="w-1/3 h-full flex bg-black flex-col items-center justify-center">
                <motion.div 
                    variants={itemVariants}
                    whileHover="hover"
                    onClick={() => handleClick(output.answer[5])} 
                    className="rounded-2xl flex flex-col gap-8 p-4 duration-500 transition-all hover:text-white hover:bg-black bg-white w-full h-4/5 border-black border cursor-pointer"
                >
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold">{output.answer[5]?.topic}</div>
                    <div>
                        <div className="font-tripSansMono font-bold text-3xl">Subtopics</div>
                        <ul className="list-disc list-inside font-tripSansMono">
                            {output.answer[5]?.subtopics?.slice(0, 6).map((subtopic, key) => (
                                <li key={key}>{subtopic}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="font-tripSansMono font-bold text-3xl">Outcome</div>
                        <div className="font-tripSansMono">{output.answer[5]?.outcome_of_learning_30_words}</div>
                    </div>
                </motion.div>
                
                <motion.div 
                    variants={itemVariants}
                    className="rounded-2xl flex flex-col justify-center text-white bold text-center text-5xl bg-[#FF4949] w-full h-1/5 border-black border"
                >
                    <div>
                    TO UNLOCK :<br/>
                    {0}/7 COMPLETED
                    </div>
                </motion.div>
            </div>
        </motion.div>
        </div>
        </div>
    );
}

export default Hello;