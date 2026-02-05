export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  database: {
    url: process.env.DATABASE_URL || 'postgresql://faatere:faatere_dev_password@localhost:5432/faatere',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    name: process.env.DATABASE_NAME || 'faatere',
    user: process.env.DATABASE_USER || 'faatere',
    password: process.env.DATABASE_PASSWORD || 'faatere_dev_password',
  },

  testDatabase: {
    url: process.env.TEST_DATABASE_URL || 'postgresql://faatere:faatere_dev_password@localhost:5433/faatere_test',
    host: process.env.TEST_DATABASE_HOST || 'localhost',
    port: parseInt(process.env.TEST_DATABASE_PORT || '5433', 10),
    name: process.env.TEST_DATABASE_NAME || 'faatere_test',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    expiration: process.env.JWT_EXPIRATION || '24h',
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },

  s3: {
    endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
    accessKey: process.env.S3_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.S3_SECRET_KEY || 'minioadmin',
    bucket: process.env.S3_BUCKET || 'faatere-uploads',
    region: process.env.S3_REGION || 'auto',
  },

  minio: {
    useMinio: process.env.USE_MINIO === 'true',
    endpoint: process.env.MINIO_ENDPOINT || process.env.S3_ENDPOINT || 'http://localhost:9000',
    accessKey: process.env.MINIO_ACCESS_KEY || process.env.S3_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || process.env.S3_SECRET_KEY || 'minioadmin',
    bucket: process.env.MINIO_BUCKET || process.env.S3_BUCKET || 'faatere-uploads',
  },

  email: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    from: process.env.EMAIL_FROM || 'noreply@faatere.pf',
  },

  boardUsers: process.env.BOARD_USERS || '',

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },

  dbManagement: {
    enabled: process.env.DB_MANAGEMENT_ENABLED !== 'false',
  },
});
