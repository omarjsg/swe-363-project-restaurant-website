const sqlite = require('better-sqlite3');
const { prepare } = require('better-sqlite3/lib/methods/wrappers');
let path = require('path');
const db = new sqlite(path.resolve('Meals_db.db'), { fileMustExist: true });

getMealById = function (mealID) {
    return db.prepare('SELECT * FROM meals WHERE id = ?').get(mealID);
}

getALLMeals = function () {
    return db.prepare('SELECT * FROM meals').all()
}

addMealReview = function (review) {
    return db.prepare("INSERT INTO reviews (reviewer_name, city, date, rating, review, meal_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)").run(review.fullName, review.city, review.date, review.rating, review.message, review.meal_Id, review.uploadedImage);
}

getMealReviews = function (mealID) {
    return db.prepare('SELECT * FROM reviews WHERE meal_Id = ?').all(mealID);
}

calculateReviewsAverageForAMeal = function (mealID) {
    return db.prepare('SELECT ROUND (AVG(rating),2) as rating FROM reviews WHERE meal_Id = ?').get(mealID);
}

module.exports = { getALLMeals, getMealById, getMealReviews, addMealReview, calculateReviewsAverageForAMeal }