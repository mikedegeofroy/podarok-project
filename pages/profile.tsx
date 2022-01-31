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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
            {childrenList(children)}
        </div>
    )
}

function childrenList(children){
    return children ? children.map(({ name, gender }) => { 
        return(
            <div className="h-full w-full bg-blue-300">{name}</div>
        )
    }) : 
    <h1>Fuck</h1>
}