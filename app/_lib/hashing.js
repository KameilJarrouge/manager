import bcrypt from "bcryptjs";

export function hashPass(password) {
  if (!password) return undefined;
  return bcrypt.hashSync(password);
}

export function isSamePass(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
