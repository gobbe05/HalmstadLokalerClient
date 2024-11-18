import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-light text-gray-800">HalmstadLokaler<span className="text-blue-400">.</span></h1>
        </Link>
    )
}