import { useContext } from 'react';
import { UserContext } from '../lib/context';

import { RegisterForm, SignOutButton } from '../components/registerform';
import Link from 'next/link';

export default function Login(props) {
    const { user } = useContext(UserContext);

    return (
        <div className="pt-16 w-52 mx-auto bg-white">
            {user ? <SignOutButton /> :
                <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center h-[80vh]">
                    <div>
                        <Link href="/login"><button className='block font-bold text-sm'>
                            {"< Назад"}
                        </button></Link>
                        <RegisterForm />
                    </div>
                </div>
            }
        </div>
    )
}