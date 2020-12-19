const express = require("express");
const app = express();
const port = 3000
const {
    Pool
} = require("pg");
const bodyParser = require('body-parser')
const pool = new Pool({
    user: "eduar",
    host: "localhost",
    database: "20201219_migracode",
    password: "1459#Adei",
    port: 5432,
});
app.use(bodyParser.json())

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

// Add the PUT endpoint / customers /: customerId and verify you can update a customer email using Postman.
// Add validation for the email before updating the customer record in the database. 
// If the email is empty, return an error message.
// Add the possibility to also update the address, the city, the postcode and the country of a customer. 
// Be aware that if you want to update the city only for example, the other fields should not be changed!
app.put("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;
    const {
        email,
        address,
        city,
        postcode,
        country
    } = req.body;

    pool
        .query("select * from customers WHERE id=$1", [customerId])
        .then(result => {
            if (result.rows.length === 0) {
                res.status(404).send(`Customer with id=${customerId} not found`)
            } else {
                let c = result.rows[0]
                if (email) {
                    c.email = email
                }
                if (address) {
                    c.address = address
                }
                if (city) {
                    c.city = city
                }
                if (postcode) {
                    c.postcode = postcode
                }
                if (country) {
                    c.country = country
                }

                pool.query('update customers set name=$1, email=$2, address=$3, city=$4, postcode=$5, country=$6 where id=$7',
                        [c.name, c.email, c.address, c.city, c.postcode, c.country, customerId])
                    .then(() => res.send(`Customer ${customerId} updated!`))
                    .catch((e) => console.error(e));
            }
        })
        .catch((e) => console.error(e));
})

app.listen(port, () => console.log(`Server listening to port=${port}`))