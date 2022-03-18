import { useCallback, useEffect, useState } from "react";
import { Nullable } from "../../model/nullable";
import { Todo } from "../../model/todo";
import { useDispatch, useSelector } from "react-redux";
import { cancel, complete, fetchAll } from "../../features/todo.slice";
import { selectUser } from "../../features/user.slice";

export function useTodo() {

    const [showCancel, setShowCancel] = useState(false)
    const [showComplete, setShowComplete] = useState(false)
    const [current, setCurrent] = useState<Nullable<Todo>>(null)
    const [showAdd, setShowAdd] = useState(false)
    const user = useSelector(selectUser)

    const dispatcher = useDispatch()

    const onDelete = (it: Todo) => {
        if (it.status) {
            setShowCancel(true)
            setCurrent(it)
        }
    }

    const onComplete = (it: Todo) => {
        if (!it.status) {
            setShowComplete(true)
            setCurrent(it)
        }
    }

    const onHandleDelete = useCallback(
        () => {
            if (current) {
                dispatcher(cancel(current.id))
                setShowCancel(false)
                setCurrent(null)
            }
        },
        [current],
    )

    const onHandleComplete = useCallback(
        () => {
            if (current) {
                dispatcher(complete(current.id))
                setShowComplete(false)
                setCurrent(null)
            }
        },
        [current],
    )


    const onHandleCancel = () => {
        setShowCancel(false)
        setShowComplete(false)
        setCurrent(null)
    }


    useEffect(() => {
        if(user){
            dispatcher(fetchAll())
        }
       
    }, [user])

    return {
        showCancel,
        current,
        showComplete,
        showAdd,
        onDelete,
        onComplete,
        onHandleDelete,
        onHandleCancel,
        onHandleComplete,
        setShowAdd
    }

}