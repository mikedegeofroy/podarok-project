import { auth } from '../../lib/firebase'
import { deleteUser } from 'firebase/auth'
import AuthCheck from '../../components/authcheck'
import { useDocumentDataOnce, useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, doc, collection, query } from 'firebase/firestore';
import { useRouter } from 'next/router';

import Image from 'next/image';

import toast from 'react-hot-toast';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UserProfile() {

    return (
        <AuthCheck>
            <div className="pt-20">
                <div className='sm:mx-16 mx-8'>
                    <h1 className="mb-6 text-3xl font-['Kuku']">Дети</h1>
                    <ProfileData />
                </div>
                <div className='object-top w-full overflow-hidden py-5'>
                    <div className='scale-150 md:scale-110'>
                        <Image src={'/images/les2.png'} height="1363px" width="7498px"></Image>
                    </div>
                </div>
                <div className='sm:mx-16 mx-8 mb-8'>
                    <h1 className="mb-6 text-3xl font-['Kuku']">Аккаунт</h1>
                    <SignOutButton />
                </div>
                {/* <DeleteAccountButton/> */}
            </div>
        </AuthCheck>
    )

}

function DeleteAccountButton() {
    const router = useRouter()

    const [confirmState, setConfirmState] = useState(0)

    const messages = ['Удалить Аккаунт', 'Вы уверены, что хотите удалить свой аккаунт?', 'Вы действительно уверены?', 'Ok.']

    const styles = ['bg-black hover:bg-slate-900', 'bg-red-700 hover:bg-red-800', 'bg-red-500 hover:bg-red-600', 'bg-green-500']

    useEffect(() => {

        if (confirmState != 0) {
            setTimeout(() => {
                setConfirmState(0)
            }, 5000)
        }

        if (confirmState == 3) {
            deleteUser(auth.currentUser);
            router.push("/")
        }
    }, [confirmState])

    return (
        <>
            <button onClick={() => {
                if (confirmState < messages.length - 1) {
                    setConfirmState(confirmState + 1)
                } else {
                    setConfirmState(0)
                }
            }} className={`${styles[confirmState]} text-white font-bold rounded mx-2 container w-auto py-2 px-4`}>{messages[confirmState]}</button>
        </>
    )
}

function SignOutButton() {
    const router = useRouter()
    return <button className="bg-black font-['Kuku'] hover:bg-slate-900 mr-2 text-white font-bold rounded container w-auto py-2 px-4" onClick={() => { auth.signOut().then(() => { router.push('/login'); toast.success('Logged Out') }) }}>Выйти</button>;
}

function ProfileData() {

    const userDoc = doc(getFirestore(), 'users', auth.currentUser.uid);

    let ref = collection(getFirestore(), 'users', auth.currentUser.uid, 'children')
    const childrenQuery = query(ref)
    const [querySnapshot] = useCollection(childrenQuery);
    const childrenList = querySnapshot?.docs.map((doc) => doc.data());

    const [user] = useDocumentDataOnce(userDoc)

    return (
        <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mb-6">
            <ChildrenList childrenList={childrenList} />
        </div>
    )
}

function ChildrenList(data) {
    let children = data.childrenList

    console.log(children)

    return children ? <>
        {children.map(({ name, gender, slug, status }, index) => {
            let color = "bg-blue-50"
            let source = "/images/boy.png"
            if (gender == "F") {
                color = "bg-pink-50"
                source = "/images/sonya.png"
            }

            return (
                <Link key={index} href={`/dashboard/${slug}`}><div className={`text-center h-full w-full rounded-lg p-4 ${color}`}><h2 className='text-3xl'>{name}</h2><div className='p-2 flex justify-center'><div className='shadow-lg overflow-hidden h-28 w-28 bg-white rounded-full p-4 object-top'><div className='scale-140'><Image src={source} height={'278px'} width={'130px'} /></div></div></div><div>{status}</div></div></Link>
            )
        })}
        {children.length < 4 &&
            <Link href="/dashboard/add"><div key="3" className={`flex justify-center align-middle h-full w-full rounded-lg p-4 bg-slate-50 text-2xl`}><div><h1 className='text-center text-4xl font-extralight'>+</h1><p className="font-['Kuku']">Добавить Ребенка</p></div></div></Link>
        }

    </> :
        <h1>загрузка...</h1>
}
