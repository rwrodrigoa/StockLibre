import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";
import {
    Check,
    FileBox,
    Mail,
    Package,
    Phone,
    Tags,
    UserRoundCheck,
} from "lucide-react";
import { useToast } from "@/Components/ui/use-toast";
import moment from "moment";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

import {
    Card,
    CardContent,
    CardDescription,
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

export default function Dashboard({
    auth,
    sums,
    reverify,
    outStockProducts,
    historics,
}) {
    const { toast } = useToast();
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing } = useForm({
        name: user.company.name,
        document: user.company.document,
        reverify: moment(user.company.reverify)
            .add(3, "months")
            .format("YYYY-MM-DD"),
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("company.update"), {
            onSuccess: () => {
                toast({
                    description: (
                        <div className="flex items-center gap-3 align-middle">
                            <Check />
                            <span>Informações salvas.</span>
                        </div>
                    ),
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {reverify && (
                <Alert className="mb-4">
                    <FileBox className="w-4 h-4" />
                    <AlertTitle>Atenção: Recontagem de Estoque</AlertTitle>
                    <AlertDescription>
                        O grande dia da recontagem de estoque chegou!
                        Certifique-se de que todos os itens estão contabilizados
                        corretamente.
                    </AlertDescription>
                    <form
                        className="flex items-end justify-end w-full"
                        onSubmit={submit}
                    >
                        <Button size="sm" disabled={processing}>
                            Já efetuei
                        </Button>
                    </form>
                </Alert>
            )}

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>
                        Seja muito bem vindo(a), {auth.user.name}!
                    </CardTitle>
                    <CardDescription>
                        Bem-vindo ao{" "}
                        <span className="font-bold">StockLibre</span>! Estamos
                        ansiosos para ter você como parte da nossa comunidade.
                        Nossa equipe trabalhou arduamente para criar uma
                        plataforma segura, eficiente e fácil de usar. Esperamos
                        que você aproveite todas as nossas funcionalidades e se
                        torne um usuário satisfeito e ativo.
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="flex flex-col gap-4 md:flex-row">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Tags /> Categorias
                        </CardTitle>
                        <CardDescription>
                            Total de categorias registradas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge className="font-extrabold">
                            {sums.sum_categories}
                        </Badge>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserRoundCheck /> Fornecedores
                        </CardTitle>
                        <CardDescription>
                            Total de fornecedores registrados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge className="font-extrabold">
                            {sums.sum_suppliers}
                        </Badge>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package /> Produtos
                        </CardTitle>
                        <CardDescription>
                            Produtos com estoque normal/baixo
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-x-2">
                        <Badge className="font-extrabold">
                            {sums.sum_products_ok}
                        </Badge>
                        <Badge variant="destructive" className="font-extrabold">
                            {sums.sum_products_minimum}
                        </Badge>
                    </CardContent>
                </Card>
            </div>

            {outStockProducts && (
                <Card className="my-4">
                    <CardHeader>
                        <CardTitle>Produtos com estoque baixo</CardTitle>
                        <CardDescription>
                            Produtos que a quantidade em estoque está abaixo do
                            mínimo configurado.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table className="mt-5">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Quantidade</TableHead>
                                    <TableHead>Fornecedor</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {outStockProducts.map((product) => (
                                    <TableRow key={product.id}>
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
                                        <TableCell>
                                            {product.supplier?.name}
                                        </TableCell>

                                        <TableCell className="flex justify-end gap-2">
                                            {product.supplier?.email && (
                                                <a
                                                    href={`mailto:${product.supplier?.email}`}
                                                >
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                </a>
                                            )}
                                            {product.supplier?.phone && (
                                                <a
                                                    href={`tel:+55${product.supplier?.phone.replace(
                                                        /[-()\s]/g,
                                                        ""
                                                    )}`}
                                                >
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        <Phone className="w-4 h-4" />
                                                    </Button>
                                                </a>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            <Card className="my-4">
                <CardHeader>
                    <CardTitle>Últimas movimentações</CardTitle>
                    <CardDescription>
                        Nesta seção, vamos lhe dar um panorama geral de tudo o
                        que está acontecendo em seu estoque. Você vai descobrir
                        o que fez, quando e (quase) por quê. É como ter um
                        assistente pessoal de estoque sempre à disposição – sem
                        os intervalos de café e queixas sobre a bagunça do
                        estoque (estamos trabalhando nisso).
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                            {historics.map((historic) => (
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
            </Card>
        </AuthenticatedLayout>
    );
}
