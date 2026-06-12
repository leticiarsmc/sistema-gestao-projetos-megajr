require('dotenv').config();

const express = require('express');

const memberRoutes = require('./routes/member.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'rodando' });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API Mega Jr rodando',
  });
});

app.use('/members', memberRoutes);
app.use('/dashboard', dashboardRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});