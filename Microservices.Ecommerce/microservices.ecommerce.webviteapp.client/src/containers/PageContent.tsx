import Header from "./Header"
import { Route, Routes } from 'react-router-dom'
import routes from '../routes'
import { Suspense, lazy, useRef, useEffect } from 'react'
import SuspenseContent from "./SuspenseContent"
import { useSelector } from 'react-redux'

const Page404 = lazy(() => import('../pages/protected/404'))

const PageContent: React.FC = () => {
    const mainContentRef = useRef<HTMLDivElement>(null);
    const {pageTitle} = useSelector((state: any) => state.header)

    // Scroll back to top on new page load
    useEffect(() => {
        mainContentRef.current?.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [pageTitle])

    return(
        <div className="drawer-content flex flex-col ">
            <Header/>
            <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200" ref={mainContentRef}>
                <Suspense fallback={<SuspenseContent loadingText="Loading..." />}>
                        <Routes>
                            {
                                routes.map((route, key) => {
                                    return(
                                        <Route
                                            key={key}
                                            path={`${route.path}`}
                                            element={<route.component />}
                                        />
                                    )
                                })
                            }

                            {/* Redirecting unknown url to 404 page */}
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div> 
    )
}

export default PageContent