import { createContext } from "react";

export const UserContext = createContext({user: null, childName: null, childAge: null, childGender: null});