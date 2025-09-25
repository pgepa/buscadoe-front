import { Header } from "../../components/compontes-project/header"
import { Outlet } from "react-router-dom"

export function AppLayout() {
    return (
        <div className="flex min-h-screen flex-col antialiased">

            <Header />

            <div className="flex flex-1 flex-col gap-4 p-2 sm:p-8 pt-2 sm:pt-6">

                <Outlet />

                <footer className="w-full text-center p-4 sm:p-6">
                    <div className="inline-flex items-center justify-center space-x-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                            Copyright © PGE-PA {new Date().getFullYear()} | DTIGD - Todos os direitos reservados
                        </p>
                    </div>
                </footer>

            </div>



        </div>
    )
}