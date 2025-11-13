import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Healthcheck from './pages/Healthcheck';
import getConfig from './config/env';

// PUBLIC_INTERFACE
function App() {
  const cfg = getConfig();

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path={cfg.healthcheckPath || '/health'} element={<Healthcheck />} />
        {/* Unknown routes -> Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
