const express = require('express');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
