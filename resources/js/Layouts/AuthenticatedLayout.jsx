import { ThemeProvider } from "@/Components/theme-provider";
import { Toaster } from "@/Components/ui/toaster"

import Navbar from "@/Components/Navbar";
import ResponsiveNavbar from "@/Components/ResponsiveNavbar";

export default function Authenticated({ user, children }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <Navbar user={user} />
                <ResponsiveNavbar user={user} />
                <main className="px-2 py-12 md:px-10">{children}</main>
            </div>
            <Toaster />
        </ThemeProvider>
    );
}
