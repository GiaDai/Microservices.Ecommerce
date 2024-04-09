import { FC } from 'react'
import Login from '../features/user/Login'
import Header from "../containers/Header";
const ExternalPage: FC = () => {
    return(
        <div className="">
            <Header />
            <Login />
        </div>
    )
}

export default ExternalPage