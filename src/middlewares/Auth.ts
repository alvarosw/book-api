import { Request, Response, NextFunction } from 'express'
import TokenHandler from '../helpers/TokenHandler'

export default async function Auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<JSON>> {
  const { authorization: auth } = req.headers

  if (!auth)
    return res.status(403).json({
      message: 'Token de autorização não encontrado nos headers da requisição',
    })

  if (!auth.startsWith('Bearer'))
    return res.status(403).json({
      message: 'Token Bearer não identificado',
    })

  const split = auth.split('Bearer ')
  if (split.length !== 2)
    return res.status(403).json({ message: 'O Token é muito curto' })

  const token = split[1]

  try {
    const decodedToken = await TokenHandler.validateToken(token)
    req.usuario = decodedToken
  } catch (error) {
    return res.status(403).json(error)
  }
  return next()
}
