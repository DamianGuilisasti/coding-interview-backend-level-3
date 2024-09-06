import swaggerUi from "swagger-ui-express";
import { Request, Response } from "express";
import YAML from "yamljs";
import config from "./config/index.config";

// Docs in YAML format
const swaggerJsDocs = YAML.load("./swagger.yaml");
// Function to setup our docs
const swaggerDocs = (app: any, port: number) => {
  // Route-Handler to visit our docs
  app.use("/swagger/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));
  // Make our docs in JSON format available
  app.get("/swagger/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerJsDocs);
  });
  console.log(
    `Docs are available on http://${config.server.baseUrl}:${port}/swagger/docs/`
  );
};
export default { swaggerDocs };
