/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { POS } from './pages/POS';
import { Patients } from './pages/Patients';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export default function App() {
  const [currentPath, setCurrentPath] = useState('dashboard');

  const renderContent = () => {
    switch (currentPath) {
      case 'dashboard':
        return <Dashboard />;
      case 'pos':
        return <POS />;
      case 'inventory':
        return <Inventory />;
      case 'patients':
        return <Patients />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
            <p className="text-gray-500 max-w-md">The {currentPath} feature is currently under development. Please check back later.</p>
          </div>
        );
    }
  };

  return (
    <Layout currentPath={currentPath} setPath={setCurrentPath}>
      {renderContent()}
    </Layout>
  );
}

