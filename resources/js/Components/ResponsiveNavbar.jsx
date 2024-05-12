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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Menu } from "lucide-react";

export default function ResponsiveNavbar({ user }) {
    return (
        <nav className="w-full h-[60px] flex md:hidden align-middle items-center justify-between px-3">
            <Link href={route("dashboard")} className="flex items-center gap-3">
                <ApplicationLogo className="w-10 h-10 fill-current" />
                <h1 className="font-bold uppercase">StockLibre</h1>
            </Link>
            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <Link
                                className="flex items-center justify-center gap-4 my-8"
                                href={route("dashboard")}
                            >
                                <ApplicationLogo className="w-10 h-10 fill-current" />
                                <span className="font-bold uppercase">
                                    StockLibre
                                </span>
                            </Link>
                        </SheetTitle>
                        <div className="flex flex-col items-center gap-6">
                            <Link href={route('categories.index')}>Categorias</Link>
                            <Link href="#">Fornecedores</Link>
                            <Link href="#">Produtos</Link>
                            <Link href="#">Logística</Link>
                            <Link href={route("profile.edit")}>Perfil</Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full"
                            >
                                Sair
                            </Link>
                            <div>
                                <ModeToggle />
                            </div>
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
