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
        <div className="pt-16 grid place-items-center h-screen">
            <div className="w-52">
                <form onSubmit={onSubmit}>
                    <section>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-6" type="text" name="email" onChange={onChangeEmail} />
                        <button className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-full py-2 my-4 px-4" type="submit">
                            Send Reset Email
                        </button>
                    </section>
                </form>
            </div>
        </div>
    )
}