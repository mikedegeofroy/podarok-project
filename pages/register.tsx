import { auth, googleAuthProvider } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, writeBatch, getFirestore } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';

import toast from 'react-hot-toast';

export default function Login(props){
    const { user } = useContext(UserContext);

    // useEffect( () => {
    //     if(user){
    //         console.log(user.email)
    //     }
    // }, [user])

    return(
        <div className='pt-16'>
            {user ? <SignOutButton />  :
            <>
                <RegisterForm/>
            </>
            }
        </div>
    )
}

function SignInButton() {

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleAuthProvider).then( async (user) => {
            const userDoc = doc(getFirestore(), 'users', user.user.uid)

            const batch = writeBatch(getFirestore());

            batch.set(userDoc, { email: user.user.email });

            await batch.commit();
        });
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

function RegisterForm(){

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

        createUserWithEmailAndPassword(auth, formEmail, formPassword).then( async (user) => {
            
            const userDoc = doc(getFirestore(), 'users', user.user.uid)

            const batch = writeBatch(getFirestore());

            batch.set(userDoc, { email: user.user.email });

            await batch.commit();

            toast.success("Created account")
        }).catch((error)=>{
            toast.error("Oops i did it again!")
        })
    };

    return(
        <section>
            <form onSubmit={onSubmit}>
                <h3>Email</h3>
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-6" name="username" onChange={onChangeEmail}/>
                <h3>Password</h3>
                <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-6" name="password" onChange={onChangePassword}/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded container mx-auto my-4" type="submit">
                    Register
                </button>
                <SignInButton/>
            </form>
        </section>
    )
}