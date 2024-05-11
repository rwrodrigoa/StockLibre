import InputError from "@/Components/InputError";
import { useForm, usePage } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Check } from "lucide-react";
import { useToast } from "@/Components/ui/use-toast";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

export default function UpdateProfileInformation() {
    const { toast } = useToast();
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            onSuccess: () => {
                toast({
                    description: <div className="flex items-center gap-3 align-middle"><Check /><span>Informações salvas.</span></div>,
                });
            },
        });
    };

    return (
        <Card className="mb-2">
            <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                    Atualize as informações de seu perfil e endereço de e-mail
                    da conta.
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
                            autoComplete="name"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full mt-1"
                            autoComplete="email"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Salvar</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
