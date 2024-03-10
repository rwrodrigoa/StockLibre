import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifique seu e-mail" />

            <div className='flex flex-col items-center'>
                <h1 className='text-3xl'>Verifique seu e-mail</h1>
                <span className='mt-3 text-center text-m'>
                    Obrigado por se cadastrar! Antes de começar, você poderia verificar seu endereço de e-mail clicando no
                    link que acabamos de enviar para você? Se você não recebeu o e-mail, teremos prazer em enviar outro.
                </span>
            </div>
            <div className='flex justify-center mt-5'>
                <form className='w-4/6' onSubmit={submit}>
                    <div className="flex items-center justify-center mt-4">
                        <Button className="ms-4" disabled={processing}>
                            Enviar novamente
                            <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </form>
            </div>
            {status === 'verification-link-sent' && (
                    <div className="mt-3 mb-4 text-sm text-center text-green-600 font-sm">
                        Um novo link de verificação foi enviado para o endereço de e-mail que você forneceu durante o registro.
                    </div>
                )}
            <Link
                href={route('logout')}
                method="post"
                as="button"
                className="absolute text-sm bottom-3 right-3 text-muted-foreground"
            >
                Sair
            </Link>
        </GuestLayout>
    );
}
