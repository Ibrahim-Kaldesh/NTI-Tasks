const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const viewsDir = path.join(__dirname, "../resources/views");
const layoutsDir = path.join(__dirname, "../resources/layouts");
const publicDir = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", viewsDir);
app.use(express.static(publicDir));
hbs.registerPartials(layoutsDir);

app.use(express.urlencoded({ extended: true }));

const router = require("./routers/routes");
app.use(router);

module.exports = app;
