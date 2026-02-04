import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // ========================================
  // Application
  // ========================================
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3001),
  FRONTEND_URL: Joi.string().uri().default('http://localhost:3000'),

  // ========================================
  // Database
  // ========================================
  DATABASE_URL: Joi.string().required().messages({
    'any.required': 'DATABASE_URL is required. Set it in your .env file.',
  }),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_NAME: Joi.string().default('faatere'),
  DATABASE_USER: Joi.string().default('faatere'),
  DATABASE_PASSWORD: Joi.string().optional(),

  // Test Database (optional, for test environment)
  TEST_DATABASE_URL: Joi.string().optional(),
  TEST_DATABASE_HOST: Joi.string().default('localhost'),
  TEST_DATABASE_PORT: Joi.number().default(5433),
  TEST_DATABASE_NAME: Joi.string().default('faatere_test'),

  // ========================================
  // JWT Authentication
  // ========================================
  JWT_SECRET: Joi.string().min(32).required().messages({
    'any.required': 'JWT_SECRET is required. Generate a secure secret for production.',
    'string.min': 'JWT_SECRET must be at least 32 characters long.',
  }),
  JWT_EXPIRATION: Joi.string().default('24h'),
  JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),

  // ========================================
  // S3/MinIO Storage
  // ========================================
  S3_ENDPOINT: Joi.string().uri().default('http://localhost:9000'),
  S3_ACCESS_KEY: Joi.string().required().messages({
    'any.required': 'S3_ACCESS_KEY is required for file storage.',
  }),
  S3_SECRET_KEY: Joi.string().required().messages({
    'any.required': 'S3_SECRET_KEY is required for file storage.',
  }),
  S3_BUCKET: Joi.string().default('faatere-uploads'),
  S3_REGION: Joi.string().default('auto'),

  // MinIO specific (optional)
  USE_MINIO: Joi.boolean().default(true),
  MINIO_ENDPOINT: Joi.string().uri().optional(),
  MINIO_ACCESS_KEY: Joi.string().optional(),
  MINIO_SECRET_KEY: Joi.string().optional(),
  MINIO_BUCKET: Joi.string().optional(),

  // ========================================
  // Email (Resend)
  // ========================================
  RESEND_API_KEY: Joi.string().allow('').optional(),
  EMAIL_FROM: Joi.string().email().default('noreply@faatere.pf'),

  // ========================================
  // Board Users (initial migration)
  // ========================================
  BOARD_USERS: Joi.string().optional(),

  // ========================================
  // CORS
  // ========================================
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
});
