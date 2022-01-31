// import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { doc, writeBatch, getDoc, getFirestore } from 'firebase/firestore';
import { signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';
import { UserContext } from '../lib/context';

import { useEffect, useState, useCallback, useContext } from 'react';

export default function Setup(){
    const {user, childName, childAge, childGender} = useContext(UserContext);

    const onSubmit = async (e) => {
        e.preventDefault()

        let parentsName = e.target[0].value

        // Create refs for both documents
        
        // const userDoc = doc(getFirestore(), 'users', user.uid);
        // const usernameDoc = doc(getFirestore(), 'usernames', formValue);
        
        // Commit both docs together as a batch write.
        // const batch = writeBatch(getFirestore());
        // batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
        // batch.set(usernameDoc, { uid: user.uid });
        
        // await batch.commit();
    }

    // Basically here you ask for a field if it's missing, else you just dont, and ask for whats needed, will make a beautiful ui in the near future 

    return (
        !childName && (
        <section>
            <div className="grid place-items-center h-screen">
                    <form className="w-52" onSubmit={onSubmit}>
                        <h3>Parent&apos;s Name</h3>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-6" type="text" name="parentsName" />
                        <h3>Child&apos;s Name</h3>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-6" type="text" name="email" />
                        <h3>Child Gender</h3>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-6" type="text" name="email" />
                        <h3>Child Age</h3>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none mb-6" type="text" name="email" />
                        <br />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded container mx-auto my-4" type="submit">
                            Submit
                        </button>
                    </form>
            </div>
        </section>
        )
    );
}