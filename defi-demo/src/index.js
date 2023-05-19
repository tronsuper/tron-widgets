import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contract from './routes/contract';
import './index.css';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Contract />} />
      <Route path="contract" element={<Contract />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
