require('dotenv').config();

const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./connections/mongo');

const clientRouter = require('./routes/clientRouter');
const swaggerClientRouter = require('./routes/swaggerProviderRouter');
const swaggerProviderRouter = require('./routes/swaggerClientRouter');
const providerRouter = require('./routes/providerRouter');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/clients', clientRouter);
app.use('/providers', providerRouter);
app.get('/',(req,res) => res.json('app is working now'));


const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', swaggerProviderRouter);
app.use('/api/v1', swaggerClientRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server runs on http://localhost:'  ${process.env.PORT}  '; Ctrl+C for exit `);
    connectDB();
});
