import { useState } from "react";
import { Home, Menu, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { NavLink } from "react-router-dom";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={`border-b ${isMenuOpen ? "mb-40" : ""}`}>
            <div className="flex h-16 items-center gap-6 justify-start px-6 bg-gradient-to-r from-indigo-500 shadow-lg">
                <div className="flex items-center gap-4">
                    <span className="font-semibold text-indigo-50 flex items-center gap-4">
                        <Search className="h-5 w-5" />
                        BUSCA DOE
                    </span>
                    <Separator orientation="vertical" className="h-6 hidden lg:block" />
                </div>

                <button
                    className="lg:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Menu Navigation */}
                <nav
                    className={`flex-col text-indigo-50 lg:flex-row lg:flex items-start lg:items-center space-x-0 lg:space-x-6 lg:space-y-0 space-y-4 absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto p-4 lg:p-0 z-10 lg:z-auto transition-all duration-300 ease-in-out ${isMenuOpen ? "flex text-indigo-600" : "hidden"
                        }`}  // Adiciona a cor diferente para o texto no mobile quando o menu está aberto
                >
                    <NavLink to="/" onClick={closeMenu}>
                        <div className='flex flex-row justify-center items-center gap-2 font-semibold  hover:text-indigo-300'>
                            <Home className="h-5 w-5" />
                            Início
                        </div>
                    </NavLink>
                </nav>
            </div>
        </div>
    );
}
