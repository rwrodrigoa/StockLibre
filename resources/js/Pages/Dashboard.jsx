import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";
import { Check, FileBox, Package, Tags, UserRoundCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { useToast } from "@/Components/ui/use-toast";
import moment from "moment";
import { Button } from "@/Components/ui/button";

export default function Dashboard({ auth, sums, reverify }) {
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
                <CardContent></CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
