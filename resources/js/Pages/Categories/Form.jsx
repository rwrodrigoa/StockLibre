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

export default function Form({ auth, category }) {
    const { toast } = useToast();
    const { data, setData, post, patch, processing, errors } = useForm({
        name: category?.name ?? "",
        description: category?.description ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (category) {
            patch(route("categories.update", category), {
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
            post(route("categories.store"), {
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
        router.delete(route("categories.destroy", category));
        toast({
            description: (
                <div className="flex items-center gap-3 align-middle">
                    <Check />
                    <span>Categoria removida.</span>
                </div>
            ),
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Categoria" />
            <Card>
                <CardHeader>
                    <CardTitle>
                        {category ? "Editar " : "Adicionar"} categoria
                    </CardTitle>
                    <CardDescription>
                        Uma categoria é um grupo de items ou informações que
                        compartilham uma característica, tema ou propriedade em
                        comum. É como uma caixa de sapatos que pode conter
                        vários pares de sapatos diferentes, todos com um estilo
                        ou marca específica.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
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
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            {category && (
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
                                                deletar a categoria?
                                            </DialogTitle>
                                            <DialogDescription>
                                                Deseja realmente remover a
                                                categoria {category.name}?
                                                Isso irá eliminar todos os
                                                conteúdos e produtos associados
                                                à essa categoria. Confirme se
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
