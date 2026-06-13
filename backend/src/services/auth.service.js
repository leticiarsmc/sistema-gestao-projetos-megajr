const prisma = require('../lib/prisma');

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      member: true,
    },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user.password !== password) {
    throw new Error('Senha inválida');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    member: user.member,
  };
}

module.exports = {
  login,
};