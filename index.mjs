import e from "express";
import multer from "multer";
import emailRouter from "./Routes/SendEmail.Route.mjs";
import morgan from "morgan";
import 'dotenv/config'

const app = e();

const PORT=4000;
app.use(morgan('dev'));
app.use(e.urlencoded());
// CORS
  app.use((req, res, next) => {    
    if(req.headers.host.includes('localhost')){
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
    }else{
      res.header('Access-Control-Allow-Origin', 'https://m6node-email-sending-application.vercel.app');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
  });
  app.use((req, res, next) => {

    next();
  });


// const upload=multer();

// app.use("/api/v1/send-email", upload.none(),  emailRouter);
app.use("/api/v1/send-email",  emailRouter);

// Error handling middleware
app.use((err, req, res, next)=> {
  console.log('ERROR', err.message);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message
  })
});

app.listen(PORT, ()=>{
  console.log(`Express Server is up and running at port ${PORT}`);
})