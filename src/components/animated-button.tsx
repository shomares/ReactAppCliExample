import { motion } from "framer-motion"
import { FC } from "react"

export interface AnimatedButtonProps {
    onClick: () => void,
    className?: string,
}

const AnimatedButton: FC<AnimatedButtonProps> = ({ onClick, children, className }) => {
    return <motion.button onClick={onClick} className={className}
        whileHover={{
            scale: 1.1
        }}
        initial={{
            scale: .8
        }}
    >
        {children}
    </motion.button>
}

export default AnimatedButton