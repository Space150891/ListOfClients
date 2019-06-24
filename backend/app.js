const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./connections/mongo.js');
const clientRouter = require('./routes/clientRouter.js');
const providerRouter = require('./routes/providerRouter.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/clients', clientRouter);
app.use('/providers', providerRouter);
app.get('/',(req,res) => res.json('app is working now'));


app.listen(process.env.PORT, () => {
    console.log(`Server runs on http://localhost:'  ${process.env.PORT}  '; Ctrl+C for exit `);
    connectDB();
});
