const authMiddleware = (req, res, next) => {
    if(req.headers.rol == "admin"){
        next()
    }else{
        res.send('No tiene privilegios de administrador')
    }
}

module.exports = { authMiddleware }