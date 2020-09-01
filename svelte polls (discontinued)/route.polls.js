const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/polls", (req, res, next) => {
	try {		
		const data = require("./data.json");
		
		res.json(data.polls);
	} catch (err) {
		next(err);
	}
});

router.post("/polls", (req, res, next) => {	
	const poll = req.body;
	addPoll(poll)
		.then((data) => res.json(data))
		.catch((err) => next(err));
});

async function addPoll(poll) {
	const data = require("./data.json");	
	let polls = [...data.polls, poll];
	let newData = { polls };
	console.log(newData)
	fs.writeFile("data.json", JSON.stringify(newData), err => {
		console.log(err);
	});
	return {status: "success"}
}

module.exports = router;
