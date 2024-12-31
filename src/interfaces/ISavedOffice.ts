import IOffice from "./IOffice";

export default interface ISavedOffice {
    _id: string,
    user: string,
    office: IOffice
}