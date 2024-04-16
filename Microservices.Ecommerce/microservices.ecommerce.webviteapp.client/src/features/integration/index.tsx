import { useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "@components/cards/TitleCard"
import { showNotification } from "../common/headerSlice"

const INITIAL_INTEGRATION_LIST = [
    // ... existing data ...
]

const Integration = () => {

    const dispatch = useDispatch()

    const [integrationList, setIntegrationList] = useState(INITIAL_INTEGRATION_LIST)

    const updateIntegrationStatus = (index: number) => {
        let integration = integrationList[index]
        setIntegrationList(integrationList.map((i, k) => {
            if(k===index)return {...i, isActive : !i.isActive}
            return i
        }))
        dispatch(showNotification({message : `${integration.name} ${integration.isActive ? "disabled" : "enabled"}` , status : 1}))
    }

    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
                integrationList.map((i, k) => {
                    return(
                        <TitleCard key={k} title={i.name} topMargin={"mt-2"}>
                            
                            <p className="flex">
                                <img alt="icon" src={i.icon} className="w-12 h-12 inline-block mr-4" />
                                {i.description}
                            </p>
                            <div className="mt-6 text-right">
                                <input type="checkbox" className="toggle toggle-success toggle-lg" checked={i.isActive} onChange={() => updateIntegrationStatus(k)}/>
                            </div>
                            
                        </TitleCard>
                    )
                
                })
            }
            </div>
        </>
    )
}

export default Integration