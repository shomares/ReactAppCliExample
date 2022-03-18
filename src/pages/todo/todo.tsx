import { FC, Fragment } from "react";
import { BsPlus } from "react-icons/bs";
import AnimatedButton from "../../components/animated-button";
import Confirm from "../../components/confirm/confirm";
import { TodoList } from "../../components/todo";
import Add from "../../components/todo/add";
import ToogleMode from "../../components/toogle-mode";
import { useTodo } from "./todo-hook";

const TodoPage: FC = () => {
    const {
        current,
        showCancel,
        showComplete,
        showAdd,
        onComplete,
        onDelete,
        onHandleDelete,
        onHandleCancel,
        onHandleComplete,
        setShowAdd
    } = useTodo();


    return <Fragment>
        <AnimatedButton className="add-button" onClick={() => setShowAdd(true)}>
            <BsPlus size={25} />
        </AnimatedButton>

        {showAdd && <Add onCancel={() => setShowAdd(false)} />}

        {showCancel && current && <Confirm title="Tareas" onAccept={onHandleDelete} onCancel={onHandleCancel}>
            <p>¿Desea cancelar la tarea {current.title}?</p>
        </Confirm>}

        {showComplete && current && <Confirm title="Tareas" onAccept={onHandleComplete} onCancel={onHandleCancel}>
            <p>¿Desea completar la tarea {current.title}?</p>
        </Confirm>}

        <ToogleMode />
        <TodoList onDelete={onDelete} onComplete={onComplete} />
    </Fragment>
}

export default TodoPage;