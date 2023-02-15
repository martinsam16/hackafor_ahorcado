import createError from 'http-errors';
import express from 'express';

import indexRouter from './routes/index.js';
import cors from "cors";

const app = express();


app.options('*', cors())
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

export default app;
