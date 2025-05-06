import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import qilindi
import {
  FiUsers, FiShield, FiBox, FiGrid, FiSquare, FiSettings, FiLogOut, FiUser,
  FiPlus, FiRefreshCw, FiX, FiCalendar, FiEdit, FiTrash, FiHome,
  FiDollarSign, FiShoppingCart, FiPercent, FiUpload
} from 'react-icons/fi';

const initialEmployees = [
    { id: 1, ism: 'alisher bohodirov', username: 'staff01', rol: 'Offisiant', holat: 'Faol' },
    { id: 2, ism: 'dilshod ismoilov', username: 'staff02', rol: 'Oshpaz', holat: 'Faol' },
    { id: 3, ism: 'sarvar rahmatov', username: 'sarvar01', rol: 'Administrator', holat: 'Faol' },
    { id: 4, ism: 'rustam qosimov', username: 'kuryer01', rol: 'Yetkazib beruvchi', holat: 'Faol emas' },
    { id: 5, ism: 'Odam Odam', username: 'Odam', rol: 'Offisiant', holat: 'Faol' }
];
const initialProducts = [
    { id: 'GA', nomi: 'Gamburger', narx: '19000.00 so\'m', miqdori: 50 },
    { id: 'CH', nomi: 'Chizburger', narx: '21000.00 so\'m', miqdori: 45 },
    { id: 'LV', nomi: 'Lavash', narx: '23000.00 so\'m', miqdori: 60 },
    { id: 'KF', nomi: 'Kartoshka Fri', narx: '10000.00 so\'m', miqdori: 100 },
    { id: 'CO', nomi: 'Coca-Cola', narx: '7000.00 so\'m', miqdori: 80 },
    { id: 'IT', nomi: 'Italyan Salatlar', narx: '25000.00 so\'m', miqdori: 25 }
];
const initialCategories = [
    { id: 1, nomi: 'fastfood' }, { id: 2, nomi: 'ichimliklar' }, { id: 3, nomi: 'salatlar' },
    { id: 4, nomi: 'shirinliklar' }, { id: 5, nomi: 'milliy' }, { id: 6, nomi: 'it ovqatdan' }
];
const initialTables = [
    { id: 1, nomi: '1', zona: 'Hall', holati: 'Bo\'sh' }, { id: 2, nomi: '2', zona: 'Hall', holati: 'Band' },
    { id: 3, nomi: '3', zona: 'Hall', holati: 'Bo\'sh' }, { id: 4, nomi: '4', zona: 'Yerto\'la', holati: 'Bo\'sh' },
    { id: 5, nomi: '5', zona: 'Yerto\'la', holati: 'Band' }, { id: 6, nomi: '6', zona: '2-qavat', holati: 'Bo\'sh' },
    { id: 7, nomi: '7', zona: '2-qavat', holati: 'Bo\'sh' }, { id: 8, nomi: '8', zona: '2-qavat', holati: 'Band' }
];
const initialRoles = [
    { id: 'admin', nomi: 'Administrator', xodimlarSoni: 1 }, { id: 'oshpaz', nomi: 'Oshpaz', xodimlarSoni: 1 },
    { id: 'ofisiant', nomi: 'Offisiant', xodimlarSoni: 2 }, { id: 'yetkaz', nomi: 'Yetkazib beruvchi', xodimlarSoni: 1 }
];
const recentOrders = [
    { id: '#74', mijoz: 'Noma\'lum', turi: 'Shu yerda', jami: '60 500 so\'m', holat: 'To\'langan', sana: '01/05/25, 06:47' },
    { id: '#73', mijoz: 'Stol 2', turi: 'Shu yerda', jami: '112 000 so\'m', holat: 'Mijozga berildi', sana: '30/04/25, 15:22' },
    { id: '#72', mijoz: 'Noma\'lum', turi: 'Shu yerda', jami: '46 200 so\'m', holat: 'Mijozga berildi', sana: '28/04/25, 21:03' }
];
const roleOptions = ['Offisiant', 'Oshpaz', 'Kassir', 'Yetkazib beruvchi', 'Administrator'];

