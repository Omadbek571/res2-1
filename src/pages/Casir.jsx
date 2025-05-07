import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Namunaviy Ma'lumotlar (o'zgarishsiz) ---
const allTablesData = [
    { id: 't1', name: '1-Stol' }, { id: 't2', name: '2-Stol' }, { id: 't3', name: '3-Stol' },
    { id: 't4', name: '4-Stol' }, { id: 't5', name: '5-Stol' }, { id: 't6', name: '6-Stol' },
    { id: 't7', name: '7-Stol' },
    { id: 't8', name: '8-Stol' }, { id: 't9', name: '9-Stol' }, { id: 't10', name: '10-Stol' },
    { id: 't11', name: '11-Stol' }, { id: 't12', name: '12-Stol' }, { id: 't13', name: '13-Stol' },
    { id: 't14', name: '14-Stol' }, { id: 't15', name: '15-Stol' }, { id: 't16', name: '16-Stol' },
    { id: 't17', name: '17-Stol' }
];
const TABLES_TO_DISPLAY_COUNT = 10;
const allTables = allTablesData.slice(0, TABLES_TO_DISPLAY_COUNT);

const allSaboySlots = Array.from({ length: 9 }, (_, i) => ({
    id: `s${i + 1}`, name: `Saboy ${i + 1}`
}));

const initialOrders = {
    t1: { type: 'table', waiter: 'Rustamov Jasur', time: '16.08.2023 18:20', items: [ { id: 'item1_t1_1', name: 'Shorva', quantity: 1, price: 20000, time: '16.08.2023 18:20', originalId: 'm5' } ] },
    t2: { type: 'table', waiter: 'Aliyev Vali', time: '16.08.2023 19:05', items: [ { id: 'item6_t2_1', name: 'Lagmon', quantity: 2, price: 28000, time: '16.08.2023 19:05', originalId: 'm1' } ] },
};

const menuItems = [
  { id: 'm1', name: 'Lagmon juda uzun nom bilan test uchun juda ham uzun va yana davomi bor', price: 22000, category: 'Milliy' },
  { id: 'm2', name: 'Manti', price: 30000, category: 'Milliy' },
  { id: 'm3', name: 'Mastava', price: 25000, category: 'Milliy' },
  { id: 'm4', name: 'Osh', price: 35000, category: 'Milliy' },
  { id: 'm5', name: 'Shorva', price: 20000, category: 'Milliy' },
  { id: 'm6', name: 'Vaju', price: 15000, category: 'Milliy' },
  { id: 'm7', name: 'Xonim', price: 18000, category: 'Milliy' },
  { id: 'm8', name: 'Chuchvara', price: 20000, category: 'Milliy' },
  { id: 'm9', name: 'Kocha (somsa)', price: 7000, category: 'Fast' },
  { id: 'm10', name: 'Biftrogm', price: 40000, category: 'Yevropa' },
  { id: 'm11', name: 'Tushonka', price: 30000, category: 'Milliy' },
  { id: 'f1', name: 'Gamburger', price: 35000, category: 'Fast' },
  { id: 'f2', name: 'Donar', price: 43000, category: 'Fast' },
  { id: 'd1', name: 'Pepsi 0.5', price: 7000, category: 'Bar' },
  { id: 'd2', name: 'Non', price: 4000, category: 'Non' },
  { id: 'f_lavash_unique', name: 'Lavash', price: 25000, category: 'Fast' },
];
const categories = ['Barchasi', 'Milliy', 'Fast', 'Bar', 'Yevropa', 'Non'];
// --- /Namunaviy Ma'lumotlar ---

