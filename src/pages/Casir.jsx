import React, { useState, useMemo } from 'react'; // useMemo import qilindi
import { useNavigate } from 'react-router-dom';

// --- Namunaviy Ma'lumotlar ---
// Hamma mumkin bo'lgan stollar ro'yxati
const allTables = [
    { id: 't1', name: '1-Stol' }, { id: 't2', name: '2-Stol' }, { id: 't3', name: '3-Stol' },
    { id: 't4', name: '4-Stol' }, { id: 't5', name: '5-Stol' }, { id: 't6', name: '6-Stol' },
    { id: 't7', name: '7-Stol' },
];
// Hamma mumkin bo'lgan saboy joylar ro'yxati
const allSaboySlots = Array.from({ length: 9 }, (_, i) => ({
    id: `s${i + 1}`, name: `Saboy ${i + 1}`
}));

// Aktiv buyurtmalar (Faqat 5 stol va 1 saboy)
const initialOrders = {
    t1: { waiter: 'Rustamov Jasur', time: '16.08.2023 18:20', items: [ { id: 'item1', name: 'Shorva', quantity: 1, price: 20000, time: '16.08.2023 18:20' } ] },
    t2: { waiter: 'Aliyev Vali', time: '16.08.2023 19:05', items: [ { id: 'item6', name: 'Lagmon', quantity: 2, price: 28000, time: '16.08.2023 19:05' } ] },
    t3: { waiter: 'Karimov Akmal', time: '16.08.2023 19:30', items: [ { id: 'item10', name: 'Manti', quantity: 1, price: 30000, time: '16.08.2023 19:30' } ] },
    t4: { waiter: 'Rustamov Jasur', time: '16.08.2023 20:15', items: [ { id: 'item11', name: 'Somsa', quantity: 4, price: 6000, time: '16.08.2023 20:15' }, { id: 'item12', name: 'Choy', quantity: 1, price: 5000, time: '16.08.2023 20:15' } ] },
    t5: { waiter: 'Salimov Botir', time: '16.08.2023 20:45', items: [ { id: 'item13', name: 'Osh', quantity: 1, price: 35000, time: '16.08.2023 20:45' } ] },
    s1: { waiter: 'Takeaway', time: '16.08.2023 20:00', items: [ { id: 'item8', name: 'Lavash', quantity: 1, price: 25000, time: '16.08.2023 20:00' } ] }
};
// --- /Namunaviy Ma'lumotlar ---


