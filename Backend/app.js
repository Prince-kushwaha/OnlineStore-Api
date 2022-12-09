const express = require("express");
const YAML = require("yamljs");
const errorMiddleware = require("./middleware/error");
const userRoute = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes");
const fileUploader = require("express-fileupload");
const swaggerUI = require("swagger-ui-express");
const app = express();
const path = require("path");
const swaggerJsDocs = YAML.load(path.join(__dirname, "apiDocs.yml"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUploader());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.get("/", (req, resp) => {
  resp.redirect("/api-docs");
});

app.use("/", productRoutes);
app.use("/", userRoute);
app.use("/", orderRoutes);
app.use(errorMiddleware);

module.exports = app;
module.exports.express = express;
