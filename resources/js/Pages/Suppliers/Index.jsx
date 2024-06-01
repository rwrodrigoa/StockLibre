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

export default function Index({ auth, suppliers, filter }) {
    const searchInput = useRef();

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    const { data, setData, get, processing, errors } = useForm({
        search: filter ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        get(route("suppliers.index"), {
            preserveScroll: true,
        });
    };

    function navigateEdit(supplier) {
        router.visit(route("suppliers.edit", supplier));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Fornecedores" />
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div>Fornecedores</div>
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={route(
                                                "suppliers.export.pdf",
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
                                                "suppliers.export.xlsx",
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
                        Um fornecedor, também conhecido como provedor ou
                        supplier, é uma empresa ou indivíduo que fornece
                        produtos ou serviços a outra empresa, organismo ou
                        indivíduo. É responsável por produzir, manusear e
                        entregar os materiais ou serviços necessários para que
                        você possa realizar suas atividades ou produzir seus
                        produtos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between w-full space-x-2 align-middle">
                        <form onSubmit={submit} className="w-full">
                            <Input
                                className="max-w-sm"
                                id="search"
                                type="text"
                                placeholder="Pesquisar (nome, cnpj, endereço, telefone ou e-mail)"
                                name="search"
                                ref={searchInput}
                                value={data.search}
                                onChange={(e) => {
                                    setData("search", e.target.value);
                                }}
                            />
                        </form>
                        <div>
                            <Link href={route("suppliers.create")}>
                                <Button variant="outline" size="icon">
                                    <Plus />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <Table className="mt-5">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Nome
                                </TableHead>
                                <TableHead>CNPJ</TableHead>
                                <TableHead>Endereço</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>E-mail</TableHead>
                                <TableHead className="text-right">
                                    Data
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suppliers.data.map((supplier) => (
                                <TableRow
                                    className="cursor-pointer"
                                    key={supplier.id}
                                    onClick={() => navigateEdit(supplier)}
                                >
                                    <TableCell className="font-medium">
                                        {supplier.name}
                                    </TableCell>
                                    <TableCell>{supplier.document}</TableCell>
                                    <TableCell>{supplier.address}</TableCell>
                                    <TableCell>{supplier.phone}</TableCell>
                                    <TableCell>{supplier.email}</TableCell>
                                    <TableCell className="text-right">
                                        {new Date(
                                            supplier.created_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <TablePagination links={suppliers.links} />
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
}
