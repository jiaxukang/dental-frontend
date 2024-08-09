"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

function createAccount() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const router = useRouter();
    const [loader, setLoader] = React.useState(false);
    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            router.push('/');
        }
    }, [])
    const onCreateAccount = () => {
        setLoader(true);
        GlobalApi.registerUser(username, email, password).then((response) => {
            sessionStorage.setItem('user', JSON.stringify(response.data.user));
            sessionStorage.setItem('jwt', response.data.jwt);
            toast('Account Created Successfully');
            router.push('/');
            setLoader(false);
        }, (e) => {
            toast(e?.response?.data?.error?.message || 'Error Creating Account');
            setLoader(false);
        })

    }
    return (
        <div className="flex items-baseline justify-center my-20">
            <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200">
                <Image src="/snake-1.png" alt="logo" width={100} height={100} />
                <h2 className="font-bold text-3xl">Create An Account</h2>
                <h2 className="text-gray-500">Enter your Email and Password to Create an Account</h2>
                <div className="w-full flex flex-col gap-5 mt-7">
                    <Input placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                    <Input type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <Button disabled={!(username || email || password)} onClick={() => onCreateAccount()}>{loader ? <LoaderIcon className="animate-spin" /> : "Create An Account"}</Button>
                    <p>
                        Already have an
                        <Link href="/sign-in" className="text-blue-500">
                            Click here to Sign In
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default createAccount