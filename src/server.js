const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/test', (req, res) => {
	res.status(200).json({ status: 'OK' });
});

app.listen(port, () => {
	console.log(`Server is listening on PORT ${port}`);
});
