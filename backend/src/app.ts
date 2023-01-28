import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import passport from "passport";
import passportMiddleware from "./middleware/passport"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors';
import mainRoute from './routes/main';
import authRoutes from './routes/auth';
import fileRoutes from './routes/file';
import { dbCred }  from "./config/keys";

const app = express();
app.use(helmet());
dotenv.config();


mongoose.set('strictQuery', true);
mongoose.connect(dbCred.mongoURI)
    .then(() => console.log('mongo db connected'))
    .catch(e => console.log(e.message));
app.use(passport.initialize());
passportMiddleware(passport);

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use('/', mainRoute);
app.use('/auth', authRoutes);
app.use('/file', fileRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});