const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect to DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 4000;

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});
