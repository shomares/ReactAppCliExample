import { FC } from "react";
import { Todo } from "../../model/todo";
import {  motion } from "framer-motion";
import Item from "./item";
import { connect } from "react-redux";
import { RootState } from "../../store";

export interface ListProps {
    items?: Todo[],
    onDelete: (item: Todo) => void,
    onComplete: (item: Todo) => void,
}


let ListToDo: FC<ListProps> = ({ items, onDelete, onComplete }) => {
    const toRender = items ? items.map(it => <Item
        key={it.id}
        item={it} onDelete={onDelete} onComplete={onComplete}></Item>) : []

    return items && items.length > 0 ? <motion.ul className="container-list"
        animate="show"
        initial="hide"
    >
            {toRender}
    </motion.ul> : <p>Sin resultados</p>
}

const mapToState = (state: RootState) => ({
    items: state.todo.value,
})

ListToDo = connect(mapToState, null)(ListToDo)

export default ListToDo;