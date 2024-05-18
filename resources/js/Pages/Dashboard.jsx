import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";
import { Package, Tags, UserRoundCheck } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function Dashboard({ auth, sums }) {
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
                        que está acontecendo em seu estoque. Você vai
                        descobrir o que fez, quando e (quase) por quê. É
                        como ter um assistente pessoal de estoque sempre à
                        disposição – sem os intervalos de café e queixas sobre a
                        bagunça do estoque (estamos trabalhando nisso).
                    </CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
