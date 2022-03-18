import { FC, useCallback, useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"
import Style from "./bottom-popup.module.scss"
import usePopup from "./popup.hook"
import { AiOutlineClose } from "react-icons/ai"
import AnimatedButton from "../animated-button"

export interface TopPopupProps {
    onCancel: () => void,
    close?: boolean
}

const topPopupAnimation: Variants = {
    initial: {
        y: "100%",
        translateX: "-50%"
    },
    show: {
        y: "0",
        translateX: "-50%",
        transition: {
            damping: 1
        }
    }
}

const topPopup: FC<TopPopupProps> = ({ children, close, onCancel }) => {
    usePopup()

    const [animation, setAnimation] = useState("show");

    const onCancelAnimated = useCallback(
        () => {
            if (animation === "initial") {
                onCancel()
            }
        },
        [animation, onCancel],
    )

    useEffect(() => {
        if (close) {
            setAnimation("initial");
        }
    }, [close])

    return <motion.div className={Style['container-bottom-popup']}
        variants={topPopupAnimation} initial="initial" animate={animation}
        onAnimationComplete={onCancelAnimated}
    >
        <AnimatedButton className={Style["close-button"]} onClick={() => setAnimation("initial")}>
            <AiOutlineClose size={20} />

        </AnimatedButton>
        <div>
            {children}
        </div>

    </motion.div>
}


export default topPopup