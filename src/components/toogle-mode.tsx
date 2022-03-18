import { FC, useCallback, useState } from "react"
import { Nullable } from "../model/nullable"
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from 'react-icons/bs'
import { motion } from "framer-motion";
import AnimatedButton from "./animated-button";

const onChangeCssVariables = (mode: boolean) => {
    const variables: Nullable<HTMLElement> = document.querySelector(":root");
    if (variables) {

        if (!mode) {
            variables.style.setProperty('--body-color', 'black')
            variables.style.setProperty('--container-item-color', 'black')
            variables.style.setProperty('--font-color', 'white')
            variables.style.setProperty('--contaner-item-border', 'transparent')
        } else {
            variables.style.setProperty('--body-color', 'white')
            variables.style.setProperty('--container-item-color', 'rgb(247, 246, 245)')
            variables.style.setProperty('--font-color', 'rgb(99, 99, 99)')
            variables.style.setProperty('--contaner-item-border', 'rgb(226, 226, 225)')
        }

    }
}

const toogleMode: FC = () => {
    const [toogle, setToogle] = useState(false);

    const onClick = useCallback(() => {
        setToogle(!toogle)
        onChangeCssVariables(toogle)
    }, [toogle]);


    return <AnimatedButton onClick={onClick} className="mode-button">
        {toogle ? <BsFillLightbulbFill size={20} /> : <BsFillLightbulbOffFill size={20} />}
    </AnimatedButton>
}

export default toogleMode;