import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddLeadModalBody from '../features/leads/components/AddLeadModalBody'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import { GLOBAL_CONSTANTS } from '../utils/globalConstantUtil'

interface ModalState {
    modal: {
        isOpen: boolean;
        bodyType: string;
        size: string;
        extraObject: any;
        title: string;
    };
}

const ModalLayout: FC = () => {
    const { isOpen, bodyType, size, extraObject, title } = useSelector((state: ModalState) => state.modal)
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeModal())
    }

    return (
        <>
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
                <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                    <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

                    {
                        {
                            [GLOBAL_CONSTANTS.MODAL_BODY_TYPES.LEAD_ADD_NEW]: <AddLeadModalBody closeModal={close} />,
                            [GLOBAL_CONSTANTS.MODAL_BODY_TYPES.CONFIRMATION]: <ConfirmationModalBody extraObject={extraObject} closeModal={close} />,
                            [GLOBAL_CONSTANTS.MODAL_BODY_TYPES.DEFAULT]: <div></div>
                        }[bodyType]
                    }
                </div>
            </div>
        </>
    )
}

export default ModalLayout