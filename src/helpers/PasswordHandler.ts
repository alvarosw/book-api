import bcrypt from "bcrypt"

export default class PasswordHandler {
  static toHash({ password }: { password: string}) {
    return bcrypt.hash(password, 5)
  }

  static compare({ unhashed, hashed }: Record<string, string>) {
    return bcrypt.compare(unhashed, hashed.replace(/^\$2y(.+)$/i, '$2a$1'))
  }
}
