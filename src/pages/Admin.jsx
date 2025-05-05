// 📦 Imports
import React, { useState } from 'react';
import {
  FiUsers, FiShield, FiBox, FiGrid, FiSquare, FiSettings, FiLogOut, FiUser,
  FiPlus, FiRefreshCw, FiX, FiCalendar, FiEdit, FiTrash // Kerakli ikonlar
} from 'react-icons/fi';

// 📊 Namuna Ma'lumotlari (Backend o'rniga)
const initialEmployees = [
  { id: 1, ism: 'alisher bohodirov', username: 'staff01', rol: 'Offisiant', holat: 'Faol' },
  { id: 2, ism: 'omadbek solijonov', username: 'staff02', rol: 'Oshpaz', holat: 'Faol' },
  { id: 3, ism: 'ozodbek solijonov', username: 'staff03', rol: 'Kassir', holat: 'Faol' },
  { id: 4, ism: 'ozodbek aliyev', username: 'staff04', rol: 'Yetkazib beruvchi', holat: 'Faol' },
  { id: 5, ism: 'Odam Odam', username: 'Odam', rol: 'Offisiant', holat: 'Faol' },
];

// Mahsulotlar ro'yxati: faqat Nomi, Narxi, Miqdori
const initialProducts = [
  { id: 'GA', nomi: 'Gamburger', narx: '19000.00 so\'m', miqdori: 50 },
  { id: 'TA', nomi: 'Taco', narx: '20000.00 so\'m', miqdori: 30 },
  { id: 'OS', nomi: 'Osh', narx: '25000.00 so\'m', miqdori: 100 },
  { id: 'CO', nomi: 'cocacola 1L', narx: '12000.00 so\'m', miqdori: 200 },
  { id: 'SH', nomi: 'Shokoladli Tort', narx: '30000.00 so\'m', miqdori: 15 },
  { id: 'IT', nomi: 'Italyan Salatlar', narx: '25000.00 so\'m', miqdori: 25 },
];

const initialCategories = [
    { id: 1, nomi: 'fastfood' },
    { id: 2, nomi: 'Milliy Taomlar' },
    { id: 3, nomi: 'Ichimliklar' },
    { id: 4, nomi: 'Shirinliklar' },
    { id: 5, nomi: 'Salatlar' },
    { id: 6, nomi: 'it ovqatdan' },
];

const initialTables = [
    { id: 1, nomi: '1', zona: 'Hall', holati: 'Bo\'sh' },
    { id: 10, nomi: '10', zona: 'Yerto\'la', holati: 'Bo\'sh' },
    { id: 2, nomi: '2', zona: 'Hall', holati: 'Band' },
    { id: 3, nomi: '3', zona: 'Hall', holati: 'Bo\'sh' },
    { id: 4, nomi: '4', zona: 'Hall', holati: 'Band' },
    { id: 11, nomi: '11', zona: 'podval', holati: 'Bo\'sh' },
    { id: 5, nomi: '5', zona: '2-qavat', holati: 'Band' },
    { id: 6, nomi: '6', zona: '2-qavat', holati: 'Bo\'sh' },
    { id: 7, nomi: '7', zona: '2-qavat', holati: 'Band' },
    { id: 8, nomi: '8', zona: '2-qavat', holati: 'Band' },
];


