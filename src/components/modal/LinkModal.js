'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';

export default function LinkModal({ links }) {
    const [selectedLink, setSelectedLink] = useState(null);

    const openModal = (link) => setSelectedLink(link);
    const closeModal = () => setSelectedLink(null);

    return (
        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
            {links.map((link) => (
                <div
                    key={link.url}
                    onClick={() => openModal(link)}
                    className="cursor-pointer bg-indigo-500 p-2 block rounded-md flex">
                    <div className="relative -left-4 w-16 overflow-hidden">
                        <div className="w-16 h-16 bg-cyan-500 aspect-square rounded-md flex items-center justify-center">
                            {link.icon ? (
                                <Image
                                    src={link.icon}
                                    alt="icon"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover rounded-md" />
                            ) : (
                                <FontAwesomeIcon icon={faBookBookmark} className="w-6 h-6 relative -left-1" />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center shrink grow-0 overflow-hidden">
                        <div>
                            <h3>{link.title}</h3>
                            <p className="text-white/70 h-6 overflow-hidden">{link.subtitle}</p>
                        </div>
                    </div>
                </div>
            ))}

            <AnimatePresence>
                {selectedLink && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white rounded-lg shadow-lg p-6 md:flex w-11/12 md:w-3/4 lg:w-1/2"
                        >
                            <div className="w-full md:w-1/2 flex justify-center items-center">
                                {selectedLink.icon && (
                                    <Image
                                        src={selectedLink.icon}
                                        alt="Full Icon"
                                        width={300}
                                        height={300}
                                        className="rounded-md w-full h-auto object-contain max-h-64 md:max-h-full" />
                                )}
                                {!selectedLink.icon && (
                                    <FontAwesomeIcon icon={faBookBookmark} className="w-32 h-32 text-cyan-400 flex mx-auto md:mt-8" />
                                )}
                            </div>
                            <div className="w-full md:w-1/2 md:pl-6 mt-4 md:mt-0">
                                <h3 className="text-2xl font-bold text-black">{selectedLink.title}</h3>
                                <p className="text-gray-600 mt-4">{selectedLink.subtitle}</p>
                                <div className='overflow-hidden mt-4'>
                                    <a target='_blank' href={selectedLink.url} className="text-gray-600 text-blue-600">{selectedLink.url}</a>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md">
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
