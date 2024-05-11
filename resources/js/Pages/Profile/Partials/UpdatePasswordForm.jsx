import { useRef } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
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
import { Button } from "@/Components/ui/button";
import { Check } from "lucide-react";

export default function UpdatePasswordForm() {
    const { toast } = useToast();
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    description: (
                        <div className="flex items-center gap-3 align-middle">
                            <Check />
                            <span>Informações salvas.</span>
                        </div>
                    ),
                });
                reset();
            },
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <Card className="mb-2">
            <CardHeader>
                <CardTitle>Atualize a senha</CardTitle>
                <CardDescription>
                    Garante que sua conta esteja utilizando uma senha longa e
                    aleatória para manter-se seguro.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={updatePassword} className="mt-6 space-y-6">
                    <div>
                        <Label htmlFor="current_password">Senha atual</Label>

                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            type="password"
                            className="block w-full mt-1"
                            autoComplete="current-password"
                        />

                        <InputError
                            message={errors.current_password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Nova senha</Label>

                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            className="block w-full mt-1"
                            autoComplete="new-password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">
                            Confirme nova senha
                        </Label>

                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type="password"
                            className="block w-full mt-1"
                            autoComplete="new-password"
                        />

                        <InputError
                            message={errors.password_confirmation}
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
