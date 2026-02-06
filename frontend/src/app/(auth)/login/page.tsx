'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createLoginSchema, type LoginFormData } from '@/lib/schemas';
import { useLogin } from '@/hooks/use-login';

export default function LoginPage() {
  const { t } = useTranslation();
  const { mutate: login, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(createLoginSchema(t)),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  const getErrorMessage = (error: unknown) => {
    if (!error) return null;
    const err = error as { response?: { status: number; data?: { message?: string } } };

    if (err.response?.status === 401) {
      return t('auth.login.errors.invalidCredentials');
    }
    if (err.response?.status === 403) {
      return t('auth.login.errors.accountDisabled');
    }
    if (err.response?.status === 429) {
      return t('auth.login.errors.tooManyAttempts');
    }
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
    return t('auth.login.errors.generic');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">{t('auth.login.title')}</h1>
        <p className="text-muted-foreground">{t('auth.login.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {getErrorMessage(error)}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.login.email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t('auth.login.emailPlaceholder')}
            autoComplete="email"
            error={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t('auth.login.password')}</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth.login.passwordPlaceholder')}
              autoComplete="current-password"
              error={!!errors.password}
              className="pr-10"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? t('auth.login.hidePassword') : t('auth.login.showPassword')}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('auth.login.submitting')}
            </>
          ) : (
            t('auth.login.submit')
          )}
        </Button>
      </form>
    </div>
  );
}
