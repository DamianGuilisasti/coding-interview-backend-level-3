import dotenv from "dotenv";
dotenv.config();

// SERVER PORT

const SERVER_PORT = process.env.SERVER_PORT || 5000;

// BASE URL

const BASE_URL = process.env.BASE_URL || "localhost";

// DB PORT

const DB_PORT = process.env.DB_PORT || "27017";

// DB URI

const MONGO_DB_URI_CONNECTION =
  process.env.MONGO_DB_URI_CONNECTION ||
  `mongodb://${BASE_URL}:${DB_PORT}/ElDorado-accounts`;

// MONGODB OPTIONS

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// ----------------------------------------------------------------------------------------------------------------------------------- //

const MONGO = {
  options: MONGO_OPTIONS,
  url: MONGO_DB_URI_CONNECTION,
};

const SERVER = {
  port: SERVER_PORT,
  baseUrl: BASE_URL,

};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
