import classNames from "classnames";
import { AnimatePresence, motion, PanInfo, usePresence, Variants } from "framer-motion";
import { FC, useCallback, useState } from "react";
import { Todo } from "../../model/todo";
import { isMobile } from "../../util/html";
import Style from './item.module.scss';

export interface ItemProps {
    item: Todo,
    onDelete: (item: Todo) => void,
    onComplete: (item: Todo) => void,
}

const itemAnimation: Variants = {
    show: {
        opacity: 1,
        y: 0,

        transition: {
            delayChildren: .5
        }
    },
    hide: {
        opacity: 0,
        y: -200,
    },
    move: {
        backgroundColor: 'red'
    }
}


const headerAnimation: Variants = {
    show: {
        opacity: 1,
    },
    hide: {
        opacity: 0,
    }
}

const isMobileResult = isMobile()

const Item: FC<ItemProps> = ({ item, onComplete, onDelete }) => {

    const [backgroundColor, setBackgroundColor] = useState('');
    const [isPresent, safeToRemove] = usePresence()


    const onDragCallback = useCallback((panInfo: PanInfo) => {

        if (panInfo.offset.x <= 100 && (!isMobileResult || panInfo.offset.y > -50)) {
            onDelete(item)
        } else if (panInfo.offset.x > 200) {
            onComplete(item)
        }
    }, [onComplete, onDelete, item])

    const onChangeColor = (panInfo: PanInfo) => {
        if (panInfo.offset.x <= 0) {
            setBackgroundColor('red')
        } else if (panInfo.offset.x > 0) {
            setBackgroundColor('rgb(160, 204, 1)')
        }
    }

    const classToAppy = classNames({
        'container-item': true,
        [Style['container-item--cancel']]: !item.status,
        [Style['container-item--completed']]: item.status,
    })
    return <motion.li>
        <div className="container-item--background" style={{ backgroundColor: backgroundColor }}>
        </div>
        <AnimatePresence>
            <motion.div
                className={classToAppy} variants={itemAnimation}
                onDragEnd={(event, info) => onDragCallback(info)}
                onDrag={(event, info) => onChangeColor(info)}
                onAnimationEnd={() => safeToRemove ? safeToRemove() : () => { }}
                whileHover={{ scale: 1.01 }}
                dragSnapToOrigin={true}
                drag="x"
                initial="hide"
                animate={isPresent ? 'show' : 'move'}
                dragConstraints={{
                    left: -10,
                    right: 10,
                }}
                exit="move"
            >
                <motion.div variants={headerAnimation} >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{isPresent ? 'Show' : 'False'}</p>
                </motion.div>

            </motion.div>
        </AnimatePresence>


    </motion.li>
}

export default Item;