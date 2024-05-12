import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Textarea } from "@/Components/ui/textarea";
import { useToast } from "@/Components/ui/use-toast";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Check } from "lucide-react";

export default function Form({ auth, category }) {
    const { toast } = useToast();
    const { data, setData, post, patch, processing, reset, errors } = useForm({
        name: category?.name ?? "",
        description: category?.description ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (category) {
            patch(route("categories.update"), {
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
                                id="name"
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
                            <Button disabled={processing}>Salvar</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Authenticated>
    );
}
