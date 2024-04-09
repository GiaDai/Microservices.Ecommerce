import { useState, FC } from "react"

interface ToggleInputProps {
    labelTitle: string;
    labelStyle: string;
    containerStyle: string;
    defaultValue: boolean;
    placeholder?: string;
    updateFormValue: (obj: { updateType: any, value: boolean }) => void;
    updateType: any;
}

const ToggleInput: FC<ToggleInputProps> = ({labelTitle, labelStyle,  containerStyle, defaultValue, updateFormValue, updateType}) => {

    const [value, setValue] = useState(defaultValue)

    const updateToggleValue = () => {
        const newValue = !value;
        setValue(newValue)
        updateFormValue({updateType, value : newValue})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label cursor-pointer">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
                <input type="checkbox" className="toggle" checked={value}  onChange={updateToggleValue}/>
            </label>
        </div>
    )
}

export default ToggleInput