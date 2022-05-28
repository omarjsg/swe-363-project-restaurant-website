const express = require('express');
let router = express.Router();
const meals = require('../models/meal.js')
const Meal_db = require('../models/meal_db');
const multer = require("multer");
const imgStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/reviewImages");
    }, //path to upload
    filename: (req, file, callback) => { //filename template
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: imgStorage })

router.get('/:mealId', function (req, res) {
    let mealNumber = req.params.mealId
    var mealsInCart = []
    var total = 0
    let meal = Meal_db.getMealById(mealNumber);
    var cart = req.cookies.cart
    if (cart == null) {
        cartValue = 0;
    } else {
        cartValue = cart.length;
        for (const element of cart) {
            mealsInCart.push(Meal_db.getMealById(element))
            total = total + Meal_db.getMealById(element).price
        }
        total = parseFloat(total).toFixed(1)
    }
    res.render('details.njk', { meal: meal, rating: Meal_db.calculateReviewsAverageForAMeal, reviews: Meal_db.getMealReviews(mealNumber), nutrition: meals[mealNumber - 1].nutrition, facts: meals[mealNumber - 1].nutrition.facts, cart: cartValue, mealsInCart: mealsInCart, total: total })
});

router.get('/:mealId/reviews', function (req, res) {
    let mealNumber = req.params.mealId;
    let reviews = Meal_db.getMealReviews(mealNumber);
    res.json(reviews)
});

router.post('/:mealId/reviews', upload.single('uploadedImage'), function (req, res) {
    try {
        let mealNumber = req.params.mealId;
        newReview = req.body;
        newReview.date = formatDate(new Date());
        newReview.meal_Id = parseInt(mealNumber);
        newReview.rating /= 20;
        req.body.uploadedImage = req.file.filename;
        Meal_db.addMealReview(newReview);
        let reviews = Meal_db.getMealReviews(mealNumber);
        res.json(reviews)
    } catch (e) {
        console.log(`Error: ${e}`)
    }
});
const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

const formatDate = (date) => {
    return date.toLocaleString("en-US", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    })
}

module.exports = router;