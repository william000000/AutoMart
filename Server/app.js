import "@babel/polyfill";
import express from "express";
import AuthRouter from "./routes/user";
import carRouter from "./routes/car";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/apiDoc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/v2/auth/", AuthRouter);
app.use("/api/v2/", carRouter);
app.use("*", (req, res) => {
    res.status(200).send({
        status: 200,
        message: "Welcome to AutoMart app"
    });
});

const port = process.env.PORT || 2000;
app.listen(port, () => { });


export default app;