import "@babel/polyfill";
import express from "express";
import AuthRouter from "./routes/user";
import carRouter from "./routes/car";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v2/auth/",AuthRouter);
app.use("/api/v2/",carRouter);
app.use("*",(req,res)=>{
    res.status(200).send({
        status: 200,
        message: "Welcome to AutoMart app"
    });
});

const port = process.env.PORT||2000;
app.listen(port,()=>{
    console.log(`Server connected on port ${port}`);
});

console.log("Hello");

export default app;