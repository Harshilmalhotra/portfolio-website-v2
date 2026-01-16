"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, WifiOff } from "lucide-react";

interface SanityConnectionAlertProps {
    isError: boolean;
}

export function SanityConnectionAlert({ isError }: SanityConnectionAlertProps) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        // Cast window to any to attach custom property
        const w = window as any;

        if (isError && !w.sanityAlertDismissed) {
            setOpen(true);
            setStep(1);
        }
    }, [isError]);

    const handleAction = () => {
        if (step === 1) {
            setStep(2);
        } else {
            setOpen(false);
            // Set flag on window object to prevent reopening on client-side navigation
            (window as any).sanityAlertDismissed = true;
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={(val) => {
            if (!val) {
                (window as any).sanityAlertDismissed = true;
            }
            setOpen(val);
        }}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
                    <div className="flex flex-col gap-4 items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                            {step === 1 ? (
                                <WifiOff className="h-6 w-6 text-red-600 dark:text-red-400" />
                            ) : (
                                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                                {step === 1 ? "Connection Issue" : "Data Accuracy Warning"}
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-muted-foreground">
                                {step === 1
                                    ? "Your internet service provider or administrator has blocked the content management system to pull data from it. Kindly use another device or change wifi/switch to mobile hotspot."
                                    : "The offline data may not be accurate, real data might have been changed."
                                }
                            </Dialog.Description>
                        </div>
                        <button
                            onClick={handleAction}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto"
                        >
                            {step === 1 ? "I Understand" : "Close"}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
