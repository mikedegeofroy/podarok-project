import { collection, doc, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { UserContext } from '../../lib/context';

export default function Admin() {

    const { user } = useContext(UserContext);

    const giftsRef = collection(getFirestore(), 'wishes')

    // const giftsQuery = query(giftsRef, where("approved", "==", false))
    const giftsQuery = query(giftsRef)

    const [querySnapshot] = useCollection(giftsQuery)

    const gifts = querySnapshot?.docs.map((doc) => {
        return { id: doc.id, data: doc.data() }
    });

    console.log(gifts)

    return (<>
        <div className="pt-16 min-w-screen">
            {user && user.providerData[0].email == "mikedegeofroy@gmail.com" ? <>
                <h1>This is the console for you to get all your cool stuff</h1>
                <div className='grid grid-cols-2'>
                    <div>
                        <h1>Waiting For Approval</h1>
                        <div className='grid grid-cols-2'>
                            {gifts && gifts.map(({ data, id }, index) => {


                                return !data.approved && (
                                    <div className="select-none shadow rounded-lg p-4 h-full w-full" key={index}>
                                        <img src={data.letter}></img>
                                        {/* button to accept or reject */}
                                        <button className='bg-black hover:bg-slate-900 text-white font-bold rounded container py-2 my-4 px-4 z-10 w-max cursor-pointe' onClick={() => {
                                            const childRef = doc(getFirestore(), 'wishes', id)

                                            updateDoc(childRef, { approved: true })
                                        }}>Approve</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h1>Approved</h1>
                        <div className="grid grid-cols-2">
                            {gifts && gifts.map(({ data, id }, index) => {


                                return data.approved && (
                                    <div className="select-none shadow rounded-lg p-4 h-full w-full" key={index}>
                                        <img src={data.letter}></img>
                                        <button className='bg-black hover:bg-slate-900 text-white font-bold rounded container py-2 my-4 px-4 z-10 w-max cursor-pointe' onClick={() => {
                                            const childRef = doc(getFirestore(), 'wishes', id)

                                            updateDoc(childRef, { approved: false })
                                        }}>Reject</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </> : <>
                Sorry, don&apos;t have access to this page.
            </>}

        </div>
    </>
    )
}