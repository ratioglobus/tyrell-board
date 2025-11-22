import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { useRegister } from "../model/use-register";

const registerSchema = z
    .object({
        email: z
            .string()
            .nonempty({ message: "Email обязателен" })
            .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
                message: "Неверный email",
            }),
        password: z
            .string()
            .nonempty({ message: "Пароль обязателен" })
            .min(6, { message: "Пароль должен содержать не менее 6 символов" }),
        confirmPassword: z
            .string()
            .nonempty({ message: "Подтвердите пароль" }),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                message: "Пароли не совпадают",
                code: "custom",
            });
        }
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const { errorMessage, isPending, register } = useRegister();
    const onSubmit = form.handleSubmit(register);

    return (
        <Form {...form}>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="admin@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Подтвердите пароль</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}
                <Button disabled={isPending} type="submit">Зарегистрироваться</Button>
            </form>
        </Form>
    );
}
