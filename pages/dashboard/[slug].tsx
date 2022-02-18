import { doc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import router from "next/router";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/authcheck";
import { auth } from "../../lib/firebase";
import { useState } from "react";

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

    console.log(child)

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

                    {formVis ? (<RequestForm />) : (<button onClick={ () => {setFormVis(true)} } className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">{child.status}</button>)}
                </div>
            ) : (<div className="grid place-items-center absolute w-screen h-screen top-0 left-0 bg-white">Loading...</div>)}
        </>
    )
}

function RequestWish(status, uid) {

    console.log(uid)

    return (
        <h1>{status}</h1>
    )
}

function RequestForm() {

    return (
        <div className="pt-16 absolute h-screen w-screen top-0 left-0 bg-white">
            <div className="grid place-items-center">
                <section>
                    <button onClick={() => { }} className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Back</button>
                    <form>
                        <h3>URL</h3>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6' name="username" />
                        <button className='bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 rounded container mx-auto my-4' type="submit">
                            Submit
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}