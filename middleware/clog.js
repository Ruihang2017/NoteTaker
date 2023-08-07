exports.clog = (req, res, next) => {
    const fgCyan = '\x1b[32m';

    switch (req.method) {
        case 'GET': {
            console.info(`${fgCyan}${req.method} request to ${req.path}`);
            break;
        }
        case 'POST': {
            console.info(`${fgCyan}${req.method} request to ${req.path}`);
            break;
        }
        default: {
            console.info(`${fgCyan}${req.method} request to ${req.path}`);
            break;
        }
    }
    next();
};

// exports.clog = clog;