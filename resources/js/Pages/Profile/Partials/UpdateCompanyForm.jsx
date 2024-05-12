import InputError from "@/Components/InputError";
import { useForm, usePage } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Check } from "lucide-react";
import { useToast } from "@/Components/ui/use-toast";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { withMask } from "use-mask-input";

import moment from "moment";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function UpdateCompanyForm() {
    const { toast } = useToast();
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing } = useForm({
        name: user.company.name,
        document: user.company.document,
        phone: user.company.phone ?? "",
        reverify: moment(user.company.reverify).format("YYYY-MM-DD"),
        image_url: user.company.image_url ?? "",
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
        <Card className="mb-2">
            <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>
                    Atualize as informações da sua empresa.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <Label htmlFor="company-image">Logomarca</Label>
                        <div className="flex gap-2 mt-2">
                            <Avatar>
                                <AvatarImage
                                    src={`/storage/${user.company.image_url}`}
                                />
                                <AvatarFallback>
                                    {user.company.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <Input
                                id="company-image"
                                type="file"
                                name="image_url"
                                className="mt-1 dark:file:text-foreground"
                                onChange={(e) =>
                                    setData("image_url", e.target.files[0])
                                }
                            />
                        </div>
                        <InputError
                            message={errors.image_url}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="company-name">Nome</Label>
                        <Input
                            id="company-name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="block w-full mt-1"
                            autoComplete="name"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="company-document">CNPJ</Label>
                        <Input
                            id="company-document"
                            type="text"
                            name="document"
                            ref={withMask("99.999.999/9999-99")}
                            value={data.document}
                            className="block w-full mt-1"
                            autoComplete="document"
                            onChange={(e) =>
                                setData("document", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.document}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="company-phone">Telefone</Label>
                        <Input
                            id="company-phone"
                            type="text"
                            name="phone"
                            ref={withMask("(99) 99999-9999")}
                            value={data.phone}
                            className="block w-full mt-1"
                            autoComplete="phone"
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="company-reverify">
                            Próxima contagem de estoque
                        </Label>
                        <Input
                            id="company-reverify"
                            type="date"
                            name="reverify"
                            value={data.reverify}
                            className="block w-full mt-1 dark:[color-scheme:dark]"
                            autoComplete="reverify"
                            onChange={(e) =>
                                setData("reverify", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.reverify}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Salvar</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
