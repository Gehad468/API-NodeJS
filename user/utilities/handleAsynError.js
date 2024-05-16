exports.handelAcyError = (x) => (req, res, next) => {
        x(req, res).catch((err) => res.json({ message: "error", err }));
    };


