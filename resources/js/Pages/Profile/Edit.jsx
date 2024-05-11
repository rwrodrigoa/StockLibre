import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";



export default function Edit({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Perfil" />

            <UpdateProfileInformationForm />
            <UpdatePasswordForm />
            <DeleteUserForm />

        </AuthenticatedLayout>
    );
}
