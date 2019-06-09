import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";
import TOKEN from "./token";
chai.use(chaiHttp);
chai.should();

describe("Cars", ()=>{
    describe("GET",()=>{
        it("Should via a car if id provided exist", (done)=>{
            let id = 1;
            chai.request(app)
                .get(`/api/v1/car/${id}`)
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should return an error if id does not exit", (done)=>{
            let id = -1;
            chai.request(app)
                .get(`/api/v1/car/${id}`)
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should bring all available cars", (done)=>{
            chai.request(app)
                .get("/api/v1/car?status=available")
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should not display via unsold cars ", (done)=>{
            chai.request(app)
                .get("/api/v1/car/status=sold")
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should delete a existing car", (done)=>{
            let id = 1;
            chai.request(app)
                .delete(`/api/v1/car/${id}`)
                .set("x-auth-token",TOKEN)
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should validate the token before delete", (done)=>{
            let id = 1;
            chai.request(app)
                .delete(`/api/v1/car/${id}`)
                .set("x-auth-token","ss")
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not delete a invalid car", (done)=>{
            let id = -1;
            chai.request(app)
                .delete(`/api/v1/car/${id}`)
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should via get all cars", (done)=>{
            chai.request(app)
                .get("/api/v1/car/")
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });
        it("Should create an account", (done)=>{
            const newUser = {
                "email":"woo1000@gmail.com",
                "first_name":"mago",
                "last_name":"Wiu",
                "password":"12",
                "address": "kigali"
        };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should not create an account if email already exist", (done)=>{
            const newUser = {
                "email":"willy@gmail.com",
                "first_name":"mago",
                "last_name":"Wiu",
                "password":"12",
                "address": "kigali"
        };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should login when user provide true email", (done)=>{
            const newUser = {
                "email": "willy@gmail.com",
                 "password":"12"
         };
            chai.request(app)
                .post("/api/v1/auth/signin")
                .send(newUser)
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should not login when user provide incorrect email", (done)=>{
            // rand = Math.floor(Math.random()*1000);
            const newUser = {
                "email":"willyetwt@gmail.com",
              
        };
            chai.request(app)
                .post("/api/v1/auth/signin")
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not login when user provide incorrect password", (done)=>{
            const newUser = {
                "email":"2324785375785478575",
                "password": "12"
              
        };
            chai.request(app)
                .post("/api/v1/auth/signin")
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });


        it("Should create a car post when user provide existing email", (done)=>{
            const newCar ={
                "email":"willy@gmail.com",
               "manufacturer": "Rava4",
                "model": "Rava",
                "price":40000,
                "state": "new"
        };
            chai.request(app)
                .post("/api/v1/car")
                .send(newCar)
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should create a car post when seller provide unkwon email account", (done)=>{
            const newCar ={
                "email":"willy1233@gmail.com",
               "manufacturer": "Rava4",
                "model": "Rava",
                "price":40000,
                "state": "new"
        };
            chai.request(app)
                .post("/api/v1/car")
                .send(newCar)
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should make purchase order if user exist", (done)=>{
            const newCar ={
                "email":"willy@gmail.com",
               "manufacturer": "Rava4",
                "model": "Rava",
                "price":40000,
                "state": "new"
    };
            chai.request(app)
                .post("/api/v1/order")
                .send(newCar)
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should make purchase order if user not exist", (done)=>{
            const newCar ={
                "email":"willy3663@gmail.com",
                "model":"lamborghini",
                "price":500000
        };
            chai.request(app)
                .post("/api/v1/order")
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should update the price of purchase order if car id exist", (done)=>{
            let id = 1;
            const price ={
                "price":500000
        };
            chai.request(app)
                .patch(`/api/v1/car/${id}/price`)
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });
        
        it("Should update the price of purchase order if car id not exist", (done)=>{
            let id = -1;
            const price ={
                "price":500000
        };
            chai.request(app)
                .patch(`/api/v1/car/${id}/price`)
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should mark posted car as sold if user email exist", (done)=>{
            let id = 5;
            const userEmail ={
                "email":"willy@gmail.com"
        };
            chai.request(app)
                .patch(`/api/v1/car/${id}/status`)
                .send(userEmail)
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should mark posted car as sold if user email not exist", (done)=>{
            let id = 1;
            const userEmail ={
                "email":"willy6438t@gmail.com"
        };
            chai.request(app)
                .patch(`/api/v1/car/${id}/status`)
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        

        it("Should mark posted car as sold if id not exist", (done)=>{
            let id = -1;
            const userEmail ={
                "email":"willy@gmail.com"
        };
            chai.request(app)
                .patch(`/api/v1/car/${id}/status`)
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should update the price of purchase order if car id exist", (done)=>{
            let id = 1;
            const price ={
                "price":500000
        };
            chai.request(app)
                .patch(`/api/v1/car/${id}/price`)
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });
        
        it("Should update the price of a car if car id not exist", (done)=>{
            let id = -1;
            const price ={
                "price":500000
        };
            chai.request(app)
                .patch(`/api/v1/car/${id}/price`)
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should find bodytype when it exist", (done)=>{

            
            chai.request(app)
                .get("/api/v1/car?body_type=truck")
                .end((req,res)=>{
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should not find bodytype when it exist", (done)=>{

            
            chai.request(app)
                .get("/api/v1/car?body_type=truckk")
                .end((req,res)=>{
                    res.should.have.a.status(400);
                    done();
                });
        });



    });
});