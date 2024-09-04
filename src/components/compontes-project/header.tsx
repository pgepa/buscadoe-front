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
        <div className={`border-b ${isMenuOpen ? "mb-40" : ""}`}> {/* Adiciona margem inferior quando o menu está aberto */}
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

                <nav
                    className={`flex-col lg:flex-row lg:flex items-start lg:items-center space-x-0 lg:space-x-6 lg:space-y-0 space-y-4 absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto lg:bg-transparent p-4 lg:p-0 z-10 lg:z-auto transition-all duration-300 ease-in-out ${isMenuOpen ? "flex" : "hidden"
                        }`}
                >
                    <NavLink to="/" onClick={closeMenu}>
                        <div className='flex flex-row justify-center items-center gap-2 text-indigo-50 font-semibold hover:text-indigo-200'>

                            <Home className="h-5 w-5" />
                            Início

                        </div>

                    </NavLink>

                </nav>


            </div>
        </div>
    );
}
