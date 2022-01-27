import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';

import toast from 'react-hot-toast';
import Box from '../components/box';
import Link from 'next/link';

export default function Login(){
    const {user, childName, childAge, childGender} = useContext(UserContext);

    useEffect( () => {
        if(user){
            toast.success('Logged in')
        }
    }, [user])

    return(
        <div className="grid place-items-center h-screen">
            <Box>
                {user ? <SignOutButton />  :
                <div className="w-52">
                    <LoginForm/>
                    <SignInButton />
                    <Link href="/ressetpasswd"><a className='text-gray-600' >Forgot Password?</a></Link>
                </div>
                }
            </Box>
        </div>
    )
}

function SignInButton() {

    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    }

    return(
        <div>   
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded container my-4' onClick={signInWithGoogle}>
                Sign in with Google
            </button>
            {/* <button className="btn-google" onClick={UPCreateTest}>
                Create U and P
            </button> */}
        </div>
    )
}

function SignOutButton(){
    return <button onClick={() => {auth.signOut(); toast.success(`Signed Out`)}}>Log Out</button>;
}

// function UsernameForm() {
//     return null;
// }

// function UPCreateTest() {
//     auth.createUserWithEmailAndPassword("michadegeofroy@gmail.com", "Formentera2020").then( () => {
//         toast.success("Created account")
//     }).catch((error)=>{
//         toast.error("Oops i did it again!")
//     })
// }


function LoginForm(){

    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');

    const onChangeEmail = (e) => {
        setFormEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setFormPassword(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(formEmail, formPassword)
        .then((userCredential) => {
            toast.success("Logged In")
        })
        .catch((error) => {
            console.log(error)
        });
    };

    return(
        <section>
            <form onSubmit={onSubmit}>
                <h3>Email</h3>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6' name="username" onChange={onChangeEmail}/>
                <h3>Password</h3>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password" onChange={onChangePassword}/>
                <br />
                <br />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded container mx-auto my-4' type="submit">
                    Login
                </button>
            </form>
        </section>
    )
}