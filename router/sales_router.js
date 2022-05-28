const express = require('express');
const { query } = express;
let router = express.Router();

meals = []

router.get('/cart', function (req, res) {
    const id = req.query.id;
    const back = req.query.back;
    meals.push(id)
    res.cookie("cart", meals)
    res.redirect(back);
})

router.post('/cart', function (req, res) {
    const id = req.query.id;
    const back = req.query.back;
    for (let i = 0; i < req.body.amount; i++) {
        meals.push(id);
    }
    res.cookie("cart", meals)
    res.redirect(back);
})

router.post('/order', function (req, res) {
    var cart = req.cookies.cart;
    if (cart != null) {
        console.log(req.body);
        res.cookie("recentBought", cart)
        res.clearCookie("cart");
        meals = []
        res.redirect("/");
        res.end()
    }
})

module.exports = router;