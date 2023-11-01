import { Usuario } from "./authContext";

export interface AuthState  {
status: 'checking' | 'authenticated' | 'noAuthenticated';
errorMessage :string;
user :Usuario | null ;
token: string | null;
}


// acciones 

type AuthAction = 
| {type : 'signUp',payload: {token:string ,user:Usuario} }
| { type: 'addError', payload:string}
| {type: 'removeError'}
| {type: 'noAuthenticated'}
| {type : 'logOut'}

export const authReducer = (state: AuthState, action:AuthAction): AuthState => {
switch (action.type) {
    case 'addError':
        
      return {
        ...state,
        user:null,
        status:'noAuthenticated',
        token:null,
        errorMessage : action.payload
      }

    case 'removeError':

      return {
        ...state,
        errorMessage:''
       }
    case 'signUp':

        return {
            ...state,
         status:'authenticated',
         token: action.payload.token,
         errorMessage:'',
         user : action.payload.user
        }
    case 'noAuthenticated':
    return {
     ...state,
     status:'noAuthenticated',
     token:null,
     user:null,
    }
    case 'logOut':
    return {
        ...state,
        status:'noAuthenticated',
        token:null,
        user:null,
    }
       default:
        return state;
}
}