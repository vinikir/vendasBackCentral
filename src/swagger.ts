import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { Express } from "express";

export default (app: Express) => {
    const swaggerDocument = YAML.load("./swagger/despesas.yaml");
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
