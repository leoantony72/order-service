import { ConnectionOptions } from "typeorm";

  const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "leoantony",
    password: process.env.POSTGRES_PASSWORD || "karwizard",
    database: process.env.POSTGRES_DB || "e_commerce",
    entities: [],
    synchronize: true,
  };
  
  export default config;
  