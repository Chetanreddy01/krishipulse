/**
 * KrishiPulse AI - User Authentication Context (Pure JavaScript)
 * Author: Chetan (7338025342 • chetanreddy445@gmail.com)
 * Chetan: You can edit your profile details here anytime!
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Chetan's Primary Verified Enterprise Profile
export const chetanProfile = {
  id: 'usr-chetan',
  name: 'Chetan',
  email: 'chetanreddy445@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  role: 'farmer',
  district: 'Mandya',
  farmSizeAcres: 12.5,
  phone: '7338025342',
  preferredCrops: ['Finger Millet (Ragi)', 'Sugarcane', 'Paddy', 'Hybrid Tomato']
};

export const demoProfiles = [chetanProfile];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(chetanProfile);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('krishi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('krishi_user');
    }
  }, [user]);

  const login = (email) => {
    setUser({
      ...chetanProfile,
      email: email || 'chetanreddy445@gmail.com'
    });
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(chetanProfile);
  };

  const switchDemoProfile = () => {
    setUser(chetanProfile);
    setAuthModalOpen(false);
  };

  const updateUserDistrict = (district) => {
    if (user) {
      setUser({ ...user, district });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchDemoProfile,
        updateUserDistrict,
        isAuthModalOpen,
        setAuthModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
