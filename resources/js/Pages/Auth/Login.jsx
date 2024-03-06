import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Checkbox } from '@/Components/ui/checkbox';
import { ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Entrar" />

            <div className='flex flex-col items-center'>
                <h1 className='text-3xl'>Entre com sua conta</h1>
                <span className='text-md'>Entre com seu e-mail e senha ou use sua rede social</span>
            </div>

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <div className='flex justify-center mt-5'>

                <form className='w-4/6' onSubmit={submit}>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="nome@empresa.com.br"
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
                            placeholder="********"
                            value={data.password}
                            className="block w-full mt-1"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex justify-start pl-1 mt-4">
                        <span className="flex items-center space-x-2">
                            <Checkbox
                                name="remember"
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(e) => setData('remember', e)}
                            />
                            <label htmlFor='remember' className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Lembrar</label>
                        </span>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-muted-foreground"
                            >
                                Esqueceu sua senha?
                            </Link>
                        )}

                        <Button className="ms-4" disabled={processing}>
                            Entrar
                            <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