function Casir() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('tables');
  const [selectedId, setSelectedId] = useState(null);
  const [orders, setOrders] = useState(initialOrders);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // Faqat aktiv buyurtmasi bor stollarni/saboylarni filtrlash
  // useMemo optimallashtirish uchun: orders yoki viewMode o'zgarmaguncha qayta hisoblanmaydi
  const activeDisplayItems = useMemo(() => {
    const sourceList = viewMode === 'tables' ? allTables : allSaboySlots;
    return sourceList.filter(item => orders[item.id] && orders[item.id].items && orders[item.id].items.length > 0);
  }, [orders, viewMode]); // orders yoki viewMode o'zgarsa, qayta filtrlanadi

  const handleSelect = (id) => {
    // Faqat ko'rsatilayotgan (aktiv) elementlarni tanlash mumkin
    if (orders[id]) {
        setSelectedId(id);
        console.log("Tanlandi:", id);
    } else {
        console.log("Bu joyda aktiv buyurtma yo'q:", id)
        // Tanlovni olib tashlash yoki hech narsa qilmaslik
        // setSelectedId(null);
    }
  };

  const handleCancelItem = (itemId) => {
    if (!selectedId || !orders[selectedId]) return;
    const updatedOrderItems = orders[selectedId].items.filter(item => item.id !== itemId);

    setOrders(prevOrders => {
        const newOrders = { ...prevOrders };
        if (updatedOrderItems.length === 0) {
            // Agar mahsulot qolmasa, buyurtmani o'chiramiz
            delete newOrders[selectedId];
            // Tanlovni ham olib tashlaymiz, chunki u endi ko'rinmaydi
            setSelectedId(null);
        } else {
            newOrders[selectedId] = { ...prevOrders[selectedId], items: updatedOrderItems };
        }
        return newOrders;
    });
    console.log("Bekor qilindi (item):", itemId, "from order:", selectedId);
  };

  const handleCancelOrder = () => {
    if (!selectedId || !orders[selectedId]) return;
    console.log("To'liq buyurtma bekor qilindi:", selectedId);
    setOrders(prevOrders => {
        const newOrders = { ...prevOrders };
        delete newOrders[selectedId];
        return newOrders;
    });
    setSelectedId(null); // Tanlovni olib tashlash
  };

  const handleLatePrint = () => {
    if (!selectedId || !orders[selectedId]) return;
    alert(`Chek chiqarildi: ${selectedId}`);
    console.log("Kech chiqarish:", selectedId);
  };

  const handleExit = () => setIsExitModalOpen(true);
  const handleConfirmExit = () => { navigate("/"); setIsExitModalOpen(false); };
  const handleCloseExitModal = () => setIsExitModalOpen(false);
  const toggleViewMode = () => { setViewMode(prev => (prev === 'tables' ? 'saboy' : 'tables')); setSelectedId(null); };

  const currentOrder = selectedId && orders[selectedId] ? orders[selectedId] : null;

  // --- Tailwind klasslari (getButtonClass biroz soddalashadi, chunki faqat buyurtmasi borlar ko'rsatiladi) ---
  const baseButtonClass = "border-none py-5 px-3 rounded-lg text-base font-bold cursor-pointer transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2";
  const cancelItemButtonClass = "bg-red-500 hover:bg-red-600 text-white border-none py-1 px-2 rounded text-xs cursor-pointer transition-colors duration-200";
  const actionButtonClass = "py-2.5 px-5 border-none rounded-md text-white text-sm font-bold cursor-pointer transition-opacity duration-200 hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed";

  // getButtonClass endi faqat 'selected' holatini tekshirsa yetarli, chunki hammasida buyurtma bor
  const getButtonClass = (item) => {
    const isSelected = selectedId === item.id;
    let colorClasses = '';
    if (viewMode === 'tables') {
      colorClasses = isSelected
        ? 'bg-green-700 text-white ring-green-500' // Tanlangan
        : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'; // Tanlanmagan (buyurtmasi bor)
    } else { // Saboy view
      colorClasses = isSelected
        ? 'bg-blue-800 text-white ring-blue-500' // Tanlangan
        : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400'; // Tanlanmagan (buyurtmasi bor)
    }
    return `${baseButtonClass} ${colorClasses}`;
  };
  // --- /Tailwind klasslari ---

  return (
    <div className="flex flex-col h-screen bg-gray-100 border-2 border-gray-500 font-sans relative">
      <div className="flex-grow flex p-5 gap-5 overflow-hidden">
        {/* Chap taraf: Faqat aktiv buyurtmali Stollar yoki Saboy */}
        <div className={`flex-[3] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 content-start p-4 rounded-lg shadow-md overflow-y-auto ${viewMode === 'saboy' ? 'bg-blue-100 border-2 border-blue-300' : 'bg-white'}`}>
          {/* activeDisplayItems ustida map qilish */}
          {activeDisplayItems.length > 0 ? (
                activeDisplayItems.map(item => (
                <button key={item.id} className={getButtonClass(item)} onClick={() => handleSelect(item.id)}>
                    {item.name}
                </button>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500 pt-10">
                    {viewMode === 'tables' ? "Aktiv stollar yo'q" : "Aktiv saboy buyurtmalar yo'q"}
                </div>
            )
          }
        </div>

        {/* O'ng taraf: Buyurtma detallari */}
        <div className="flex-[2] bg-gray-200 rounded-lg p-4 flex flex-col shadow-md overflow-hidden">
          {currentOrder ? (
            <>
              <div className="flex-grow overflow-y-auto mb-2.5 pr-1">
                {currentOrder.items.map(item => (
                  <div key={item.id} className="flex items-center bg-gray-50 font-bold py-2 px-3 mb-1.5 border border-gray-300 rounded gap-2.5">
                    <button className={cancelItemButtonClass} onClick={() => handleCancelItem(item.id)}>Otkaz</button>
                    <span className="font-bold text-center w-6 flex-shrink-0">{item.quantity}</span>
                    <span className="flex-grow text-sm">{item.name}</span>
                    <span className="font-bold text-sm text-gray-800 text-right w-24 flex-shrink-0">{item.price.toLocaleString('uz-UZ')} s</span>
                    <span className="text-xs text-gray-500 text-right w-12 flex-shrink-0">{item.time.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 pt-2.5 mt-auto">
                <div className="flex justify-between mb-2.5 text-sm text-gray-800">
                  <span>Ofitsant: {currentOrder.waiter}</span>
                  <span className="text-xs text-gray-600">{currentOrder.time}</span>
                </div>
                <div className="flex gap-2.5">
                  <button className={`${actionButtonClass} bg-red-500 hover:bg-red-600`} onClick={handleCancelOrder} disabled={!currentOrder}>Otkaz</button>
                  <button className={`${actionButtonClass} bg-green-500 hover:bg-green-600`} onClick={handleLatePrint} disabled={!currentOrder}>Kech chiqarish</button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-600 text-lg">
              Aktiv stol yoki Saboy tanlang
            </div>
          )}
        </div>
      </div>

      {/* Pastki qism (o'zgarishsiz) */}
      <div className="flex justify-between items-center p-4 px-5 bg-gray-300 border-t border-gray-400">
        <button className={`${actionButtonClass} bg-red-500 hover:bg-red-600`} onClick={handleExit}>Chiqish</button>
        <button className={`${actionButtonClass} bg-stone-600 hover:bg-stone-700`} onClick={toggleViewMode}>
          {viewMode === 'tables' ? 'Saboy' : 'Stollar'}
        </button>
        <div className="text-base font-bold text-orange-500">
          Kassir: MirzoUlugbek
        </div>
      </div>

      {/* Chiqish Modali (o'zgarishsiz) */}
      {isExitModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseExitModal}>
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Chiqishni tasdiqlang</h3>
            <p className="text-gray-600 mb-6">Rostan ham chiqishni xohlaysizmi?</p>
            <div className="flex justify-end gap-4">
              <button className={`${actionButtonClass} bg-gray-300 hover:bg-gray-400 text-gray-800`} onClick={handleCloseExitModal}>Yo'q</button>
              <button className={`${actionButtonClass} bg-red-500 hover:bg-red-600`} onClick={handleConfirmExit}>Ha</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Casir;