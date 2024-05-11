import { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <Card className="mb-2">
            <CardHeader>
                <CardTitle>Remover Conta</CardTitle>
                <CardDescription>
                    Uma vez que sua conta for deletada, todos os recursos e
                    dados associados serão permanentemente excluídos. Antes de
                    deletar sua conta, por favor, baixe qualquer dado ou
                    informação que deseje manter.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Remover</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Você tem certeza de que deseja deletar sua
                                conta?
                            </DialogTitle>
                            <DialogDescription>
                                Uma vez que sua conta for deletada, todos os
                                recursos e dados associados serão
                                permanentemente excluídos. Por favor, digite sua
                                senha para confirmar que gostaria de deletar
                                permanentemente sua conta.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="">
                            <Label htmlFor="password">Senha</Label>

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <DialogFooter>
                            <form onSubmit={deleteUser} className="flex items-end justify-end gap-2">
                                <Button
                                    variant="destructive"
                                    disabled={processing}
                                >
                                    Remover Conta
                                </Button>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            </form>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
