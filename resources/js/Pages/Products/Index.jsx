import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { FileSpreadsheet, FileText, Plus, ImageOff } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import TablePagination from "@/Components/TablePagination";
import { useEffect, useRef } from "react";
import { Badge } from "@/Components/ui/badge";

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
                    <CardTitle className="flex items-center justify-between">
                        <div>Fornecedores</div>
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={route("products.export.pdf", {
                                                search: filter,
                                            })}
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
                                                "products.export.xlsx",
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
                                    <TableCell className="flex justify-center max-w-14">
                                        {product.image_url ? (
                                            <img
                                                className="object-contain rounded-full h-14"
                                                src={`/storage/${product.image_url}`}
                                            />
                                        ) : (
                                            <ImageOff className="object-contain rounded-full h-14" />
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <Badge variant="outline">
                                            {product.code}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                product.quantity >
                                                product.minimum
                                                    ? "default"
                                                    : "destructive"
                                            }
                                        >
                                            {product.quantity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{product.location}</TableCell>
                                    <TableCell>
                                        {product.category.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {`
                                        ${
                                            product.length !== undefined &&
                                            product.length
                                                ? `${product.length} cm, `
                                                : ""
                                        }
                                        ${
                                            product.height !== undefined &&
                                            product.height
                                                ? `${product.height} cm, `
                                                : ""
                                        }
                                        ${
                                            product.width !== undefined &&
                                            product.width
                                                ? `${product.width} cm, `
                                                : ""
                                        }
                                        ${
                                            product.weight !== undefined &&
                                            product.weight
                                                ? `${product.weight} Kg`
                                                : ""
                                        }
                                        `}
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
