import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { ModeToggle } from "@/Components/mode-toggle";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function Navbar({ user }) {
    return (
        <nav className="w-full h-[60px] hidden md:flex align-middle items-center justify-between px-10">
            <Link href={route("dashboard")} className="flex items-center gap-3">
                <ApplicationLogo className="w-10 h-10 fill-current" />
                <h1 className="font-bold uppercase">StockLibre</h1>
            </Link>
            <div className="flex items-center gap-6">
                <Link href={route("categories.index")}>Categorias</Link>
                <Link href={route("suppliers.index")}>Fornecedores</Link>
                <Link href={route("products.index")}>Produtos</Link>
                <Link href="#">Logística</Link>
                <Link href={route("historics.index")}>Histórico</Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>Usuário</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={route("profile.edit")}>
                            <DropdownMenuItem className="cursor-pointer">
                                Perfil
                            </DropdownMenuItem>
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="w-full"
                        >
                            <DropdownMenuItem className="cursor-pointer">
                                Sair
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}
