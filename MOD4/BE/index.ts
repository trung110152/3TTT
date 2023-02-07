import express from 'express';
// @ts-ignore
import {router} from './src/router/router';
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import session from "express-session";
import {AppDataSource} from "./src/data-source";
import cors from 'cors';

const app = express();
AppDataSource.initialize().then(()=>{
    console.log('Connect database success!!!')
})
app.use(cors());
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 }}));
app.use('', router);

app.listen(3000, () => {
    console.log('Server is running')
})