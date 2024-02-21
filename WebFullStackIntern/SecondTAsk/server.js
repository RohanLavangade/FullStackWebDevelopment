const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/money_tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});

// Expense model
const Expense = mongoose.model('Expense', {
    description: String,
    amount: Number
});

// Middleware
app.use(express.json());

// Routes
app.post('/expenses', async (req, res) => {
    try {
        const { description, amount } = req.body;
        const expense = new Expense({ description, amount });
        await expense.save();
        res.status(201).send(expense);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.send(expenses);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
