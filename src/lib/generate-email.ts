export const generateEmail = (
  role: string,
  first_name: string,
  last_name: string,
  dob: Date
) => {
  const email = `${role}.${first_name.toLowerCase()}${last_name.toLowerCase()}_${dob.getDay()}`;
  return email;
};

// ex. teacher.johndoe_1.gmail.com
