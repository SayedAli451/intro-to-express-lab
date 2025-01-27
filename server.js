const express = require('express');
const { getRandomNumber } = require('express_random_numbers_generator');
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
const app = express();
const port = 4000;
app.listen(4000, () => {
    console.log('Listening on port 3000')
})


app.get('/roll/:number', (req, res) => {
    // Generate a random number between 0 and 100
    const number = getRandomNumber(0, req.params.number);
    console.log(number);
    res.send(`You rolled a ${number}`);
});

app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index;
    const array1 = collectibles[index];
    if (index >= collectibles.length) {
        res.send("This item is not yet in stock. Check back soon!");
    }

    res.send(`So, you want the ${array1.name}? For ${array1.price}, it can be yours!`);
});

app.get('/shose', (req, res) => {
    const { name, price, type , minPrice , maxPrice } = req.query;
    let filteredShose = shoes;
    if (name) {
        filteredShose = filteredShose.filter(sho => sho.name === name);
    }

    if (price) {
        filteredShose = filteredShose.filter(sho => sho.price === price);
    }
    if (type) {
        filteredShose = filteredShose.filter(sho => sho.type === type);
    }
    if (minPrice) {
        filteredShose = filteredShose.filter(sho => sho.price >= minPrice);
    }
    if (maxPrice) {
        filteredShose = filteredShose.filter(sho => sho.price <= maxPrice);
    }

    res.json(filteredShose);
});

