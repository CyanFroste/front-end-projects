const express = require("express");
const ip = require("ip");
const cors = require("cors");
const app = express();

// enable cors
app.use(cors());
// express bodyparser
app.use(express.json());
// use to serve production build

// app.use(express.static("./app/public"));
// using the routes
app.use(require("./route.polls"));

// error handling middleware
app.use(require("./error-handler"));

const PORT = 80;
app.listen(process.env.PORT || PORT, () => {
	console.log(`\n port: ${PORT} \n network ip: ${ip.address()}`);
});
