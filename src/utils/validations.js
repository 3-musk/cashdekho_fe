export const emailValidation = (email) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return email.match(isValidEmail) ? email.match(isValidEmail)[0] === email : false;
}

const passwordValidation = (password) => {
    const errors = [];

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isLengthValid = password.length >= 8 && password.length <= 14;

    if (!hasLowercase) {
        errors.push("Password must contain at least one lowercase letter.");
    }

    if (!hasUppercase) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    if (!hasNumber) {
        errors.push("Password must contain at least one digit.");
    }

    if (!hasSpecialChar) {
        errors.push("Password must contain at least one special character (@$!%*?&).");
    }

    if (!isLengthValid) {
        errors.push("Password length must be between 8 and 14 characters.");
    }

    return errors;
};

