"use client";
import Image from "next/image";
import crossImage from "@/images/chipchop.png";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function Content() {
    const [data, setData] = useState({courses_courses: [],projects_to_do :[], duration: "", topic: ""});
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
        return <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            Loading....
        </motion.div>
    }

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
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
            opacity: 1 
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center min-h-screen"
        >
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="bg-black shadow-lg w-[800px] h-full border-2 border-black"
            >
                <motion.div className="flex" variants={itemVariants}>
                    <div className="bg-[#853BFF] border border-black rounded-lg p-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <Image src={crossImage} alt="Crisscross image" className="rounded-lg" />
                        </motion.div>
                    </div>
                    <div className="flex bg-white w-full flex-col gap-4 p-4 rounded-lg border border-black ">
                        <motion.div 
                            variants={itemVariants}
                            className="text-5xl font-tripSansBold tracking-tight font-bold"
                        >
                            {data.topic}
                        </motion.div>
                        <motion.div 
                            variants={itemVariants}
                            className="text-3xl font-tripSansBold tracking-tight font-bold"
                        >
                            {data.duration}
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white border p-2 border-black rounded-lg ">
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold ">RECOMMENDED COURSES</div>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white border border-black rounded-lg ">
                    <div className="text-white flex justify-evenly flex-wrap py-2">
                        <AnimatePresence>
                            {data.courses_courses.map((course: any, index: number) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.3 }}
                                    className="card p-6 m-2 bg-[#002469] rounded-lg shadow-lg"
                                >
                                    <div className="text-lg font-semibold">
                                        <Link target="_blank" href={course}>
                                            {course.split("/")[course.split("/").length-1].toUpperCase()}
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white border p-2 border-black rounded-lg ">
                    <div className="text-5xl font-tripSansBold tracking-tight font-bold ">POSSIBLE PROJECTS</div>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white border border-black rounded-lg ">
                    <div className="text-white flex justify-evenly flex-wrap py-2">
                        <AnimatePresence>
                            {data.projects_to_do.map((course: any, index: number) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.3 }}
                                    className="card p-6 m-2 bg-[#002469] rounded-lg shadow-lg"
                                >
                                    <div className="text-lg font-semibold">{course}</div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Content;