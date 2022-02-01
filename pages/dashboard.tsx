import { auth } from '../lib/firebase'
import AuthCheck from '../components/authcheck'
import { useDocumentDataOnce, useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, doc, collection, query } from 'firebase/firestore';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';

export default function UserProfile(){

    return(
        <AuthCheck>
            <div className="pt-16">
                <ProfileData/>
                <SignOutButton/>
            </div>
        </AuthCheck>
    )

}

function SignOutButton(){
    const router = useRouter()
    return <button onClick={() => {auth.signOut().then( () => {router.push('/login'); toast.success('Logged Out')})}}>Log Out</button>;
}

function ProfileData(){

    const userDoc = doc(getFirestore(), 'users', auth.currentUser.uid);

    let ref = collection(getFirestore(), 'users', auth.currentUser.uid, 'children')
    const childrenQuery = query(ref)
    const [querySnapshot] = useCollection(childrenQuery);
    const children = querySnapshot?.docs.map((doc) => doc.data());

    const [user] = useDocumentDataOnce(userDoc)

    console.log(children, user)

    return(
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <ChildrenList children={children}/>
        </div>
    )
}

function ChildrenList(data){
    let children = data.children

    return children ? <>
    {children.map(({ name, gender }, index) => { 
        let color = "bg-blue-50"
        if(gender == "F"){
            color = "bg-pink-50"
        }
        return(
            <div key={index} className={`h-full w-full rounded-lg p-4 ${color}`}>{name}</div>
        )
    })}
    {children.length < 4 && 
        <div key="3" className={`h-full w-full rounded-lg p-4 bg-slate-50`}>+</div>
    }
    
    </> : 
    <h1>Loading..</h1>
}