const express = require('express');
const app = express();
const htmlRoutes = require('./routes/html-route');
const apiRoutes = require('./routes/api-route');
const PORT = 3001;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`server running`);
});
