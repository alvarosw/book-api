const userMock = {
  validUser: {
    name: 'Usuário Teste',
    email: 'jestuser@node.com',
    password: 'superSecret@100'
  },
  invalidUser: {
    name: 'Usuário Teste',
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
};

export default userMock;