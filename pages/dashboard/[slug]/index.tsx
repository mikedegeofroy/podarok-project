import { collection, doc, getFirestore, query, where, updateDoc, deleteField, setDoc } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useCollection, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import AuthCheck from "../../../components/authcheck";
import { auth } from "../../../lib/firebase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

                    {/* Send some bullshit */}

                    {/* {(formVis && child.status == "avaibable") ? (
                        <div className="bg-white">
                            <button onClick={() => { setFormVis(false) }} className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Back</button>
                            <RequestForm child={child} />
                        </div>
                    ) : (!formVis && child.status == "avaibable") ? (<button onClick={() => { setFormVis(true) }}
                        className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">{child.status}</button>) : (<></>)
                    } */}

                </div>
            ) : (<div className="grid place-items-center w-screen h-screen top-0 left-0 bg-white">Loading...</div>)}
        </>
    )
}

// A function to update child data, change name, delete etc...

function ChildForm({ defaultValues, childRef }) {

    const { slug } = router.query;

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
            birthday: e.target[1].value
        };

        await updateDoc(childRef, data);

        toast.success('Child updated successfully!');

    }

    return (
        <div className="grid grid-cols-2">
            {!editing ? (<div>
                <div className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight mb-6">{childName}</div>
                <div className="w-max shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight mb-6">{childBirthday}</div>
                <div className="flex flex-row mb-6">
                    <div className="px-4 flex justify-center align-middle border shadow rounded p-2 mr-4">{gender}</div>
                </div>
                { defaultValues.status == "avaibable" ? (
                    <Link href={`/dashboard/${slug}/request`}><div className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight mb-3">{defaultValues.status}</div></Link>) : (<div className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight mb-3">{defaultValues.status}</div>)}
                <button onClick={() => { setEditing(true) }} className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Edit</button>
            </div>) : (<form onSubmit={onSubmit}>
                {/* This is the edit form */}
                <input name="username" className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" defaultValue={childName} onChange={(e) => { setChildName(e.target.value) }}></input>

                <input id="birthday" name="birthday" min="2006-01-01" max="2013-01-01" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" type="date" defaultValue={childBirthday} onChange={(e) => { setChildBirthday(e.target.value) }}></input>

                <div className="flex flex-row mb-6">
                    <div onClick={() => { setGender('M') }} className={`${gender == "M" ? "bg-slate-100" : ""} px-4 flex justify-center align-middle border shadow rounded p-2 mr-4 cursor-pointer`}>
                        M
                    </div>
                    <div onClick={() => { setGender('F') }} className={`${gender == "F" ? "bg-slate-100" : ""} px-4 flex justify-center align-middle border shadow rounded p-2 mr-4 cursor-pointer`}>
                        F
                    </div>
                </div>

                <div className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight mb-3">{defaultValues.status}</div>

                <button type="submit" className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Save</button>
            </form>)}
            {defaultValues.requested ? (<ShowRequested gifts={defaultValues.requested} editControls={[editing, setEditing]} childRef={childRef} />) : (<></>)}
        </div>
    )

}

function ShowRequested({ gifts, childRef, editControls  }) {

    const giftsRef = doc(getFirestore(), 'avaibable-gifts', gifts)

    const [gift] = useDocumentDataOnce(giftsRef);



    console.log(gift, editControls[0])

    // A function to delete the request and reset the values of the kid back to avaibable
    async function removeRequest() {
        await updateDoc(childRef, { 
            status: "avaibable", requested: deleteField() 
        })

        await updateDoc(giftsRef, {
            selected: false
        });

        editControls[1](false)
        
        router.reload()
    }

    return (gift ? (
        <div className="select-none shadow rounded-lg p-4 w-max h-max">
            {editControls[0] && <button onClick={() => removeRequest()}>X</button>}
            <img src={gift.image} />
        </div>
    ) :
        (<>Loading</>)
    )


}
