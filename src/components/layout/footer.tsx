import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="w-full text-white bg-primary p-8 mt-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-4">
                <div>
                    <h3 className="text-xl font-semibold">HalmstadLokaler</h3>
                    <Link to="/om-oss"><p className="text-sm text-white mt-2 hover:text-accent cursor-pointer transition-all">Om HalmstadLokaler</p></Link>
                    <p className="text-sm hover:text-accent cursor-pointer transition-all">Kontakta oss</p>
                </div>

                {/* Hide for now
                <div>
                    <h3 className="text-xl font-semibold">Lokalsökande</h3>
                    <p className="text-sm mt-2 hover:text-accent cursor-pointer transition-all">Hitta lokal</p>
                    <p className="text-sm hover:text-accent cursor-pointer transition-all">Hitta fastighetsägare</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Support</h3>
                    <p className="text-sm mt-2 hover:text-accent cursor-pointer transition-all">FAQ</p>
                    <p className="text-sm hover:text-accent cursor-pointer transition-all">Terms & Conditions</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">Social</h3>
                    <p className="text-sm mt-2 hover:text-accent cursor-pointer transition-all">Facebook</p>
                    <p className="text-sm hover:text-accent cursor-pointer transition-all">Instagram</p>
                </div> */}
            </div>

            <div className="mt-12 text-center">
                <p className="text-sm font-light">© 2024 HalmstadLokaler, Halmstad</p>
            </div>
        </div>

    )
}