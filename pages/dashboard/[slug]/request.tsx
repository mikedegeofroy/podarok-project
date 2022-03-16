
import { auth } from "../../../lib/firebase";
import { collection, doc, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useCollection, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import AuthCheck from "../../../components/authcheck";
import ImageUploader from "../../../components/imageuploader";

export default function Request(){

    return(
        <AuthCheck>
            <div className="sm:mx-16 pt-16 mx-8">
                <RequestForm />
            </div>
        </AuthCheck>
    )
    
}

function RequestForm() {

    const { slug } = router.query;

    // @ts-ignore
    const childRef = doc(getFirestore(), 'users', auth.currentUser.uid, 'children', slug)

    const [child] = useDocumentDataOnce(childRef);


    return child ? (
        <GiftSelector child={child}></GiftSelector>
    ) : (<></>)
}

function GiftSelector({ child }) {

    // Get a list of gifts

    const [formVis, setFormVis] = useState(false)

    const giftsRef = collection(getFirestore(), 'avaibable-gifts')

    const giftsQuery = query(giftsRef, where("category", "==", child.gender))

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

    useEffect(() => {
        console.log(selected)
    }, [selected])

    return gifts && !formVis ? (
        <div>
            <div className="grid gap-4 grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-5 mb-6">
                {gifts.map(({ image }, index) => {
                    return (
                        <div key={index} onClick={() => {
                            if (!selected.includes(index)) {
                                // && selected.length < 1
                                // setSelected(oldArray => [...oldArray, index])
                                setSelected([index])
                            } else {
                                // removeSelected(index)
                            }
                        }} className={selected.includes(index) ? "select-none shadow-xl rounded-lg p-4 h-full w-full" : "select-none shadow rounded-lg p-4 h-full w-full"}>
                            <div className="select-none grid place-items-center text-center h-full w-full">
                                <img src={image} />
                                {selected.includes(index) && (<button className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4 z-10" onClick={() => {
                                    setFormVis(true)
                                }}>Select</button>)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        // A button that gives the selected attribute to the selected db elements
        // selected.forEach(async (index) => {
        //     const giftRef = doc(getFirestore(), "wishes", gifts[index].id);

        //     const { slug } = router.query;

        //     // @ts-ignore
        //     const childRef = doc(getFirestore(), 'users', auth.currentUser.uid, 'children', slug)

        //     console.log(gifts[index].id)

        //     await setDoc(giftRef, {
        //         age: child.age,
        //         gender: child.gender,
        //     });

        //     // set document for approval

        //     await updateDoc(childRef, {
        //         status: "requested",
        //         requested: gifts[index].id
        //     })

        //     router.reload()

        // })

        // Some logic to upload a image, on send, we add a value to the whishes, not verified, gift data, image url
    ) : formVis ? (<div>
        <h1 className="text-center text-4xl">Now you have to upload a photo of the letter so it can be shown.</h1>
        <div className="grid place-items-center h-[70vh]">
            <div>
                <ImageUploader/>
                <button className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4 z-10" onClick={() => {
                    // Check if image is uploaded and add as a unverified wish, that I can then display in the admin tab, maybe even send me a email
                }}>Save</button>
            </div>
        </div>
    </div>
    ) : (<>Loading...</>)
}
