//function for converting number
export const convertNumber = (value : string | number) => {

    return typeof value === "string" ? parseInt(value) : value

}