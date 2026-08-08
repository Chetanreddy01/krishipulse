import React from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { useApp } from '../context/AppContext.jsx';

export const NotificationsPage = () => {
  const { notifications, markNotificationAsRead } = useApp();

  return (
    <div className="space-y-6 pb-16">
      <Card className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-2xl sm:text-3xl font-black text-black dark:text-white">System Alert Feeds</h1>
          <p className="body-text text-xs text-black dark:text-slate-300 font-extrabold mt-1">
            APMC price alerts, weather advisories, and task reminders.
          </p>
        </div>

        <Badge variant="emerald" size="md">{notifications.length} Alerts</Badge>
      </Card>

      <div className="space-y-3">
        {notifications.map(n => (
          <Card
            key={n.id}
            onClick={() => markNotificationAsRead(n.id)}
            className={`cursor-pointer transition-all ${
              n.read ? 'opacity-70 bg-zinc-100 dark:bg-slate-950' : 'bg-white dark:bg-slate-900 border-l-4 border-emerald-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="card-title text-base font-black text-black dark:text-white">{n.title}</h3>
              <span className="text-xs font-mono text-black dark:text-slate-300">{n.time}</span>
            </div>
            <p className="text-xs text-black dark:text-slate-200 font-extrabold mt-1">{n.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
