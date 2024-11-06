const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || "Internal Server Error";

    // check for Mongoose Bad ObjectID
    if (err.name === "CastError" && err.kind === "ObjectId") {
        message = `Resource not found with id of ${err.value}`;
        statusCode = 404;
    }

    res.status(statusCode);

    res.json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export { errorHandler, notFound };
