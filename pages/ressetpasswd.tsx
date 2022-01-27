import { auth, googleAuthProvider } from '../lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { UserContext } from '../lib/context';

import toast from 'react-hot-toast';

export default function ForgotPassword(){

    const [formEmail, setFormEmail] = useState('')

    const onChangeEmail = (e) => {
        setFormEmail(e.target.value)
        console.log(formEmail)
    }

    const onSubmit = async (e) => {

        e.preventDefault();

        sendPasswordResetEmail(auth, formEmail).then( (res) => {
            console.log(res)
            toast.success('Email Sent!')
        }).catch( (error) => {
            console.log(error)
            toast.error('Something Happened')
        })

    };

    return(
        <form onSubmit={onSubmit}>
            <input type="text" name="email" onChange={onChangeEmail} />
            <button type="submit">
                Send Reset Email
            </button>
        </form>
    )
}