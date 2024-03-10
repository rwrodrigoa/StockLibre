import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Criar conta" />

            <Link href="/" className='absolute flex items-center gap-3 md:hidden top-3'>
                <ApplicationLogo className="w-10 h-10 fill-current" />
                <h1 className='font-bold uppercase'>StockLibre</h1>
            </Link>

            <div className='flex flex-col items-center'>
                <h1 className='text-3xl'>Cadastre uma nova conta</h1>
                <span className='mt-3 text-center text-md'>Precisamos destas informações básicas para criar um novo cadastro</span>
            </div>

            <div className='flex justify-center mt-5'>

                <form className='w-4/6' onSubmit={submit}>

                    <Input
                        id="name"
                        name="name"
                        placeholder="Nome completo"
                        value={data.name}
                        className="block w-full mt-1"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <span className="mt-2 text-sm text-muted-foreground">
                        Seu nome, a empresa será cadastrada posteriormente.
                    </span>

                    <InputError message={errors.name} className="mt-2" />

                    <div className="mt-4">
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={data.email}
                            className="block w-full mt-1"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <span className="mt-2 text-sm text-muted-foreground">
                            Usar um e-mail corporativo é a melhor forma de separar a vida pessoal da profissional.
                        </span>

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={data.password}
                            className="block w-full mt-1"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <span className="mt-2 text-sm text-muted-foreground">
                            Use pelo menos 8 caracteres, com letras maiúsculas e minúsculas, números e símbolos.
                        </span>

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirme a senha"
                            value={data.password_confirmation}
                            className="block w-full mt-1"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ms-4" disabled={processing}>
                            Cadastrar
                            <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </form>
            </div>
            <Link
                href={route('login')}
                className="absolute text-sm bottom-3 right-3 text-muted-foreground"
            >
                Já tem uma conta? Entre aqui
            </Link>
        </GuestLayout>
    );
}
