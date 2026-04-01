import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const saltRounds = 10;
  try {
    const result = await bcrypt.hash(password, saltRounds);
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function verificarAcceso(
  password: string,
  hashedPassword: string,
) {
  try {
    // Comparar la contraseña ingresada con el hash
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log({ error: error });
    return null;
  }
}
