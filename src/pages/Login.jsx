import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [pin, setPin] = useState('');
  const maxPinLength = 4;
  const navigate = useNavigate();

  const handleDigitClick = (digit) => {
    if (pin.length < maxPinLength) {
      setPin(pin + digit);
    }
  };

  const handleClear = () => {
    setPin('');
  };

  const handleLogin = () => {
    if (pin.length !== maxPinLength) {
      alert(`Iltimos, ${maxPinLength} xonali PIN-kod kiriting.`);
      return;
    }

    // PIN kodlar orqali yo'naltirish
    if (pin === '1234') {
      navigate('/tables');
      localStorage.setItem("role", "afitsant");
    } else if (pin === '5678') {
      navigate('/casir');
      localStorage.setItem("role", "kassir");
    } else if (pin === '9012') {
      navigate('/admin');
      localStorage.setItem("role", "admin");
    }else {
      alert("Noto‘g‘ri PIN-kod kiritildi!");
      setPin('');
    }
  };

  const maskedPin = '*'.repeat(pin.length);
  const numpadButtonStyle = "p-4 text-xl font-bold border border-gray-300 rounded-md bg-white cursor-pointer transition duration-200 ease-in-out text-gray-800 hover:bg-gray-100 active:bg-gray-200 active:border-gray-400";
  const loginButtonColor = pin.length === maxPinLength ? 'bg-gray-600' : 'bg-gray-400';

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <div className="bg-white px-10 py-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">SmartResto</h2>
        <p className="text-sm text-gray-600 mb-6">Tizimga kirish uchun PIN-kodni kiriting</p>

        <div className="border border-gray-300 rounded-md p-4 text-2xl tracking-[10px] text-center mb-6 bg-white text-gray-700 font-mono h-14 flex items-center justify-center">
          {pin.length === 0 ? <span className="text-gray-400 tracking-[10px]">****</span> : maskedPin}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button
              key={digit}
              className={numpadButtonStyle}
              onClick={() => handleDigitClick(digit.toString())}
            >
              {digit}
            </button>
          ))}
          <button className={numpadButtonStyle} onClick={handleClear}>Tozalash</button>
          <button className={numpadButtonStyle} onClick={() => handleDigitClick('0')}>0</button>
          <div
            onClick={handleLogin}
            className={`p-4 border border-gray-300 rounded-md ${loginButtonColor} hover:bg-gray-500 font-bold text-white`}
          >
            Kirish
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          PIN kodni unutgan bo‘lsangiz, eslab qolish kerak edi 😊
        </p>

        <div className="border-t border-gray-200 pt-4 mt-5">
          <p className="text-sm text-gray-700 mb-3 font-medium">Namuna PIN kodlar (test uchun):</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Afitsant<br/>1234',
              'Kassir<br/>5678',
              'Admin<br/>9012',
            ].map((text, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded px-3 py-1 text-xs text-gray-500 bg-gray-50 leading-snug"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
