import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';


export default function Layout({children}){
    const {user, childName, childAge, childGender} = useContext(UserContext);

    return(
        <>
            <Head>
                <title>The Podarok Project</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet"/>
            </Head>
            <div className="flex w-screen justify-between p-4 fixed top-0 h-16 bg-white">
                <div className="h-auto w-40 cursor-pointer">
                    <Link href="/"><Image src="/logo.png" width="4755px" height="853px" layout='responsive'></Image></Link>
                </div>
                {user ? <p>{user.email}</p> : <Link href="/login">Log in</Link>}
            </div>
            <main>{children}</main>
            <footer>
                <p>Some Footer</p>
            </footer>
        </>
    )
}