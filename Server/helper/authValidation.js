
const names = /^[A-Za-z ]{1,}$/;
const email = /^\S+@[\w\-]+\.[A-Za-z ]{2,}$/;
const passwd = /^[A-Za-z0-9]{6,}$/;
const address = /^[A-Za-z0-9]{2,}$/;

class validateUser {
  static validateSignup(req, res, next) {
    try {
      req.body.firstname = req.body.first_name.trim();
      req.body.lastname = req.body.last_name.trim();
      req.body.email = req.body.email.trim();
      req.body.address = req.body.address.trim();
      req.body.password = req.body.password.trim();

      if (!email.test(req.body.email)) throw new Error('invalid email, try like this sample ex: willy@gmail.com');
      if (!((req.body.password).length>5)) throw new Error('invalid password');
      if (!names.test(req.body.firstname)) throw new Error('invalid name, use more than 4 character');
      if (!names.test(req.body.lastname)) throw new Error('invalid names, use more than 4 character');
      if (!address.test(req.body.address)) throw new Error('invalid address, use more than 4 character');
      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: err.message
      });
    }
  }

  static validateLogin(req, res, next) {
    try {
      req.body.email = req.body.email.trim();
      req.body.password = req.body.password.trim();

      if (!email.test(req.body.email)) throw new Error('invalid email, try like this sample ex: willy@gmail.com');
      if (!((req.body.password).length>0)) throw new Error('invalid password');
      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        error: err.message,
      });
    }
  }
}

export default validateUser;
