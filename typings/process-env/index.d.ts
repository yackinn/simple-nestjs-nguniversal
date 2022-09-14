export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'development' | 'production';
      PORT: string;
      COOKIE_SECRET: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
    }
  }
}
