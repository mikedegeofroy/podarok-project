import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../lib/context';


export default function Layout({children}){
    const { user } = useContext(UserContext);

    return(
        <>
            <div className="z-10 flex w-screen justify-between p-4 fixed top-0 h-16 bg-white">
                <div className="h-auto w-40 cursor-pointer">
                    <Link href="/"><Image priority src="/logo.png" width="4755px" height="853px" layout='responsive'></Image></Link>
                </div>
                {user ? <Link href="/dashboard">{user.email}</Link> : <Link href="/login">Log in</Link>}
            </div>
            <main>{children}</main>
            <footer className="p-4">
                <div className="float-left">
                    <Image src={'/fox.png'} height={'80px'} width={'80px'}/>
                </div>
                <div className="float-right">
                    <h1 className="text-xl text-right">In partnership with</h1>
                    <div className="flex flex-row">
                        <div className='grid place-items-center m-2'>
                            <Image src={'/ozon.png'} height={'30px'} width={'130px'}/>
                        </div>
                        <Image src={'/lego.png'} height={'50px'} width={'50px'}/>
                    </div>
                </div>
            </footer>
        </>
    )
}