function Admin() {
  const navigate = useNavigate(); // useNavigate ni ishga tushirish
  const [activePage, setActivePage] = useState('dashboard');
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [newEmployee, setNewEmployee] = useState({ username: '', firstName: '', lastName: '', role: '', pin: '', isActive: true });
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', isActive: true });
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [newTable, setNewTable] = useState({ name: '', zone: '', isActive: true });

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: 'Admin User', role: 'Administrator', image: null });
  const [profileFormData, setProfileFormData] = useState({ name: '', imageFile: null, imagePreview: null });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isProfileModalOpen) {
      setProfileFormData({
        name: userInfo.name,
        imageFile: null,
        imagePreview: userInfo.image
      });
    }
  }, [isProfileModalOpen, userInfo.name, userInfo.image]);

  useEffect(() => {
    let currentPreview = profileFormData.imagePreview;
    return () => {
      if (currentPreview && currentPreview.startsWith('blob:')) {
        URL.revokeObjectURL(currentPreview);
      }
    };
  }, [profileFormData.imagePreview]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    console.log('ADD Employee:', newEmployee);
    setNewEmployee({ username: '', firstName: '', lastName: '', role: '', pin: '', isActive: true });
    setIsAddEmployeeModalOpen(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = { ...newProduct, quantity: parseInt(newProduct.quantity) || 0 };
    console.log('ADD Product:', productToAdd);
    setNewProduct({ name: '', price: '', quantity: '', isActive: true });
    setIsAddProductModalOpen(false);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    console.log('ADD Category:', newCategory);
    setNewCategory({ name: '' });
    setIsAddCategoryModalOpen(false);
  };

  const handleAddTable = (e) => {
    e.preventDefault();
    const tableToAdd = {
        ...newTable,
        holati: newTable.isActive ? 'Bo\'sh' : 'Band'
    };
    delete tableToAdd.isActive;
    console.log('ADD Table:', tableToAdd);
    setNewTable({ name: '', zone: '', isActive: true });
    setIsAddTableModalOpen(false);
  };

  const handleSettingsSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const settingsData = Object.fromEntries(formData.entries());
    console.log("Settings Saved:", settingsData);
  };

  const handleEdit = (type, id) => {
    let itemData = null;
    switch (type) {
      case 'Xodim': itemData = initialEmployees.find(emp => emp.id === id); break;
      case 'Rol': itemData = initialRoles.find(role => role.id === id); break;
      case 'Mahsulot': itemData = initialProducts.find(prod => prod.id === id); break;
      case 'Kategoriya': itemData = initialCategories.find(cat => cat.id === id); break;
      case 'Stol': itemData = initialTables.find(table => table.id === id); break;
      default: console.error("Noma'lum tahrirlash turi:", type); return;
    }

    if (itemData) {
      console.log(`Editing ${type} with ID: ${id}`, itemData);
      setEditingItem({ type: type, data: { ...itemData } });
      setEditFormData({ ...itemData });
      setIsEditModalOpen(true);
    } else {
      console.error(`${type} (ID: ${id}) topilmadi.`);
    }
  };

  const handleDelete = (type, id) => {
    if (window.confirm(`${type} (ID: ${id}) ni haqiqatan ham o'chirmoqchimisiz?`)) {
      console.log(`O'chirish so'rovi: ${type} - ID: ${id}`);
    }
  };

  const handleInputChange = (setter) => (e) => {
    const { name, value, type, checked } = e.target;
    setter(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleToggleChange = (setter, fieldName) => () => {
    setter(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const processedValue = name === 'narx' ? value.replace(/\s*so'm/i, '') : value;
    setEditFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : processedValue
    }));
  };

  const handleEditToggleChange = (fieldName, activeValue, inactiveValue) => {
     setEditFormData(prev => ({
         ...prev,
         [fieldName]: prev[fieldName] === activeValue ? inactiveValue : activeValue
     }));
   };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    let dataToSave = { ...editFormData };

    if (editingItem.type === 'Mahsulot' && dataToSave.miqdori !== undefined) {
        dataToSave.miqdori = parseInt(dataToSave.miqdori) || 0;
    }
    if (editingItem.type === 'Mahsulot' && dataToSave.narx !== undefined && typeof dataToSave.narx === 'string') {
        dataToSave.narx = dataToSave.narx.replace(/\s*so'm/i, '').trim();
    }

    console.log(`Saqlash: ${editingItem.type} (ID: ${editingItem.data.id})`, dataToSave);
    setIsEditModalOpen(false);
    setEditingItem(null);
    setEditFormData({});
  };

  const handleOpenExitModal = (e) => {
    e.preventDefault();
    setIsExitModalOpen(true);
  };

  const handleCloseExitModal = () => {
    setIsExitModalOpen(false);
  };

  const handleConfirmExit = () => {
    console.log("Chiqish tasdiqlandi! / ga navigatsiya qilinmoqda...");
    handleCloseExitModal();
    navigate('/'); // Navigatsiyani amalga oshirish
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    if (profileFormData.imagePreview && profileFormData.imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(profileFormData.imagePreview);
    }
    setIsProfileModalOpen(false);
    setProfileFormData({ name: '', imageFile: null, imagePreview: null });
  };

  const handleProfileNameChange = (e) => {
    setProfileFormData(prev => ({ ...prev, name: e.target.value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        if (profileFormData.imagePreview && profileFormData.imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(profileFormData.imagePreview);
        }
        const newPreviewUrl = URL.createObjectURL(file);
        setProfileFormData(prev => ({
            ...prev,
            imageFile: file,
            imagePreview: newPreviewUrl
        }));
    } else {
         if (profileFormData.imagePreview && profileFormData.imagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(profileFormData.imagePreview);
         }
         setProfileFormData(prev => ({
             ...prev,
             imageFile: null,
             imagePreview: userInfo.image
         }));
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Profil saqlanmoqda:", {
        name: profileFormData.name,
        imageFileName: profileFormData.imageFile ? profileFormData.imageFile.name : 'O\'zgartirilmagan'
    });

    setUserInfo(prev => ({
        ...prev,
        name: profileFormData.name,
        image: profileFormData.imageFile ? profileFormData.imagePreview : prev.image
    }));

    setIsProfileModalOpen(false);
};

   const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="flex flex-col w-64 bg-gray-800 text-white h-screen">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <span className="text-xl font-semibold">SmartResto Admin</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Asosiy</h3>
          {[
            { id: 'dashboard', text: 'Boshqaruv paneli', icon: FiHome }, { id: 'employees', text: 'Xodimlar', icon: FiUsers },
            { id: 'roles', text: 'Rollar', icon: FiShield }, { id: 'products', text: 'Mahsulotlar', icon: FiBox },
            { id: 'categories', text: 'Kategoriyalar', icon: FiGrid }, { id: 'tables', text: 'Stollar', icon: FiSquare },
          ].map((item) => (
            <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); setActivePage(item.id); }}
              className={`flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${activePage === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" /> {item.text}
            </a>
          ))}
          <h3 className="px-4 pt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tuzum</h3>
          {[
            { id: 'settings', text: 'Sozlamalar', icon: FiSettings },
            { id: 'logout', text: 'Chiqish', icon: FiLogOut },
          ].map((item) => (
            <a key={item.id} href="#"
               onClick={(e) => {
                    if (item.id === 'logout') {
                        handleOpenExitModal(e);
                    } else {
                        e.preventDefault(); setActivePage(item.id);
                    }
               }}
              className={`flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ${activePage === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" /> {item.text}
            </a>
          ))}
        </nav>
        <button
            onClick={handleOpenProfileModal}
            className="flex items-center p-4 border-t border-gray-700 mt-auto w-full text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors duration-150"
            aria-label="Profilni tahrirlash"
        >
          <div className="flex-shrink-0">
            {userInfo.image ? (
                <img src={userInfo.image} alt="Profil" className="h-8 w-8 rounded-full object-cover" />
            ) : (
                <FiUser className="h-8 w-8 rounded-full text-gray-400 bg-gray-600 p-1" />
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{userInfo.name}</p>
            <p className="text-xs font-medium text-gray-400">{userInfo.role}</p>
          </div>
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-end items-center p-4 bg-white border-b h-16">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FiCalendar className="h-5 w-5" /> <span>{new Date().toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' })}</span> <span>AD</span>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">

          {activePage === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-gray-800">Boshqaruv paneli</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Bugungi savdo", value: "0 so'm", change: "+100.0% vs o'tgan haftaga nisbatan", icon: FiDollarSign, changeType: "increase" },
                  { title: "Bugungi Buyurtmalar", value: "+0", change: "+100.0% vs o'tgan haftaga nisbatan", icon: FiShoppingCart, changeType: "increase" },
                  { title: "O'rtacha chek", value: "0 so'm", change: "+100.0% vs o'tgan haftaga nisbatan", icon: FiPercent, changeType: "increase" },
                  { title: "Faol xodimlar", value: initialEmployees.filter(e => e.holat === 'Faol').length, change: "", icon: FiUsers, changeType: "increase" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-5 rounded-lg shadow flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 truncate">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                      {stat.change && <p className={`text-xs mt-1 ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</p>}
                    </div>
                    <div className={`p-2 rounded-full ${stat.changeType === 'increase' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} ml-2`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Savdo dinamikasi (Oxirgi 7 kun)</h2>
                    <div className="h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500">Chart Placeholder</div>
                </div>
                 <div className="bg-white p-5 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Eng ko'p sotilganlar</h2>
                        <select className="text-sm border rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                            <option>Haftalik</option> <option>Oylik</option>
                        </select>
                    </div>
                    <div className="text-center text-gray-500 py-10 text-sm">Bu davr uchun ma'lumot yo'q</div>
                </div>
               </div>
               <div className="bg-white p-5 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">So'nggi buyurtmalar</h2>
                        <button className="flex items-center px-3 py-1 border rounded text-sm hover:bg-gray-50">
                            <FiRefreshCw className="mr-1 h-4 w-4" /> Yangilash
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th><th scope="col" className="px-6 py-3">Mijoz</th>
                                    <th scope="col" className="px-6 py-3">Turi</th><th scope="col" className="px-6 py-3">Jami</th>
                                    <th scope="col" className="px-6 py-3">Holat</th><th scope="col" className="px-6 py-3">Sana</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                        <td className="px-6 py-4">{order.mijoz}</td><td className="px-6 py-4">{order.turi}</td>
                                        <td className="px-6 py-4">{order.jami}</td>
                                        <td className="px-6 py-4"> <span className={`px-2 py-1 text-xs rounded-full ${order.holat === 'To\'langan' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{order.holat}</span> </td>
                                        <td className="px-6 py-4">{order.sana}</td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && ( <tr className="bg-white border-b"><td colSpan="6" className="px-6 py-10 text-center text-gray-500">So'nggi buyurtmalar mavjud emas.</td></tr> )}
                            </tbody>
                        </table>
                    </div>
               </div>
            </div>
          )}

          {activePage === 'employees' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Xodimlar ro'yxati</h1>
                        <p className="text-sm text-gray-500">Barcha xodimlar va ularning rollari.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"> <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash </button>
                        <button onClick={() => setIsAddEmployeeModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"> <FiPlus className="mr-2 h-4 w-4" /> Yangi xodim qo'shish </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Ism</th><th scope="col" className="px-6 py-3">Username</th>
                                    <th scope="col" className="px-6 py-3">Rol</th><th scope="col" className="px-6 py-3">Holat</th>
                                    <th scope="col" className="px-6 py-3 text-center">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {initialEmployees.map((emp) => (
                                    <tr key={emp.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 capitalize">{emp.ism}</td>
                                        <td className="px-6 py-4">{emp.username}</td><td className="px-6 py-4">{emp.rol}</td>
                                        <td className="px-6 py-4"> <span className={`px-2 py-0.5 text-xs rounded-full ${emp.holat === 'Faol' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{emp.holat}</span> </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center space-x-3">
                                                <button onClick={() => handleEdit('Xodim', emp.id)} className="text-blue-500 hover:text-blue-700" title="Tahrirlash"><FiEdit size={16} /></button>
                                                <button onClick={() => handleDelete('Xodim', emp.id)} className="text-red-500 hover:text-red-700" title="O'chirish"><FiTrash size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {initialEmployees.length === 0 && ( <tr className="bg-white border-b"><td colSpan="5" className="px-6 py-10 text-center text-gray-500">Xodimlar mavjud emas.</td></tr> )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          )}

          {activePage === 'roles' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Rollar ro'yxati</h1>
                        <p className="text-sm text-gray-500">Tizimdagi barcha rollar va ularga biriktirilgan xodimlar soni.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"> <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash </button>
                        <button disabled className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"> <FiPlus className="mr-2 h-4 w-4" /> Yangi rol qo'shish </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Rol nomi</th>
                                    <th scope="col" className="px-6 py-3">Xodimlar soni</th>
                                    <th scope="col" className="px-6 py-3 text-center">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {initialRoles.map((rol) => (
                                    <tr key={rol.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{rol.nomi}</td>
                                        <td className="px-6 py-4">{rol.xodimlarSoni}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center space-x-3">
                                                <button onClick={() => handleEdit('Rol', rol.id)} className="text-blue-500 hover:text-blue-700" title="Tahrirlash"><FiEdit size={16} /></button>
                                                <button onClick={() => handleDelete('Rol', rol.id)} className="text-red-500 hover:text-red-700" title="O'chirish"><FiTrash size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {initialRoles.length === 0 && ( <tr className="bg-white border-b"><td colSpan="3" className="px-6 py-10 text-center text-gray-500">Rollar mavjud emas.</td></tr> )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          )}

          {activePage === 'products' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Mahsulotlar ro'yxati</h1>
                        <p className="text-sm text-gray-500">Barcha mavjud mahsulotlar va ularning narxlari.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"> <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash </button>
                        <button onClick={() => setIsAddProductModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"> <FiPlus className="mr-2 h-4 w-4" /> Yangi mahsulot qo'shish </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Mahsulot nomi</th><th scope="col" className="px-6 py-3">Narx</th>
                                    <th scope="col" className="px-6 py-3">Miqdori</th><th scope="col" className="px-6 py-3 text-center">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {initialProducts.map((prod) => (
                                    <tr key={prod.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{prod.nomi}</td>
                                        <td className="px-6 py-4">{prod.narx}</td><td className="px-6 py-4">{prod.miqdori}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center space-x-3">
                                                <button onClick={() => handleEdit('Mahsulot', prod.id)} className="text-blue-500 hover:text-blue-700" title="Tahrirlash"><FiEdit size={16} /></button>
                                                <button onClick={() => handleDelete('Mahsulot', prod.id)} className="text-red-500 hover:text-red-700" title="O'chirish"><FiTrash size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {initialProducts.length === 0 && ( <tr className="bg-white border-b"><td colSpan="4" className="px-6 py-10 text-center text-gray-500">Mahsulotlar mavjud emas.</td></tr> )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          )}

          {activePage === 'categories' && (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Kategoriyalar ro'yxati</h1>
                        <p className="text-sm text-gray-500">Mahsulotlar guruhlanadigan barcha kategoriyalar.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"> <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash </button>
                        <button onClick={() => setIsAddCategoryModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"> <FiPlus className="mr-2 h-4 w-4" /> Yangi kategoriya qo'shish </button>
                    </div>
                </div>
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
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center space-x-3">
                                                <button onClick={() => handleEdit('Kategoriya', cat.id)} className="text-blue-500 hover:text-blue-700" title="Tahrirlash"><FiEdit size={16} /></button>
                                                <button onClick={() => handleDelete('Kategoriya', cat.id)} className="text-red-500 hover:text-red-700" title="O'chirish"><FiTrash size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {initialCategories.length === 0 && ( <tr className="bg-white border-b"><td colSpan="3" className="px-6 py-10 text-center text-gray-500">Kategoriyalar mavjud emas.</td></tr> )}
                            </tbody>
                        </table>
                    </div>
                </div>
             </div>
          )}

          {activePage === 'tables' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Stollar ro'yxati</h1>
                        <p className="text-sm text-gray-500">Restorandagi barcha stollar va ularning holati.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="flex items-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"> <FiRefreshCw className="mr-2 h-4 w-4" /> Yangilash </button>
                        <button onClick={() => setIsAddTableModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"> <FiPlus className="mr-2 h-4 w-4" /> Yangi stol qo'shish </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th><th scope="col" className="px-6 py-3">Nomi/Raqami</th>
                                    <th scope="col" className="px-6 py-3">Zona</th><th scope="col" className="px-6 py-3">Holati</th>
                                    <th scope="col" className="px-6 py-3 text-center">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {initialTables.map((table) => (
                                    <tr key={table.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{table.id}</td>
                                        <td className="px-6 py-4">{table.nomi}</td><td className="px-6 py-4">{table.zona}</td>
                                        <td className="px-6 py-4"> <span className={`px-2 py-0.5 text-xs rounded-full ${table.holati === 'Bo\'sh' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{table.holati}</span> </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center space-x-3">
                                                <button onClick={() => handleEdit('Stol', table.id)} className="text-blue-500 hover:text-blue-700" title="Tahrirlash"><FiEdit size={16} /></button>
                                                <button onClick={() => handleDelete('Stol', table.id)} className="text-red-500 hover:text-red-700" title="O'chirish"><FiTrash size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {initialTables.length === 0 && ( <tr className="bg-white border-b"><td colSpan="5" className="px-6 py-10 text-center text-gray-500">Stollar mavjud emas.</td></tr> )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          )}

          {activePage === 'settings' && (
             <div className="space-y-6">
                 <h1 className="text-2xl font-semibold text-gray-800">Restoran sozlamalari</h1>
                 <p className="text-sm text-gray-500">Restoran ma'lumotlarini bu yerda o'zgartirishingiz mumkin.</p>
                 <form onSubmit={handleSettingsSave} className="bg-white p-6 rounded-lg shadow space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-1">Restoran nomi*</label>
                            <input type="text" id="restaurantName" name="restaurantName" defaultValue="Mening Restoranim" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="restaurantDescription" className="block text-sm font-medium text-gray-700 mb-1">Tavsif</label>
                            <input type="text" id="restaurantDescription" name="restaurantDescription" defaultValue="Qisqacha tavsif" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Manzil</label>
                        <input type="text" id="address" name="address" defaultValue="Manzil" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon raqami</label>
                            <input type="tel" id="phone" name="phone" defaultValue="+998995144940" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="email" name="email" defaultValue="info@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">Valyuta belgisi</label>
                            <input type="text" id="currency" name="currency" defaultValue="so'm" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">Soliq stavkasi (%)</label>
                            <input type="number" step="0.01" id="taxRate" name="taxRate" defaultValue="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="serviceFee" className="block text-sm font-medium text-gray-700 mb-1">Xizmat haqi (%)</label>
                            <input type="number" step="0.01" id="serviceFee" name="serviceFee" defaultValue="10.00" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Saqlash</button>
                    </div>
                 </form>
             </div>
          )}

        </main>
      </div>

      {isAddEmployeeModalOpen && (
          <div className="fixed inset-0 bg-gray-400 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200 relative">
                <button onClick={() => setIsAddEmployeeModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"> <FiX size={24} /> </button>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">Yangi xodim qo'shish</h2>
                  <p className="text-sm text-gray-500 mb-6">Xodim ma'lumotlarini kiriting.</p>
                  <form onSubmit={handleAddEmployee} className="space-y-4">
                     <div>
                        <label htmlFor="add_username" className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
                        <input type="text" id="add_username" name="username" value={newEmployee.username} onChange={handleInputChange(setNewEmployee)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                     </div>
                     <div>
                        <label htmlFor="add_firstName" className="block text-sm font-medium text-gray-700 mb-1">Ism*</label>
                        <input type="text" id="add_firstName" name="firstName" value={newEmployee.firstName} onChange={handleInputChange(setNewEmployee)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                     </div>
                     <div>
                        <label htmlFor="add_lastName" className="block text-sm font-medium text-gray-700 mb-1">Familiya*</label>
                        <input type="text" id="add_lastName" name="lastName" value={newEmployee.lastName} onChange={handleInputChange(setNewEmployee)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                     </div>
                     <div>
                        <label htmlFor="add_role" className="block text-sm font-medium text-gray-700 mb-1">Rol*</label>
                        <select id="add_role" name="role" value={newEmployee.role} onChange={handleInputChange(setNewEmployee)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white">
                            <option value="" disabled>Rolni tanlang</option>
                            {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                     </div>
                     <div>
                        <label htmlFor="add_pin" className="block text-sm font-medium text-gray-700 mb-1">PIN-kod*</label>
                        <input type="password" id="add_pin" name="pin" maxLength={4} value={newEmployee.pin} onChange={handleInputChange(setNewEmployee)} placeholder="4 raqamli PIN" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                     </div>
                     <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-gray-700">Faol</span>
                        <button type="button" onClick={handleToggleChange(setNewEmployee, 'isActive')} className={`${ newEmployee.isActive ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} aria-pressed={newEmployee.isActive}>
                            <span className="sr-only">Toggle Faol</span>
                            <span className={`${ newEmployee.isActive ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                        </button>
                     </div>
                     <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={() => setIsAddEmployeeModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300">Bekor qilish</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Qo'shish</button>
                     </div>
                  </form>
                </div>
            </div>
        </div>
      )}

      {isAddProductModalOpen && (
         <div className="fixed inset-0 bg-gray-400 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200 relative">
                <button onClick={() => setIsAddProductModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"> <FiX size={24} /> </button>
                <div className="p-6">
                   <h2 className="text-xl font-semibold mb-2">Yangi mahsulot qo'shish</h2>
                   <p className="text-sm text-gray-500 mb-6">Mahsulot ma'lumotlarini kiriting.</p>
                   <form onSubmit={handleAddProduct} className="space-y-4">
                      <div>
                        <label htmlFor="add_prod_name" className="block text-sm font-medium text-gray-700 mb-1">Nomi*</label>
                        <input type="text" id="add_prod_name" name="name" value={newProduct.name} onChange={handleInputChange(setNewProduct)} placeholder="Masalan: Lavash" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                      </div>
                      <div>
                        <label htmlFor="add_prod_price" className="block text-sm font-medium text-gray-700 mb-1">Narx* (so'mda)</label>
                        <input type="text" id="add_prod_price" name="price" value={newProduct.price} onChange={handleInputChange(setNewProduct)} placeholder="25000.00" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                      </div>
                      <div>
                        <label htmlFor="add_prod_quantity" className="block text-sm font-medium text-gray-700 mb-1">Miqdori*</label>
                        <input type="number" id="add_prod_quantity" name="quantity" value={newProduct.quantity} onChange={handleInputChange(setNewProduct)} placeholder="10" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                      </div>
                       <div className="flex items-center justify-between pt-2">
                            <span className="text-sm font-medium text-gray-700">Faol</span>
                            <button type="button" onClick={handleToggleChange(setNewProduct, 'isActive')} className={`${ newProduct.isActive ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} aria-pressed={newProduct.isActive}>
                                <span className="sr-only">Toggle Faol</span>
                                <span className={`${ newProduct.isActive ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                            </button>
                        </div>
                      <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={() => setIsAddProductModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300">Bekor qilish</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Qo'shish</button>
                      </div>
                   </form>
                </div>
            </div>
        </div>
      )}

       {isAddCategoryModalOpen && (
         <div className="fixed inset-0 bg-gray-400 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
             <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200 relative">
                  <button onClick={() => setIsAddCategoryModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"> <FiX size={24} /> </button>
                  <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">Yangi kategoriya qo'shish</h2>
                      <p className="text-sm text-gray-500 mb-6">Yangi mahsulot kategoriyasi nomini kiriting.</p>
                      <form onSubmit={handleAddCategory} className="space-y-4">
                         <div>
                            <label htmlFor="add_cat_name" className="block text-sm font-medium text-gray-700 mb-1">Nomi*</label>
                            <input type="text" id="add_cat_name" name="name" value={newCategory.name} onChange={handleInputChange(setNewCategory)} placeholder="Masalan: Ichimliklar" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                         <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => setIsAddCategoryModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300">Bekor qilish</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Qo'shish</button>
                        </div>
                      </form>
                  </div>
             </div>
         </div>
       )}

      {isAddTableModalOpen && (
         <div className="fixed inset-0 bg-gray-400 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
             <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200 relative">
                  <button onClick={() => setIsAddTableModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"> <FiX size={24} /> </button>
                  <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">Yangi stol qo'shish</h2>
                      <p className="text-sm text-gray-500 mb-6">Yangi stol nomini, zonasini kiriting.</p>
                      <form onSubmit={handleAddTable} className="space-y-4">
                         <div>
                            <label htmlFor="add_table_name" className="block text-sm font-medium text-gray-700 mb-1">Nomi/Raqami*</label>
                            <input type="text" id="add_table_name" name="name" value={newTable.name} onChange={handleInputChange(setNewTable)} placeholder="Masalan: Stol 5 yoki VIP" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                         <div>
                            <label htmlFor="add_table_zone" className="block text-sm font-medium text-gray-700 mb-1">Zona*</label>
                            <input type="text" id="add_table_zone" name="zone" value={newTable.zone} onChange={handleInputChange(setNewTable)} placeholder="Masalan: Asosiy zal, Yerto'la" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-sm font-medium text-gray-700">Holati (Bo'sh)</span>
                            <button type="button" onClick={handleToggleChange(setNewTable, 'isActive')} className={`${ newTable.isActive ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} aria-pressed={newTable.isActive}>
                                <span className="sr-only">Toggle Holati (Bo'sh/Band)</span>
                                <span className={`${ newTable.isActive ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                            </button>
                            <span className="text-sm text-gray-500">{newTable.isActive ? 'Bo\'sh' : 'Band'}</span>
                        </div>
                         <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => setIsAddTableModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300">Bekor qilish</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Qo'shish</button>
                        </div>
                      </form>
                  </div>
             </div>
         </div>
      )}

      {isEditModalOpen && editingItem && (
         <div className="fixed inset-0 bg-gray-400 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200 relative">
                <button onClick={() => { setIsEditModalOpen(false); setEditingItem(null); setEditFormData({}); }} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"> <FiX size={24} /> </button>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{editingItem.type} tahrirlash (ID: {editingItem.data.id})</h2>
                    <p className="text-sm text-gray-500 mb-6">O'zgartirishlarni kiriting va saqlang.</p>
                    <form onSubmit={handleSaveEdit} className="space-y-4">
                        {editingItem.type === 'Xodim' && (
                            <>
                                <div>
                                    <label htmlFor="edit_username" className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
                                    <input type="text" id="edit_username" name="username" value={editFormData.username || ''} onChange={handleEditInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                                </div>
                                <div>
                                    <label htmlFor="edit_ism" className="block text-sm font-medium text-gray-700 mb-1">Ism (va Familiya)*</label>
                                    <input type="text" id="edit_ism" name="ism" value={editFormData.ism || ''} onChange={handleEditInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                                </div>
                                <div>
                                    <label htmlFor="edit_role" className="block text-sm font-medium text-gray-700 mb-1">Rol*</label>
                                    <select id="edit_role" name="rol" value={editFormData.rol || ''} onChange={handleEditInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white">
                                        <option value="" disabled>Rolni tanlang</option>
                                        {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm font-medium text-gray-700">Faol</span>
                                    <button type="button" onClick={() => handleEditToggleChange('holat', 'Faol', 'Faol emas')} className={`${ editFormData.holat === 'Faol' ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} aria-pressed={editFormData.holat === 'Faol'}>
                                        <span className="sr-only">Toggle Faol</span>
                                        <span className={`${ editFormData.holat === 'Faol' ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                                    </button>
                                     <span className="text-sm text-gray-500">{editFormData.holat}</span>
                                </div>
                            </>
                        )}
                        {editingItem.type === 'Rol' && (
                             <div>
                                <label htmlFor="edit_rol_nomi" className="block text-sm font-medium text-gray-700 mb-1">Rol nomi*</label>
                                <input type="text" id="edit_rol_nomi" name="nomi" value={editFormData.nomi || ''} onChange={handleEditInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                            </div>
                        )}
                         {editingItem.type === 'Mahsulot' && (
                            <>
                                <div>
                                    <label htmlFor="edit_prod_nomi" className="block text-sm font-medium text-gray-700 mb-1">Nomi*</label>
                                    <input type="text" id="edit_prod_nomi" name="nomi" value={editFormData.nomi || ''} onChange={handleEditInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                                </div>
                                <div>
                                    <label htmlFor="edit_prod_narx" className="block text-sm font-medium text-gray-700 mb-1">Narx* (so'mda)</label>
                                    <input type="text" id="edit_prod_narx" name="narx" value={(editFormData.narx || '').toString().replace(/\s*so'm/i, '')} onChange={handleEditInputChange} placeholder="25000.00" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                                </div>
                                <div>
                                    <label htmlFor="edit_prod_miqdori" className="block text-sm font-medium text-gray-700 mb-1">Miqdori*</label>
                                    <input type="number" id="edit_prod_miqdori" name="miqdori" value={editFormData.miqdori || ''} onChange={handleEditInputChange} placeholder="10" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                                </div>
                            </>
                        )}
                         {editingItem.type === 'Kategoriya' && (
                             <div>
                                <label htmlFor="edit_cat_nomi" className="block text-sm font-medium text-gray-700 mb-1">Nomi*</label>
                                <input type="text" id="edit_cat_nomi" name="nomi" value={editFormData.nomi || ''} onChange={handleEditInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                            </div>
                        )}
                        {editingItem.type === 'Stol' && (
                            <>
                                 <div>
                                    <label htmlFor="edit_table_nomi" className="block text-sm font-medium text-gray-700 mb-1">Nomi/Raqami*</label>
                                    <input type="text" id="edit_table_nomi" name="nomi" value={editFormData.nomi || ''} onChange={handleEditInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                                 </div>
                                 <div>
                                    <label htmlFor="edit_table_zona" className="block text-sm font-medium text-gray-700 mb-1">Zona*</label>
                                    <input type="text" id="edit_table_zona" name="zona" value={editFormData.zona || ''} onChange={handleEditInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                                 </div>
                                 <div className="flex items-center justify-between pt-2">
                                     <span className="text-sm font-medium text-gray-700">Holati</span>
                                    <button type="button" onClick={() => handleEditToggleChange('holati', 'Bo\'sh', 'Band')} className={`${ editFormData.holati === 'Bo\'sh' ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} aria-pressed={editFormData.holati === 'Bo\'sh'}>
                                        <span className="sr-only">Toggle Holati (Bo'sh/Band)</span>
                                        <span className={`${ editFormData.holati === 'Bo\'sh' ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                                    </button>
                                    <span className="text-sm text-gray-500">{editFormData.holati}</span>
                                </div>
                            </>
                        )}

                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={() => { setIsEditModalOpen(false); setEditingItem(null); setEditFormData({}); }} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300">Bekor qilish</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Saqlash</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}

      {isExitModalOpen && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={handleCloseExitModal}>
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Chiqishni tasdiqlang</h3>
            <p className="text-gray-600 mb-6">Rostan ham tizimdan chiqishni xohlaysizmi?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                onClick={handleCloseExitModal}
              >
                  Yo'q
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                onClick={handleConfirmExit}
              >
                  Ha
              </button>
            </div>
          </div>
        </div>
      )}

      {isProfileModalOpen && (
         <div className="fixed inset-0 bg-gray-400 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={handleCloseProfileModal}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleCloseProfileModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"> <FiX size={24} /> </button>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-5">Profilni tahrirlash</h2>
                    <form onSubmit={handleSaveProfile} className="space-y-5">
                        <div className='flex flex-col items-center space-y-3'>
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ring-2 ring-offset-2 ring-blue-500">
                                {profileFormData.imagePreview ? (
                                    <img src={profileFormData.imagePreview} alt="Profil Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <FiUser className="w-12 h-12 text-gray-400" />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleProfileImageChange}
                                accept="image/png, image/jpeg, image/gif"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <FiUpload className="mr-2 h-4 w-4" /> Rasm tanlash...
                            </button>
                            {profileFormData.imageFile && (
                                <p className='text-xs text-gray-500 mt-1 truncate w-full text-center' title={profileFormData.imageFile.name}>
                                    Tanlandi: {profileFormData.imageFile.name}
                                </p>
                             )}
                        </div>

                        <div>
                            <label htmlFor="profile_name" className="block text-sm font-medium text-gray-700 mb-1">Ism*</label>
                            <input
                                type="text"
                                id="profile_name"
                                name="name"
                                value={profileFormData.name}
                                onChange={handleProfileNameChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                            <button
                                type="button"
                                onClick={handleCloseProfileModal}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                            >
                                Bekor qilish
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                            >
                                Saqlash
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}

export default Admin;