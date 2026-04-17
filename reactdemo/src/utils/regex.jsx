const Email_Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Password_Regex = /^.{4,}$/;

const FirstName_Regex = /^[A-Za-z]{1,20}$/;;

const LastName_Regex = /^[A-Za-z]{1,20}$/;

export const validateEmail = (email) => {
    return Email_Regex.test(email);
};

export const validatePassword = (password) => {
    return Password_Regex.test(password);
};

export const validateFirstName = (firstName) => {
    return FirstName_Regex.test(firstName);
};

export const validateLastName = (lastName) => {
    return LastName_Regex.test(lastName);
};