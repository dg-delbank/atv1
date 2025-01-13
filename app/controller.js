function insert(req, res) {
    const body = req.body;
    if (typeof body === 'object' && body !== null) {
        res.json(body);
    } else {
        res.status(400).send("Então...     mande certo! kkkkkKKKKKKKKKKKKKkkkkkkkkkkkkkkkkk");
    }
}

module.exports = { insert };
