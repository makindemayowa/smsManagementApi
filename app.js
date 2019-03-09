const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const routes = require("./server/routes");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

// swagger definition
const swaggerDefinition = {
  info: {
    title: "SMS Management API",
    version: "1.0.0",
    description: "Demonstrating how to describe a RESTful API with Swagger"
  },
  host: `localhost:${parseInt(process.env.PORT, 10) || 8000}`,
  basePath: "/"
};

const options = {
  swaggerDefinition,
  apis: ["./**/routes/*.js", "routes.js"]
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get("/swagger.json", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

routes(app);

module.exports = app;
