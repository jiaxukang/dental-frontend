"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'
import { toast } from 'sonner'

function signIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();
    const [loader, setLoader] = React.useState(false);
    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            router.push('/');
        }
        return () => {
            // Cleanup function to clear data
            setJwt(null);
        };
    }, [])
    function onSignIn() {
        setLoader(true);
        GlobalApi.signIn(email, password).then((response) => {
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            sessionStorage.setItem('jwt', response.data.jwt);
            toast('Sign In Successfully');
            router.push('/');
            setLoader(false);
        }, (e) => {
            toast(e?.response?.data?.error?.message || 'Error Signing In');
            setLoader(false);
        })
    }
    return (
        <div className="flex items-baseline justify-center my-20">
            <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200">
                <Image src="/snake-1.png" alt="logo" width={100} height={100} />
                <h2 className="font-bold text-3xl">Sign In to Account</h2>
                <h2 className="text-gray-500">Enter your Email and Password to Sign In</h2>
                <div className="w-full flex flex-col gap-5 mt-7">
                    <Input type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Button disabled={!(email || password)} onClick={() => onSignIn()}>{loader ? <LoaderIcon className="animate-spin" /> : "Sign in"}</Button>
                    <p>
                        Do not have an account ?
                        <Link href="/create-account" className="text-blue-500">
                            Click here to create an new account
                        </Link>
                    </p>

                </div>
            </div>
        </div>

    )
}

export default signIn