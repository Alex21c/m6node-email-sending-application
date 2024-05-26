import e from "express";
import sendEmailController from "../Controllers/SendEmail.Controller.mjs";
import ValidationMiddleware from "../Middlewares/Validation.Middleware.mjs";
// Creating a route
const emailRouter = e.Router();
emailRouter.post('/stock-market-quote', ValidationMiddleware, sendEmailController.sendEmail);

export default emailRouter;