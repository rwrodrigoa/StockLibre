import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { withMask } from "use-mask-input";

export default function Form({ auth, supplier }) {
    const { toast } = useToast();
    const { data, setData, post, patch, processing, errors } = useForm({
        name: supplier?.name ?? "",
        document: supplier?.document ?? "",
        address: supplier?.address ?? "",
        phone: supplier?.phone ?? "",
        email: supplier?.email ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (supplier) {
            patch(route("suppliers.update", supplier), {
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
        } else {
            post(route("suppliers.store"), {
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
        }
    };

    const remove = (e) => {
        router.delete(route("suppliers.destroy", supplier));
        toast({
            description: (
                <div className="flex items-center gap-3 align-middle">
                    <Check />
                    <span>Fornecedor removido.</span>
                </div>
            ),
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Fornecedor" />
            <Card>
                <CardHeader>
                    <CardTitle>
                        {supplier ? "Editar " : "Adicionar"} fornecedor
                    </CardTitle>
                    <CardDescription>
                        Estas são as informações que precisamos saber para
                        cadastrar seu novo fornecedor.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div className="md:gap-4 md:flex">
                            <div className="md:flex-1">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Label htmlFor="document">CNPJ</Label>
                                <Input
                                    id="document"
                                    type="text"
                                    name="document"
                                    ref={withMask("99.999.999/9999-99")}
                                    value={data.document}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("document", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.document}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="address">Endereço</Label>
                            <Input
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="block w-full mt-1"
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>
                        <div className="md:gap-4 md:flex">
                            <div className="flex-1">
                                <Label htmlFor="phone">Telefone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    ref={withMask("(99) 99999-9999")}
                                    value={data.phone}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1 mt-4 md:mt-0">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            {supplier && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="destructive">
                                            Remover
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Você tem certeza de que deseja
                                                deletar o fornecedor?
                                            </DialogTitle>
                                            <DialogDescription>
                                                Deseja realmente remover o
                                                fornecedor "{supplier.name}"?
                                                Isso irá eliminar todos os
                                                conteúdos e produtos associados
                                                à esse fornecedor. Confirme se
                                                está certo para proceder com a
                                                remoção.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={remove}
                                            >
                                                Sim, desejo remover
                                            </Button>
                                            <DialogClose asChild>
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                >
                                                    Cancelar
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                            <Button disabled={processing}>Salvar</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Authenticated>
    );
}
