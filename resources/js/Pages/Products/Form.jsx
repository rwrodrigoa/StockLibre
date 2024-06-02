import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Textarea } from "@/Components/ui/textarea";
import { useToast } from "@/Components/ui/use-toast";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Barcode, Check, LogIn } from "lucide-react";

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

export default function Form({ auth, product, categories, suppliers }) {
    const { toast } = useToast();
    const { data, setData, post, patch, processing, errors } = useForm({
        code: product?.code ?? "",
        name: product?.name ?? "",
        description: product?.description ?? "",
        price: product?.price ?? "",
        image_url: product?.image_url ?? "",
        quantity: product?.quantity ?? "",
        minimum: product?.minimum ?? "",
        location: product?.location ?? "",
        weight: product?.weight ?? "",
        length: product?.length ?? "",
        width: product?.width ?? "",
        height: product?.height ?? "",
        category_id: product?.category_id ?? "",
        supplier_id: product?.supplier_id ?? "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (product) {
            post(route("products.update", product), {
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
            post(route("products.store"), {
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
        router.delete(route("products.destroy", product));
        toast({
            description: (
                <div className="flex items-center gap-3 align-middle">
                    <Check />
                    <span>Produto removido.</span>
                </div>
            ),
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Produto" />
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div>{product ? "Editar " : "Adicionar"} produto</div>
                        {product && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            target="_blank"
                                            href={route(
                                                "products.label",
                                                product
                                            )}
                                        >
                                            <Button size="sm" variant="outline">
                                                <Barcode />
                                            </Button>
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Gerar etiqueta do produto</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </CardTitle>
                    <CardDescription>
                        Estas são as informações que precisamos saber para
                        cadastrar seu novo produto.
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
                                <Label htmlFor="code">Código</Label>
                                <Input
                                    id="code"
                                    type="text"
                                    name="code"
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
                        </div>
                        <div className="md:gap-4 md:flex">
                            <div className="flex-1">
                                <Label htmlFor="category_id">Categoria</Label>
                                <Select
                                    id="category_id"
                                    defaultValue={data.category_id}
                                    onValueChange={(e) => {
                                        setData("category_id", e);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.category_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1 mt-4 md:mt-0">
                                <Label htmlFor="supplier_id">Fornecedor</Label>
                                <Select
                                    id="supplier_id"
                                    defaultValue={data.supplier_id}
                                    onValueChange={(e) =>
                                        setData("supplier_id", e)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o fornecedor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {suppliers.map((supplier) => (
                                            <SelectItem
                                                key={supplier.id}
                                                value={supplier.id}
                                            >
                                                {supplier.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError
                                    message={errors.supplier}
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
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="md:gap-4 md:flex">
                            <div className="flex-1">
                                <Label htmlFor="price">Preço</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1 mt-4 md:mt-0">
                                <Label htmlFor="quantity">
                                    Quantidade em estoque
                                </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    min="0"
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
                                <Label htmlFor="minimum">
                                    Quantidade mínima
                                </Label>
                                <Input
                                    id="minimum"
                                    type="number"
                                    name="minimum"
                                    min="0"
                                    value={data.minimum}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("minimum", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.minimum}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="location">
                                Localização no estoque (ex: preteleira)
                            </Label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                min="0"
                                value={data.location}
                                className="block w-full mt-1"
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.location}
                                className="mt-2"
                            />
                        </div>
                        <div className="md:gap-4 md:flex">
                            <div className="flex-1">
                                <Label htmlFor="weight">Peso (Kg)</Label>
                                <Input
                                    id="weight"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name="weight"
                                    value={data.weight}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("weight", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.weight}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1 mt-4 md:mt-0">
                                <Label htmlFor="length">Largura (cm)</Label>
                                <Input
                                    id="length"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name="length"
                                    value={data.length}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("length", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.length}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1 mt-4 md:mt-0">
                                <Label htmlFor="width">Comprimento (cm)</Label>
                                <Input
                                    id="width"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name="width"
                                    value={data.width}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("width", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.width}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex-1 mt-4 md:mt-0">
                                <Label htmlFor="height">Altura (cm)</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name="height"
                                    value={data.height}
                                    className="block w-full mt-1"
                                    onChange={(e) =>
                                        setData("height", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.height}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="image_url">Imagem do produto</Label>
                            <div className="flex gap-2 mt-2">
                                <Input
                                    id="image_url"
                                    type="file"
                                    name="image_url"
                                    className="mt-1 dark:file:text-foreground"
                                    onChange={(e) =>
                                        setData("image_url", e.target.files[0])
                                    }
                                />
                                <InputError
                                    message={errors.image_url}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            {product && (
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
                                                fornecedor "{product.name}"?
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
                    {product?.image_url && (
                        <div className="flex flex-col items-center">
                            <hr className="w-full my-5" />
                            <img
                                className="rounded-lg max-h-72"
                                src={`/storage/${product.image_url}`}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </Authenticated>
    );
}
