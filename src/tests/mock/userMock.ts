const userMock = {
  validUser: {
    nome: 'Usuário Teste',
    email: 'jestuser@node.com',
    password: 'superSecret@100'
  },
  invalidUser: {
    nome: 'Usuário Teste',
    email: ''
  },
  successfulLogin: {
    email: 'jestuser@node.com',
    password: 'superSecret@100'
  },
  unsuccessfulLogin: {
    email: 'jestuser@node.com',
    password: 'wrongpassword'
  }
}

export default userMock