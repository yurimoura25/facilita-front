import { createContext, useEffect, useState } from 'react'

const UserContext = createContext({type: 'usuario'});

export const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const userStoragedContent = '@facilita:user_context';
    const setOng = () => {
        const type = {type: 'ong'};
        setUserInfo(type);
        localStorage.setItem(userStoragedContent, JSON.stringify(type));
    }

    const setUsuario = () => {
        const type = {type: 'usuario'};
        setUserInfo(type);
        localStorage.setItem(userStoragedContent, JSON.stringify(type));
    }

    useEffect(() => {
        const loadStoragedData = localStorage.getItem(userStoragedContent);
        if(loadStoragedData) {
            setUserInfo(JSON.parse(loadStoragedData));
        } else {
            setUserInfo({type: 'usuario'})
        }
    },[])

    return(
    <UserContext.Provider value={{ userInfo, setOng, setUsuario}}>
        {children}
    </UserContext.Provider>
    )
}


export default UserContext;