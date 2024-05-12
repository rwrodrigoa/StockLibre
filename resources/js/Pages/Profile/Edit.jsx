import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import UpdateCompanyForm from "./Partials/UpdateCompanyForm";



export default function Edit({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Perfil" />

            <UpdateCompanyForm />
            <UpdateProfileInformationForm />
            <UpdatePasswordForm />
            <DeleteUserForm />

        </AuthenticatedLayout>
    );
}
