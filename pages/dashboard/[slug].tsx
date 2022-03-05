import { collection, doc, getFirestore, query, where, updateDoc, deleteField } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useCollection, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/authcheck";
import { auth } from "../../lib/firebase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { update } from "lodash";

export default function Child() {

    return (
        <AuthCheck>
            <div className="sm:mx-16 pt-16 mx-8">
                <ChildManager />
            </div>
        </AuthCheck>
    )
}

function ChildManager() {

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


                    <ChildForm defaultValues={child} childRef={childRef} />

                    {/* Basically, if status = avaibable, then permit the request otherwise, if requested, block, if reviced, block. */}

                    {/* {(formVis && child.status == "avaibable") ? (
                        <div className="bg-white">
                            <button onClick={() => { setFormVis(false) }} className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Back</button>
                            <RequestForm gender={child.gender} />
                        </div>
                    ) : (<button onClick={() => { setFormVis(true) }} 
                    className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">{child.status}</button>) 
                    } */}

                    {(formVis && child.status == "avaibable") ? (
                        <div className="bg-white">
                            <button onClick={() => { setFormVis(false) }} className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Back</button>
                            <RequestForm gender={child.gender} />
                        </div>
                    ) : (!formVis && child.status == "avaibable") ? (<button onClick={() => { setFormVis(true) }}
                        className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">{child.status}</button>) : (<></>)
                    }

                </div>
            ) : (<div className="grid place-items-center w-screen h-screen top-0 left-0 bg-white">Loading...</div>)}
        </>
    )
}

// A function to update child data, change name, delete etc...

function ChildForm({ defaultValues, childRef }) {

    const [editing, setEditing] = useState(false)
    const [childName, setChildName] = useState(defaultValues.name)
    const [childBirthday, setChildBirthday] = useState(defaultValues.birthday)
    const [gender, setGender] = useState(defaultValues.gender)

    const onSubmit = async (e) => {
        e.preventDefault()

        setEditing(false)

        const data = {
            name: e.target[0].value,
            gender: gender,
            birthday: e.target[1].value,
        };

        await updateDoc(childRef, data);

        toast.success('Child updated successfully!');

    }

    return (
        <div className="grid grid-cols-2">
            {!editing ? (<div>
                <div className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight mb-6">{childName}</div>
                <div className="w-max shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight mb-6">{childBirthday}</div>
                <div className="flex flex-row">
                    <div className="px-4 flex justify-center align-middle border shadow rounded p-2 mr-4">{gender}</div>
                </div>
                <button onClick={() => { setEditing(true) }} className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Edit</button>
            </div>) : (<form onSubmit={onSubmit}>
                {/* This is the edit form */}
                <input name="username" className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" defaultValue={childName} onChange={(e) => { setChildName(e.target.value) }}></input>

                <input id="birthday" name="birthday" min="2006-01-01" max="2013-01-01" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" type="date" defaultValue={childBirthday} onChange={(e) => { setChildBirthday(e.target.value) }}></input>

                <div className="flex flex-row">
                    <div onClick={() => { setGender('M') }} className={`${gender == "M" ? "bg-slate-100" : ""} px-4 flex justify-center align-middle border shadow rounded p-2 mr-4 cursor-pointer`}>
                        M
                    </div>
                    <div onClick={() => { setGender('F') }} className={`${gender == "F" ? "bg-slate-100" : ""} px-4 flex justify-center align-middle border shadow rounded p-2 mr-4 cursor-pointer`}>
                        F
                    </div>
                </div>

                <button type="submit" className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Save</button>
            </form>)}
            {defaultValues.requested ? (<ShowRequested gifts={defaultValues.requested} childRef={childRef} />) : (<></>)}
        </div>
    )

}

function ShowRequested({ gifts, childRef }) {

    const giftsRef = doc(getFirestore(), 'avaibable-gifts', gifts)

    const [gift] = useDocumentDataOnce(giftsRef);

    const [isVisible, setIsVisible] = useState(true)

    console.log(gift)

    // A function to delete the request and reset the values of the kid back to avaibable
    async function removeRequest() {
        await updateDoc(childRef, { status: "avaibable", requested: deleteField() })

        setIsVisible(false)
    }

    return (gift && isVisible ? (
        <div className="select-none shadow rounded-lg p-4 w-max h-max">
            <button onClick={() => removeRequest()}>X</button>
            <img src={gift.image} />
        </div>
    ) :
        (<>Loading</>)
    )


}

function RequestForm({ gender }) {

    // Get a list of gifts

    const giftsRef = collection(getFirestore(), 'avaibable-gifts')

    const giftsQuery = query(giftsRef, where("category", "==", gender))

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

    return gifts ? (
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
                                removeSelected(index)
                            }
                        }} className={selected.includes(index) ? "select-none shadow-xl rounded-lg p-4 h-full w-full" : "select-none shadow rounded-lg p-4 h-full w-full"}>
                            <div className="grid place-items-center text-center h-full w-full">
                                <img src={image} />
                                {selected.includes(index) && (<>            <button className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4" onClick={() => {
                                    selected.forEach(async (index) => {
                                        const giftRef = doc(getFirestore(), "avaibable-gifts", gifts[index].id);

                                        const { slug } = router.query;

                                        // @ts-ignore
                                        const childRef = doc(getFirestore(), 'users', auth.currentUser.uid, 'children', slug)

                                        console.log(gifts[index].id)

                                        await updateDoc(giftRef, {
                                            selected: true
                                        });

                                        await updateDoc(childRef, {
                                            status: "requested",
                                            requested: gifts[index].id
                                        })

                                        router.reload()

                                    })
                                }}>Select</button></>)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        // A button that gives the selected attribute to the selected db elements
    ) : (<>Loading...</>)
}
