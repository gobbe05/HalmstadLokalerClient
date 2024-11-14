import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/">
            <h1 className="text-3xl font-light">HalmstadLokaler<span className="text-blue-400">.</span></h1>
        </Link>
    )
}