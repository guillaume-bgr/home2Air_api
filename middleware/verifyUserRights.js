function verifyUserRights(req, res, next) {
    if (req.baseUrl.includes('customers')) {
        if (parseInt(res.tokenId) !== parseInt(req.params.id)) {
            if (res.tokenRole !== 'ADMIN') {
                return res.status(401).json({ message: 'Not allowed to access this ressource' });
            }
        }
    }
    next();
}

module.exports = verifyUserRights