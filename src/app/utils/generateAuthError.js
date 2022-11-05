function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Не верный логин или пароль";
        case "INVALID_PASSWORD":
            return "Не верный логин или пароль";
        case "USER_DISABLED":
            return "Ваш аккаунт временно заблокирован администрацией";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        default:
            return "Слишком много попыток входа ! Попробуйте позднее .";
    }
}

export default generateAuthError;
