import { auth } from "../../lib/firebase"
import AuthCheck from "../../components/authcheck";
import { getFirestore, doc, collection, query, setDoc } from 'firebase/firestore';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { YMaps, withYMaps, Map } from "react-yandex-maps";

import toast from "react-hot-toast";
import kebabCase from "lodash.kebabcase"
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Calendar from 'react-calendar';

function MapSuggestComponent(props) {
    const { ymaps } = props;

    useEffect(() => {
        const suggestView = new ymaps.SuggestView("suggest");
    }, [ymaps.SuggestView]);

    return <input autoComplete='off' type="text" id="suggest" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6' />;
}

export default function UserProfile() {

    return (
        <AuthCheck>
            <AddChild />
        </AuthCheck>
    )

}

function AddChild() {

    const [gender, setGender] = useState('')
    const [bday, setBday] = useState('')

    // There is some code missing to mark the selected gender

    const router = useRouter()

    const minDate = new Date(Date.now() - Number(new Date('01-01-1982')))
    const maxDate = new Date(Date.now() - Number(new Date('01-01-1972')))

    let ref = collection(getFirestore(), 'users', auth.currentUser.uid, 'children')
    const childrenQuery = query(ref)
    const children = useCollectionData(childrenQuery);

    const SuggestComponent = useMemo(() => {
        return withYMaps(MapSuggestComponent, true, [
            "SuggestView",
            "geocode",
            "coordSystem.geo"
        ]);
    }, []);

    if (children[0]) {
        if (children[0].length >= 4) {
            return <div className="grid place-items-center h-screen">Sorry, you can&apos;t add more children.</div>
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        let d = new Date(bday)

        const name = e.target[0].value
        const slug = encodeURI(kebabCase(name))
        const status = "avaibable"

        const birthday = (d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) +
            "-" + ("0" + d.getDate()).slice(-2))

        const uid = auth.currentUser.uid;
        const ref = doc(getFirestore(), 'users', uid, 'children', slug);

        const data = {
            name,
            birthday,
            gender,
            slug,
            status
        };

        await setDoc(ref, data);

        router.push("/dashboard").then(() => {
            toast.success("Child Added")
        })
    }

    return (
        <div className="grid place-items-center min-h-screen pt-16">
            <div className="">
                <Link href="/dashboard"><button className="bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 my-4 px-4">Back</button></Link>
                <section>
                    <form onSubmit={onSubmit}>
                        <h3>Name</h3>
                        <input autoComplete='off' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6' name="username" />
                        <h3>Gender</h3>
                        <div className="flex flex-row mb-6">
                            <div onClick={() => { setGender('M') }} className={`${gender == "M" ? "bg-slate-100" : ""} px-4 flex justify-center align-middle border shadow rounded p-2 mr-4 cursor-pointer`}>
                                M
                            </div>
                            <div onClick={() => { setGender('F') }} className={`${gender == "F" ? "bg-slate-100" : ""} px-4 flex justify-center align-middle border shadow rounded p-2 mr-4 cursor-pointer`}>
                                F
                            </div>
                        </div>
                        <h3>Birthday</h3>
                        <div className="mb-6">
                            {/* @ts-ignore */}
                            <Calendar onChange={setBday} value={bday} defaultValue={new Date(2013, 3, 25)} minDetail={'year'} minDate={minDate} maxDate={maxDate}></Calendar>
                        </div>
                        {/* <YMaps>
                            <Map onLoad={(e) => {console.log(e)}} defaultState={{ center: [59.93, 30.37], zoom: 9, controls: ['zoomControl']}} modules={['control.ZoomControl']} />
                        </YMaps> */}
                        <h3>Address</h3>
                        <YMaps
                            enterprise
                            query={{ apikey: "17974270-5960-4f72-a053-fbf3df02f340" }}
                        >
                            <SuggestComponent />
                        </YMaps>
                        <button className='bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 rounded container mx-auto my-4' type="submit">
                            Add
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )

}