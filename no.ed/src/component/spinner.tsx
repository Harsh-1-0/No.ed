"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import spinner from "../images/spinner.png";

// Define the types for props
interface SpinnerProps {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}

function Spinner({ width = 50, height = 50, top = 0, left = 0 }: SpinnerProps) {
  const controls = useAnimation();
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    controls.start({
      rotate: [0, 360 * direction],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    });

    setTimeout(() => {
      setDirection(-1 * direction);
    }, 3000);
  }, [direction, controls]);

  return (
    <div
      className="absolute flex z-[-10] justify-center items-center"
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      <motion.div animate={controls}>
        <Image
          src={spinner}
          alt="spinner"
          width={width}
          height={height}
          unoptimized
        />
      </motion.div>
    </div>
  );
}

export default Spinner;
