import { doc, getFirestore } from "firebase/firestore";
import router from "next/router";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/authcheck";
import { auth } from "../../lib/firebase";

export default function Child(){

    return(
        <AuthCheck>
            <div className="pt-16">
                <ChildData/>
            </div>
        </AuthCheck>
    )
}

function ChildData(){

    const { slug } = router.query;

    // @ts-ignore
    const childRef = doc(getFirestore(), 'users', auth.currentUser.uid, 'children', slug)

    const [child] = useDocumentDataOnce(childRef);

    console.log(child)

    // Here I should add a request button, and some edit functionallity

    return(
        <div>
            {child ? (
                <div>
                    <h1>{child.name}</h1>
                    <h1>{child.status}</h1>
                    <h1>{child.birthday}</h1>
                    <h1>{child.gender}</h1>
                </div>
            ) : (<div>Loading...</div>)}
        </div>
    )
}