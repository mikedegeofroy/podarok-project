import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';

import toast from 'react-hot-toast';

export default function Login(props){
    const { user, username } = useContext(UserContext);

    useEffect( () => {
        if(user){
            console.log(user.email)
        }
    }, [user])

    return(
        <main>
            {user ? <SignOutButton />  :
            <SignInButton />
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
            <button className="btn-google" onClick={UPCreateTest}>
                Create U and P
            </button>
            <button className="btn-google" onClick={UPLoginTest}>
                Login U and P
            </button>
        </div>
    )
}

function SignOutButton(){
    return <button onClick={() => {auth.signOut(); toast.success(`Signed Out`)}}>Log Out</button>;
}

function UsernameForm() {
    return null;
}

function UPCreateTest() {
    auth.createUserWithEmailAndPassword("michadegeofroy@gmail.com", "Formentera2020").then( () => {
        toast.success("Created account")
    }).catch((error)=>{
        toast.error("Oops i did it again!")
    })
}

function UPLoginTest(){
    auth.signInWithEmailAndPassword("michadegeofroy@gmail.com", "Formentera2020")
    .then((userCredential) => {
        toast.success("Logged In")
    })
    .catch((error) => {
        console.log(error)
    });
}