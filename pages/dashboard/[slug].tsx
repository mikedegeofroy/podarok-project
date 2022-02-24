import { collection, doc, getFirestore, query, where, updateDoc } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useCollection, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/authcheck";
import { auth } from "../../lib/firebase";
import { useEffect, useState } from "react";

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
                            <RequestForm gender={child.gender} />
                        </div>
                    ) : (
                        <button onClick={() => { setFormVis(true) }} className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">{child.status}</button>)}
                </div>
            ) : (<div className="grid place-items-center w-screen h-screen top-0 left-0 bg-white">Loading...</div>)}
        </>
    )
}

function RequestForm(data) {

    // Get a list of gifts

    const giftsRef = collection(getFirestore(), 'avaibable-gifts')

    const giftsQuery = query(giftsRef, where("category", "==", data.gender))

    const [querySnapshot] = useCollection(giftsQuery)

    const gifts = querySnapshot?.docs.map((doc) => {
        const id = {
            id: doc.id
        }

        return Object.assign(id, doc.data())
    });

    const [selected, setSelected] = useState([])

    const removeSelected = (e) => {
        let name = e
        setSelected(selected.filter((e) => (e !== name)))
    };

    useEffect( () => {
        console.log(selected)
    }, [selected])

    return gifts ? (
        <div>
            <div className="grid gap-4 grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-5 mb-6">
                {gifts.map(({ image }, index) => {
                    return (
                        <div key={index} onClick={() => {
                            if (!selected.includes(index) && selected.length <= 2) {
                                setSelected(oldArray => [...oldArray, index])
                            } else {
                                removeSelected(index)
                            }
                        }} className={selected.includes(index) ? "select-none shadow-xl rounded-lg p-4 h-full w-full" : "select-none shadow rounded-lg p-4 h-full w-full"}>
                            <div className="grid place-items-center text-center h-full w-full">
                                <img src={image} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4" onClick={() => {
                selected.forEach(async (index) => {
                    const giftRef = doc(getFirestore(), "avaibable-gifts", gifts[index].id);
                    console.log(gifts[index].id)

                    await updateDoc(giftRef, {
                        selected: true
                    });
                })
            }}>Select</button>
        </div>
        // A button that gives the selected attribute to the selected db elements
    ) : (<>Loading...</>)
}
