//function for converting formated date
export const convertFormatDate = (isoDate: string) => {

    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()

    return day + '-' + month + '-' + year

}