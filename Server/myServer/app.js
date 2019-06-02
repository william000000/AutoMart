import express from "express";
import AuthRouter from "./routes/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/auth/",AuthRouter);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server connected on port ${port}`);
});

console.log("Hello");

export default app;