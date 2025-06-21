
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHomePage from '@/pages/dashboard/DashboardHomePage';
import WalletsPage from '@/pages/dashboard/WalletsPage';
import TransactionsPage from '@/pages/dashboard/TransactionsPage';
import WithdrawalsPage from '@/pages/dashboard/WithdrawalsPage';
import IntegrationsPage from '@/pages/dashboard/IntegrationsPage';
import CheckoutPage from '@/pages/dashboard/CheckoutPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import SupportPage from '@/pages/dashboard/SupportPage';
import AuthLayout from '@/components/auth/AuthLayout';
import SignUpPage from '@/pages/auth/SignUpPage';
import LoginPage from '@/pages/auth/LoginPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ApiDocsPage from '@/pages/ApiDocsPage';
import PrivateRoute from '@/components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<DashboardHomePage />} />
            <Route path="wallets" element={<WalletsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="withdrawals" element={<WithdrawalsPage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="support" element={<SupportPage />} />
          </Route>
          <Route path="/developers/docs" element={<ApiDocsPage />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
