import { FC } from "react";
import Style from './confirm.module.scss';
import Popup from "../popup/popup";

export interface ConfirmProps {
    title: string,
    onAccept: () => void,
    onCancel: () => void
}

const confirm: FC<ConfirmProps> = ({ title, onAccept, onCancel, children }) => {
    return <Popup>
        <div className={Style['popup-container']}>
            <h2>{title}</h2>
            {children}
        </div>

        <div className={Style['popup-footer']}>
            <button onClick={onAccept} className="button button--primary">Aceptar</button>
            <button onClick={onCancel} className="button button--secondary">Cancelar</button>
        </div>
    </Popup>
}

export default confirm;