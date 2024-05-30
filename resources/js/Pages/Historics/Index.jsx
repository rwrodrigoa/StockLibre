import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { FileSpreadsheet, Plus } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

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

import TablePagination from "@/Components/TablePagination";
import { useEffect, useRef } from "react";

export default function Index({ auth, historics, filter }) {
    const searchInput = useRef();

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    const { data, setData, get, processing, errors } = useForm({
        search: filter.search ?? "",
        date: filter.date ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        get(route("historics.index"), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Histórico" />
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div>Histórico</div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a href={route("historics.export", filter)}>
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
                    </CardTitle>
                    <CardDescription>
                        Nesta tela, é possível monitorar detalhadamente todo o
                        histórico de movimentações efetuadas no estoque. Isso
                        inclui a entrada e saída de mercadorias, ajustes de
                        inventário, transferências entre depósitos e quaisquer
                        outras alterações registradas. Através dessa
                        funcionalidade, você pode acompanhar em tempo real todas
                        as atividades relacionadas ao controle de estoque,
                        garantindo maior transparência e precisão na gestão dos
                        seus recursos. Além disso, o histórico permite rastrear
                        cada movimentação, facilitando auditorias e o
                        gerenciamento eficiente dos produtos armazenados.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between w-full space-x-2 align-middle">
                        <form
                            onSubmit={submit}
                            className="flex flex-col w-full gap-2 md:flex-row"
                        >
                            <Input
                                className="block md:max-w-52 dark:[color-scheme:dark]"
                                id="date"
                                type="date"
                                name="date"
                                value={data.date}
                                onChange={(e) => {
                                    setData("date", e.target.value);
                                }}
                            />
                            <Input
                                id="search"
                                type="text"
                                placeholder="Pesquisar (tipo, produto ou fornecedor) "
                                name="search"
                                ref={searchInput}
                                value={data.search}
                                onChange={(e) => {
                                    setData("search", e.target.value);
                                }}
                            />
                        </form>
                    </div>
                    <Table className="mt-5">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead className="text-center">
                                    Quantidade
                                </TableHead>
                                <TableHead>Produto</TableHead>
                                <TableHead>Descrição</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historics.data.map((historic) => (
                                <TableRow key={historic.id}>
                                    <TableCell className="font-medium">
                                        {new Date(
                                            historic.created_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{historic.type}</TableCell>
                                    <TableCell className="text-center">
                                        {historic.quantity > 0
                                            ? `+${historic.quantity}`
                                            : historic.quantity}
                                    </TableCell>
                                    <TableCell>
                                        {historic.product.name}
                                    </TableCell>
                                    <TableCell className="min-w-52">
                                        {historic.description}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <TablePagination links={historics.links} />
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
}
