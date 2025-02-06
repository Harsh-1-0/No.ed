'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import upload from '../../../public/upload.png';
import github from '../../../public/github.png';

interface TagSelectorProps {
    onComplete?: (tags: string[]) => void;
}

const Details: React.FC<TagSelectorProps> = ({ onComplete }) => {
    const [resume, setResume] = useState<File | null>(null);
    const [githubLink, setGithubLink] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setResume(event.target.files[0]);
        }
    };

    const handleGithubLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGithubLink(event.target.value);
    };

    const handleNext = () => {
        if (!resume || !githubLink) return;

        setLoading(true);

        // Simulate an API request or processing
        setTimeout(() => {
            setLoading(false);
            // Use template string to build the URL with the query parameter
            router.push(`/roles?resume=${encodeURIComponent(resume?.name || '')}&githubLink=${encodeURIComponent(githubLink)}`);
        }, 1000);
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
                            -rotate-12
                            active:translate-y-2 active:[box-shadow:0_0px_0_0_#000000,0_0px_0_0_#1b70f841]
                            active:border-b-[0px]
                            transition-all duration-150 [box-shadow:0_10px_0_0_#000000,0_5px_0_0_#000000]
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
                    <div className="p-3 rounded-lg shadow-sm font-tripSansMono font-bold transition-all text-2xl bg-white border-black border-dotted hover:bg-gray-50 border ">
                        <div className="flex items-center justify-center h-80 border-dashed border-black border-4 bg-[#9747FF40]">
                        <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
                            <Image src={upload} alt="Upload Icon" className="h-20 w-20 mb-2" />
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
                            <Image src={github} alt="Chipchop" className='h-20 w-20'/>
                            <h3>Github Link< /h3>
                            <input
                                type="text"
                                className="p-4 rounded-xl bg-transparent border-black border-4 mt-2 "
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
                        ? 'text-black bg-[#B5FF3B] hover:bg-[#9fdc29]'
                        : 'bg-gray-200 text-black cursor-not-allowed'
                }`}
                disabled={loading || !resume || !githubLink}
            >
                {loading ? 'Loading...' : 'NEXT →'}
            </button>
        </div>
    );
};

export default Details;
