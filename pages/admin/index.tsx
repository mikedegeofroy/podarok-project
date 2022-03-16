import { useContext } from 'react';
import { UserContext } from '../../lib/context';

import toast from 'react-hot-toast';

export default function Admin(){

    const { user } = useContext(UserContext);

    return(
        <div className="pt-16 grid place-items-center h-screen">
            {user && user.providerData[0].email == "mikedegeofroy@gmail.com" ? <>
                This is the console for you to get all your cool stuff
            </> : <>
                Sorry, don't have access to this page.
            </>}

        </div>
    )
}