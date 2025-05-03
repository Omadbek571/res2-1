// App.js (Oddiy holatda)
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Afitsant from './pages/Afitsant';
import Casir from './pages/Casir';
import Admin from './pages/Admin';
import Tables from './pages/Tables';
import Orders from './pages/Orders';
// import { OrderProvider } from './context/OrderContext'; // <-- KERAK EMAS

function App() {
  return (
    // OrderProvider o'chirildi
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/casir' element={<Casir />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/tables' element={<Tables/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/pos/:tableNumber' element={<Afitsant />} />
    </Routes>
  );
}

export default App;