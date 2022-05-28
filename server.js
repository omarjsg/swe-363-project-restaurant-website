const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
let path = require('path');
const cookieParser = require('cookie-parser');
const port = 8080;      //local port
const mealsRoute = require("./router/meal_router");
const salesRoute = require("./router/sales_router");
//const { getALLMeals, getMealById } = require('./models/meal.js'); // functions to load meals in nunjucks.
const Meal_db = require('./models/meal_db');

app.use(cookieParser());        // Cookie parser middleware.
app.use(express.static(path.join(__dirname, '/public'))); // Assets access middleware.
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library
app.use("/detail", mealsRoute); // Meal router middleware.
app.use("/sales", salesRoute);  // Sales router middleware.


app.set("view engine", "njk")
nunjucks.configure(['views/'], {
    autoescape: false,
    express: app
})

//Loading the homepage.
app.get("/", (req, res) => {
    var mealsInCart = [];
    var cart = req.cookies.cart;
    var recentBought = req.cookies.recentBought;
    var total = 0.0;
    if (cart == null) {
        cartValue = 0;
    } else {
        cartValue = cart.length;
        for (const element of cart) {
            mealsInCart.push(Meal_db.getMealById(element));
            total = total + Meal_db.getMealById(element).price;
        }
        total = parseFloat(total).toFixed(1)
    }
    res.render(
        'index.njk',
        {
            getALLMeals: getALLMeals,
            getMealById: getMealById,
            cart: cartValue,
            mealsInCart: mealsInCart,
            rating: Meal_db.calculateReviewsAverageForAMeal,
            total: total,
            recentBought: recentBought
        })
})

app.post("/", (req, res) => {

});

//Start the server.
app.listen(port, () => {
    console.log(`server is running, started on port ${port}`);
})