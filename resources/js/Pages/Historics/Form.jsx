import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { Textarea } from "@/Components/ui/textarea";
import { useToast } from "@/Components/ui/use-toast";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Check } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useEffect, useRef } from "react";

export default function Form({ auth }) {
    const { toast } = useToast();
    const { data, setData, post, patch, processing, errors } = useForm({
        code: "",
        quantity: 1,
        type: false,
        description: "",
    });

    const codeInput = useRef();

    useEffect(() => {
        codeInput.current.focus();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("historics.store"), {
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
        <Authenticated user={auth.user}>
            <Head title="Logistica" />
            <Card>
                <CardHeader>
                    <CardTitle>Efetuar movimentação</CardTitle>
                    <CardDescription>
                        Nesta tela, você pode facilmente gerenciar o seu
                        estoque, adicionando ou removendo itens com total
                        eficiência. Além disso, é possível utilizar um leitor de
                        código de barras para ler rapidamente o código do
                        produto, facilitando ainda mais a gestão dos seus
                        produtos
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div className="md:gap-4 md:flex">
                            <div>
                                <Label htmlFor="code">Código do Produto</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    name="code"
                                    ref={codeInput}
                                    value={data.code}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("code", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.code}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Label htmlFor="quantity">Quantidade</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    value={data.quantity}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.quantity}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1 mt-4 md:mt-0">
                                <Label htmlFor="type">Tipo de operação</Label>
                                <Select
                                    id="type"
                                    defaultValue={data.type.toString()}
                                    onValueChange={(e) => {
                                        setData("type", e === "true");
                                    }}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="false">
                                            Retirar do Estoque
                                        </SelectItem>
                                        <SelectItem value="true">
                                            Adicionar ao Estoque
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.type}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="block w-full mt-1"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            <p className="mt-1 text-sm text-muted-foreground">
                                Caso não seja preenchido, uma mensagem
                                automática será gerada, descrevendo a operação
                                realizada, garantindo que você tenha um
                                histórico detalhado de todas as alterações
                                feitas no estoque.
                            </p>
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            <Button disabled={processing}>
                                Efetuar movimentação
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Authenticated>
    );
}
