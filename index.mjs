import e from "express";
import multer from "multer";
import emailRouter from "./Routes/SendEmail.Route.mjs";
import morgan from "morgan";
import 'dotenv/config'

const app = e();

const PORT=4000;
const upload=multer();
app.use(morgan('dev'));
app.use("/api/v1/send-email", upload.none(),  emailRouter);

// Error handling middleware
app.use((err, req, res, next)=> {
  console.log('ERROR', err.message);
  res.status(err.status).json({
    success: false,
    message: err.message
  })
});

app.listen(PORT, ()=>{
  console.log(`Express Server is up and running at port ${PORT}`);
})