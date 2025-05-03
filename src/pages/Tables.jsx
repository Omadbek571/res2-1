import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Tables() {
    const [selectedPanel, setSelectedPanel] = useState('Zal');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const tableRanges = {
        Zal: { start: 1, end: 5 },
        Podval: { start: 6, end: 10 },
        Kabinet: { start: 11, end: 15 }
    };

    const { start, end } = tableRanges[selectedPanel];
    const bannedTables = [2, 3];

    const handleTableSelect = (tableNumber) => {
        navigate(`/pos/${tableNumber}`);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmLogout = () => {
        localStorage.removeItem('role');
        setIsModalOpen(false);
        navigate('/');
    };

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };


    return (
        <div className="h-screen bg-gray-50 flex">
            {/* Chap panel */}
            <div className="w-1/5 flex-shrink-0 p-6 bg-white shadow-md border-r border-gray-200 flex flex-col">
                {/* Panel Buttons */}
                <div className="space-y-4">
                    {['Zal', 'Podval', 'Kabinet'].map((label, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedPanel(label)}
                            className={`w-full py-3 text-black font-semibold rounded-lg transition duration-200 ${
                                selectedPanel === label
                                    ? 'bg-yellow-600 ring-2 ring-yellow-700'
                                    : 'bg-yellow-400 hover:bg-yellow-500'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                {/* Spacer */}
                <div className="flex-grow"></div>
                {/* Logout Button */}
                <button
                    onClick={handleOpenModal}
                    className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-lg shadow-lg transition duration-150"
                >
                    Chiqish
                </button>
            </div>

            {/* O'ngdagi stollar paneli */}
            <div className="flex-grow p-6 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    {Array.from({ length: end - start + 1 }, (_, i) => {
                        const tableNumber = start + i;
                        const isBanned = bannedTables.includes(tableNumber);
                        return (
                            <button
                                key={tableNumber}
                                disabled={isBanned}
                                onClick={() => !isBanned && handleTableSelect(tableNumber)}
                                className={` text-white font-bold h-32 flex items-center justify-center rounded-xl shadow-lg text-xl transition duration-150 ${isBanned ? 'bg-gray-400 cursor-not-allowed opacity-70' : 'bg-green-500 hover:bg-green-600 cursor-pointer'} `}
                            >
                                {tableNumber}-Stol
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tasdiqlash Modal Oynasi */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 transition-opacity duration-300" // Opacity kamaytirildi
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-300 scale-100 opacity-100"
                        onClick={handleModalContentClick}
                    >
                        <h2 className="text-xl font-semibold mb-5 text-gray-800">Tasdiqlash</h2>
                        <p className="mb-6 text-gray-600">Rostan ham chiqmoqchimisiz?</p>
                        <div className="flex justify-end gap-4">
                            <button onClick={handleCloseModal} className="py-2 px-5 bg-gray-300 hover:bg-gray-400 rounded text-gray-800 font-medium transition duration-150">Yo'q</button>
                            <button onClick={handleConfirmLogout} className="py-2 px-5 bg-red-600 hover:bg-red-700 rounded text-white font-medium transition duration-150">Ha</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tables;