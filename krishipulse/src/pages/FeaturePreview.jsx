import React from 'react';
import { Sparkles, Clock, Lock } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useApp } from '../context/AppContext.jsx';

export const FeaturePreview = ({ featureId }) => {
  const { setActiveTab } = useApp();

  const featureDetails = {
    'disease-detection': {
      title: 'AI Plant Disease Detection',
      description: 'Computer Vision leaf lesion scanner for immediate pathogen diagnosis.',
      expectedDate: 'Q3 2026'
    },
    'govt-schemes': {
      title: 'Karnataka Government Subsidies Portal',
      description: 'Direct DBT subsidy application engine for Krishi Bhagya & Ganga Kalyana schemes.',
      expectedDate: 'Q3 2026'
    }
  };

  const details = featureDetails[featureId] || {
    title: 'Advanced Module Preview',
    description: 'Next-generation feature undergoing precision field validation.',
    expectedDate: 'Coming Soon'
  };

  return (
    <div className="space-y-6 pb-16">
      <Card className="text-center py-12 space-y-4">
        <div className="h-16 w-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-900 dark:text-emerald-300 mx-auto border border-emerald-300">
          <Sparkles className="h-8 w-8" />
        </div>

        <h1 className="text-2xl font-black text-black dark:text-white">{details.title}</h1>
        <p className="text-sm font-extrabold text-black dark:text-slate-300 max-w-md mx-auto">{details.description}</p>

        <Badge variant="emerald" size="md">COMING SOON ({details.expectedDate})</Badge>

        <div className="pt-4">
          <Button onClick={() => setActiveTab('dashboard')} variant="primary" size="md">
            Return to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};
