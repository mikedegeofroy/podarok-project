import { auth } from '../../lib/firebase'
import AuthCheck from '../../components/authcheck'
import { useDocumentDataOnce, useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, doc, collection, query } from 'firebase/firestore';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';
import Link from 'next/link';

export default function UserProfile(){

    return(
        <AuthCheck>
            <div className="mx-16 pt-16">
                <ProfileData/>
                <SignOutButton/>
            </div>
        </AuthCheck>
    )

}

function SignOutButton(){
    const router = useRouter()
    return <button className='bg-black hover:bg-slate-900 text-white font-bold rounded container w-auto py-2 px-4' onClick={() => {auth.signOut().then( () => {router.push('/login'); toast.success('Logged Out')})}}>Log Out</button>;
}

function ProfileData(){

    const userDoc = doc(getFirestore(), 'users', auth.currentUser.uid);

    let ref = collection(getFirestore(), 'users', auth.currentUser.uid, 'children')
    const childrenQuery = query(ref)
    const [querySnapshot] = useCollection(childrenQuery);
    const childrenList = querySnapshot?.docs.map((doc) => doc.data());

    const [user] = useDocumentDataOnce(userDoc)

    console.log(childrenList, user)

    return(
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <ChildrenList childrenList={childrenList}/>
        </div>
    )
}

function ChildrenList(data){
    let children = data.childrenList

    return children ? <>
    {children.map(({ name, gender, slug }, index) => { 
        let color = "bg-blue-50"
        if(gender == "F"){
            color = "bg-pink-50"
        }
        return(
            <Link key={index} href={`/dashboard/${slug}`}><div className={`flex justify-center align-middle h-full w-full rounded-lg p-4 ${color}`}>{name}</div></Link>
        )
    })}
    {children.length < 4 && 
        <Link href="/dashboard/add"><div key="3" className={`flex justify-center align-middle h-full w-full rounded-lg p-4 bg-slate-50`}>+</div></Link>
    }
    
    </> : 
    <h1>Loading..</h1>
}
