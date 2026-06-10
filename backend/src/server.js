const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'rodando' });
});

//rota de saude
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'rodando',
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});