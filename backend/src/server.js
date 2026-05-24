const express = require('express');
const app = express();

app.use(express.json());

//teste
app.get('/', (req, res) => {
  res.json({ message: "rodando" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` servidor rodando na porta ${PORT}`);
});