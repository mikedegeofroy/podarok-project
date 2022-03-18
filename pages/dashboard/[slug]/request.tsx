
import { auth, storage, STATE_CHANGED } from "../../../lib/firebase";
import { addDoc, collection, doc, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useCollection, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import AuthCheck from "../../../components/authcheck";

import toast from 'react-hot-toast';

// I need to make an image uploader to get the files through.

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function Request() {

    return (
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
        <GiftSelector child={child} childRef={childRef}></GiftSelector>
    ) : (<></>)
}

function GiftSelector({ child, childRef }) {

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

    // This is for the other shit

    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);

    // Creates a Firebase Upload Task
    const uploadFile = async (e) => {
        // Get the file
        const file = Array.from(e.target.files)[0];
        // @ts-ignore
        const extension = file.type.split('/')[1];

        // Makes reference to the storage bucket location
        const fileRef = ref(storage, `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
        setUploading(true);

        // Starts the upload
        // @ts-ignore
        const task = uploadBytesResumable(fileRef, file)

        // Listen to updates to upload task
        task.on(STATE_CHANGED, (snapshot) => {
            const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            // @ts-ignore
            setProgress(pct);
        });

        // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
        task
            .then((d) => getDownloadURL(fileRef))
            .then((url) => {
                setDownloadURL(url);
                setUploading(false);
            });
    };

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
        // Some logic to upload a image, on send, we add a value to the whishes, not verified, gift data, image url
    ) : formVis ? (<div>
        <h1 className="text-center text-4xl">Now you have to upload a photo of the letter so it can be shown.</h1>
        <button className='bg-black hover:bg-slate-900 text-white font-bold rounded container py-2 my-4 px-4 z-10 w-max cursor-pointer' onClick={ () => {
            setFormVis(false)
        }}>Back</button>
        <div className="grid place-items-center min-h-[70vh]">
            <div>
                <div>
                    {uploading && <h3>{progress}%</h3>}

                    {!uploading && (
                        <>
                            <label className="btn">
                                <div className='bg-black hover:bg-slate-900 text-white font-bold rounded container py-2 my-4 px-4 z-10 w-max cursor-pointer'>Choose Image</div>
                                <input className="hidden" type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
                            </label>
                        </>
                    )}

                    {downloadURL && <img src={`${downloadURL}`}></img>}
                </div>
                <button className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4 z-10" onClick={async () => {
                    const giftRef = doc(getFirestore(), "wishes", gifts[selected[0]].id);
                    console.log(giftRef)
                    console.log(downloadURL)
                    console.log(child)

                    let selectedGift = gifts[selected[0]];

                    const wishRef = await addDoc(collection(getFirestore(), "wishes"), {
                        age: child.birthday,
                        name: child.name,
                        letter: downloadURL,
                        category: selectedGift.category,
                        image: selectedGift.image,
                        url: selectedGift.url, 
                        approved: false,
                    });
                    
                    // let wishRef = await setDoc(giftRef, {
                    //     age: child.birthday,
                    //     name: child.name,
                    //     letter: downloadURL,
                    //     category: selectedGift.category,
                    //     image: selectedGift.image,
                    //     url: selectedGift.url, 
                    //     approved: false,
                    // });

                    // get the id of the doc, add it to selected field

                    await updateDoc(childRef, {status: "requested", requested: wishRef.id}).then( () => {
                        router.push(`/dashboard/${child.slug}`)
                        toast.success('Wish sent for review.')
                    })
                    // Check if image is uploaded and add as a unverified wish, that I can then display in the admin tab, maybe even send me a email
                    // If things go to shit, i'll make a bot to send out orders to buy presents. 
                }}>Save</button>
            </div>
        </div>
    </div>
    ) : (<>Loading...</>)
}
