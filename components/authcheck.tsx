import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function AuthCheck(props){

    const { user }  = useContext(UserContext)

    return user ? props.children : props.fallback || <div className="grid place-items-center min-h-screen"><Link href="/login">Please log in to access this page.</Link></div>;

}