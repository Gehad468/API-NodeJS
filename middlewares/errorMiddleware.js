

const sendErrForDev=(err,res)=>
{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
}
const sendErrForProd=(err,res)=>
{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}


const globlaError=(err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
if(process.env.NODE_ENV==='development')
{

    sendErrForDev(err,res);
}
else
{
    sendErrForProd(err,res);
}

};

module.exports=globlaError;