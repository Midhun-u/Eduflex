//function for converting string to number
export const convertNumber = (value : string | number) : number => {

    return typeof value === "string" ? parseInt(value) : value

}