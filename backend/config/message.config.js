const passwordMessage = {
    required:"Le mot de passe doit être fourni",
    min:"Le mot de passe doit avoir au minimum 12 caractères",
    max:"Le mot de passe doit avoir au maximum 256 caractères",
    format:"Le mot de passe doit contenir au moins un chiffre, une lettre, une majuscule et un caractère spécial"
};

const emailMessage = {
    required:"L'email doit être fournie"
}

const undefinedMessage = "Les paramètres ne sont pas définis";

module.exports = {
    emailMessage,
    passwordMessage,
    undefinedMessage
};

