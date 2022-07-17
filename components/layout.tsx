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
                    <Link href="/"><Image priority src="/icons/logo.png" width="4755px" height="853px" layout='responsive'></Image></Link>
                </div>
                
                {user ? <div className='w-6 cursor-pointer'><Link href="/dashboard"><Image priority src="/icons/home.png" width="415px" height="501px" layout='responsive'></Image></Link></div> : <div className="p-1 font-['Kuku']"><Link href="/login">Войти</Link></div>}
                
            </div>
            <main>{children}</main>
            <footer className="p-4">
                <div className="float-left">
                    <Image src={'/images/fox.png'} height={'80px'} width={'80px'}/>
                </div>
                {/* <div className="float-right">
                    <h1 className="text-xl text-right">В сотрудничестве с</h1>
                    <div className="flex flex-row">
                        <div className='grid place-items-center m-2'>
                            <Image src={'/icons/ozon.png'} height={'30px'} width={'130px'}/>
                        </div>
                        <h1 className="text-3xl pr-2 pl-1">+</h1>
                        <Image src={'/lego.png'} height={'50px'} width={'50px'}/>
                    </div>
                </div> */}
            </footer>
        </>
    )
}

