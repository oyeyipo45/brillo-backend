import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp'
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan' 
// import { notFound, errorHandler } from '../middleware/errorMiddleware';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use(cors());

// Sanitize data
app.use(mongoSanitize());

// Set Security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate Limiting for Api requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100,
});

// Add rate limiter to prevent spanning
app.use(limiter);

//Prevent HTTP params pollution
app.use(hpp());

// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(
    `app running in  ${process.env.NODE_ENV} mode  on PORT ${PORT}`
  )
);