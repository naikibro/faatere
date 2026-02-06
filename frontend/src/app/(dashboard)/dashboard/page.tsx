'use client';

import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">
          {t('dashboard.welcome', { email: user?.email })}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title={t('dashboard.cards.totalMembers')}
          value="--"
          description={t('common.comingSoon')}
        />
        <DashboardCard
          title={t('dashboard.cards.activeUsers')}
          value="--"
          description={t('common.comingSoon')}
        />
        <DashboardCard
          title={t('dashboard.cards.tomites')}
          value="--"
          description={t('common.comingSoon')}
        />
        <DashboardCard
          title={t('dashboard.cards.pendingInvitations')}
          value="--"
          description={t('common.comingSoon')}
        />
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">{t('dashboard.userInfo.title')}</h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted-foreground">{t('dashboard.userInfo.email')}</dt>
            <dd className="font-medium">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t('dashboard.userInfo.role')}</dt>
            <dd className="font-medium">{user?.role}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t('dashboard.userInfo.userId')}</dt>
            <dd className="font-mono text-xs">{user?.id}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t('dashboard.userInfo.status')}</dt>
            <dd className="font-medium">
              {user?.isActive ? (
                <span className="text-green-600">{t('dashboard.userInfo.active')}</span>
              ) : (
                <span className="text-red-600">{t('dashboard.userInfo.inactive')}</span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
