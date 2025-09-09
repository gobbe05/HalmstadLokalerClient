import { Link } from "react-router-dom";

export default function LogoSmall() {
    return (
        <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-primary">H<span className="text-accent">L</span></h1>
        </Link>
    )
}