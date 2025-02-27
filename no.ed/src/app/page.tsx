"use client";
import React, { useState, useEffect } from 'react';
import macbody from '../../public/macbody.png';
import Image from 'next/image';
import footer from '../../public/bottom.png';
const HomePage = () => {
  const [currentIcon, setCurrentIcon] = useState('/icon1.svg');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prevIcon) =>
        prevIcon === '/icon1.svg' ? '/icon2.svg' : '/icon1.svg'
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-tripSansBold">
      <nav className="flex items-center justify-between p-4 border-black border-b-8 mx-6 my-2 border-t-2 border-x-2">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-6 h-6" />
          <span className="ml-2 text-xl font-bold text-gray-900">No.ed</span>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 font-bold">Home</button>
          <button className="px-4 py-2 text-black bg-lime-300 font-bold border-black border-b-4 border-r-4 drop-shadow-md">TRY OUT!</button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative flex flex-col items-center justify-center p-8 rounded-lg mb-16">
          <img src={currentIcon} alt="Icon" className="w-full h-64 py-5" />
          <p className='mt-12'><span className="text-lime-500 text-left font-tripSansBold font-extrabold">*</span> pronounced "Node"</p>
          <p className="text-black font-bold text-lg pt-7">
            LEVERAGING THE TOOLS OF TODAY, TO CREATE A BETTER TOMORROW
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6 font-tripSansBold justify-center align-middle text-center">OUR MAGIC</h2>
          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              <div className="flex items-center gap-8 font-tripSansMono text-nowrap bg-purple-100 h-24">
                <h3 className="text-xl font-semibold mb-2 w-full">📄 Resume Analysis</h3>
                <span className="text-xl font-semibold mb-2">∙</span>
                <h3 className="text-xl font-semibold mb-2 w-full">🤖 Personalised Roadmap</h3>
                <span className="text-xl font-semibold mb-2">∙</span>
                <h3 className="text-xl font-semibold mb-2 w-full">🏅 Certifications</h3>
                <span className="text-xl font-semibold mb-2">∙</span>
                <h3 className="text-xl font-semibold mb-2 w-full">💼 Jobs</h3>
                <span className="text-xl font-semibold mb-2">∙</span>
                <h3 className="text-xl font-semibold mb-2 w-full">📄 Resume Analysis</h3>
                <span className="text-xl font-semibold mb-2">∙</span>
                <h3 className="text-xl font-semibold mb-2 w-full">🤖 Personalised Roadmap</h3>
                <span className="text-xl font-semibold mb-2">∙</span>
                <h3 className="text-xl font-semibold mb-2 w-full">🏅 Certifications</h3>
                <span className="text-xl font-semibold mb-2 w-full">∙</span>
                <h3 className="text-xl font-semibold mb-2 w-full">💼 Jobs</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-100 p-6 rounded-sm font-tripSansMono font-semibold mb-16">
          <p className="text-7xl">
            No.ed is an intelligent and interactive platform designed to help learners and 
            professionals build their careers through a seamless and personalized experience.
          </p>
        </div>

        <div className="mb-16">
          <div className="bg-green-100 p-8 rounded-lg flex flex-col items-center font-tripSansMono justify-center ">
            <h2 className="text-2xl font-bold mb-6">How it works</h2>
            <div className="relative w-96 h-60 bg-transparent rounded-lg ">
              <Image src={macbody} alt="Mac Body" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          </div>
        </div>      
      </main>
      <div>
          <Image
              src={footer}
              alt="footer"
              className="w-full object-cover rounded-lg"
            />
          </div>
        </div>
  );
};

export default HomePage;
