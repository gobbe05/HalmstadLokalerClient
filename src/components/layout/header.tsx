import { useState, useEffect } from "react";
import Links from "./links";
import Logo from "./logo";
import { IoClose, IoMenu } from "react-icons/io5";
import LogoSmall from "./logosmall";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle escape key for accessibility
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <>
            <header 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3' 
                        : 'bg-white py-4'
                }`}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Logo />
                        <div className="hidden md:block">
                            <Links />
                        </div>
                        <button
                            onClick={() => setOpen(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Öppna meny"
                            aria-expanded={open}
                        >
                            <IoMenu size={28} className="text-neutral" />
                        </button>
                    </div>
                </nav>
            </header>
            {/* Spacer to prevent content from going under fixed header */}
            <div className="h-20" />
            <SidePanel open={open} setOpen={setOpen} />
        </>
    );
}

interface SidePanelProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidePanel = ({ open, setOpen }: SidePanelProps) => {
    // Prevent body scroll when panel is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
                    open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setOpen(false)}
                aria-hidden="true"
            />
            
            {/* Panel */}
            <div
                className={`fixed top-0 right-0 h-screen w-[300px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation meny"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <Logo />
                        <button
                            onClick={() => setOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Stäng meny"
                        >
                            <IoClose size={28} className="text-neutral" />
                        </button>
                    </div>
                    <nav className="mt-8">
                        <Links />
                    </nav>
                </div>
            </div>
        </>
    );
}