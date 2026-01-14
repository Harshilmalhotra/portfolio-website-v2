"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { X, Send } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});

export function ContactForm() {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast.success("Message sent!");
        setOpen(false);
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="rounded-full">Contact Me <Send className="ml-2 h-4 w-4" /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm p-6">
                    <DrawerHeader className="flex justify-between items-center">
                        <DrawerTitle>Contact Me</DrawerTitle>
                        <DrawerClose><Button variant="ghost" size="icon"><X className="h-4 w-4" /></Button></DrawerClose>
                    </DrawerHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="message" render={({ field }) => (
                                <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
