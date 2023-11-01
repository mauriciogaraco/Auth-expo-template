import { useState } from "react";

export const useForm =<T extends Object> (initialState : T) => {
const [state, setstate] = useState(initialState);

const onChange = (value: string, field: keyof T) => {
    setstate({
        ...state,
        [field]:value
    });
}
    return{
        ...state,
        form:state,
        onChange
    }
}
