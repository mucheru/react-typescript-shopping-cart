import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Products } from './components/Products';
import { Cart } from './components/Cart';

function App() {
  return (
    <main>
      <Routes>
        <Route path ="/" element={<Products/>}/>
        <Route path ="/cart" element ={<Cart/>}/>
      </Routes>
    </main>
    
  );
}

export default App;