// --- CreateOrderView Komponenti ---
function CreateOrderView({ targetId, targetType, onPrintCheck, onCancel, waiterName, initialOrderItems = [] }) {
    const [currentOrderItems, setCurrentOrderItems] = useState(
        initialOrderItems.map(item => ({ ...item, originalId: item.originalId || item.id }))
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Barchasi');

    const targetName = targetType === 'saboy'
        ? (allSaboySlots.find(s => s.id === targetId)?.name || targetId)
        : (allTables.find(t => t.id === targetId)?.name || targetId);

    const addItemToOrder = (menuItem) => {
        setCurrentOrderItems(prevItems => {
            const existingItem = prevItems.find(item => item.originalId === menuItem.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.originalId === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                const newItemId = `orderItem_${menuItem.id}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
                return [...prevItems, { ...menuItem, id: newItemId, quantity: 1, originalId: menuItem.id }];
            }
        });
    };

    const updateItemQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            setCurrentOrderItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } else {
            setCurrentOrderItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const totalAmount = useMemo(() => {
        return currentOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [currentOrderItems]);

    const filteredMenuItems = useMemo(() => {
        return menuItems.filter(item =>
            (selectedCategory === 'Barchasi' || item.category === selectedCategory) &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, selectedCategory]);

    const handlePrintCheckLogic = () => {
        if (currentOrderItems.length > 0) {
            onPrintCheck(targetId, targetType, currentOrderItems, waiterName);
        } else {
            alert("Iltimos, avval mahsulot qo'shing.");
        }
    };
    
    const itemButtonClass = "p-2 border rounded-md text-left transition-colors w-56 h-20 flex flex-col items-start justify-between overflow-hidden";
    const categoryButtonClass = "px-4 py-2 border rounded-md text-sm transition-colors min-w-[90px] text-center"; 

    return (
        <div className="fixed inset-0 bg-gray-100 z-40 flex flex-col p-4 font-sans">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                    Olib Ketish Buyurtmasi: {targetName} 
                </h2>
                 <button
                    onClick={onCancel}
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                >
                    Ortga
                </button>
            </div>

            <div className="flex flex-grow gap-4 overflow-hidden"> {/* Asosiy konteyner uchun overflow-hidden qoladi */}
                <div className={`flex-[3] flex flex-col bg-white p-4 rounded-lg shadow-md`}>
                    <div className="mb-3"> {/* Qidiruv va kategoriyalar qismi */}
                        <input
                            type="text"
                            placeholder="Qidiruv..."
                            className="w-full p-2 border rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`${categoryButtonClass} ${selectedCategory === cat ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    {/* Mahsulotlar ro'yxati uchun konteyner */}
                    {/* **O'ZGARTIRILDI:** `h-44` olib tashlandi, `flex-grow` qo'shildi agar kerak bo'lsa vertikal bo'shliqni to'ldirish uchun */}
                    <div className="flex flex-wrap gap-3 overflow-y-auto pr-2 justify-start content-start flex-grow"> 
                        {filteredMenuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => addItemToOrder(item)}
                                className={`${itemButtonClass} ${
                                    currentOrderItems.find(i => i.originalId === item.id)
                                        ? 'border-green-500 border-2 bg-green-50'
                                        : 'border-gray-300 bg-white hover:bg-gray-100'
                                }`}
                                title={item.name} 
                            >
                                <span className="font-medium text-sm leading-snug block w-full h-[3.2em] overflow-hidden">
                                    {item.name} 
                                </span>
                                <span className="text-xs text-gray-600 mt-auto block">
                                    {(item.price).toLocaleString('uz-UZ')} so'm
                                </span>
                            </button>
                        ))}
                         {filteredMenuItems.length === 0 && (
                            <div className="w-full text-center text-gray-500 pt-10">
                                Mahsulotlar topilmadi
                            </div>
                        )}
                    </div>
                </div>

                {/* O'ng panel (Tanlanganlar) - bu panel o'zining skrolliga ega bo'lishi mumkin */}
                <div className="flex-[2] bg-gray-200 p-4 rounded-lg shadow-md flex flex-col">
                    <h3 className="text-lg font-semibold mb-3 border-b pb-2 text-gray-700">Tanlanganlar:</h3>
                    {currentOrderItems.length === 0 ? (
                        <div className="flex-grow flex items-center justify-center text-gray-500">
                            Hali mahsulot tanlanmadi
                        </div>
                    ) : (
                        <div className="flex-grow overflow-y-auto mb-3 pr-1"> {/* Bu yerda skroll qoladi */}
                            {currentOrderItems.map(item => (
                                <div key={item.id} className="flex items-center bg-white p-2 mb-2 border border-gray-300 rounded-md gap-2">
                                    <div className="flex-grow">
                                        <div className="font-medium text-sm">{item.name}</div>
                                        <div className="text-xs text-gray-500">{item.price.toLocaleString('uz-UZ')} so'm</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button 
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)} 
                                            className="px-2 py-0.5 bg-red-400 hover:bg-red-500 text-white rounded text-xs"
                                        >-</button>
                                        <span className="font-bold w-6 text-center text-sm">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)} 
                                            className="px-2 py-0.5 bg-green-400 hover:bg-green-500 text-white rounded text-xs"
                                        >+</button>
                                    </div>
                                    <span className="font-semibold text-sm text-gray-800 w-20 text-right">{(item.price * item.quantity).toLocaleString('uz-UZ')} s</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="border-t border-gray-300 pt-3 mt-auto">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-md font-semibold text-gray-700">Jami:</span>
                            <span className="text-lg font-bold text-green-600">{totalAmount.toLocaleString('uz-UZ')} so'm</span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">{waiterName}</div>
                        <button
                            onClick={handlePrintCheckLogic}
                            disabled={currentOrderItems.length === 0}
                            className="w-full py-2.5 px-5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition-colors disabled:bg-gray-400"
                        >
                            Chek Chiqarish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


// --- SaboySelectionModal Komponenti (o'zgarishsiz) ---
function SaboySelectionModal({ isOpen, onClose, onSelectSaboy, saboySlots }) { 
    if (!isOpen) return null;
    const getSaboyButtonClass = () => "border-none py-5 px-3 rounded-lg text-base font-bold cursor-pointer transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 w-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400";
    return (
        <div className="fixed inset-0 mt-[-150px] flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-blue-100 p-6 rounded-lg shadow-xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800">Saboy Tanlang</h3>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-2xl">×</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {saboySlots.map(saboy => (
                        <button key={saboy.id} className={getSaboyButtonClass()} onClick={() => onSelectSaboy(saboy.id)} title={saboy.name}>
                            <div className="flex justify-center items-center w-full"><span>{saboy.name}</span></div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}


function Casir() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [orders, setOrders] = useState(initialOrders);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [creatingOrderForId, setCreatingOrderForId] = useState(null); 
  const [creatingOrderType, setCreatingOrderType] = useState(null);
  const [isSaboySelectionModalOpen, setIsSaboySelectionModalOpen] = useState(false);

  const KASSIR_NAME = "Rustamov Jasur";

  const activeDisplayItems = useMemo(() => {
    const activeTableItems = [];
    allTables.forEach(table => {
        if (orders[table.id] && orders[table.id].type === 'table' && orders[table.id].items && orders[table.id].items.length > 0) {
            activeTableItems.push({ ...table, itemType: 'table' });
        }
    });
    return activeTableItems.sort((a, b) => a.name.localeCompare(b.name));
  }, [orders]);

  const handleSelectItem = (tableId) => {
    if (orders[tableId]) {
        setSelectedId(tableId);
    } else {
        setSelectedId(tableId); 
        console.log("Bo'sh stol tanlandi:", tableId);
    }
    setCreatingOrderForId(null);
    setCreatingOrderType(null);
  };

  const handleSaboySelectionFromModal = (saboyId) => {
    setIsSaboySelectionModalOpen(false);
    setSelectedId(null); 
    setCreatingOrderForId(saboyId);
    setCreatingOrderType('saboy');
  };
  
  const handleProcessOrderFromCreateView = (targetId, targetType, itemsFromCreateView, waiterName) => {
    const orderDataForPrint = { 
        type: targetType,
        waiter: waiterName,
        time: new Date().toLocaleString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
        items: itemsFromCreateView 
    };
    
    if (targetType === 'table') {
        // Bu qism hozircha ishlamaydi, chunki stol uchun CreateOrderView chaqirilmayapti
        setOrders(prevOrders => ({
            ...prevOrders,
            [targetId]: orderDataForPrint
        }));
        setSelectedId(targetId);
    } 
    
    let printContent = `
        <h2>Chek (${orderDataForPrint.type === 'saboy' ? 'Olib Ketish' : 'Stol'}): ${targetId}</h2>
        <p>Kassir: ${orderDataForPrint.waiter}</p>
        <p>Vaqt: ${orderDataForPrint.time}</p>
        <hr/>
        <h3>Mahsulotlar:</h3>
        <ul>
    `;
    let total = 0;
    orderDataForPrint.items.forEach(item => {
        printContent += `<li>${item.name} x ${item.quantity} - ${(item.price * item.quantity).toLocaleString('uz-UZ')} so'm</li>`;
        total += item.price * item.quantity;
    });
    printContent += `</ul><hr/><p><strong>Jami: ${total.toLocaleString('uz-UZ')} so'm</strong></p>`;
    
    console.log("Chek ma'lumotlari:", printContent);
    alert(`Chek ma'lumotlari konsolga chiqarildi: ${targetId}`);

    setCreatingOrderForId(null);
    setCreatingOrderType(null);
  };

  const handleCancelItem = (itemIdToDelete) => {
    if (!selectedId || !orders[selectedId] || orders[selectedId].type !== 'table') return;
    const updatedOrderItems = orders[selectedId].items.filter(item => item.id !== itemIdToDelete);
    setOrders(prevOrders => {
        const newOrders = { ...prevOrders };
        if (updatedOrderItems.length === 0) {
            delete newOrders[selectedId];
            setSelectedId(null);
        } else {
            newOrders[selectedId] = { ...prevOrders[selectedId], items: updatedOrderItems };
        }
        return newOrders;
    });
  };

  const handleCancelOrder = () => {
    if (!selectedId || !orders[selectedId] || orders[selectedId].type !== 'table') return;
    if (window.confirm("Haqiqatan ham bu buyurtmani bekor qilmoqchimisiz?")) {
        setOrders(prevOrders => {
            const newOrders = { ...prevOrders };
            delete newOrders[selectedId];
            return newOrders;
        });
        setSelectedId(null);
    }
  };

  const handleLatePrint = () => {
    if (!selectedId || !orders[selectedId] || orders[selectedId].type !== 'table') return;
    const orderToPrint = orders[selectedId];
    console.log("Chek ma'lumotlari (Kech chiqarish - Stol):", orderToPrint);
    alert(`Chek ma'lumotlari konsolga chiqarildi (Kech chiqarish - Stol): ${selectedId}`);
  };

  const handleExit = () => setIsExitModalOpen(true);
  const handleConfirmExit = () => { navigate("/"); setIsExitModalOpen(false); };
  const handleCloseExitModal = () => setIsExitModalOpen(false);
  
  const openSaboyModal = () => {
    setIsSaboySelectionModalOpen(true);
    setCreatingOrderForId(null);
    setSelectedId(null);
  }

  const currentOrder = selectedId && orders[selectedId] ? orders[selectedId] : null;

  const baseButtonClass = "border-none py-5 px-3 rounded-lg text-base font-bold cursor-pointer transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2";
  const cancelItemButtonClass = "bg-red-500 hover:bg-red-600 text-white border-none py-1 px-2 rounded text-xs cursor-pointer transition-colors duration-200";
  const actionButtonClass = "py-2.5 px-5 border-none rounded-md text-white text-sm font-bold cursor-pointer transition-opacity duration-200 hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed";

  const getItemButtonClass = (item) => {
    const isSelected = selectedId === item.id;
    let colorClasses = '';
    if (orders[item.id] && orders[item.id].items && orders[item.id].items.length > 0) { 
      colorClasses = isSelected
        ? 'bg-green-700 text-white ring-green-500' 
        : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'; 
    } else {
      colorClasses = 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-300';
    }
    return `${baseButtonClass} ${colorClasses}`;
  };
  
  if (creatingOrderForId && creatingOrderType === 'saboy') {
    // Saboy uchun har doim bo'sh itemlar bilan boshlaymiz
    return <CreateOrderView
                targetId={creatingOrderForId}
                targetType={creatingOrderType}
                onPrintCheck={handleProcessOrderFromCreateView}
                onCancel={() => { setCreatingOrderForId(null); setCreatingOrderType(null); }}
                waiterName={`Kassir: ${KASSIR_NAME}`}
                initialOrderItems={[]} // Saboy uchun har doim bo'sh
           />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 border-2 border-gray-500 font-sans relative">
      <div className="flex-grow flex p-5 gap-5 overflow-hidden">
        <div className={`flex-[3] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 content-start p-4 rounded-lg shadow-md overflow-y-auto bg-white border-2 border-gray-300`}>
          {allTables.map(table => (
             <button 
                key={table.id} 
                className={getItemButtonClass(table)}
                onClick={() => handleSelectItem(table.id)}
             >
                {table.name}
            </button>
          ))}
          {allTables.length === 0 && (
             <div className="col-span-full text-center text-gray-500 pt-10">
                Stollar mavjud emas
             </div>
          )}
        </div>

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
                    <span className="text-xs text-gray-500 text-right w-12 flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 pt-2.5 mt-auto">
                <div className="flex justify-between mb-2.5 text-sm text-gray-800">
                  <span>{currentOrder.waiter.includes("Kassir:") ? currentOrder.waiter : `Ofitsant: ${currentOrder.waiter}`} ({
                    (allTablesData.find(t => t.id === selectedId)?.name || selectedId)
                  })</span>
                  <span className="text-xs text-gray-600">{currentOrder.time}</span>
                </div>
                <div className="flex gap-2.5">
                  <button className={`${actionButtonClass} bg-red-500 hover:bg-red-600`} onClick={handleCancelOrder} disabled={!currentOrder}>Otkaz</button>
                  <button className={`${actionButtonClass} bg-green-500 hover:bg-green-600`} onClick={handleLatePrint} disabled={!currentOrder}>Kech chiqarish</button>
                </div>
              </div>
            </>
          ) : selectedId && !orders[selectedId] ? (
                <div className="flex justify-center items-center h-full text-gray-500 text-lg">
                   {allTablesData.find(t => t.id === selectedId)?.name || selectedId} bo'sh
                </div>
            ) : (
                <div className="flex justify-center items-center h-full text-gray-500 text-lg">
                  Stolni tanlang yoki Saboy orqali yangi buyurtma yarating
                </div>
            )
          }
        </div>
      </div>

      <div className="flex justify-between items-center p-4 px-5 bg-gray-300 border-t border-gray-400">
        <button className={`${actionButtonClass} bg-red-500 hover:bg-red-600`} onClick={handleExit}>Chiqish</button>
        <button className={`${actionButtonClass} bg-stone-600 hover:bg-stone-700`} onClick={openSaboyModal}>
          Saboy
        </button>
        <div className="text-base font-bold text-orange-500">
          Kassir: {KASSIR_NAME}
        </div>
      </div>

      <SaboySelectionModal 
        isOpen={isSaboySelectionModalOpen}
        onClose={() => setIsSaboySelectionModalOpen(false)}
        onSelectSaboy={handleSaboySelectionFromModal}
        saboySlots={allSaboySlots}
      />

      {isExitModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]" onClick={handleCloseExitModal}>
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