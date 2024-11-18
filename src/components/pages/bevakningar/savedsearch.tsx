import IOffice from "../../../interfaces/IOffice"
import OfficeCardLong from "../../cards/officecardlong"

const SavedSearch = ({office}: {office: IOffice}) => {
    return (
        <div>
            <OfficeCardLong office={office}/>
        </div>
    )
}

export default SavedSearch