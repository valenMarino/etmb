import express, {RequestHandler} from 'express';
import http from 'http';
import mongose from 'mongoose';
import {config} from './config/config';
import Logger from './library/logger';
import TeamRouter from '../src/routes/TeamRoutes';
mongose
    .connect(config.mongo.url, {retryWrites: true, w: 'majority'})
    .then(() => {
        Logger.info('Connected to mongoDB');
        RunServer();
    })
    .catch((e) => {
        Logger.error('Unable to connect: ');
        Logger.error(e);
    });

const router = express();

const RunServer = () => {
    router.use((req, res, next) => {
        Logger.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logger.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({extended: true}));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    //routes
    router.use('/team', TeamRouter);

    //healthcheck
    router.get('/ping', (req, res, next) => res.status(200).json({message: 'pong'}));

    router.use((req, res, next) => {
        const error = new Error('not found');
        Logger.error(error);

        return res.status(404).json({message: error.message});
    });

    http.createServer(router).listen(config.server.port, () => Logger.info(`Server is running on port ${config.server.port}`));
};
