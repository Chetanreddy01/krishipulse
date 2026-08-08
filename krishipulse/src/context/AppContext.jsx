/**
 * KrishiPulse AI - Global Application State Manager (Pure JavaScript Context)
 * Author: Chetan (Mandya Hub)
 * 
 * Provides centralized React Context for:
 * 1. Active Navigation Tab switching
 * 2. Selected Karnataka APMC District Hub
 * 3. Managed Land Plots, Expenses, and Field Tasks
 * 4. System Notifications & Toast Alerts
 */

import React, { createContext, useContext, useState } from 'react';
import { initialFarmPlots, initialFarmExpenses, initialFarmTasks } from '../data/mockFarmData.js';
import { mockApmcPrices } from '../data/mockApmcData.js';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Navigation Tab State
  const [activeTab, setActiveTabState] = useState('dashboard');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 2. Default Mandi Region (Set to Mandya)
  const [selectedDistrict, setSelectedDistrict] = useState('Mandya');

  // 3. Farm Parcels State
  const [plots, setPlots] = useState(initialFarmPlots);

  // 4. Expenses Ledger State
  const [expenses, setExpenses] = useState(initialFarmExpenses);

  // 5. Tasks State
  const [tasks, setTasks] = useState(initialFarmTasks);

  // 6. APMC Mandi Rates State
  const [apmcPrices] = useState(mockApmcPrices);

  // 7. System Notifications Feed
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Mandya APMC Price Spike Alert',
      message: 'Finger Millet (Ragi) prices jumped +3.8% today to ₹4,100/Quintal.',
      time: '10 mins ago',
      type: 'price',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Micro-Climate Weather Warning',
      message: 'High humidity in Hassan & Mandya regions. Optimal spraying window between 06:00 AM - 09:00 AM.',
      time: '1 hour ago',
      type: 'weather',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Irrigation Schedule Due',
      message: 'Automated 45-min drip fertigation cycle scheduled for Sugarcane Plot 2.',
      time: '3 hours ago',
      type: 'task',
      read: true
    }
  ]);

  // 8. Toast Popup State
  const [toasts, setToasts] = useState([]);

  // Function to smooth navigate pages
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add a new Farm Plot
  const addPlot = (newPlotData) => {
    const newPlot = {
      ...newPlotData,
      id: `plot-${Date.now()}`
    };
    setPlots(prev => [newPlot, ...prev]);
    showToast('success', 'Farm Plot Added', `${newPlot.plotName} registered successfully.`);
  };

  // Add a new Expense entry
  const addExpense = (newExpData) => {
    const newExpense = {
      ...newExpData,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [newExpense, ...prev]);
    
    // Update target plot's cumulative expenses
    setPlots(prevPlots => prevPlots.map(p => {
      if (p.id === newExpData.plotId) {
        return { ...p, totalExpensesRs: p.totalExpensesRs + newExpData.amountRs };
      }
      return p;
    }));

    showToast('success', 'Expense Logged', `Logged ₹${newExpense.amountRs.toLocaleString('en-IN')} under ${newExpense.category}.`);
  };

  // Toggle Task Completion Status
  const toggleTaskStatus = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
        showToast('info', 'Task Updated', `Task marked as ${nextStatus}`);
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Add a new Task
  const addTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: `task-${Date.now()}`
    };
    setTasks(prev => [newTask, ...prev]);
    showToast('success', 'Task Scheduled', `New task scheduled for ${newTask.dueDate}`);
  };

  // Mark notification as read
  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Display Toast Notification
  const showToast = (type, title, message) => {
    const id = `toast-${Date.now()}`;
    const newToast = { id, type, title, message };
    setToasts(prev => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  // Dismiss Toast Popup
  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isSidebarCollapsed,
        setSidebarCollapsed,
        selectedDistrict,
        setSelectedDistrict,
        plots,
        addPlot,
        expenses,
        addExpense,
        tasks,
        toggleTaskStatus,
        addTask,
        apmcPrices,
        notifications,
        markNotificationAsRead,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom React Hook to access global App State easily
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
