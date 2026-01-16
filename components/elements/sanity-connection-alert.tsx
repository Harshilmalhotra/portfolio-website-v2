"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, WifiOff } from "lucide-react";

interface SanityConnectionAlertProps {
    isError: boolean;
}

export function SanityConnectionAlert({ isError }: SanityConnectionAlertProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isError) {
            setOpen(true);
        }
    }, [isError]);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
                    <div className="flex flex-col gap-4 items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                            <WifiOff className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                                Connection Issue
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-muted-foreground">
                                Your internet service provider or administrator has blocked the content management system to pull data from it. Kindly use another device or change wifi/switch to mobile hotspot.
                            </Dialog.Description>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto"
                        >
                            I Understand, Use Offline Data
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
