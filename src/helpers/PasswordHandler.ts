import bcrypt from "bcrypt"

export function toHashPassword({ password }: { password: string}) {
  return bcrypt.hash(password, 5)
}

export function comparePassword({ unhashed, hashed }: Record<string, string>) {
  return bcrypt.compare(unhashed, hashed.replace(/^\$2y(.+)$/i, '$2a$1'))
}