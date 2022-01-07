import { createContext } from "react";

export const UserContext = createContext({user: null, parentName: null, childName: null, childAge: null});