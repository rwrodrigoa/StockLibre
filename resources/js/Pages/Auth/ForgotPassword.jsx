import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, useForm, Link } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Esqueceu sua senha?" />

            <div className='flex flex-col items-center'>
                <h1 className='text-3xl'>Esqueceu sua senha?</h1>
                <span className='mt-3 text-center text-md'>Sem problema. Apenas digite o e-mai que utilizou para criar sua conta que enviaremos um e-mail para que você
                    possa escolher uma nova senha.</span>
            </div>

            {status && <div className="mt-3 mb-4 text-sm font-medium text-center text-green-600">{status}</div>}

            <div className='flex justify-center mt-5'>

                <form className='w-4/6' onSubmit={submit}>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={data.email}
                        className="block w-full mt-1"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ms-4" disabled={processing}>
                            Enviar e-mail
                            <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </form>
            </div>
            <Link
                href={route('login')}
                className="absolute text-sm bottom-3 right-3 text-muted-foreground"
            >
                Voltar
            </Link>
        </GuestLayout>
    );
}
