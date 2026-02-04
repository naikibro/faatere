import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Application
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3001),

  // Database
  DATABASE_URL: Joi.string().required().messages({
    'any.required': 'DATABASE_URL is required. Set it in your .env file.',
  }),

  // JWT Authentication
  JWT_SECRET: Joi.string().min(32).required().messages({
    'any.required': 'JWT_SECRET is required. Generate a secure secret for production.',
    'string.min': 'JWT_SECRET must be at least 32 characters long.',
  }),
  JWT_EXPIRES_IN: Joi.string().default('7d'),

  // S3/MinIO Storage
  S3_ENDPOINT: Joi.string().uri().default('http://localhost:9000'),
  S3_ACCESS_KEY: Joi.string().required().messages({
    'any.required': 'S3_ACCESS_KEY is required for file storage.',
  }),
  S3_SECRET_KEY: Joi.string().required().messages({
    'any.required': 'S3_SECRET_KEY is required for file storage.',
  }),
  S3_BUCKET: Joi.string().default('faatere'),

  // CORS
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
});
