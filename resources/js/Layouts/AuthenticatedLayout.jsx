import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { ModeToggle } from "@/Components/mode-toggle";
import { ThemeProvider } from "@/Components/theme-provider";

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

export default function Authenticated({ user, header, children }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <nav className="w-full h-[60px] hidden md:flex align-middle items-center justify-between px-10">
                    <Link
                        href={route("dashboard")}
                        className="flex items-center gap-3"
                    >
                        <ApplicationLogo className="w-10 h-10 fill-current" />
                        <h1 className="font-bold uppercase">StockLibre</h1>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="#">Fornecedores</Link>
                        <Link href="#">Produtos</Link>
                        <Link href="#">Logística</Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger>Usuário</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    {user.name}
                                </DropdownMenuLabel>
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
                <nav className="w-full h-[60px] flex md:hidden align-middle items-center justify-between px-10">
                    <Link
                        href={route("dashboard")}
                        className="flex items-center gap-3"
                    >
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
                                <SheetDescription>
                                    <div className="flex flex-col items-center gap-6">
                                        <Link href="#">Fornecedores</Link>
                                        <Link href="#">Produtos</Link>
                                        <Link href="#">Logística</Link>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                Usuário
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>
                                                    {user.name}
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <Link
                                                    href={route("profile.edit")}
                                                >
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
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </nav>
                <main>{children}</main>
            </div>
        </ThemeProvider>
    );
}
