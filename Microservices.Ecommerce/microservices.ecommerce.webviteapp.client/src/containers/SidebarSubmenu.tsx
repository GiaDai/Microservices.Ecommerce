import { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

interface Submenu {
    path: string;
    icon: JSX.Element;
    name: string;
}

interface SidebarSubmenuProps {
    submenu: Submenu[];
    name: string;
    icon: JSX.Element;
}

const SidebarSubmenu: FC<SidebarSubmenuProps> = ({ submenu, name, icon }) => {
    const location = useLocation()
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        if (submenu.filter(m => m.path === location.pathname).length > 0) {
            setIsExpanded(true)
        }
    }, [location.pathname, submenu])

    return (
        <div className='flex flex-col'>
            <div className='w-full block' onClick={() => setIsExpanded(!isExpanded)}>
                {icon} {name}
                <ChevronDownIcon className={'w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all  ' + (isExpanded ? 'rotate-180' : '')} />
            </div>

            <div className={` w-full ` + (isExpanded ? "" : "hidden")}>
                <ul className={`menu menu-compact`}>
                    {
                        submenu.map((m, k) => (
                            <li key={k}>
                                <Link to={m.path}>
                                    {m.icon} {m.name}
                                    {
                                        location.pathname === m.path ? (<span className="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                            aria-hidden="true"></span>) : null
                                    }
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default SidebarSubmenu