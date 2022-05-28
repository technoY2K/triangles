import { Link } from "@remix-run/react";

export default function Navbar() {
    return (
        <nav className="text-[#f8f8f2] text-2xl">
            <ul className="flex flex-row justify-start gap-5">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/resume">Résumé</Link>
            </ul>
        </nav>
    );
}
