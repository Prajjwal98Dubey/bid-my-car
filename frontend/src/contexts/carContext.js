
import { createContext, useState } from "react";
export const carContext = createContext(null)
export const CarProvider = (props) => {
    const [items, setItems] = useState([])
    return <carContext.Provider value={{ items, setItems }}>
        {props.children}
    </carContext.Provider>
}

