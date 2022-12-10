import { NavbarComponent, LeftBarComponent } from "../"
import { FeedLayout } from "../feed/FeedLayout"

export const AdminLayout = () => {
    return (
        <div className="grid grid-cols-12 bg-blue-gray-100 h-screen">
            <div className="col-span-2">
                <LeftBarComponent />
            </div>

            <div className="grid grid-rows-6 col-span-10 h-screen mr-4">
                {/* <div className="grid row-span-1 items-center">
                    <NavbarComponent />
                </div> */}

                <div className="row-span-6 bg-white rounded-xl shadow-xl my-4">
                    <FeedLayout />
                </div>
            </div>
        </div>
    )
}