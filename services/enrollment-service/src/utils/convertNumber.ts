//function for converting string to number
export const convertNumber = (value : string | number) : number => {

    const valueNumber = typeof value === "string" ? parseInt(value) : value
    return valueNumber

}