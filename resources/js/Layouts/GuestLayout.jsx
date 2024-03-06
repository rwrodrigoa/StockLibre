import ApplicationLogo from '@/Components/ApplicationLogo';
import { ModeToggle } from '@/Components/mode-toggle';
import { ThemeProvider } from '@/Components/theme-provider';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <div className='flex w-full h-screen'>
                <div className="md:w-1/2 bg-[url('/img/hero-login.jpg')] bg-contain">
                    <div className='flex-col justify-between hidden h-screen p-5 bg-white bg-opacity-60 dark:bg-opacity-80 dark:bg-black md:flex'>
                        <Link href="/" className='flex items-center gap-3'>
                            <ApplicationLogo className="w-10 h-10 fill-current" />
                            <h1 className='font-bold uppercase'>StockLibre</h1>
                        </Link>
                        <div>
                            <span className='flex italic font-normal text-center'>
                                "A capacidade de simplificar significa eliminar o desnecessário para que o necessário possa falar."
                            </span>
                            <span className='flex justify-end font-normal'>
                                - Hans Hofmann
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center w-full h-screen p-5 md:w-1/2'>
                    {children}
                </div>
            </div>
            <div className='absolute top-5 right-5'>
                <ModeToggle className='fixed bottom-0 left-0' />
            </div>
        </ThemeProvider>
    );
}
