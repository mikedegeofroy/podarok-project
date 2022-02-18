import { collection, doc, getFirestore, query } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useCollection, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/authcheck";
import { auth } from "../../lib/firebase";
import { useState } from "react";
import Image from 'next/image';

export default function Child() {

    return (
        <AuthCheck>
            <div className="sm:mx-16 pt-16 mx-8">
                <ChildData />
            </div>
        </AuthCheck>
    )
}

function ChildData() {

    const { slug } = router.query;

    const [formVis, setFormVis] = useState(false)

    // @ts-ignore
    const childRef = doc(getFirestore(), 'users', auth.currentUser.uid, 'children', slug)

    const [child] = useDocumentDataOnce(childRef);

    // Get a list of gifts

    const giftsRef = collection(getFirestore(), 'selected-gifts')

    const giftsQuery = query(giftsRef)

    const [querySnapshot] = useCollection(giftsQuery)

    const giftsList = querySnapshot?.docs.map((doc) => doc.data());

    // Here I should add a request button, and some edit functionallity

    return (
        <>
            {child ? (
                <div>
                    <Link href="/dashboard"><button className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Back</button></Link>
                    <h1>{child.name}</h1>
                    <h1>{child.status}</h1>
                    <h1>{child.birthday}</h1>
                    <h1>{child.gender}</h1>

                    {/* Basically, if status = avaibable, then permit the request otherwise, if requested, block, if reviced, block. */}

                    {(child.status == "avaibable") ? (<></>) : (child.status == "requested") ? (<></>) : (child.status == "revived") ? (<></>) : (<></>)}

                    {formVis ? (
                        <div className="bg-white">
                            <button onClick={() => { setFormVis(false) }} className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Back</button>
                            <RequestForm gifts={giftsList} />
                        </div>
                        ) : (
                        <button onClick={ () => {setFormVis(true)} } className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">{child.status}</button>)}
                    </div>
            ) : (<div className="grid place-items-center w-screen h-screen top-0 left-0 bg-white">Loading...</div>)}
        </>
    )
}

function RequestForm(data) {

    const gifts = data.gifts

    return (
            <div className="grid gap-4 grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-5 mb-6">
                {gifts.map(({image, url}, index) => {
                    return(
                        <a target="_blank" href={url}>
                            <div className="grid place-items-center shadow text-center h-full w-full rounded-lg p-4" key={index}>
                                <img src={image}/>
                            </div>
                        </a>
                    )
                })}
            </div>
    )
}
