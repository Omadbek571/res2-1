import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiBell, FiArrowLeft } from 'react-icons/fi';

const CATEGORIES = {
  MILLIY: 'milliy',
  FAST_FOOD: 'fast',
  BAR: 'bar',
  ALL: 'all'
};
const LOCAL_STORAGE_BOOKED_TABLES = 'bookedTablesData';

function Afitsant() {
  const [order, setOrder] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [hideUnavailable, setHideUnavailable] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [editingTableId, setEditingTableId] = useState(null);
  const [currentWaiterName, setCurrentWaiterName] = useState('Rustamov Jasur'); // Default yoki tizimga kirgan ofitsiant nomi

  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const originalMenuItems = [
      { id: 'lag', name: 'Lagmon', price: 22000, available: true, category: CATEGORIES.MILLIY },
      { id: 'man', name: 'Manti', price: 5000, available: true, category: CATEGORIES.MILLIY },
      { id: 'mas', name: 'Mastava', price: 25000, available: true, category: CATEGORIES.MILLIY },
      { id: 'koc', name: 'Kocha', price: 18000, available: true, category: CATEGORIES.MILLIY },
      { id: 'bif', name: 'Biftrogm', price: 35000, available: false, category: CATEGORIES.MILLIY },
      { id: 'tus', name: 'Tushonka', price: 28000, available: true, category: CATEGORIES.MILLIY },
      { id: 'osh', name: 'Osh', price: 30000, available: false, category: CATEGORIES.MILLIY },
      { id: 'vaj', name: 'Vaju', price: 15000, available: true, category: CATEGORIES.MILLIY },
      { id: 'sho', name: 'Shorva', price: 20000, available: true, category: CATEGORIES.MILLIY },
      { id: 'xon', name: 'Xonim', price: 16000, available: true, category: CATEGORIES.MILLIY },
      { id: 'chu', name: 'Chuchvara', price: 23000, available: false, category: CATEGORIES.MILLIY },
      { id: 'lav', name: 'Lavash', price: 20000, available: true, category: CATEGORIES.FAST_FOOD },
      { id: 'bur', name: 'Burger', price: 24000, available: true, category: CATEGORIES.FAST_FOOD },
      { id: 'col', name: 'Coca-Cola', price: 8000, available: true, category: CATEGORIES.BAR },
      { id: 'choy', name: 'Choy', price: 3000, available: true, category: CATEGORIES.BAR },
    ];

  const formatPrice = (price) => price.toLocaleString('fr-FR').replace(/ /g, '.');
  const getCurrentTimestamp = () => {
      const now = new Date();
      const date = now.toLocaleDateString('ru-RU');
      const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      return `${date}/${time}`;
  };

  useEffect(() => {
    const stateData = location.state;
    // Tahrirlash rejimi uchun ma'lumotlarni yuklash
    if (stateData?.isEditing && stateData?.existingOrderData) {
      const { items, waiterName: existingWaiter, id, tableNumber: existingTableNum } = stateData.existingOrderData;
      setOrder(items || []);
      setCurrentWaiterName(existingWaiter || 'Noma`lum Ofitsiant');
      setIsEditingMode(true);
      setEditingTableId(id); // Stolning localStorage dagi ID si
    } else if (tableNumber) { // Agar tahrirlash bo'lmasa, lekin stol raqami bo'lsa (yangi buyurtma uchun)
      setOrder([]);
      // Agar tizimga kirgan ofitsiant nomini olish imkoni bo'lsa, shu yerda o'rnating:
      // setCurrentWaiterName(loggedInWaiterName); 
      setCurrentWaiterName('Rustamov Jasur'); // Hozircha default
      setIsEditingMode(false);
      setEditingTableId(null);
    } else { // Agar stol raqami ham bo'lmasa (masalan, URL noto'g'ri)
        navigate('/tables'); // Stollar sahifasiga qaytarish
    }
  }, [location.state, tableNumber, navigate]);

  const handleAddItem = (menuItem) => { /* ... o'zgarishsiz ... */
    if (!menuItem.available) return;
    setOrder(prevOrder => {
      const existingItem = prevOrder.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prevOrder.map(item =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevOrder, { ...menuItem, quantity: 1 }];
      }
    });
  };
  const handleIncrementQuantity = (itemId) => { /* ... o'zgarishsiz ... */
      setOrder(prevOrder =>
        prevOrder.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
  };
  const handleDecrementQuantity = (itemId) => { /* ... o'zgarishsiz ... */
     setOrder(prevOrder => {
       const existingItem = prevOrder.find(item => item.id === itemId);
       if (existingItem && existingItem.quantity > 1) {
         return prevOrder.map(item =>
           item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
         );
       } else {
         return prevOrder.filter(item => item.id !== itemId);
       }
     });
  };
  const handleSearchChange = (event) => { setSearchTerm(event.target.value); };
  const handleCategorySelect = (category) => { setSelectedCategory(category); };
  const goToTables = () => { navigate('/tables'); }; // Endi shunchaki /tables ga qaytadi
  const handleHideUnavailableToggle = () => { setHideUnavailable(prevValue => !prevValue); };

  // **O'ZGARTIRILDI:** handleOrderSubmit -> handleUpdateOrCreateOrder
  const handleUpdateOrCreateOrder = () => {
    if (order.length === 0) return;

    const orderIdentifier = tableNumber || 'Noma`lum Stol';
    const tableNumInt = parseInt(orderIdentifier);
    const currentTimestamp = getCurrentTimestamp();

    try {
        const storedTablesRaw = localStorage.getItem(LOCAL_STORAGE_BOOKED_TABLES);
        let storedTables = storedTablesRaw ? JSON.parse(storedTablesRaw) : [];

        let panelOfTable = 'Zal'; // Default panel
        const existingTableInfo = storedTables.find(tbl => tbl.id === editingTableId || tbl.tableNumber === tableNumInt);
        if (existingTableInfo && existingTableInfo.panel) {
            panelOfTable = existingTableInfo.panel;
        }

        if (isEditingMode && editingTableId) {
            // Mavjud stol buyurtmasini YANGILASH
            storedTables = storedTables.map(tbl =>
                tbl.id === editingTableId
                    ? { ...tbl, orderItems: order, waiterName: currentWaiterName, timestamp: currentTimestamp }
                    : tbl
            );
        } else {
            // YANGI stol buyurtmasini qo'shish yoki almashtirish
            const newTableOrderId = `table-${tableNumInt}-${Date.now()}`;
            const newBookedTableEntry = {
                id: newTableOrderId,
                tableNumber: tableNumInt,
                waiterName: currentWaiterName,
                orderItems: order,
                panel: panelOfTable,
                timestamp: currentTimestamp
            };
            const existingIdx = storedTables.findIndex(tbl => tbl.tableNumber === tableNumInt);
            if (existingIdx > -1) {
                storedTables[existingIdx] = newBookedTableEntry; // Almashtirish
            } else {
                storedTables.push(newBookedTableEntry); // Qo'shish
            }
        }
        localStorage.setItem(LOCAL_STORAGE_BOOKED_TABLES, JSON.stringify(storedTables));
        navigate('/tables', { state: { refreshTableData: true } }); // Stol sahifasiga qaytish
    } catch (error) {
        console.error("Error updating localStorage for tables:", error);
        alert("Buyurtmani saqlashda xatolik yuz berdi!");
    }
  };

  // **YANGI FUNKSIYA:** Buyurtmani yakunlash (localStorage dan o'chirish)
  const handleFinishOrder = () => {
    if (!isEditingMode || !editingTableId) return; // Faqat tahrirlash rejimida va ID bo'lsa ishlaydi

    if (window.confirm(`${tableNumber}-stol buyurtmasini haqiqatan ham yakunlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.`)) {
        try {
            const storedTablesRaw = localStorage.getItem(LOCAL_STORAGE_BOOKED_TABLES);
            let storedTables = storedTablesRaw ? JSON.parse(storedTablesRaw) : [];

            // ID bo'yicha buyurtmani topib o'chirish
            const updatedTables = storedTables.filter(tbl => tbl.id !== editingTableId);

            localStorage.setItem(LOCAL_STORAGE_BOOKED_TABLES, JSON.stringify(updatedTables));
            alert(`${tableNumber}-stol buyurtmasi muvaffaqiyatli yakunlandi.`);
            navigate('/tables', { state: { refreshTableData: true, finishedTableId: editingTableId } }); // Stol sahifasiga qaytish
        } catch (error) {
            console.error("Error finishing order in localStorage:", error);
            alert("Buyurtmani yakunlashda xatolik yuz berdi!");
        }
    }
  };


  useEffect(() => { /* ... totalAmount hisoblash o'zgarishsiz ... */
      const newTotal = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalAmount(newTotal);
  }, [order]);

  // Menyuni filtrlash logikasi o'zgarishsiz
  const categoryFilteredItems = selectedCategory === CATEGORIES.ALL ? originalMenuItems : originalMenuItems.filter(item => item.category === selectedCategory);
  const searchFilteredItems = categoryFilteredItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredMenuItems = hideUnavailable ? searchFilteredItems.filter(item => item.available === true) : searchFilteredItems;
  const getCategoryButtonStyle = (category) => selectedCategory === category ? 'ring-2 ring-offset-1 ring-blue-500' : '';

  const currentOrderDisplay = tableNumber ? `${tableNumber}-Stol` : 'Stol?'; // Endi tahrirlash rejimi yozilmaydi
  const submitButtonText = isEditingMode ? "Buyurtmani Yangilash" : "Buyurtmani Yuborish";

  return (
    <div className="flex flex-col h-screen w-screen bg-white overflow-hidden border border-gray-300">
      {/* Yuqori Panel (o'zgarishsiz) */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-300 bg-gray-50 flex-shrink-0 gap-4">
        <div className="flex items-center gap-4">
             <button onClick={() => navigate(-1)} title="Orqaga" className="p-2 rounded-full hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition">
                 <FiArrowLeft size={22} />
             </button>
            <input type="text" placeholder="Qidiruv..." value={searchTerm} onChange={handleSearchChange} className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"/>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
            <button onClick={goToTables} className={`py-2 px-4 border rounded-md font-bold text-sm whitespace-nowrap cursor-pointer transition bg-yellow-100 border-yellow-200 text-yellow-800 hover:bg-yellow-200 ring-1 ring-yellow-400`} title="Stollar Ro'yxatiga O'tish">
              {tableNumber ? `${tableNumber}-Stol` : 'Stollar'}
            </button>
            <div className="hidden sm:flex space-x-1">
                 <button onClick={() => handleCategorySelect(CATEGORIES.ALL)} className={`py-2 px-3 md:px-4 bg-gray-500 text-white font-bold cursor-pointer rounded hover:bg-gray-600 text-xs md:text-sm ${getCategoryButtonStyle(CATEGORIES.ALL)}`}>Barchasi</button>
                <button onClick={() => handleCategorySelect(CATEGORIES.FAST_FOOD)} className={`py-2 px-3 md:px-4 bg-orange-500 text-white font-bold cursor-pointer rounded hover:bg-orange-600 text-xs md:text-sm ${getCategoryButtonStyle(CATEGORIES.FAST_FOOD)}`}>Fast</button>
                <button onClick={() => handleCategorySelect(CATEGORIES.BAR)} className={`py-2 px-3 md:px-4 bg-teal-500 text-white font-bold cursor-pointer rounded hover:bg-teal-600 text-xs md:text-sm ${getCategoryButtonStyle(CATEGORIES.BAR)}`}>Bar</button>
                <button onClick={() => handleCategorySelect(CATEGORIES.MILLIY)} className={`py-2 px-3 md:px-4 bg-pink-600 text-white font-bold cursor-pointer rounded hover:bg-pink-700 text-xs md:text-sm ${getCategoryButtonStyle(CATEGORIES.MILLIY)}`}>Milliy</button>
            </div>
        </div>
         <div className="flex items-center flex-shrink-0">
             <button onClick={() => navigate('/orders')} className="p-2 rounded-full hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition" title="Buyurtmalar Ro'yxati"> <FiBell size={22} /> </button>
         </div>
      </div>
       <div className="sm:hidden flex space-x-1 px-4 pb-2 border-b border-gray-200 bg-gray-50 justify-center">
           <button onClick={() => handleCategorySelect(CATEGORIES.ALL)} className={`py-1.5 px-3 bg-gray-500 text-white font-bold cursor-pointer rounded hover:bg-gray-600 text-xs ${getCategoryButtonStyle(CATEGORIES.ALL)}`}>Barchasi</button>
            <button onClick={() => handleCategorySelect(CATEGORIES.FAST_FOOD)} className={`py-1.5 px-3 bg-orange-500 text-white font-bold cursor-pointer rounded hover:bg-orange-600 text-xs ${getCategoryButtonStyle(CATEGORIES.FAST_FOOD)}`}>Fast</button>
            <button onClick={() => handleCategorySelect(CATEGORIES.BAR)} className={`py-1.5 px-3 bg-teal-500 text-white font-bold cursor-pointer rounded hover:bg-teal-600 text-xs ${getCategoryButtonStyle(CATEGORIES.BAR)}`}>Bar</button>
            <button onClick={() => handleCategorySelect(CATEGORIES.MILLIY)} className={`py-1.5 px-3 bg-pink-600 text-white font-bold cursor-pointer rounded hover:bg-pink-700 text-xs ${getCategoryButtonStyle(CATEGORIES.MILLIY)}`}>Milliy</button>
        </div>

      {/* Asosiy Kontent Maydoni (o'zgarishsiz) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Menyu Elementlari (o'zgarishsiz) */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-4 overflow-y-auto content-start border-r border-gray-300">
          {filteredMenuItems.map((item) => {
            const isInOrder = order.some(orderItem => orderItem.id === item.id);
            let buttonBgClass = '';
            if (!item.available) { buttonBgClass = 'bg-gray-400 cursor-not-allowed opacity-70'; }
            else if (isInOrder) { buttonBgClass = 'bg-rose-600 hover:bg-rose-700 cursor-pointer'; }
            else { buttonBgClass = 'bg-green-600 hover:bg-green-700 cursor-pointer'; }
            return (
              <button key={item.id} onClick={() => handleAddItem(item)} disabled={!item.available} className={`flex flex-col justify-between p-2 md:p-3 rounded-lg font-bold text-center text-white shadow-md transition-colors duration-150 min-h-[80px] md:min-h-[92px] text-xs md:text-sm ${buttonBgClass}`}>
                <div className="mb-1 line-clamp-2">{item.name}</div>
                <div className="flex items-center justify-between w-full mt-auto pt-1">
                  <span className="text-[10px] md:text-xs font-normal whitespace-nowrap">{formatPrice(item.price)}.som</span>
                  <span className={`text-[10px] md:text-xs font-semibold px-1 py-0 md:px-1.5 md:py-0.5 rounded ${item.available ? 'bg-yellow-400 text-yellow-900' : 'bg-red-600 text-white'}`}>
                    {item.available ? 'Bor' : 'Tugagan'}
                  </span>
                </div>
              </button>
            );
          })}
           {filteredMenuItems.length === 0 && (categoryFilteredItems.length > 0 || searchTerm) && ( <p className="col-span-full text-center text-gray-500 mt-4">Natija topilmadi.</p> )}
           {originalMenuItems.length > 0 && categoryFilteredItems.length === 0 && !searchTerm && ( <p className="col-span-full text-center text-gray-500 mt-4">Bu kategoriyada mahsulot yo'q.</p> )}
        </div>

        {/* Buyurtmalar Ro'yxati Ustuni */}
        <div className="w-full max-w-sm flex flex-col bg-gray-50 border-l border-gray-300">
          <div className="flex-grow overflow-y-auto p-3 md:p-4">
            {order.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">Buyurtma bo'sh</p>
            ) : (
              order.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center bg-white border border-gray-200 py-2 px-3 rounded-md mb-2 text-sm shadow-sm flex-shrink-0">
                  <div className="flex mr-2">
                    <button onClick={() => handleIncrementQuantity(item.id)} className="flex items-center justify-center w-6 h-6 bg-green-50 border border-green-300 text-green-800 font-bold cursor-pointer rounded-l hover:bg-green-100 leading-none text-base">+</button>
                    <button onClick={() => handleDecrementQuantity(item.id)} className="flex items-center justify-center w-6 h-6 bg-red-50 border-y border-r border-red-300 text-red-800 font-bold cursor-pointer rounded-r hover:bg-red-100 leading-none text-lg">-</button>
                  </div>
                  <span className="font-bold text-blue-600 mr-2 text-center w-5">{item.quantity}</span>
                  <span className="font-semibold text-gray-700 mr-auto line-clamp-1">{item.name}</span>
                  <span className="font-bold text-red-600 whitespace-nowrap text-xs">{formatPrice(item.price * item.quantity)}.som</span>
                </div>
              ))
            )}
          </div>
          {/* **O'ZGARTIRILDI:** Pastki qism - ikkita tugma (agar tahrirlash rejimi bo'lsa) */}
          {order.length > 0 && (
              <div className="p-3 md:p-4 flex-shrink-0 border-t border-gray-300 bg-gray-100">
                <div className="flex justify-between items-center font-bold mb-3">
                  <span className={`text-sm md:text-base ${isEditingMode ? 'text-purple-600' : 'text-yellow-800'}`}>
                    {currentOrderDisplay}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{getCurrentTimestamp()}</span>
                  <span className="text-base md:text-lg text-gray-800">{formatPrice(totalAmount)}.som</span>
                </div>
                {/* Tugmalar uchun konteyner */}
                <div className="flex justify-center gap-3">
                  {/* Yangilash yoki Yuborish tugmasi */}
                  <button
                    onClick={handleUpdateOrCreateOrder}
                    className={`w-full py-2.5 px-4 rounded-md font-bold text-white cursor-pointer transition duration-150
                                ${isEditingMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'}
                                disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={order.length === 0}
                  >
                    {submitButtonText} 
                  </button>
                  
                  {/* Faqat tahrirlash rejimida ko'rinadigan Yakunlash tugmasi */}
                  {isEditingMode && (
                    <button
                      onClick={handleFinishOrder}
                      className={`w-full py-2.5 px-4 rounded-md font-bold text-white cursor-pointer transition duration-150
                                  bg-red-600 hover:bg-red-700 
                                  disabled:opacity-50 disabled:cursor-not-allowed`}
                      disabled={order.length === 0} // Yoki boshqa shartlar
                    >
                      Yakunlash
                    </button>
                  )}
                </div>
              </div>
          )}
          {order.length === 0 && ( <div className="p-4 flex-shrink-0 border-t border-gray-300 bg-gray-100 h-[98px]"></div> )}
        </div>
      </div>

       {/* Pastki status bar (o'zgarishsiz) */}
       <div className="flex justify-between items-center px-4 py-1.5 border-t border-gray-300 bg-gray-100 text-xs flex-shrink-0">
        <span className="font-semibold text-gray-700">Ofitsant: {currentWaiterName}</span>
        <label className="flex items-center space-x-1.5 cursor-pointer text-gray-600">
            <input type="checkbox" checked={hideUnavailable} onChange={handleHideUnavailableToggle} className="h-3.5 w-3.5 rounded border-gray-400 text-blue-600 shadow-sm focus:border-blue-400 focus:ring focus:ring-offset-0 focus:ring-blue-300 focus:ring-opacity-60 transition duration-150 ease-in-out"/>
            <span>Tugaganlarni yashirish</span>
        </label>
      </div>
    </div>
  );
}

export default Afitsant;