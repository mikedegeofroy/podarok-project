import { auth } from "../../lib/firebase"
import AuthCheck from "../../components/authcheck";
import { getFirestore, doc, collection, query, setDoc } from 'firebase/firestore';
import { useCollection, useCollectionData, useDocumentDataOnce } from "react-firebase-hooks/firestore";

import kebabCase from "lodash.kebabcase"
import { useRouter } from "next/router";

export default function UserProfile(){

    return(
        <AuthCheck>
            <AddChild/>
        </AuthCheck>
    )

}

function AddChild(){

    const router = useRouter()


    let ref = collection(getFirestore(), 'users', auth.currentUser.uid, 'children')
    const childrenQuery = query(ref)
    const children = useCollectionData(childrenQuery);

    if(children[0]){
        if(children[0].length > 4){
            return <>Sorry, you can't add more children.</>
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(e.target[1].value)

        const name = e.target[0].value
        const birthday = e.target[1].value
        const gender = "F"
        const slug = encodeURI(kebabCase(name))
    
        const uid = auth.currentUser.uid;
        const ref = doc(getFirestore(), 'users', uid, 'children', slug);
    
        const data = {
            name,
            birthday,
            gender,
            slug
        };
    
        await setDoc(ref, data);
    
        console.log('done')

        router.push("/dashboard")
    }

    return(
        <div className="grid place-items-center h-screen">
            <div className="w-52">
                <section>
                    <form onSubmit={onSubmit}>
                        <h3>Name</h3>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6' name="username"/>
                        <h3>Age</h3>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="date" id="birthday" name="birthday"></input>
                        {/* <input className='shadow appearance-none border rounded w-full py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password"/> */}
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded container mx-auto my-4' type="submit">
                            Add
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )

}