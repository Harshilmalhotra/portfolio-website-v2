"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("token");
        router.push("/");
    };

    return (
        <div className="flex flex-col h-[50vh] items-center justify-center gap-4 px-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your dashboard.</p>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}
