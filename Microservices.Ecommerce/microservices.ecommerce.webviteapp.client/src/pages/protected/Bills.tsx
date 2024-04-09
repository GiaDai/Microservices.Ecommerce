import { useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Billing from '../../features/settings/billing'

const InternalPage: FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Bills"}))
    }, [dispatch])

    return(
        <Billing />
    )
}

export default InternalPage