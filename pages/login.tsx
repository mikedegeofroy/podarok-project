import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';

import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Login(props){
    const { user, parentName, childName, childAge } = useContext(UserContext);

    useEffect( () => {
        if(user){
            console.log(user.email)
        }
    }, [user])

    return(
        <main>
            {user ? <SignOutButton />  :
            <>
                <LoginForm/>
                <SignInButton />
                <Link href="/ressetpasswd">Forogt Password?</Link>
            </>
            }
        </main>
    )
}

function SignInButton() {

    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
        toast.success(`Signed In`)
    }

    return(
        <div>   
            <button className="btn-google" onClick={signInWithGoogle}>
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
                <input name="username" onChange={onChangeEmail}/>
                <h3>Password</h3>
                <input name="password" onChange={onChangePassword}/>
                <br />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </section>
    )
}