import { Outlet } from "react-router-dom"
import { BreadcrumbsComponent } from "../../breadcrumbs"

export const FeedLayout = () => {

    return (
        <div className="p-5 grid gap-5">
            <BreadcrumbsComponent />
            <Outlet />
        </div >
    )
}
