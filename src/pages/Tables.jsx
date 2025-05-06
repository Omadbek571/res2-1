import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation qo'shildi

// localStorage kalitlari (Afitsant.jsx dagilar bilan bir xil bo'lishi kerak)
const LOCAL_STORAGE_BOOKED_TABLES = 'bookedTablesData';
const LOCAL_STORAGE_SABOY_ORDERS = 'saboyOrdersData';

// Stollar uchun boshlang'ich ma'lumot (agar localStorage bo'sh bo'lsa)
const initialBookedTables = [
    {
        tableNumber: 2, waiterName: 'Ali Valiyev', panel: 'Zal',
        orderItems: [{ id: 'lag', name: 'Lagmon', price: 22000, quantity: 1 }],
        id: 'table-2-default' // Unikal ID
    },
    {
        tableNumber: 3, waiterName: 'Nodira Azimova', panel: 'Zal',
        orderItems: [{ id: 'man', name: 'Manti', price: 5000, quantity: 4 }],
        id: 'table-3-default'
    },
    {
        tableNumber: 7, waiterName: 'Sanjar Qosimov', panel: 'Podval',
        orderItems: [{ id: 'lav', name: 'Lavash', price: 20000, quantity: 1 }],
        id: 'table-7-default'
    },
];

// Saboy uchun boshlang'ich ma'lumot (agar localStorage bo'sh bo'lsa)
const initialSaboyOrders = [
    {
        id: 'saboy-1-default', tableNumber: 'Saboy', waiterName: 'Jasur Rustamov',
        items: [{ id: 'bur', name: 'Burger', price: 24000, quantity: 2 }],
        timestamp: '01.01.2024/10:00', status: 'pending'
    }
];


