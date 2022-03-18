import { motion, Variants } from "framer-motion";
import { FC } from "react";
import usePopup from "./popup.hook";
import Style from './popup.module.scss';

const popupAnimation: Variants = {
    initial: {
        opacity: 0,
        y: -100,
        translateX: '-50%',
        translateY: '-50%',

    },
    show: {
        opacity: 1,
        y: 0,
        translateX: '-50%',
        translateY: '-50%',
    }
}

const popup: FC = ({ children }) => {
    usePopup()
    return <motion.div className={Style['popup']} variants={popupAnimation} initial="initial" animate="show">
        {children}
    </motion.div>
}

export default popup;