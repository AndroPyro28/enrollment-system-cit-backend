import bcrypt from "bcrypt";

export const generateHashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const generatePassword = (firstName: string, birthDate: Date) => {
  const bday = new Date(birthDate);
  const month =
    bday.getMonth() + 1 < 10 ? `0${bday.getMonth() + 1}` : bday.getMonth() + 1;
  const day = bday.getDate() < 10 ? `0${bday.getDate()}` : bday.getDate();
  const pass = `@${firstName}${day}${month}${bday.getFullYear()}`;
  return pass;
};
