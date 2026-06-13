require('dotenv').config();

const express = require('express');

const memberRoutes = require('./routes/member.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const projectRoutes = require('./routes/project.routes');
const allocationRoutes = require('./routes/allocation.routes');
const {
  swaggerUi,
  swaggerDocument,
} = require('./swagger');

const app = express();
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/members', memberRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/projects', projectRoutes);
app.use('/allocations', allocationRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});

server.on('error', (error) => {
  console.error('Erro ao iniciar servidor:', error);
});
