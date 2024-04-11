import { FC } from 'react'
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon'

interface SuspenseContentProps {
  loadingText: string;
}

const SuspenseContent: FC<SuspenseContentProps> = ({ loadingText }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <div className="z-50 flex flex-col items-center justify-center">
                <ArrowPathIcon className="h-12 w-12 text-blue-500 animate-spin" />
                <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-white">{loadingText}</p>
            </div>
        </div>
    )
}

export default SuspenseContent