import { useState, FC, ChangeEvent } from "react"

interface TextAreaInputProps {
    labelTitle: string;
    labelStyle: string;
    containerStyle: string;
    defaultValue: string;
    placeholder?: string;
    updateFormValue: (obj: { updateType: any, value: string }) => void;
    updateType: any;
}

const TextAreaInput: FC<TextAreaInputProps> = ({labelTitle, labelStyle, containerStyle, defaultValue, placeholder, updateFormValue, updateType}) => {

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
            <textarea value={value} className="textarea textarea-bordered w-full" placeholder={placeholder || ""} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateInputValue(e.target.value)}></textarea>
        </div>
    )
}

export default TextAreaInput