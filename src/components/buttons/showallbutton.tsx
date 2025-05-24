import { Link } from "react-router-dom";

const ShowAllButton = ({link, text}: {link: string, text: string}) => {
    return (
        <Link to={link} className="text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white rounded-full px-4 py-2 transition-all">Visa alla dina annonser</Link>
    )
}

export default ShowAllButton;