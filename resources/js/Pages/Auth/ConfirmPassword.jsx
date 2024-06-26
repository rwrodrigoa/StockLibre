import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, useForm, Link } from '@inertiajs/react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { ArrowRight } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="Confirme sua senha" />

            <Link href="/" className='absolute flex items-center gap-3 md:hidden top-3'>
                <ApplicationLogo className="w-10 h-10 fill-current" />
                <h1 className='font-bold uppercase'>StockLibre</h1>
            </Link>

            <div className='flex flex-col items-center'>
                <h1 className='text-3xl'>Confirme sua senha</h1>
                <span className='mt-3 text-center text-md'>Esta é uma área segura da aplicação. Por favor digite sua senha para continuar</span>
            </div>

            <div className='flex justify-center mt-5'>
                <form className="w-4/6" onSubmit={submit}>
                    <div className="mt-4">
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Sua senha"
                            value={data.password}
                            className="block w-full mt-1"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ms-4" disabled={processing}>
                            Continuar
                            <ArrowRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
