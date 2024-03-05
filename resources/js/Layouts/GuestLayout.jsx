import ApplicationLogo from '@/Components/ApplicationLogo';
import { ThemeProvider } from '@/Components/theme-provider';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </ThemeProvider>
    );
}
