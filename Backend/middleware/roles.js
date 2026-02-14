const checkRole = (role) => {
    return (req, res, next) => {
        if (!req.usuario || req.usuario.role !== role) {
            return res.status(403).json({ mensaje: "No tienes permisos para esta acción" });
        }
        next();
    };
};

module.exports = checkRole;
