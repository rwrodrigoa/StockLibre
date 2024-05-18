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

export default function Index({ auth, products, filter }) {
    const searchInput = useRef();

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    const { data, setData, get, processing, errors } = useForm({
        search: filter ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        get(route("products.index"), {
            preserveScroll: true,
        });
    };

    function navigateEdit(supplier) {
        router.visit(route("products.edit", supplier));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Produtos" />
            <Card>
                <CardHeader>
                    <CardTitle>Produtos</CardTitle>
                    <CardDescription>
                        Um produto é qualquer artigo ou item criado para atender
                        às necessidades humanas, seja para consumo pessoal ou
                        industrial. Pode ser tangível (ou seja, físico) ou
                        intangível (ou seja, não físico).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between w-full space-x-2 align-middle">
                        <form onSubmit={submit} className="w-full">
                            <Input
                                className="max-w-sm"
                                id="search"
                                type="text"
                                placeholder="Pesquisar (código, nome, descrição, localização)"
                                name="search"
                                ref={searchInput}
                                value={data.search}
                                onChange={(e) => {
                                    setData("search", e.target.value);
                                }}
                            />
                        </form>
                        <div>
                            <Link href={route("products.create")}>
                                <Button variant="outline" size="icon">
                                    <Plus />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <Table className="mt-5">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Imagem</TableHead>
                                <TableHead>Código</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Quantidade</TableHead>
                                <TableHead>Localização</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead className="text-right">
                                    Medidas
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.data.map((product) => (
                                <TableRow
                                    className="cursor-pointer"
                                    key={product.id}
                                    onClick={() => navigateEdit(product)}
                                >
                                    <TableCell className="max-w-14">
                                        <img
                                            className="object-contain rounded-full h-14 "
                                            src={`/storage/${product.image_url}`}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {product.code}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.location}</TableCell>
                                    <TableCell>
                                        {product.category.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {product.weight}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <TablePagination links={products.links} />
                </CardFooter>
            </Card>
        </AuthenticatedLayout>
    );
}
