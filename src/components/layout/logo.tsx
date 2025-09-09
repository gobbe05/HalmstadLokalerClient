import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-primary">Halmstad<span className="text-accent">Lokaler</span>.</h1>
        </Link>
    )
}