import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";
import TOKEN from "./token";
chai.use(chaiHttp);
chai.should();

describe("Cars", () => {
    describe("GET", () => {
        it("Welcome message", (done) => {
            chai.request(app)
                .get(`/`)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should via a car if id provided exist", (done) => {
            let id = 1;
            chai.request(app)
                .get(`/api/v1/car/${id}`)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should return an error if id does not exit", (done) => {
            let id = -1;
            chai.request(app)
                .get(`/api/v1/car/${id}`)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should bring all available cars", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available")
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });



        it("Should not display via unsold cars ", (done) => {
            chai.request(app)
                .get("/api/v1/car/status=sold")
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });
        it("Should filter cars according to status and state", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=new")
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should filter cars according to status and state", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=used")
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should delete existing car", (done) => {
            let id = 1;
            chai.request(app)
                .delete(`/api/v1/car/${id}`)
                .set("x-auth-token", TOKEN)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should not delete car when user are unauthorized", (done) => {
            let id = 1;
            chai.request(app)
                .delete(`/api/v1/car/${id}`)
                .set("x-auth-to",TOKEN)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should filter cars according to status and state(new)", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=new")
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

// To be deleted
        it("Should not filter cars according to status and state(new)", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=new")
                .send({ make: "a"})
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should not filter cars according to status and state(new)", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=new")
                .send({ make: ""})
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not filter cars according to status and state(new)", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=new")
                .send({ make: "nissan"})
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should not filter cars according to status and state(new)", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=used")
                .send({ make: "a"})
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should not filter cars according to status and state(used)", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=used")
                .send({ make: ""})
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not filter cars according to status and state(used)", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=used")
                .send({ make: "nissan"})
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });
// NNNN

        it("Should validate the token before delete", (done) => {
            let id = 1;
            chai.request(app)
                .delete(`/api/v1/car/${id}`)
                .set("x-auth-token", "ss")
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not delete a invalid car", (done) => {
            let id = -1;
            chai.request(app)
                .delete(`/api/v1/car/${id}`)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should via get all cars", (done) => {
            chai.request(app)
                .get("/api/v1/car")
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });
        it("Should create an account", (done) => {
            const newUser = {
                "email": "woo1000@gmail.com",
                "first_name": "magoooo",
                "last_name": "Wiuuuuu",
                "password": "africa",
                "address": "kigali"
            };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should not create an account firstname empty", (done) => {
            const newUser = {
                "email": "woo1000@gmail.com",
                "first_name": "",
                "last_name": "Wiuuuuu",
                "password": "africa",
                "address": "kigali"
            };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });
        it("Should not create an account firstname empty", (done) => {
            const newUser = {
                "email": "",
                "first_name": "dfdndn",
                "last_name": "Wiuuuuu",
                "password": "africa",
                "address": "kigali"
            };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not create an account lastname empty", (done) => {
            const newUser = {
                "email": "woo1000@gmail.com",
                "first_name": "magoooo",
                "last_name": "",
                "password": "africa",
                "address": "kigali"
            };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });
        it("Should not create an account password empty", (done) => {
            const newUser = {
                "email": "woo1000@gmail.com",
                "first_name": "magoooo",
                "last_name": "Wiuuuuu",
                "password": "",
                "address": "kigali"
            };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });
        it("Should not create an account address empty", (done) => {
            const newUser = {
                "email": "woo1000@gmail.com",
                "first_name": "magoooo",
                "last_name": "Wiuuuuu",
                "password": "africa",
                "address": ""
            };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });


        it("Should not create an account if empty fields is given", (done) => {
            const newUser = {
                "email": "woo1000gmail.com",
                "first_name": "ma",
                "last_name": "Wi",
                "password": "",
                "address": ""
            };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not create an account if email already exist", (done) => {
            const newUser = {
                "email": "willy@gmail.com",
                "first_name": "maohdhdh",
                "last_name": "Wiuueueu",
                "password": "africa",
                "address": "kigali"
            };
            chai.request(app)
                .post("/api/v1/auth/signup")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should login when user provide true email", (done) => {
            const newUser = {
                "email": "willy@gmail.com",
                "password": "africa"
            };
            chai.request(app)
                .post("/api/v1/auth/signin")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should  not login when user provide invalid email", (done) => {
            const newUser = {
                "email": "willy",
                "password": "africa"
            };
            chai.request(app)
                .post("/api/v1/auth/signin")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not login when user provide empty password", (done) => {
            const newUser = {
                "email": "willy@gmail.com",
                "password": ""
            };
            chai.request(app)
                .post("/api/v1/auth/signin")
                .send(newUser)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not login when user provide incorrect email", (done) => {
            // rand = Math.floor(Math.random()*1000);
            const newUser = {
                "email": "willyetwt@gmail.com",

            };
            chai.request(app)
                .post("/api/v1/auth/signin")
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not login when user provide incorrect password", (done) => {
            // rand = Math.floor(Math.random()*1000);
            const newUser = {
                "email": "willy@gmail.com",
                "password": "aaaa"

            };
            chai.request(app)
                .post("/api/v1/auth/signin")
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not login when user provide incorrect password", (done) => {
            const newUser = {
                "email": "2324785375785478575",
                "password": "africa"

            };
            chai.request(app)
                .post("/api/v1/auth/signin")
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });


        it("Should create a car post when user provide existing email", (done) => {
            const newCar = {
                email: "willy@gmail.com",
                manufacturer: "Rava4",
                model: "Rava",
                price: 40000,
                state: "new",
                status:"available"
            };
            chai.request(app)
                .post("/api/v1/car")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });
        it("Should create a car post when user provide existing email(sold)", (done) => {
            const newCar = {
                email: "willy@gmail.com",
                manufacturer: "Rava4",
                model: "Rava",
                price: 40000,
                state: "new",
                status:"sold"
            };
            chai.request(app)
                .post("/api/v1/car")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });
        it("Should not create a car post when manufacturer empty", (done) => {
            const newCar = {
                "email": "willy@gmail.com",
                "manufacturer": "",
                "model": "Rava",
                "price": 40000,
                "state": "new"
            };
            chai.request(app)
                .post("/api/v1/car")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not create a car post when model empty", (done) => {
            const newCar = {
                "email": "willy@gmail.com",
                "manufacturer": "Rava4",
                "model": "",
                "price": 40000,
                "state": "new"
            };
            chai.request(app)
                .post("/api/v1/car")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });


        it("Should not create a car post when state empty", (done) => {
            const newCar = {
                "email": "willy@gmail.com",
                "manufacturer": "Rava4",
                "model": "Rava",
                "price": 40000,
                "state": ""
            };
            chai.request(app)
                .post("/api/v1/car")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should create a car post when user provide existing email", (done) => {
            const newCar = {
                "email": "willy@gmail.com",
                "manufacturer": "",
                "model": "",
                "price": 40000,
                "state": ""
            };
            chai.request(app)
                .post("/api/v1/car")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should create a car post when seller provide unkwon email account", (done) => {
            const newCar = {
                "email": "willy1233@gmail.com",
                "manufacturer": "Rava4",
                "model": "Rava",
                "price": 40000,
                "state": "new"
            };
            chai.request(app)
                .post("/api/v1/car")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should make purchase order if user exist", (done) => {
            const newCar = {
                "email": "willy@gmail.com",
                "manufacturer": "Rava4",
                "model": "Rava",
                "price": 40000,
                "state": "new"
            };
            chai.request(app)
                .post("/api/v1/order")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should not make purchase order if model not available", (done) => {
            const newCar = {
                "email": "willy@gmail.com",
                "manufacturer": "Rava4",
                "model": "lamborghini",
                "price": 40000,
                "state": "new"
            };
            chai.request(app)
                .post("/api/v1/order")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should not make purchase order if field empty", (done) => {
            const newCar = {
                "email": "willy@gmail.com",
                "manufacturer": "",
                "model": "",
                "price": 40000,
                "state": "new"
            };
            chai.request(app)
                .post("/api/v1/order")
                .send(newCar)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should make purchase order if user not exist", (done) => {
            const newCar = {
                "email": "willy3663@gmail.com",
                "model": "lamborghini",
                "price": 500000
            };
            chai.request(app)
                .post("/api/v1/order")
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should update the price of purchase order if car id exist", (done) => {
            let id = 2;
            const price = {
                "price": 500000
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/price`)
                .send(price)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should update the price of purchase order if no price", (done) => {
            let id = 1;
            const price = {
                "price": ""
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/price`)
                .send(price)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should update the price of purchase order if car id not exist", (done) => {
            let id = -1;
            const price = {
                "price": 500000
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/price`)
                .send(price)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should update the price of purchase order if order not in pending", (done) => {
            let id = 1;
            const price = {
                "price": 500000
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/price`)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should mark posted car as sold if user email exist", (done) => {
            let id = 5;
            const userEmail = {
                "email": "willy@gmail.com"
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/status`)
                .send(userEmail)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should mark posted car as sold if car already sold", (done) => {
            let id = 5;
            const userEmail = {
                "email": "willy@gmail.com"
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/status`)
                .send(userEmail)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should mark posted car as sold if car not found", (done) => {
            let id = -1;
            const userEmail = {
                "email": "willy@gmail.com"
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/status`)
                .send(userEmail)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should mark posted car as sold if user email not exist", (done) => {
            let id = 1;
            const userEmail = {
                "email": "willy6438t@gmail.com"
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/status`)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });



        it("Should mark posted car as sold if id not exist", (done) => {
            let id = -1;
            const userEmail = {
                "email": "willy@gmail.com"
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/status`)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should update the price of a car if car id not exist", (done) => {
            let id = -1;
            const price = {
                "price": 500000
            };
            chai.request(app)
                .patch(`/api/v1/car/${id}/price`)
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should find bodytype when it exist", (done) => {


            chai.request(app)
                .get("/api/v1/car?body_type=truck")
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should not find bodytype when it exist", (done) => {


            chai.request(app)
                .get("/api/v1/car?body_type=truckk")
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should filter cars according to status and manufacturer", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&manufacturer=nissan")
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });




        it("Should get feedback for car", (done) => {
            const id = 1;
            const data = { id };
            chai.request(app)
                .post("/api/v1/flag")
                .send(data)
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        it("Should bring error feedback for car does not exist", (done) => {
            const id = -1;
            const data = { id };
            chai.request(app)
                .post("/api/v1/flag")
                .send(data)
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should not filter car according to prices", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&min_price=2000&max_price=1000")
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });
        it("Should not filter car when status not available", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=sold&min_price=1000&max_price=15000")
                .end((req, res) => {
                    res.should.have.a.status(200);
                    done();
                });
        });

        // All cars was deleted
        it("Should bring message for empty if no car available", (done) => {
            const ids = [1, 2, 3, 4, 5, 6, 7];
            ids.forEach(id => {
                chai.request(app)
                .delete(`/api/v1/car/${id}`)
                .set("x-auth-token", TOKEN)
                .end((req, res) => { });
            });
            chai.request(app)
                .get("/api/v1/car?status=available")
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should not filter cars according to status and state(new)", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=new")
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should not filter cars according to status and state(used)", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=used")
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should bring error when proveded invalid info", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=availabl")
                .end((req, res) => {
                    res.should.have.a.status(400);
                    done();
                });
        });

        it("Should not filter cars according to status and state", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&state=new")
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        it("Should not filter car according to prices", (done) => {
            chai.request(app)
                .get("/api/v1/car?status=available&min_price=1000&max_price=15000")
                .end((req, res) => {
                    res.should.have.a.status(404);
                    done();
                });
        });

        
    });
});