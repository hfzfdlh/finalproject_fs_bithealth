function errorHandler(err,req,res,next){
    let status = 500
    let message = "Internal server error"
    console.log('ERROR >>>',err)
    let response=""

    if (err.name === "noEmail"){
        status = 400
        message = "Email is not empty"
    } else if (err.name === "noPass"){
        status = 400
        message = "Password is not empty"
    } else if (err.name === "invalidUser"){
        status = 401
        message = "Invalid username/password"
        response = "Unauthorized"
    } else if (err.name === "unauthenticated" || err.name === "JsonWebTokenError"){
        status = 403
        message = "Invalid username/password"
        response = "Unauthorized"
    } else if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
        status = 400
        message = err.errors[0].message
    }

    res.status(status).json({"error":response,message})
}

module.exports = errorHandler