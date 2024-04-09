import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil'
import { deleteLead } from '../../leads/leadSlice'
import { showNotification } from '../headerSlice'

interface ConfirmationModalBodyProps {
    extraObject: {
        message: string;
        type: string;
        _id: string;
        index: number;
    };
    closeModal: () => void;
}

const ConfirmationModalBody: FC<ConfirmationModalBodyProps> = ({ extraObject, closeModal }) => {
    const dispatch = useDispatch()

    const { message, type, index } = extraObject

    const proceedWithYes = () => {
        if (type === GLOBAL_CONSTANTS.CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
            dispatch(deleteLead({ index }))
            dispatch(showNotification({ message: "Lead Deleted!", status: 1 }))
        }
        closeModal()
    }

    return (
        <>
            <p className='text-xl mt-8 text-center'>
                {message}
            </p>

            <div className="modal-action mt-12">
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary w-36" onClick={proceedWithYes}>Yes</button>
            </div>
        </>
    )
}

export default ConfirmationModalBody