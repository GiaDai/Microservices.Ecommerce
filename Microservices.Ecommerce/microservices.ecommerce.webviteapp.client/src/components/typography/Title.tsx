import { FC, ReactNode } from "react"

interface TitleProps {
    className: string;
    children: ReactNode;
}

const Title: FC<TitleProps> = ({className, children}) => {
    return(
        <p className={`text-2xl font-bold  ${className}`}>{children}</p>
    )
}

export default Title