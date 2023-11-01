import { createContext, useReducer } from "react";
import { AuthState, authReducer } from "./authReducer";
import authApi from "./api";

type AuthContextProps = {
    errorMessage: null ,
    token : string | null,
    user: Usuario | null
    status : 'checking' | 'authenticated' | 'noAuthenticated'
    singUp : () => void;
    singIn : (loginData:LoginData) => void;
    logOut : () => void;
    removeError  : () => void
}

export interface LoginData {
email:string,
password:string
}
export interface LoginResponse {
    usuario: Usuario,
    token: string
}

export interface Usuario {
    email: string,
    name: string,
    id:string,
    
}

const authInitialState: AuthState = {
    status:'checking',
    token:null,
    user:null,
    errorMessage: ''
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}:any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

  const  singIn = async({email,password}:LoginData) => {
    try{
      const resp = await authApi.post<LoginResponse>('/identity/login', {email, password});
      console.log(resp.data);
    }catch(error:any){
        console.log(error.response.data);
    }
  }
  const  singUp = () => {}
  const   logOut = () => {}
  const   removeError  = () => {}

    return (
        <AuthContext.Provider value ={{
            ...state,
            singUp,
            logOut,
            removeError,
            singIn
        }}>
            {children}
        </AuthContext.Provider>
    )

}