import { FC, useState } from "react";
import BottomPopup from "../popup/bottom-popup";
import { Formik } from 'formik';
import { Todo } from "../../model/todo";
import { getContainer } from "../../infraestructure/container";
import { TodoService } from "../../services/todo.service";
import { TYPES } from "../../infraestructure/types";
import { useDispatch } from "react-redux";
import { fetchAll } from "../../features/todo.slice";

export interface AddProps {
    onCancel: () => void,

}


const myContainer = getContainer()
const service = myContainer.get<TodoService>(TYPES.TodoService)

const Add: FC<AddProps> = ({ onCancel }) => {
    const [close, setClose] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const dispacher = useDispatch()

    const onSubmitHandler = async (item: Todo) => {
        setLoading(true)
        try {
            const result = await service.insert(item)
            if (result.status) {
                setClose(true)
                dispacher(fetchAll())
            }

        } finally {
            setLoading(false)
        }
    }



    return <BottomPopup onCancel={onCancel} close={close}>
        <h2 className="mt-1">Agregar tarea</h2>

        <Formik initialValues={{ title: '', description: '' }} validate={values => {
            const errors: { [key: string]: string } = {}
            if (!values.description) {
                errors.description = '*Es requerido'
            }
            else if (values.description.length < 3) {
                errors.description = 'Debe ser mayor a 3 carácteres'
            }

            if (!values.title) {
                errors.title = '*Es requerido'
            }
            else if (values.title.length < 3) {
                errors.title = 'Debe ser mayor a 3 carácteres'
            }

            return errors
        }}
            onSubmit={(values) => {
                const toEmit: Todo = {
                    ...values,
                    id: '',
                    status: false
                }

                onSubmitHandler(toEmit)
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form className="form-field" onSubmit={handleSubmit}>
                    <fieldset disabled={isLoading}>
                        <div className="input-field">
                            <label>Título</label>
                            <input type="text"
                                name="title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}></input>
                            <span className="error">
                                {errors.title && touched.title && errors.title}
                            </span>
                        </div>

                        <div className="input-field">
                            <label>Descripción</label>
                            <textarea
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                            ></textarea>
                            <span className="error">
                                {errors.description && touched.description && errors.description}
                            </span>
                        </div>

                        <div className="form-footer">
                            <button type="submit" className="button button--primary">Agregar</button>
                            <button type="button" onClick={() => setClose(true)} className="button button-secondary">Cancelar</button>
                        </div>
                    </fieldset>
                </form>
            )}
        </Formik>

    </BottomPopup>
}

export default Add;