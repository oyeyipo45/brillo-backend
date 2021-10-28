import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import { notFound , errorHandler } from './middleware/errorMiddleware.js'
import authRoute from './routes/auth.js';
import connectDB from './config/db.js'

dotenv.config();


const app = express();

connectDB()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

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

// App routes
app.use(`/api/v1/auth`, authRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('server is running');
  });
}

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`app running in  ${process.env.NODE_ENV} mode  on PORT ${PORT}`));
