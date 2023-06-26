const dbConn = require('./config/connection');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
app.use('/api', routes);

dbConn.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
})