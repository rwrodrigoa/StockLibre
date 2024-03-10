import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, useForm, Link } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { ArrowRight } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Redefinir Senha" />

            <Link href="/" className='absolute flex items-center gap-3 md:hidden top-3'>
                <ApplicationLogo className="w-10 h-10 fill-current" />
                <h1 className='font-bold uppercase'>StockLibre</h1>
            </Link>

            <div className='flex flex-col items-center'>
                <h1 className='text-3xl'>Redefinir senha</h1>
                <span className='mt-3 text-center text-md'>S
                    Hora de criar uma nova senha, entre com seu e-mail e a nova senha que você deseja utilizar
                </span>
            </div>

            <div className='flex justify-center mt-5'>

                <form className='w-4/6' onSubmit={submit}>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="mt-4">
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Nova senha"
                            value={data.password}
                            className="block w-full mt-1"
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirme a nova senha"
                            value={data.password_confirmation}
                            className="block w-full mt-1"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ms-4" disabled={processing}>
                            Redefinir senha
                            <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
