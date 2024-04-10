import { useState, FC, ChangeEvent } from "react"

interface InputTextProps {
    labelTitle: string;
    labelStyle: string;
    type?: string;
    containerStyle: string;
    defaultValue: string;
    placeholder?: string;
    updateFormValue: (obj: { updateType: any, value: string }) => void;
    updateType: any;
}

const InputText: FC<InputTextProps> = ({labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType}) => {

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val: string) => {
        setValue(val)
        updateFormValue({updateType, value : val})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input type={type || "text"} value={value} placeholder={placeholder || ""} onChange={(e: ChangeEvent<HTMLInputElement>) => updateInputValue(e.target.value)} className="input  input-bordered w-full " />
        </div>
    )
}

export default InputText