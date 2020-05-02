const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('layouts/list', {});
});

module.exports = router;