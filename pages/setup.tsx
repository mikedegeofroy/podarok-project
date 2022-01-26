// import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';
import { firestore } from '../lib/firebase';
import { useEffect, useState, useCallback, useContext } from 'react';
import Box from '../components/box';


export default function Setup(){
    const {user, childName, childAge, childGender} = useContext(UserContext);

    const onSubmit = async (e) => {
        e.preventDefault()

        console.log(e)

        // // Create refs for both documents
        // const userDoc = firestore.doc(`users/${user.uid}`);
        // const usernameDoc = firestore.doc(`usernames/${formValue}`);
        // // Commit both docs together as a batch write.

        // const batch = firestore.batch();
        // batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
        // batch.set(usernameDoc, { uid: user.uid });
            
        // await batch.commit();
    }

    // Basically here you ask for a field if it's missing, else you just dont, and ask for whats needed, will make a beautiful ui in the near future 

    return (
        !childName && (
        <section>
            <div className="grid place-items-center h-screen">
                <Box>
                    <form className="w-52" onSubmit={onSubmit}>
                        <h3>Parent's Name</h3>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" id="cockDealer" type="text" name="parentsName" />
                        <h3>Child's Name</h3>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" type="text" name="email" />
                        <h3>Child Gender</h3>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" type="text" name="email" />
                        <h3>Child Age</h3>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" type="text" name="email" />
                        <br />
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded container mx-auto my-4' type="submit">
                            Submit
                        </button>
                    </form>
                </Box>
            </div>
        </section>
        )
    );
}