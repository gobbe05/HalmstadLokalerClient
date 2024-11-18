export default function Footer() {
    return (
        <div className="w-full text-gray-700 bg-white p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">HalmstadLokaler</h3>
                    <p className="text-sm mt-2 hover:text-blue-500 cursor-pointer transition-all">Om HalmstadLokaler</p>
                    <p className="text-sm hover:text-blue-500 cursor-pointer transition-all">Kontakta oss</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Lokalsökande</h3>
                    <p className="text-sm mt-2 hover:text-blue-500 cursor-pointer transition-all">Hitta lokal</p>
                    <p className="text-sm hover:text-blue-500 cursor-pointer transition-all">Hitta fastighetsägare</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Support</h3>
                    <p className="text-sm mt-2 hover:text-blue-500 cursor-pointer transition-all">FAQ</p>
                    <p className="text-sm hover:text-blue-500 cursor-pointer transition-all">Terms & Conditions</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Social</h3>
                    <p className="text-sm mt-2 hover:text-blue-500 cursor-pointer transition-all">Facebook</p>
                    <p className="text-sm hover:text-blue-500 cursor-pointer transition-all">Instagram</p>
                </div>
            </div>

            <div className="mt-12 text-center">
                <p className="text-sm font-light text-gray-500">© 2024 HalmstadLokaler, Halmstad</p>
            </div>
        </div>

    )
}