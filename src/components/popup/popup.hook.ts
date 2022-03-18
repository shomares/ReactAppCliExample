import { useEffect } from "react"
import Style from './popup.module.scss';

export default function usePopup(){
    useEffect(() => {
        const wrapper = document.createElement("div")
        wrapper.id = 'wrapper_popup'
        wrapper.classList.add(Style['wrapper'])
        document.body.appendChild(wrapper)
    }, [])

    useEffect(() => () => {
        const wrapper = document.getElementById('wrapper_popup')
        if (wrapper) {
            document.body.removeChild(wrapper)
        }
    }, [])

    return {
        
    }
}