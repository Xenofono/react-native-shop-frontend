import { AuthAction } from "../actions/auth";


interface AuthInterface {
    token: string,

}

const initialState = {
    token:""
}


export default (state: AuthInterface = initialState, action: AuthAction) => {
    switch(action.type) {
        case "LOGIN":
            console.log("tar emot token: ", action.payload.token)
            return {
                ...state,
                token: action.payload.token
            }
        case "LOGOUT":
            return initialState
        default:
            return state;
    }


}