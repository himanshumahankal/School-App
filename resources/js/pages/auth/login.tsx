import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" tabIndex={3} />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

            </form>

            <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                <p className="mb-3 text-sm font-medium text-muted-foreground">Test Accounts (Password: 123456)</p>
                <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Admin:</span>
                        <button
                            type="button"
                            onClick={() => {
                                setData('email', 'admin@school.com');
                                setData('password', '123456');
                            }}
                            className="font-mono text-primary hover:underline"
                        >
                            admin@school.com
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Teacher:</span>
                        <button
                            type="button"
                            onClick={() => {
                                setData('email', 'test_teacher@school.com');
                                setData('password', '123456');
                            }}
                            className="font-mono text-primary hover:underline"
                        >
                            test_teacher@school.com
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Parent:</span>
                        <button
                            type="button"
                            onClick={() => {
                                setData('email', 'test_parent@school.com');
                                setData('password', '123456');
                            }}
                            className="font-mono text-primary hover:underline"
                        >
                            test_parent@school.com
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Student:</span>
                        <button
                            type="button"
                            onClick={() => {
                                setData('email', 'test_student@school.com');
                                setData('password', '123456');
                            }}
                            className="font-mono text-primary hover:underline"
                        >
                            test_student@school.com
                        </button>
                    </div>
                </div>
            </div>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
