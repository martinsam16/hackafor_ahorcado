import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', function (req, res, next) {
    res.send({message: 'Ahorcado WS Server running!'});
});

export default indexRouter;