function Tables() {
    const [selectedPanel, setSelectedPanel] = useState('Zal');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [bookedTablesData, setBookedTablesData] = useState([]);
    const [saboyOrdersData, setSaboyOrdersData] = useState([]);

    // Ma'lumotlarni localStorage dan yuklash
    useEffect(() => {
        const loadData = () => {
            try {
                const storedBookedTables = localStorage.getItem(LOCAL_STORAGE_BOOKED_TABLES);
                setBookedTablesData(storedBookedTables ? JSON.parse(storedBookedTables) : initialBookedTables);

                const storedSaboyOrders = localStorage.getItem(LOCAL_STORAGE_SABOY_ORDERS);
                setSaboyOrdersData(storedSaboyOrders ? JSON.parse(storedSaboyOrders) : initialSaboyOrders);
            } catch (error) {
                console.error("Error loading data from localStorage:", error);
                setBookedTablesData(initialBookedTables); // Xatolik bo'lsa, boshlang'ich qiymat
                setSaboyOrdersData(initialSaboyOrders);  // Xatolik bo'lsa, boshlang'ich qiymat
            }
        };

        loadData(); // Komponent ilk yuklanganda

        // Agar Afitsant.jsx dan `refreshData: true` bilan qaytilsa, ma'lumotlarni qayta yuklash
        if (location.state?.refreshData) {
            loadData();
            // State ni tozalash, aks holda har location o'zgarishida (masalan, browser back/forward) ishlaydi
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate]); // `navigate` ni dependency ga qo'shish muhim

    const tableRanges = {
        Zal: { start: 1, end: 5 },
        Podval: { start: 6, end: 10 },
        Kabinet: { start: 11, end: 15 }
    };

    const { start, end } = tableRanges[selectedPanel];

    const bannedTableNumbers = bookedTablesData
        .filter(info => info.orderItems && info.orderItems.length > 0)
        .map(info => info.tableNumber);

    const handleTableSelect = (tableNumber) => {
        navigate(`/pos/${tableNumber}`);
    };

    // Band stolni tahrirlash
    const handleEditBookedTable = (bookedTableInfo) => {
        navigate(`/pos/${bookedTableInfo.tableNumber}`, {
            state: {
                isEditing: true,
                editingOrderType: 'table', // Stol tahrirlanyapti
                existingOrderData: {
                    id: bookedTableInfo.id, // Stolning unikal ID si
                    tableNumber: bookedTableInfo.tableNumber,
                    waiterName: bookedTableInfo.waiterName,
                    items: bookedTableInfo.orderItems || [],
                }
            }
        });
    };

    // Saboy buyurtmasini tahrirlash
    const handleEditSaboyOrder = (saboyOrder) => {
        navigate(`/pos/saboy-edit-${saboyOrder.id}`, { // URL ga saboy ID sini qo'shish (ixtiyoriy, Afitsant.jsx da ishlatilmaydi)
            state: {
                isEditing: true,
                editingOrderType: 'saboy', // Saboy tahrirlanyapti
                existingOrderData: {
                    id: saboyOrder.id, // Saboy buyurtmasining ID si
                    waiterName: saboyOrder.waiterName,
                    items: saboyOrder.items || [],
                    tableNumber: 'Saboy', // Bu shunchaki ko'rsatish uchun
                }
            }
        });
    };

    const handleOpenModal = () => { setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); };
    const handleConfirmLogout = () => { /* ... avvalgidek ... */
        localStorage.removeItem('role');
        // localStorage.removeItem(LOCAL_STORAGE_BOOKED_TABLES); // Ixtiyoriy
        // localStorage.removeItem(LOCAL_STORAGE_SABOY_ORDERS);  // Ixtiyoriy
        setIsModalOpen(false);
        navigate('/');
    };
    const handleModalContentClick = (e) => { e.stopPropagation(); };

    // Tanlangan panelga tegishli band stollar
    const currentPanelBookedTables = bookedTablesData.filter(
        info => info.panel === selectedPanel && info.orderItems && info.orderItems.length > 0
    );

    // Faol saboy buyurtmalari (masalan, statusi 'pending' yoki 'updated' bo'lganlar)
    // Bu yerda barcha saboy buyurtmalarini ko'rsatamiz, filtrlashni keyin qo'shsa bo'ladi
    const activeSaboyOrders = saboyOrdersData.filter(order => order.items && order.items.length > 0);


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

            {/* O'rtadagi stollar paneli */}
            <div className="flex-grow p-6 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    {Array.from({ length: end - start + 1 }, (_, i) => {
                        const tableNumber = start + i;
                        const isBanned = bannedTableNumbers.includes(tableNumber);
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

            {/* O'ngdagi band stollar va saboy buyurtmalari paneli */}
            <div className="w-1/4 flex-shrink-0 p-4 bg-white shadow-md border-l border-gray-200 flex flex-col">
                {/* Band Stollar Bo'limi */}
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2 sticky top-0 bg-white z-10 px-2 -mx-2">
                    {selectedPanel} - Band Stollar
                </h3>
                <div className="overflow-y-auto flex-shrink min-h-[100px]" style={{maxHeight: 'calc(50% - 40px)'}}> {/* Taxminiy 50% balandlik */}
                    {currentPanelBookedTables.length > 0 ? (
                        currentPanelBookedTables.map((bookedInfo) => (
                            <div
                                key={bookedInfo.id || bookedInfo.tableNumber} // Unikal kalit
                                onClick={() => handleEditBookedTable(bookedInfo)}
                                className="p-2.5 mb-2 bg-red-50 border border-red-200 rounded-lg shadow cursor-pointer hover:bg-red-100 transition-colors"
                            >
                                <p className="font-bold text-red-700 text-base">
                                    {bookedInfo.tableNumber}-Stol
                                </p>
                                <p className="text-xs text-gray-600">
                                    Ofitsiant: <span className="font-medium">{bookedInfo.waiterName}</span>
                                </p>
                                {bookedInfo.orderItems && bookedInfo.orderItems.length > 0 && (
                                    <div className="mt-1 text-[11px] text-gray-500">
                                        <span className="font-medium text-gray-600">Buyurtma: </span>
                                        {bookedInfo.orderItems.slice(0, 2).map(item => `${item.name}(${item.quantity})`).join(', ')}
                                        {bookedInfo.orderItems.length > 2 ? '...' : ''}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic text-sm px-2">
                            Band stollar yo'q.
                        </p>
                    )}
                </div>

                {/* Saboy Buyurtmalari Bo'limi --- O'ZGARTIRILGAN QISM --- */}
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 my-2 pt-2 sticky top-0 bg-white z-10 px-2 -mx-2">
                    Saboy Buyurtmalari
                </h3>
                <div className="overflow-y-auto flex-grow min-h-[100px]"> {/* Qolgan joyni egallaydi */}
                    {activeSaboyOrders.length > 0 ? (
                        activeSaboyOrders.map((saboyOrder, index) => ( // <--- 1. `index` QO'SHILDI
                            <div
                                key={saboyOrder.id || `saboy-fallback-${index}`} // Asl ID ni key uchun ishlatish (yoki fallback)
                                onClick={() => handleEditSaboyOrder(saboyOrder)}
                                className="p-2.5 mb-2 bg-blue-50 border border-blue-200 rounded-lg shadow cursor-pointer hover:bg-blue-100 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-blue-700 text-base">
                                        Saboy ID: {index + 1} {/* <--- 2. KO'RSATILADIGAN ID O'ZGARTIRILDI */}
                                    </p>
                                    <span className="text-[10px] text-gray-500">{saboyOrder.timestamp?.split('/')[1] || ''}</span>
                                </div>
                                <p className="text-xs text-gray-600">
                                    Ofitsiant: <span className="font-medium">{saboyOrder.waiterName}</span>
                                </p>
                                {saboyOrder.items && saboyOrder.items.length > 0 && (
                                     <div className="mt-1 text-[11px] text-gray-500">
                                        <span className="font-medium text-gray-600">Buyurtma: </span>
                                        {saboyOrder.items.slice(0, 2).map(item => `${item.name}(${item.quantity})`).join(', ')}
                                        {saboyOrder.items.length > 2 ? '...' : ''}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic text-sm px-2">
                            Faol saboy buyurtmalari yo'q.
                        </p>
                    )}
                </div>
            </div>


            {/* Tasdiqlash Modal Oynasi */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 transition-opacity duration-300"
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
