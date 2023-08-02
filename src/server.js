const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const shortid = require('shortid');
const fs = require('fs/promises');
const path = require('path');

const port = process.env.PORT || 4000;
const dbLocation = path.resolve('src', 'data.json');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

/**
 * @TODO: No Error handling applied yet. (try catch, global error middleware)
 */
app.put('/:id', async (req, res) => {
	const id = req.params.id;

	const data = await fs.readFile(dbLocation);
	const players = JSON.parse(data);

	let player = players.find((item) => item.id == id);

	if (!player) {
		player = {
			id: shortid.generate(),
			...req.body,
		};

		players.push(player);
	} else {
		player.name = req.body.name || player.name;
		player.country = req.body.country || player.country;
		player.rank = req.body.rank || player.rank;
	}

	await fs.writeFile(dbLocation, JSON.stringify(players));

	res.status(200).json(player);
});

/**
 * @TODO: No Error handling applied yet. (try catch, global error middleware)
 */
app.patch('/:id', async (req, res) => {
	const id = req.params.id;

	const data = await fs.readFile(dbLocation);
	const players = JSON.parse(data);

	const player = players.find((item) => item.id == id);

	if (!player) {
		return res.status(404).json({ massage: 'Player not found' });
	}

	player.name = req.body.name || player.name;
	player.country = req.body.country || player.country;
	player.rank = req.body.rank || player.rank;

	await fs.writeFile(dbLocation, JSON.stringify(players));

	res.status(200).json(player);
});

/**
 * @TODO: No Error handling applied yet. (try catch, global error middleware)
 */
app.get('/:id', async (req, res) => {
	const id = req.params.id;

	const data = await fs.readFile(dbLocation);
	const players = JSON.parse(data);

	const player = players.find((item) => item.id === id);

	if (!player) {
		return res.status(404).json({ massage: 'player not found' });
	}

	res.status(200).json(player);
});

/**
 * @TODO: No Error handling applied yet. (try catch, global error middleware)
 */
app.post('/', async (req, res) => {
	const player = {
		...req.body,
		id: shortid.generate(),
	};
	const data = await fs.readFile(dbLocation);
	const players = JSON.parse(data);

	players.push(player);
	await fs.writeFile(dbLocation, JSON.stringify(players));

	res.status(201).json(player);
});

/**
 * @TODO: No Error handling applied yet. (try catch, global error middleware)
 */
app.get('/', async (req, res) => {
	const data = await fs.readFile(dbLocation);
	const players = JSON.parse(data);

	res.status(200).json(players);
});

app.get('/test', (req, res) => {
	res.status(200).json({ status: 'OK' });
});

app.listen(port, () => {
	console.log(`Server is listening on PORT ${port}`);
});
