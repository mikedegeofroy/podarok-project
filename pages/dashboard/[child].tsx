// import { collection, doc, getFirestore, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/authcheck";
import { auth } from "../../lib/firebase";

export async function getServerSideProps({ query }) {

    const { child } = query


    return {
      props: {
          child
      }
    }
  }


export default function Child({ child }){

    console.log(child)

    return(
        <AuthCheck>
            <p>Hey</p>
        </AuthCheck>
    )
}

function ChildData({ props }){



    return(
    <>
    </>
    )
}