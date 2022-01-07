// import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';
import { useEffect, useState, useCallback, useContext } from 'react';


export default function Setup(){
    const { user, parentName, childName, childAge } = useContext(UserContext);

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log('lmao')
    }

    // Basically here you ask for a field if it's missing, else you just dont, and ask for whats needed, will make a beautiful ui in the near future 

    return (
        <section>
            <form onSubmit={onSubmit}>
                <input type="text" name="parentsName" />
                <input type="text" name="email" />
                <input type="text" name="email" />
                <button type="submit">
                    Submit
                </button>
            </form>
        </section>
    );
}