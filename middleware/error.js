module.exports = function(err, req, res, next) {
    res.status(500).send({ message: 'Something has gone terribly wrong.' });
}