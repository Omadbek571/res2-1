// pages/Orders.js (Demo buyurtmalar qo'shilgan)
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

// --- Demo Buyurtma Ma'lumotlari ---
const demoOrders = [
  {
    id: '1678880000111', // Unikal bo'lishi uchun har xil
    tableNumber: '5',
    waiterName: 'Ali Valiyev',
    items: [
      { id: 'osh', name: 'Osh', price: 30000, quantity: 2 },
      { id: 'col', name: 'Coca-Cola', price: 8000, quantity: 3 },
      { id: 'choy', name: 'Choy', price: 3000, quantity: 1 },
    ],
    totalAmount: (30000 * 2) + (8000 * 3) + 3000, // 60000 + 24000 + 3000 = 87000
    timestamp: '14.03.2023/10:15',
    status: 'yakunlangan' // Status har xil bo'lishi mumkin
  },
  {
    id: '1678881111222',
    tableNumber: '12 VIP',
    waiterName: 'Rustamov Jasur',
    items: [
      { id: 'lav', name: 'Lavash', price: 20000, quantity: 1 },
      { id: 'bur', name: 'Burger', price: 24000, quantity: 1 },
      { id: 'col', name: 'Coca-Cola', price: 8000, quantity: 2 },
    ],
    totalAmount: 20000 + 24000 + (8000 * 2), // 20000 + 24000 + 16000 = 60000
    timestamp: '14.03.2023/11:30',
    status: 'jarayonda'
  },
  {
    id: '1678882222333',
    tableNumber: '8',
    waiterName: 'Sardor Komilov',
    items: [
      { id: 'lag', name: 'Lagmon', price: 22000, quantity: 1 },
      { id: 'man', name: 'Manti', price: 5000, quantity: 4 }, // 4*5000 = 20000
      { id: 'sho', name: 'Shorva', price: 20000, quantity: 1 },
      { id: 'choy', name: 'Choy', price: 3000, quantity: 2 }, // 2*3000 = 6000
    ],
    totalAmount: 22000 + 20000 + 20000 + 6000, // 68000
    timestamp: '14.03.2023/12:05',
    status: 'yangi'
  },
    {
    id: '1678883333444',
    tableNumber: '3',
    waiterName: 'Ali Valiyev',
    items: [
      { id: 'mas', name: 'Mastava', price: 25000, quantity: 2 }, // 50000
      { id: 'choy', name: 'Choy', price: 3000, quantity: 1 }, // 3000
    ],
    totalAmount: 50000 + 3000, // 53000
    timestamp: '14.03.2023/13:40',
    status: 'yakunlangan'
  },
    {
    id: '1678884444555',
    tableNumber: '10',
    waiterName: 'Rustamov Jasur',
    items: [
      { id: 'koc', name: 'Kocha', price: 18000, quantity: 1 },
      { id: 'vaj', name: 'Vaju', price: 15000, quantity: 1 },
      { id: 'col', name: 'Coca-Cola', price: 8000, quantity: 1 },
    ],
    totalAmount: 18000 + 15000 + 8000, // 41000
    timestamp: '14.03.2023/14:00',
    status: 'jarayonda'
  },
];
// --- Demo Ma'lumotlar tugadi ---


// Buyurtma kartochkasini ko'rsatish uchun alohida komponent (ixtiyoriy, lekin kodni toza qiladi)
const OrderCard = ({ order }) => {
  const formatPrice = (price) => price ? price.toLocaleString('fr-FR').replace(/ /g, '.') : '0';

  // Statusga qarab rang berish (ixtiyoriy)
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'yakunlangan': return 'text-green-600 bg-green-100';
      case 'jarayonda': return 'text-yellow-600 bg-yellow-100';
      case 'yangi': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-orange-600 bg-orange-100'; // Afitsantdan kelgan status
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white p-4 md:p-5 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Buyurtma sarlavhasi */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 mb-3 border-gray-200 gap-2">
        <div className='flex items-center gap-3'>
          <span className={`font-bold text-lg ${getStatusColor(order.status).split(' ')[0]}`}>{order.tableNumber}-Stol</span>
           {/* ID ko'rsatish (qisqartirilgan) */}
           <span className="text-xs text-gray-400 mt-1">ID: {order.id.slice(-6)}</span>
        </div>
        <div className="text-sm text-gray-600 text-left sm:text-right space-y-0.5">
          <p>Ofitsant: <span className='font-medium text-gray-800'>{order.waiterName}</span></p>
          <p>Vaqti: <span className='font-medium text-gray-800'>{order.timestamp}</span></p>
          <p>Status: <span className={`font-semibold capitalize px-2 py-0.5 rounded text-xs ${getStatusColor(order.status)}`}>{order.status || 'Noma\'lum'}</span></p>
        </div>
      </div>

      {/* Buyurtma mahsulotlari */}
      <h3 className="text-base font-semibold mb-2 text-gray-700">Mahsulotlar:</h3>
      <div className="space-y-1.5 mb-3 max-h-40 overflow-y-auto pr-2"> {/* Scroll qo'shildi */}
        {order.items.map((item, index) => ( // Index kerak bo'lishi mumkin agar item.id takrorlansa
          <div key={`${item.id}-${index}`} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1 last:border-b-0">
            <div className="text-gray-800 flex-grow mr-2">
              <span className="font-semibold">{item.quantity}</span> x {item.name}
            </div>
            <div className="text-gray-700 font-medium whitespace-nowrap text-right">
               {formatPrice(item.price * item.quantity)}.som
               {item.quantity > 1 && (
                 <span className='text-xs text-gray-500 ml-1 block sm:inline'>({formatPrice(item.price)}/dona)</span>
               )}
            </div>
          </div>
        ))}
      </div>

      {/* Umumiy summa */}
      <div className="border-t pt-3 mt-3 border-gray-200 text-right">
        <span className="text-base font-bold text-gray-900">Umumiy: {formatPrice(order.totalAmount)}.som</span>
      </div>
    </div>
  );
};


function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const singleSubmittedOrder = location.state?.submittedOrder; // Afitsantdan kelgan buyurtma

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Sarlavha va Orqaga tugmasi */}
        <div className="flex items-center justify-between mb-6">
           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {singleSubmittedOrder ? 'Yangi Yuborilgan Buyurtma' : 'Barcha Buyurtmalar (Demo)'}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <FiArrowLeft className="mr-2" />
            Orqaga
          </button>
        </div>

        {/* Buyurtmalar ro'yxati yoki yagona buyurtma */}
        <div className="space-y-4">
            {singleSubmittedOrder ? (
                // Agar Afitsantdan buyurtma kelsa, faqat o'shani ko'rsatish
                <OrderCard order={singleSubmittedOrder} />
            ) : demoOrders.length > 0 ? (
                // Agar Afitsantdan buyurtma kelmasa, demo buyurtmalarni ko'rsatish
                demoOrders.map(demoOrder => (
                    <OrderCard key={demoOrder.id} order={demoOrder} />
                ))
            ) : (
                 // Agar demo buyurtmalar ham bo'lmasa (ehtiyot shart)
                 <div className="text-center text-gray-500 bg-white p-10 rounded-lg shadow">
                    Hozircha buyurtmalar mavjud emas.
                 </div>
            )}
        </div>

      </div>
    </div>
  );
}

export default Orders;