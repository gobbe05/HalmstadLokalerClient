export default interface IOffice {
    _id: string,
    name?: string,
    location: string,
    description: string,
    price: number,
    size: number,
    images: Array<string>,
    files: Array<string>,
    thumbnails: Array<string>,
    hidden: boolean,
}