import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../../integration/auth";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ProtectedLayout() {
    const [status, setStatus] = useState("loading");
    const auth = localStorage.getItem("token");
    useEffect(() => {
        // Jika dari awal tidak ada token, langsung cut
        if (!auth) {
            setStatus("unauthenticated");
            return;
        }

        const verifyUser = async () => {
            try {
                // Panggil endpoint /me
                // Axios Interceptor akan otomatis menyelipkan token ini di header
                await getMe();
                setStatus("authenticated");
            } catch (err) {
                console.error("Token invalid or expired", err);
                // Jika error (misal token diisi asal atau sudah expired)
                localStorage.removeItem("token");
                setStatus("unauthenticated");
            }
        };

        verifyUser();
    }, [auth]);
    // Berikan feedback loading agar user tidak melihat "flash" konten dashboard
    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-10 w-10 animate-spin text-red-600" />
                    <p className="text-sm font-medium text-gray-500">Memverifikasi identitas...</p>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return <Navigate to="/auth" replace />;
    }

    // Jika "authenticated", baru tampilkan isi dashboard
    return <Outlet />;

}