const express = require("express");
const app = express();
const port = 3000
const {
    Pool
} = require("pg");

const pool = new Pool({
    user: "eduar",
    host: "localhost",
    database: "20201219_migracode",
    password: "1459#Adei",
    port: 5432,
});

// ENDPOINTS
// Add the GET endpoints /hotels and /hotels/:hotelId mentioned above and try to use these endpoints with Postman.
// Add a new GET endpoint /customers to load all customers ordered by name.
// Add a new GET endpoint /customers/:customerId to load one customer by ID.
// Add a new GET endpoint /customers/:customerId/bookings to load all the bookings of a specific customer. Returns the following information: check in date, number of nights, hotel name, hotel postcode.
app.get("/hotels/:hotelId", function (req, res) {
    const hotelId = req.params.hotelId;
    pool
        .query("SELECT * FROM hotels WHERE id=$1", [hotelId])
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e));
});
app.get("/customers", function (req, res) {
    let query = `SELECT * FROM customers ORDER BY name`;
    pool
        .query(query)
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e));
});
app.get("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;
    pool
        .query("SELECT * FROM customers WHERE id=$1", [customerId])
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e));
});
app.get("/customers/:customerId/bookings", function (req, res) {
    const customerId = req.params.customerId;
    pool
        .query(`SELECT bookings.checkin_date, bookings.nights, hotels.name, hotels.postcode FROM bookings INNER JOIN hotels ON hotels.id = bookings.hotel_id where bookings.customer_id = $1`, [customerId])
        .then((result) => res.json(result.rows))
        .catch((e) => console.error(e));
})

app.listen(port, () => console.log(`Server listening to port=${port}`))