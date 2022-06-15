import jwt from 'jsonwebtoken'
const secretKey = 'superSecretKeyThatWouldBeInDotenvFile'
type UserTokenData = {
  id: number,
  nome: string,
  email: string
}

export default class TokenHandler {
  static async validate(token: string): Promise<UserTokenData> {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, async (error) => {
          const tokenDecod = jwt.decode(token)
          const userData = Object(tokenDecod)?.data
    
          if (error) {
            if (error.name == 'TokenExpiredError') {
              const newToken = this.generate(userData)
              reject({ ...error, token: newToken, user: userData })
            }
    
            reject({ message: 'Token inválido'})
          }
    
          resolve(userData)
        })
      })
  }

  static generate({ id, nome, email }: { 
      id: number,
      nome: string,
      email: string
    }) {

    return jwt.sign({
      id,
      nome,
      email
    }, secretKey, { expiresIn: '1d' })
  }
}
