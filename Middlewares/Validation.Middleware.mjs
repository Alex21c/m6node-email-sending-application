import validator from "validator";
export default function ValidationMiddleware(req, res, next){
  const {email} = req.body;
  // console.log(email);  
  if(!validator.isEmail(email)){
    const error  = new Error('Invalid e-mail address!');
    error.status = 400;
    next(error);
  }
  // default is
    next();
}