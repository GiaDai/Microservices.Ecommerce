import { FC, ReactNode } from "react"

interface SubtitleProps {
    styleClass: string;
    children: ReactNode;
}

const Subtitle: FC<SubtitleProps> = ({styleClass, children}) => {
    return(
        <div className={`text-xl font-semibold ${styleClass}`}>{children}</div>
    )
}

export default Subtitle