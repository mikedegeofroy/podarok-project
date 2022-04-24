import { doc, getFirestore, updateDoc, deleteField, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import AuthCheck from "../../../components/authcheck";
import { auth } from "../../../lib/firebase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Calendar from 'react-calendar'
import Image from "next/image";

export default function Child() {

    return (
        <AuthCheck>
            <div className="pt-16">
                <ChildManager />
            </div>
        </AuthCheck>
    )
}

function ChildManager() {

    const { slug } = router.query;


    // @ts-ignore
    const childRef = doc(getFirestore(), 'users', auth.currentUser.uid, 'children', slug)

    const [child] = useDocumentDataOnce(childRef);

    // Here I should add a request button, and some edit functionallity

    return (
        <>
            {child ? (
                <div>
                    <div className=" sm:mx-16  mx-8">
                        <Link href="/dashboard"><button className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4 font-['Kuku']">Назад</button></Link>
                        <ChildForm defaultValues={child} childRef={childRef} />
                    </div>
                    <div className='pt-10 object-top w-full overflow-hidden py-5'>
                        <div className='scale-150 md:scale-110'>
                            <Image src={'/images/les1.png'} height="997px" width="7111px"></Image>
                        </div>
                    </div>
                </div>
            ) : (<div className="grid place-items-center w-screen h-screen top-0 left-0 bg-white font-['Kuku']">загрузка...</div>)}
        </>
    )
}

// A function to update child data, change name, delete etc...

function ChildForm({ defaultValues, childRef }) {

    const { slug } = router.query;

    const [editing, setEditing] = useState(false)
    const [childName, setChildName] = useState(defaultValues.name)
    const [childBirthday, setChildBirthday] = useState(new Date(defaultValues.birthday))
    const [gender, setGender] = useState(defaultValues.gender)
    const [confirmState, setConfirmState] = useState(0)

    const minDate = new Date(Date.now() - Number(new Date('01-01-1982')))
    const maxDate = new Date(Date.now() - Number(new Date('01-01-1972')))

    const onSubmit = async (e) => {
        e.preventDefault()

        setEditing(false)

        const data = {
            name: e.target[0].value,
            gender: gender,
            birthday: birthday
        };

        await updateDoc(childRef, data);

        toast.success('Child updated successfully!');

    }

    console.log(childBirthday, defaultValues.birthday)

    let birthday = (childBirthday.getFullYear() + "-" + ("0" + (childBirthday.getMonth() + 1)).slice(-2) + "-" + ("0" + childBirthday.getDate()).slice(-2))

    useEffect(() => {
        birthday = (childBirthday.getFullYear() + "-" + ("0" + (childBirthday.getMonth() + 1)).slice(-2) + "-" + ("0" + childBirthday.getDate()).slice(-2))
    }, [childBirthday])

    useEffect(() => {

        if (confirmState != 0) {
            setTimeout(() => {
                setConfirmState(0)
            }, 5000)
        }

        if (confirmState == messages.length - 1) {
            deleteDoc(childRef)
            router.push("/dashboard")
        }
    }, [confirmState])

    const messages = ['Remove Child', 'Are you sure?', 'Ok.']

    const styles = ['bg-black hover:bg-slate-900', 'bg-red-700 hover:bg-red-800', 'bg-green-500']

    let color = "bg-blue-50"
    let source = "/images/boy.png"
    if (gender == "F") {
        color = "bg-pink-50"
        source = "/images/sonya.png"
    }
    // Some code for showing the requested present (if there is one)

    return (
        <div className="grid grid-cols-2">
            {!editing ? (<div>

                <div className={`text-center rounded-lg p-4 font-['Kuku'] ${color} w-fit`}>
                    <div className='p-2 grid grid-cols-2 place-items-center w-fit'>
                        <div className='shadow-lg overflow-hidden h-28 w-28 bg-white rounded-full p-4 object-top'>
                            <div className='scale-140'>
                                <Image src={source} height={'278px'} width={'130px'} />
                            </div>
                        </div>
                        <div className="text-left">
                            <h1>
                                {/* {childName} */}
                                Аркадий
                            </h1>
                            <h1>
                                {/* {birthday} */}
                                9 лет
                            </h1>
                        </div>
                    </div>
                </div>

                {/* <Link href={`/dashboard/${slug}/request`}><div className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight mb-3">{defaultValues.status}</div></Link>) : (<div className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight mb-3">{defaultValues.status}</div> */}

                {defaultValues.status == "avaibable" ? (<></>) : (<></>)}
                <button onClick={() => { setEditing(true) }} className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4 font-['Kuku']">редактировать</button>
            </div>) : (<form onSubmit={onSubmit}>
                {/* This is the edit form */}
                <input name="username" className="w-32 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" defaultValue={childName} onChange={(e) => { setChildName(e.target.value) }}></input>

                <h1>{birthday}</h1>

                <Calendar onChange={setChildBirthday} value={new Date(childBirthday)} defaultValue={new Date(2013, 3, 25)} minDetail={'year'} minDate={minDate} maxDate={maxDate}></Calendar>

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

                <button type="button" onClick={async () => {
                    if (confirmState < messages.length - 1) {
                        setConfirmState(confirmState + 1)
                    } else {
                        setConfirmState(0)
                    }

                    const giftsRef = doc(getFirestore(), 'wishes', defaultValues.requested);

                    await deleteDoc(giftsRef);
                }} className={`${styles[confirmState]} text-white font-bold rounded mx-2 container w-auto py-2 px-4`}>{messages[confirmState]}</button>
            </form>)
            }
            {defaultValues.requested ? (<ShowRequested gifts={defaultValues.requested} editControls={[editing, setEditing]} childRef={childRef} />) : (<><div key="3" className={`flex justify-center align-middle h-fit w-fit rounded-lg p-4 bg-slate-50 text-2xl`}><div><div className="w-20 h-20"><Image src={'/images/letter.png'} height="316px" width="283px"></Image></div><p className="font-['Kuku'] text-center">Добавить Письмо</p></div></div></>)}
        </div >
    )

}

function ShowRequested({ gifts, childRef, editControls }) {

    const giftsRef = doc(getFirestore(), 'wishes', gifts);

    const [gift] = useDocumentDataOnce(giftsRef);

    console.log(gift, editControls[0])

    // A function to delete the request and reset the values of the kid back to avaibable
    async function removeRequest() {
        await updateDoc(childRef, {
            status: "avaibable", requested: deleteField()
        })

        await deleteDoc(giftsRef);

        editControls[1](false)

        router.reload()
    }

    return (gift ? (
        <div className="select-none shadow rounded-lg p-4 w-max h-max">
            {editControls[0] && <button onClick={() => removeRequest()}>X</button>}
            <img src={gift.image} />
            {/* <img src={gift.letter} /> */}
        </div>
    ) :
        (<>Loading</>)
    )


}