const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}

const validateMinLength = (input, minLength) => {
    const length = input.length;
    return (minLength <= length)
}

const validateMaxLength = (input, maxLength) => {
    const length = input.length;
    return (length <= maxLength)
}

const validatePhone = (phone) => {
    const regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
    return (phone.length === 10 && regex.test(phone))
}

const isImage = (fileType) => {
    return (fileType === 'image/jpeg' || fileType === 'image/png')
}

const sizeLessMegaByte = (inputByte, megaByte) =>{
    return inputByte/Math.pow(1024,2) < megaByte;    
}

export {
    validateEmail,
    validateMinLength,
    validateMaxLength,
    validatePhone,
    sizeLessMegaByte,
    isImage
}