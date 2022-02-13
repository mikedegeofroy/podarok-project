import { auth, googleAuthProvider } from '../lib/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, writeBatch, getFirestore } from 'firebase/firestore'
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Login(){
    const { user } = useContext(UserContext);

    return(
        <div className="grid place-items-center h-screen">
            <div>
                {user ? <SignOutButton />  :
                <div className="w-52">
                    <LoginForm/>
                    <SignInWithGoogleButton />
                    <SignInWithVkButton />
                    {/* <p>Not a user? <Link href="/register"><a className='text-gray-600' >Register</a></Link></p> */}
                    <Link href="/register"><button className='bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 rounded container mx-auto my-4'>
                    Register
                    </button></Link>
                    <Link href="/ressetpasswd"><a className='text-gray-600' >Forgot Password?</a></Link>
                </div>
                }
            </div>
        </div>
    )
}

function SignInWithGoogleButton() {
    const router = useRouter()

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider).then( async (user) => {
            toast.success('Logged In')

            router.push('/dashboard')
        });
    }

    return(
        <div>   
            <button className='bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 rounded container my-4' onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}

function SignOutButton(){
    return <button onClick={() => {auth.signOut(); toast.success('Logged Out')}}>You are already logged in, do you want to Log Out?</button>;
}


function LoginForm(){
    const router = useRouter()

    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');

    const onChangeEmail = (e: { target: { value: SetStateAction<string>; }; }) => {
        setFormEmail(e.target.value)
    }

    const onChangePassword = (e: { target: { value: SetStateAction<string>; }; }) => {
        setFormPassword(e.target.value)
    }

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, formEmail, formPassword)
        .then( async (user) => {

            toast.success("Logged In")

            router.push('/dashboard')

        })
        .catch((error: any) => {
            console.log(error)
        });
    };

    return(
        <section>
            <form onSubmit={onSubmit}>
                <h3>Email</h3>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6' name="username" onChange={onChangeEmail}/>
                <h3>Password</h3>
                <input className='shadow appearance-none border rounded w-full mb-6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password" onChange={onChangePassword}/>
                <button className='bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 rounded container mx-auto my-4' type="submit">
                    Login
                </button>
            </form>
        </section>
    )
}

function SignInWithVkButton(){

    const router = useRouter();

    const vkConfig = {
        appId: "8075392",
        perms: "4194304",
        redirectURI: "http://127.0.0.1:3000/vk/login",
        version: "5.131"
    };

    return(
        <button className='bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 rounded container mx-auto my-4' onClick={() => {
            router.push({
                pathname: 'https://oauth.vk.com/authorize',
                query: {
                    client_id: vkConfig.appId,
                    scope: vkConfig.perms,
                    redirect_uri: vkConfig.redirectURI,
                    response_type: "code",
                    v: vkConfig.version
                }
            })
        }}>Sign in with VK</button>
    )
}