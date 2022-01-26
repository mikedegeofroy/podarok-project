import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';

import toast from 'react-hot-toast';

export default function Login(props){
    const { user, childName, childAge, childGender } = useContext(UserContext);

    useEffect( () => {
        if(user){
            console.log(user.email)
        }
    }, [user])

    return(
        <main>
            {user ? <SignOutButton />  :
            <>
                <RegisterForm/>
            </>
            }
        </main>
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

        auth.createUserWithEmailAndPassword(formEmail, formPassword).then( () => {
            toast.success("Created account")
        }).catch((error)=>{
            toast.error("Oops i did it again!")
        })
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
                    Register
                </button>
            </form>
        </section>
    )
}