import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { FileSpreadsheet, FileText, Plus } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import TablePagination from "@/Components/TablePagination";
import { useEffect, useRef } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

export default function Index({ auth, categories, filter }) {
    const searchInput = useRef();

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    const { data, setData, get, processing, errors } = useForm({
        search: filter ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        get(route("categories.index"), {
            preserveScroll: true,
        });
    };

    function navigateEdit(category) {
        router.visit(route("categories.edit", category));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categorias" />
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div>Categorias</div>
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={route(
                                                "categories.export.pdf",
                                                { search: filter }
                                            )}
                                        >
                                            <Button size="sm" variant="outline">
                                                <FileText />
                                            </Button>
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Exportar para PDF</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={route(
                                                "categories.export.xlsx",
                                                { search: filter }
                                            )}
                                        >
                                            <Button size="sm" variant="outline">
                                                <FileSpreadsheet />
                                            </Button>
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Exportar para Excel</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        Uma categoria é um grupo de items ou informações que
                        compartilham uma característica, tema ou propriedade em
                        comum. É como uma caixa de sapatos que pode conter
                        vários pares de sapatos diferentes, todos com um estilo
                        ou marca específica.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between w-full space-x-2 align-middle">
                        <form onSubmit={submit} className="w-full">
                            <Input
                                className="max-w-sm"
                                id="search"
                                type="text"
                                placeholder="Pesquisar (nome ou descrição) "
                                name="search"
                                ref={searchInput}
                                value={data.search}
                                onChange={(e) => {
                                    setData("search", e.target.value);
                                }}
                            />
                        </form>
                        <div>
                            <Link href={route("categories.create")}>
                                <Button variant="outline" size="icon">
                                    <Plus />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <Table className="mt-5">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead className="text-right">
                                    Data
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.data.map((category) => (
                                <TableRow
                                    className="cursor-pointer"
                                    key={category.id}
                                    onClick={() => navigateEdit(category)}
                                >
                                    <TableCell className="font-medium">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        {category.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {new Date(
                                            category.created_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <TablePagination links={categories.links} />
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
}
