import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
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
import TablePagination from "@/Components/TablePagination";
import { useEffect, useRef } from "react";

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
                    <CardTitle>Categorias</CardTitle>
                    <CardDescription>
                        Explore ou adicione: todas as categorias registradas em
                        nosso sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between w-full space-x-2 align-middle">
                        <form onSubmit={submit}>
                            <Input
                                className="max-w-sm"
                                id="search"
                                type="text"
                                placeholder="Pesquisar"
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
                                <TableHead className="w-[100px]">
                                    Nome
                                </TableHead>
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