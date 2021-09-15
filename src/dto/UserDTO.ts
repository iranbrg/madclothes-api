export default interface UserDTO {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthdate?: Date,
    phoneNumber?: string,
    cpf?: string,
    zipCode?: string,
    isAdmin: boolean,
}
