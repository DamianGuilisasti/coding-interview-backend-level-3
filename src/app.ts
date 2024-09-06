// Imports
import express from "express";
import config from "./config/index.config";
import { mongodbConnection } from "./database";
import errorHandling from "./middlewares/errorHandler.middleware";
import router from "./routes";
import SwaggerDocs from "./swagger";


// Database Connection
mongodbConnection();

// Inicializations
export const app = express();


// Settings
const PORT = 5000; //Change this.
app.set("port", PORT);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/", router);

// Error Handler Middleware
app.use(errorHandling);


// Start the Server
export const server = app.listen(app.get("port"), function () {
    console.log(`Server on port: ${app.get("port")}`);
    SwaggerDocs.swaggerDocs(app, app.get("port"));
  });

  module.exports = { app, server };