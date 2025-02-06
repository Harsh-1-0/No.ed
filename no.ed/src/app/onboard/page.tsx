'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TagSelectorProps {
  onComplete?: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ onComplete }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const tags = [
        ['Machine Learning', 'Cloud Computing', 'Artificial Intelligence', 'Quantum Computing', 'Cybersecurity'],
        ['App Dev', 'Internet of Things', 'UI/UX Design', 'Backend Dev', 'Software Engineering'],
        ['Blockchain', 'Data Science', 'Frontend Dev', 'DevOps', 'Big Data']
    ];

    const handleTagClick = (tag: string) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            }
            if (prev.length >= 4) {
                return prev;
            }
            return [...prev, tag];
        });
    };

    const handleNext = async () => {
        if (selectedTags.length === 4) {
            setLoading(true);
            try {
                const response = await fetch('http://3.108.217.83:5000/recommend_roles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tags: selectedTags.join(',') }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recommended roles');
                }

                const roles = await response.json();
                console.log(roles);
                
                // Navigate to /roles page with roles as state
                router.push(`/roles?data=${encodeURIComponent(roles)}`);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="w-full flex flex-col min-h-screen bg-white">
            <div className="mb-4 text-center pt-6 pb-6">
                <h1 className='font-tripSansMono text-2xl pb-2'> We need to learn what you're interested in </h1>
                <h1 className="text-8xl font-bold flex items-center justify-center">Pick 
                    <div className="button w-56 h-20 bg-[#B5FF3B] cursor-pointer select-none mx-2
                        -rotate-12
                        active:translate-y-2 active:[box-shadow:0_0px_0_0_#000000,0_0px_0_0_#1b70f841]
                        active:border-b-[0px]
                        transition-all duration-150 [box-shadow:0_10px_0_0_#000000,0_5px_0_0_#000000]
                        rounded-full border-[3px] border-black">
                        <span className="flex flex-col justify-center items-center h-full text-black font-bold text-6xl">
                            Four
                        </span>
                    </div>
                    Tags
                </h1>
            </div>
            
            <div className="flex-grow bg-black w-full">
                {tags.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-5 gap-2 m-2 font-">
                        {row.map(tag => (
                            <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className={`p-3 rounded-lg shadow-sm text-3xl
                                    font-tripSans font-bold transition-all h-48 ${
                                    selectedTags.includes(tag)
                                        ? 'bg-[#B5FF3B]'
                                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            <button 
                onClick={handleNext}
                className={`p-4 px-8 rounded-lg text-lg font-bold transition-colors font-tripSansBold ${
                    selectedTags.length === 4 && !loading
                        ? 'text-black bg-[#B5FF3B] hover:'
                        : 'bg-gray-200 text-black cursor-not-allowed'
                }`}
                disabled={selectedTags.length !== 4 || loading}
            >
                {loading ? 'Loading...' : 'NEXT →'}
            </button>
        </div>
    );
};

export default TagSelector;
