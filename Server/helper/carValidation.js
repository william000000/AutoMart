const email = /^\S+@[\w\-]+\.[A-Za-z ]{2,}$/;
const model = /^[a-zA-Z]{1,}$/;
const price = /^[+-]?([0-9]*[.])?[0-9]+/;
const state = /^[a-zA-Z]{3,}$/;
const manufacturer = /^[a-zA-Z0-9]{1,}$/;

class validateCar {
  static makePurchaseOrder(req, res, next) {
    try {
      req.body.email = req.body.email.trim();
      req.body.model = req.body.model.trim();

      if (!email.test(req.body.email)) throw new Error('invalid email, try like this sample ex: willy@gmail.com');
      if (!price.test(req.body.price)) throw new Error('invalid input price');
      if (!model.test(req.body.model)) throw new Error('invalid input model');
      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: err.message,
      });
    }
  }

  static createCarPost(req, res, next) {
    try {
      req.body.email = req.body.email.trim();
      req.body.state = req.body.state.trim();
      req.body.manufacturer = req.body.manufacturer.trim();
      req.body.model = req.body.model.trim();

      if (!email.test(req.body.email)) throw new Error('invalid email, try like this sample ex: willy@gmail.com');
      if (!model.test(req.body.model)) throw new Error('invalid input model');
      if (!state.test(req.body.state) && (req.body.state!=="new") && (req.body.state!=="used")) throw new Error('invalid input state');
      if (!manufacturer.test(req.body.manufacturer)) throw new Error('invalid input manufacturer');
      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: err.message,
      });
    }
  }

  static validatePurchaseOrder(req, res, next) {
    try {
      if (!price.test(req.body.price)) throw new Error('invalid input price');
      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: err.message,
      });
    }
  }
  static validateMake(req, res, next) {
    try {
      if (!manufacturer.test(req.body.make)) throw new Error('invalid input make');
      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: err.message,
      });
    }
  }
}

export default validateCar;
