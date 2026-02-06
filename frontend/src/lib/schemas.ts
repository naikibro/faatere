import { z } from 'zod';
import type { TFunction } from 'i18next';

/**
 * Crée le schéma de validation du formulaire de connexion
 * @param t - Fonction de traduction i18next
 */
export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .email(t('validation.emailInvalid')),
    password: z.string().min(1, t('validation.passwordRequired')),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;

/**
 * Schéma de validation par défaut (fallback en français)
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email('Format email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});
