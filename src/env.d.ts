declare global {
  namespace NodeJs{
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string | number;
      JWT_SECRET: string;
      JWT_SECRET: string; 
    }
  }
}