
const names = /^[A-Za-z ]{4,}$/;
const email = /^\S+@[\w\-]+\.[A-Za-z ]{2,}$/;
const passwd = /^\S{1,}$/;

class validateUser{
    static validateSignup(req, res, next) {
        try {
          req.body.firstname = req.body.first_name.trim();
          req.body.lastname = req.body.last_name.trim();
          req.body.email = req.body.email.trim();
          req.body.password = req.body.password.trim();
         
          if (!email.test(req.body.email)) throw new Error('invalid email, try like this sample ex: willy@gmail.com');
          if (!passwd.test(req.body.password)) throw new Error('invalid password');
          if (!names.test(req.body.firstname)) throw new Error('invalid name, use more than 4 character');
          if (!names.test(req.body.lastname)) throw new Error('invalid names, use more than 4 character');
          next();
        } catch (err) {
          res.status(412).json({
            status: 412,
            error: err.message,
          });
        }
      }
}

export default validateUser;