// 🧩 Asosiy Admin Komponenti
function Admin() {
  // ⚙️ State Variables
  const [activePage, setActivePage] = useState('employees'); // Boshlang'ich sahifa
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);

  // --- Modal uchun Form State'lar ---
  const [newEmployee, setNewEmployee] = useState({ username: '', firstName: '', lastName: '', role: '', pin: '', isActive: true });
  // Mahsulot formasi uchun state (soddalashtirilgan)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', isActive: true }); // Miqdor uchun boshlang'ich string
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [newTable, setNewTable] = useState({ name: '', zone: '', isActive: true });

  // 🛠️ Funksiyalar (Modal ochish/yopish, Ma'lumot qo'shish, Tahrirlash, O'chirish)

  // Qo'shish funksiyalari
  const handleAddEmployee = (e) => {
    e.preventDefault();
    console.log('Yangi xodim qo\'shildi:', newEmployee);
    // Bu yerda API ga jo'natish logikasi bo'ladi
    setNewEmployee({ username: '', firstName: '', lastName: '', role: '', pin: '', isActive: true });
    setIsAddEmployeeModalOpen(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log('Yangi mahsulot qo\'shildi:', { ...newProduct, quantity: parseInt(newProduct.quantity) || 0 }); // Miqdorni songa o'tkazish
    // API logikasi...
    setNewProduct({ name: '', price: '', quantity: '', isActive: true });
    setIsAddProductModalOpen(false);
  };

   const handleAddCategory = (e) => {
    e.preventDefault();
    console.log('Yangi kategoriya qo\'shildi:', newCategory);
    // API logikasi...
    setNewCategory({ name: '' });
    setIsAddCategoryModalOpen(false);
  };

   const handleAddTable = (e) => {
    e.preventDefault();
    console.log('Yangi stol qo\'shildi:', newTable);
    // API logikasi...
    setNewTable({ name: '', zone: '', isActive: true });
    setIsAddTableModalOpen(false);
  };

  const handleSettingsSave = (e) => {
    e.preventDefault();
    console.log("Sozlamalar saqlandi!");
    // API logikasi...
  }

  // Tahrirlash va O'chirish uchun Placeholder funksiyalar
  const handleEdit = (type, id) => {
      console.log(`Tahrirlash: ${type} - ID: ${id}`);
      // Bu yerda modalni ochish yoki inline tahrirlash logikasi bo'ladi
      // Misol: if (type === 'employee') { /* set editing employee state and open modal */ }
  };

  const handleDelete = (type, id) => {
      // O'chirishdan oldin tasdiqlash
      if (window.confirm(`${type} (ID: ${id}) ni o'chirishga ishonchingiz komilmi?`)) {
          console.log(`O'chirish: ${type} - ID: ${id}`);
          // Bu yerda API ga o'chirish so'rovi yuboriladi
          // Misol: fetch(`/api/${type}/${id}`, { method: 'DELETE' }).then(...)
      }
  };

  // --- Boshqa yordamchi funksiyalar ---
  const handleInputChange = (setter) => (e) => {
      const { name, value, type, checked } = e.target;
      setter(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleToggleChange = (setter, fieldName) => () => {
    setter(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  // Rasm yuklash endi Product modalida kerak emas
  // const handleFileChange = (setter) => (e) => {
  //    setter(prev => ({ ...prev, image: e.target.files[0] }));
  // };


  // 🎨 Render qilinadigan UI qismi
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* ███████████████████ Sidebar Section (O'zgartirilgan) ███████████████████ */}
      <div className="flex flex-col w-64 bg-gray-800 text-white h-screen">
        {/* Logo/Nomi */}
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <span className="text-xl font-semibold">SmartResto Admin</span>
        </div>

        {/* Navigatsiya (Keraksiz bo'limlar olib tashlandi) */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Asosiy</h3>
          {[
            { id: 'employees', text: 'Xodimlar', icon: FiUsers },
            { id: 'roles', text: 'Rollar', icon: FiShield },
            { id: 'products', text: 'Mahsulotlar', icon: FiBox },
            { id: 'categories', text: 'Kategoriyalar', icon: FiGrid },
            { id: 'tables', text: 'Stollar', icon: FiSquare },
          ].map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => { e.preventDefault(); setActivePage(item.id); }}
              className={`flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                activePage === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.text}
            </a>
          ))}

          <h3 className="px-4 pt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tuzum</h3>
          {[
            { id: 'settings', text: 'Sozlamalar', icon: FiSettings },
            { id: 'logout', text: 'Chiqish', icon: FiLogOut },
          ].map((item) => (
            <a
                key={item.id}
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    if (item.id === 'logout') { console.log("Chiqish!"); /* Logout logikasi */ }
                    else { setActivePage(item.id); }
                 }}
                className={`flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                  activePage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.text}
            </a>
          ))}
        </nav>

        {/* Foydalanuvchi Info */}
        <div className="flex items-center p-4 border-t border-gray-700 mt-auto">
          <div className="flex-shrink-0">
            <FiUser className="h-8 w-8 rounded-full text-gray-400 bg-gray-600 p-1" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs font-medium text-gray-400">Administrator</p>
          </div>
        </div>
      </div>

      {/* ███████████████████ Content Section ███████████████████ */}
      <div className="flex-1 flex flex-col overflow-hidden"> {/* Modal uchun relative olib tashlandi */}
        {/* Yuqori Panel */}
        <header className="flex justify-end items-center p-4 bg-white border-b h-16">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FiCalendar className="h-5 w-5" />
            <span>05-may, 2025</span>
            <span>AD</span>
          </div>
        </header>

        {/* Asosiy Kontent Maydoni */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* -------------------- Employees Content -------------------- */}
          {activePage === 'employees' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">Xodimlar ro'yxati</h1>
                  <p className="text-sm text-gray-500">Barcha xodimlar va ularning rollari.</p>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash
                  </button>
                  <button
                    onClick={() => setIsAddEmployeeModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    <FiPlus className="mr-2 h-4 w-4" /> Yangi xodim qo'shish
                  </button>
                </div>
              </div>
              {/* Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Ism</th>
                        <th scope="col" className="px-6 py-3">Username</th>
                        <th scope="col" className="px-6 py-3">Rol</th>
                        <th scope="col" className="px-6 py-3">Holat</th>
                        <th scope="col" className="px-6 py-3 text-center">Amallar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {initialEmployees.map((emp) => (
                        <tr key={emp.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900 capitalize">{emp.ism}</td>
                          <td className="px-6 py-4">{emp.username}</td>
                          <td className="px-6 py-4">{emp.rol}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${emp.holat === 'Faol' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {emp.holat}
                            </span>
                          </td>
                          {/* Actions */}
                          <td className="px-6 py-4 text-center">
                             <div className="flex justify-center items-center space-x-3">
                                <button onClick={() => handleEdit('Xodim', emp.id)} className="text-blue-500 hover:text-blue-700 cursor-pointer" title="Tahrirlash">
                                    <FiEdit size={16} />
                                </button>
                                <button onClick={() => handleDelete('Xodim', emp.id)} className="text-red-500 hover:text-red-700 cursor-pointer" title="O'chirish">
                                    <FiTrash size={16} />
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- Roles Content (O'zgartirilgan) -------------------- */}
          {activePage === 'roles' && (
             <div className="space-y-6">
               {/* Header */}
               <div className="flex justify-between items-center">
                 <div>
                   <h1 className="text-2xl font-semibold text-gray-800">Rollar ro'yxati</h1>
                   <p className="text-sm text-gray-500">Tizimdagi mavjud rollar.</p>
                 </div>
                 <div className="flex space-x-3">
                   <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                     <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash
                   </button>
                   {/* "Yangi rol qo'shish" tugmasi olib tashlandi */}
                 </div>
               </div>
               {/* Content: Static Message Instead of Table */}
               <div className="bg-white rounded-lg shadow overflow-hidden p-10 text-center text-gray-500">
                  No roles available
               </div>
             </div>
          )}

          {/* -------------------- Products Content (O'zgartirilgan) -------------------- */}
          {activePage === 'products' && (
            <div className="space-y-6">
               {/* Header */}
               <div className="flex justify-between items-center">
                 <div>
                   <h1 className="text-2xl font-semibold text-gray-800">Mahsulotlar ro'yxati</h1>
                   <p className="text-sm text-gray-500">Barcha mavjud mahsulotlar va ularning narxlari.</p>
                 </div>
                 <div className="flex space-x-3">
                   <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                     <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash
                   </button>
                   <button
                     onClick={() => setIsAddProductModalOpen(true)}
                     className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                   >
                     <FiPlus className="mr-2 h-4 w-4" /> Yangi mahsulot qo'shish
                   </button>
                 </div>
               </div>
               {/* Table */}
               <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-600">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr>
                                  <th scope="col" className="px-6 py-3">Mahsulot nomi</th>
                                  <th scope="col" className="px-6 py-3">Narx</th>
                                  <th scope="col" className="px-6 py-3">Miqdori</th> {/* Miqdori ustuni */}
                                  <th scope="col" className="px-6 py-3 text-center">Amallar</th>
                              </tr>
                          </thead>
                          <tbody>
                              {initialProducts.map((prod) => (
                                  <tr key={prod.id} className="bg-white border-b hover:bg-gray-50">
                                      <td className="px-6 py-4 font-medium text-gray-900">{prod.nomi}</td>
                                      <td className="px-6 py-4">{prod.narx}</td>
                                      <td className="px-6 py-4">{prod.miqdori}</td> {/* Miqdori ko'rsatiladi */}
                                      {/* Actions */}
                                      <td className="px-6 py-4 text-center">
                                          <div className="flex justify-center items-center space-x-3">
                                              <button onClick={() => handleEdit('Mahsulot', prod.id)} className="text-blue-500 hover:text-blue-700 cursor-pointer" title="Tahrirlash">
                                                  <FiEdit size={16} />
                                              </button>
                                              <button onClick={() => handleDelete('Mahsulot', prod.id)} className="text-red-500 hover:text-red-700 cursor-pointer" title="O'chirish">
                                                  <FiTrash size={16} />
                                              </button>
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
               </div>
            </div>
          )}

          {/* -------------------- Categories Content -------------------- */}
          {activePage === 'categories' && (
             <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Kategoriyalar ro'yxati</h1>
                    <p className="text-sm text-gray-500">Mahsulotlar guruhlanadigan barcha kategoriyalar.</p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash
                    </button>
                    <button
                      onClick={() => setIsAddCategoryModalOpen(true)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      <FiPlus className="mr-2 h-4 w-4" /> Yangi kategoriya qo'shish
                    </button>
                  </div>
                </div>
                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 w-16">ID</th>
                          <th scope="col" className="px-6 py-3">Kategoriya nomi</th>
                          <th scope="col" className="px-6 py-3 text-center">Amallar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {initialCategories.map((cat) => (
                          <tr key={cat.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{cat.id}</td>
                            <td className="px-6 py-4 capitalize">{cat.nomi}</td>
                            {/* Actions */}
                            <td className="px-6 py-4 text-center">
                               <div className="flex justify-center items-center space-x-3">
                                   <button onClick={() => handleEdit('Kategoriya', cat.id)} className="text-blue-500 hover:text-blue-700 cursor-pointer" title="Tahrirlash">
                                       <FiEdit size={16} />
                                   </button>
                                   <button onClick={() => handleDelete('Kategoriya', cat.id)} className="text-red-500 hover:text-red-700 cursor-pointer" title="O'chirish">
                                       <FiTrash size={16} />
                                   </button>
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          )}

          {/* -------------------- Tables Content -------------------- */}
          {activePage === 'tables' && (
             <div className="space-y-6">
               {/* Header */}
               <div className="flex justify-between items-center">
                 <div>
                   <h1 className="text-2xl font-semibold text-gray-800">Stollar ro'yxati</h1>
                   <p className="text-sm text-gray-500">Restorandagi barcha stollar va ularning holati.</p>
                 </div>
                 <div className="flex space-x-3">
                   <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                     <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash
                   </button>
                   <button
                     onClick={() => setIsAddTableModalOpen(true)}
                     className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                   >
                     <FiPlus className="mr-2 h-4 w-4" /> Yangi stol qo'shish
                   </button>
                 </div>
               </div>
               {/* Table */}
               <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">ID</th>
                          <th scope="col" className="px-6 py-3">Nomi/Raqami</th>
                          <th scope="col" className="px-6 py-3">Zona</th>
                          <th scope="col" className="px-6 py-3">Holati</th>
                          <th scope="col" className="px-6 py-3 text-center">Amallar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {initialTables.map((table) => (
                          <tr key={table.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{table.id}</td>
                            <td className="px-6 py-4">{table.nomi}</td>
                            <td className="px-6 py-4">{table.zona}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 text-xs rounded-full ${table.holati === 'Bo\'sh' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {table.holati}
                                </span>
                            </td>
                             {/* Actions */}
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center items-center space-x-3">
                                    <button onClick={() => handleEdit('Stol', table.id)} className="text-blue-500 hover:text-blue-700 cursor-pointer" title="Tahrirlash">
                                        <FiEdit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete('Stol', table.id)} className="text-red-500 hover:text-red-700 cursor-pointer" title="O'chirish">
                                        <FiTrash size={16} />
                                    </button>
                                </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
             </div>
          )}

          {/* -------------------- Settings Content -------------------- */}
          {activePage === 'settings' && (
             <div className="space-y-6">
                 <h1 className="text-2xl font-semibold text-gray-800">Restoran sozlamalari</h1>
                 <p className="text-sm text-gray-500">Restoran ma'lumotlarini bu yerda o'zgartirishingiz mumkin.</p>
                 <form onSubmit={handleSettingsSave} className="bg-white p-6 rounded-lg shadow space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Restoran nomi*" name="restaurantName" defaultValue="Mening Restoranim" required />
                        <InputField label="Tavsif" name="restaurantDescription" defaultValue="Qisqacha tavsif" />
                    </div>
                    <InputField label="Manzil" name="address" defaultValue="Manzil" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <InputField label="Telefon raqami" name="phone" type="tel" defaultValue="+998995144940" />
                         <InputField label="Email" name="email" type="email" defaultValue="info@example.com" />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputField label="Valyuta belgisi" name="currency" defaultValue="so'm" />
                        <InputField label="Soliq stavkasi (%)" name="taxRate" type="number" step="0.01" defaultValue="0.00" />
                        <InputField label="Xizmat haqi (%)" name="serviceFee" type="number" step="0.01" defaultValue="10.00" />
                     </div>
                     <div className="flex justify-end pt-4">
                         <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                           Saqlash
                         </button>
                     </div>
                 </form>
             </div>
          )}

        </main>

         {/* ███████████████████ Modals Section (Fonsiz) ███████████████████ */}

          {/* --- Add Employee Modal --- */}
          {isAddEmployeeModalOpen && (
            <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200">
                <button onClick={() => setIsAddEmployeeModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"> <FiX size={20} /> </button>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">Yangi xodim qo'shish</h2>
                  <p className="text-sm text-gray-500 mb-6">Xodim ma'lumotlarini kiriting.</p>
                  <form onSubmit={handleAddEmployee} className="space-y-4">
                     <InputField label="Username*" name="username" value={newEmployee.username} onChange={handleInputChange(setNewEmployee)} required />
                     <InputField label="Ism*" name="firstName" value={newEmployee.firstName} onChange={handleInputChange(setNewEmployee)} required />
                     <InputField label="Familiya*" name="lastName" value={newEmployee.lastName} onChange={handleInputChange(setNewEmployee)} required />
                     <SelectField label="Rol*" name="role" value={newEmployee.role} onChange={handleInputChange(setNewEmployee)} options={['Offisiant', 'Oshpaz', 'Kassir', 'Yetkazib beruvchi', 'Administrator']} placeholder="Rolni tanlang" required />
                     <InputField label="PIN-kod*" name="pin" type="password" maxLength={4} value={newEmployee.pin} onChange={handleInputChange(setNewEmployee)} placeholder="4 raqamli PIN" required />
                     <ToggleSwitch label="Faol" checked={newEmployee.isActive} onChange={handleToggleChange(setNewEmployee, 'isActive')} />
                     <div className="flex justify-end space-x-3 pt-4">
                       <button type="button" onClick={() => setIsAddEmployeeModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300">Bekor qilish</button>
                       <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Qo'shish</button>
                     </div>
                  </form>
                </div>
            </div>
          )}

          {/* --- Add Product Modal --- */}
          {isAddProductModalOpen && (
            <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200">
                <button onClick={() => setIsAddProductModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"> <FiX size={20} /> </button>
                <div className="p-6">
                   <h2 className="text-xl font-semibold mb-2">Yangi mahsulot qo'shish</h2>
                   <p className="text-sm text-gray-500 mb-6">Mahsulot ma'lumotlarini kiriting.</p>
                   <form onSubmit={handleAddProduct} className="space-y-4">
                      <InputField label="Nomi*" name="name" value={newProduct.name} onChange={handleInputChange(setNewProduct)} placeholder="Masalan: Lavash" required />
                      <InputField label="Narx* (so'mda)" name="price" type="text" value={newProduct.price} onChange={handleInputChange(setNewProduct)} placeholder="25000.00" required />
                      <InputField label="Miqdori*" name="quantity" type="number" value={newProduct.quantity} onChange={handleInputChange(setNewProduct)} placeholder="10" required />
                      <ToggleSwitch label="Faol" checked={newProduct.isActive} onChange={handleToggleChange(setNewProduct, 'isActive')} />
                      <div className="flex justify-end space-x-3 pt-4">
                         <button type="button" onClick={() => setIsAddProductModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300">Bekor qilish</button>
                         <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Qo'shish</button>
                      </div>
                   </form>
                </div>
            </div>
          )}

           {/* --- Add Category Modal --- */}
           {isAddCategoryModalOpen && (
             <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200">
                  <button onClick={() => setIsAddCategoryModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"> <FiX size={20} /> </button>
                  <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">Yangi kategoriya qo'shish</h2>
                      <p className="text-sm text-gray-500 mb-6">Yangi mahsulot kategoriyasi nomini kiriting.</p>
                      <form onSubmit={handleAddCategory} className="space-y-4">
                         <InputField label="Nomi*" name="name" value={newCategory.name} onChange={handleInputChange(setNewCategory)} placeholder="Masalan: Ichimliklar" required />
                         <div className="flex justify-end space-x-3 pt-4">
                           <button type="button" onClick={() => setIsAddCategoryModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300">Bekor qilish</button>
                           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Qo'shish</button>
                         </div>
                      </form>
                  </div>
             </div>
           )}

           {/* --- Add Table Modal --- */}
           {isAddTableModalOpen && (
             <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200">
                  <button onClick={() => setIsAddTableModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"> <FiX size={20} /> </button>
                  <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">Yangi stol qo'shish</h2>
                      <p className="text-sm text-gray-500 mb-6">Yangi stol nomini, zonasini va holatini kiriting.</p>
                      <form onSubmit={handleAddTable} className="space-y-4">
                         <InputField label="Nomi/Raqami*" name="name" value={newTable.name} onChange={handleInputChange(setNewTable)} placeholder="Masalan: Stol 5 yoki VIP" required />
                         <InputField label="Zona*" name="zone" value={newTable.zone} onChange={handleInputChange(setNewTable)} placeholder="Masalan: Asosiy zal, Yerto'la" required />
                         <ToggleSwitch label="Holati (Bo'sh)" checked={newTable.isActive} onChange={handleToggleChange(setNewTable, 'isActive')} />
                         <div className="flex justify-end space-x-3 pt-4">
                           <button type="button" onClick={() => setIsAddTableModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300">Bekor qilish</button>
                           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Qo'shish</button>
                         </div>
                      </form>
                  </div>
             </div>
           )}

      </div> {/* End of Content Section Flex Container */}
    </div> // End of main flex container
  ); // End of return
} // End of Admin component


// 🏷️ Yordamchi Modal Form Komponentlari
// Bu komponentlar kod takrorlanishini kamaytirish uchun ishlatiladi
const InputField = ({ label, name, type = 'text', value, onChange, placeholder, required, maxLength, step, defaultValue }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type} id={name} name={name} value={value} defaultValue={defaultValue} onChange={onChange}
            required={required} placeholder={placeholder} maxLength={maxLength} step={step}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
);

const SelectField = ({ label, name, value, onChange, options, placeholder, required }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
            id={name} name={name} value={value} onChange={onChange} required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
        >
            <option value="" disabled>{placeholder || 'Tanlang...'}</option> {/* Default placeholder */}
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

// TextareaField (agar kerak bo'lsa)
// const TextareaField = ({ label, name, value, onChange, placeholder }) => (
//    <div>
//        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//        <textarea
//            id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3}
//            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//        />
//    </div>
// );

const ToggleSwitch = ({ label, checked, onChange }) => (
   <div className="flex items-center justify-between pt-2">
     <span className="text-sm font-medium text-gray-700">{label}</span>
     <button
       type="button" onClick={onChange}
       className={`${checked ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
       aria-pressed={checked}
     >
       <span className="sr-only">Toggle {label}</span>
       <span className={`${checked ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
     </button>
   </div>
);

// FileUploadField Product modalidan olib tashlanganligi sababli kerak emas
// const FileUploadField = ({ label, name, onChange, fileName }) => ( ... );


// 🚀 Eksport
export default Admin;