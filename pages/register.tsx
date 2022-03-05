import { useContext } from 'react';
import { UserContext } from '../lib/context';

import { RegisterForm, SignOutButton } from '../components/registerform';

export default function Login(props){
    const { user } = useContext(UserContext);

    return(
        <div className="pt-16 w-52 mx-auto bg-white">
            {user ? <SignOutButton />  :
            <>
                <RegisterForm/>
            </>
            }
        </div>
    )
}