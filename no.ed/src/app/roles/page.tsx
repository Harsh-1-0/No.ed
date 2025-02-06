'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import chipchop from '../../../public/chipchop.png';

interface TagSelectorProps {
    onComplete?: (tags: string[]) => void;
}

const RoleSelector: React.FC<TagSelectorProps> = () => {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [roles, setRoles] = useState<{ role: string }[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Fetch roles from the query parameter and parse the data
    useEffect(() => {
        const dataParam = searchParams.get('data');
        if (dataParam) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(dataParam));
                setRoles(Array.isArray(parsedData) ? parsedData : []);
            } catch (error) {
                console.error('Failed to parse data:', error);
            }
        }
    }, [searchParams]);

    const handleTagClick = (tag: string) => {
        setSelectedTag(tag);
        setShowModal(true); // Show confirmation modal
    };

    const handleConfirm = () => {
        setShowModal(false); // Close the modal

        // Use template string to build the URL with the query parameter
        router.push(`/roles?selectedTag=${encodeURIComponent(selectedTag!)}`);
    };

    const handleCancel = () => {
        setShowModal(false); // Close the modal without confirming
    };

    return (
        <div className="w-full flex flex-col min-h-screen bg-white">
            <div className="mb-4 text-center pt-6 pb-6">
                <h1 className="font-tripSansMono text-2xl pb-2">
                    Here's what we think on your future career
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
                {roles.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 m-2 h-full">
                        {roles.map((role, rowIndex) => (
                            <button
                                key={rowIndex}
                                onClick={() => handleTagClick(role.role)}
                                className={`p-3 rounded-lg shadow-sm font-tripSansBold font-bold transition-all h-80 text-2xl ${
                                    selectedTag === role.role
                                        ? 'bg-[#B5FF3B]'
                                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {role.role}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-white">No roles available</div>
                )}

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#B5FF3B] p-2 rounded-full text-lg font-bold transition-colors font-tripSansBold justify-center items-center flex w-20 h-20 shadow-md shadow-black border-4 border-black">
                    <Image src={chipchop} alt="Chipchop" width={40} height={40} />
                </div>
            </div>

            {/* Modal for Confirmation */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center border-4 border-black">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-2xl font-tripSansMono">Excited for this?</h2>
                        <p className="my-4">{selectedTag}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleConfirm}
                                className="bg-[#B5FF3B] text-black px-4 font-tripSansMono py-2 rounded-lg"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-black text-white px-4 font-tripSansMono py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoleSelector;
