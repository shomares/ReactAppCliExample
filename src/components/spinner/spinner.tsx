import { FC } from "react"
import { connect } from "react-redux"
import { RootState } from "../../store"

export interface SpinnerProps {
    isLoading?: boolean
}

let Spinner: FC<SpinnerProps> = ({ isLoading }) => {
    return isLoading ? <span></span> : <></>
}

const mapToState = (state: RootState) => ({
    isLoading: state.todo.isDoingAction
})

Spinner = connect(mapToState, null)(Spinner)

export default Spinner

