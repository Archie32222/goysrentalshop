import React, { useState } from 'react';
import { loginUser, registerUser } from '../lib/supabase';
import { useNavigate  } from 'react-router-dom';
const LoginPage = () => {
    const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('login');
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const handleLogin = async(e)=>{
    e.preventDefault();
    const result = await loginUser(loginEmail,loginPassword)
    if (result.user) {
        navigate('/booking')
    }
    console.log(result)
  }

const handleRegister = async(e)=>{ 
    e.preventDefault();
    const { user, error } = await registerUser(registerEmail, registerPassword);

    if (error) {
      console.error('Signup error:', error);
      alert(error);
    } else {
      console.log('User signed up:', user);
      alert("Signup successful! Please check your email to confirm.");
    }
}


  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen text-black">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`font-bold border-b-2 ${activeTab === 'login' ? 'text-black border-black' : 'text-gray-600 border-transparent'}`}
          >
            LOGIN
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`font-bold border-b-2 ${activeTab === 'register' ? 'text-black border-black' : 'text-gray-600 border-transparent'}`}
          >
            REGISTER
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e)=>setLoginEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              value={loginPassword}
              onChange={(e)=>setLoginPassword(e.target.value)}
              placeholder="Password"
              className="w-full mb-6 px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              LOGIN
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} >
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 px-4 py-2 border rounded"
                
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 px-4 py-2 border rounded"
            
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 border rounded"
              value={registerEmail}
              onChange={(e)=>setRegisterEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Contact No."
              className="w-full mb-4 px-4 py-2 border rounded"
              
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 px-4 py-2 border rounded"
              value={registerPassword}
              onChange={(e)=>setRegisterPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              REGISTER
            </button>

          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
