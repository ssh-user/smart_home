const router = require('express').Router();

router.use('*', (req, res) => {
    res.status(404).redirect("/login");
});

module.exports = router;