import React, { useContext, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/Config';
import { UserContext } from './contexts/userProvider';
import Create from './Components/Create/Create';
import View from './Components/View/View';
import ProductProvider from './contexts/productContext';

function App() {
  const {setUser} = useContext(UserContext)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user)
    })
  }, [])

  return (
    <div>
      {/* <ToastContainer theme='light' /> */}
      <ProductProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/view' element={<View />} />
        </Routes>
      </ProductProvider>
      <Routes>
      <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;