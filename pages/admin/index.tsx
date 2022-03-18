import { collection, getFirestore, query, where } from 'firebase/firestore';
import { useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { UserContext } from '../../lib/context';

export default function Admin(){

    const { user } = useContext(UserContext);

    const giftsRef = collection(getFirestore(), 'wishes')

    const giftsQuery = query(giftsRef, where("approved", "==", false))

    const [querySnapshot] = useCollection(giftsQuery)

    const gifts = querySnapshot?.docs.map((doc) => doc.data());

    console.log(gifts)

    return(
        <div className="pt-16 grid place-items-center h-screen">
            {user && user.providerData[0].email == "mikedegeofroy@gmail.com" ? <>
                This is the console for you to get all your cool stuff
                <div className='grid grid-cols-2'>
                    {gifts && gifts.map( (gift) => {
                        return(
                            <div>
                                <img src={gift.letter}></img>
                                {/* button to accept or reject */}
                            </div>
                        )
                    })}
                </div>
            </> : <>
                Sorry, don&apos;t have access to this page.
            </>}

        </div>
    )
}