const express = require("express");
const app = express();
const port = 3000
const {
    Pool
} = require("pg");

const pool = new Pool({
    user: "eduar",
    host: "localhost",
    database: "",
    password: "",
    port: 5432,
});

// Follow the above steps to create a new POST endpoint /hotels to create a new hotel.
// Make sure to add validation for the number of rooms and the hotel name. 
// Test your new API endpoint with Postman and check that the new hotel has been correctly created in your database.

// Add a new POST API endpoint to create a new customer in the customers table.

// Add validation to check that there is no other customer with the same name in the customers table before creating a new customer

// Add the GET endpoints /hotels and /hotels/:hotelId mentioned above and try to use these endpoints with Postman.

// Add a new GET endpoint /customers to load all customers ordered by name.

// Add a new GET endpoint /customers/:customerId to load one customer by ID.

// Add a new GET endpoint /customers/:customerId/bookings to load all the bookings of a specific customer. 
// Returns the following information: check in date, number of nights, hotel name, hotel postcode.

// Add the PUT endpoint /customers/:customerId and verify you can update a customer email using Postman.

// Add validation for the email before updating the customer record in the database. If the email is empty, return an error message.

// Add the possibility to also update the address, the city, the postcode and the country of a customer. 
// Be aware that if you want to update the city only for example, the other fields should not be changed!

// Add the DELETE endpoint /customers/:customerId above and verify you can delete a customer along their bookings with Postman.

// Add a new DELETE endpoint /hotels/:hotelId to delete a specific hotel. 
// A hotel can only be deleted if it doesn't appear in any of the customers' bookings! Make sure you add the corresponding validation before you try to delete a hotel.

app.listen(port, () => console.log(`Server listening to port=${port}`))