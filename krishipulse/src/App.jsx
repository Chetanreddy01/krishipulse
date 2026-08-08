import React from 'react';
import { AppProvider, useApp } from './context/AppContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import { DashboardLayout } from './components/layout/DashboardLayout.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { CropAdvisor } from './pages/CropAdvisor.jsx';
import { Market } from './pages/Market.jsx';
import { Weather } from './pages/Weather.jsx';
import { FarmManagement } from './pages/FarmManagement.jsx';
import { DiseaseAI } from './pages/DiseaseAI.jsx';
import { PestAI } from './pages/PestAI.jsx';
import { Irrigation } from './pages/Irrigation.jsx';
import { AnalyticsPage } from './pages/AnalyticsPage.jsx';
import { FeaturePreview } from './pages/FeaturePreview.jsx';
import { NotificationsPage } from './pages/NotificationsPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { SettingsPage } from './pages/SettingsPage.jsx';

function MainRouter() {
  const { activeTab } = useApp();

  if (activeTab === 'landing') {
    return <LandingPage />;
  }

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'crop-advisor':
        return <CropAdvisor />;
      case 'market-intelligence':
        return <Market />;
      case 'weather':
        return <Weather />;
      case 'farm-management':
        return <FarmManagement />;
      case 'disease-detection':
        return <DiseaseAI />;
      case 'pest-detection':
        return <PestAI />;
      case 'irrigation':
        return <Irrigation />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'govt-schemes':
        return <FeaturePreview featureId="govt-schemes" />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderCurrentPage()}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <MainRouter />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
