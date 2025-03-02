import bcrypt from "bcrypt";
const saltRounds = 10;

// Function to hash password
export function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

// Function to compare password with hashed password
export function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}
