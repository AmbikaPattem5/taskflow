import { Search, Bell } from "lucide-react"
function Header() {
    return (
        <div className="flex justify-between px-4 h-16 border-b border-gray-100 gap-3">
            <div className="relative border border-gray-300 h-9 w-full max-w-xs md:max-w-md rounded-xl items-center px-3 m-3">
                <Search size={15} className="absolute top-2.5 left-0.5 " />

                <input type="text" value="" placeholder="Search" className="p-2" />
            </div>
            <div className="flex flex-row gap-4 items-center ">
                <div >
                    <button className="border border-gray-300 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer rounded p-2 ">+ Quick Add</button>
                </div>
                <div className="relative">
                    <Bell size={20} />
                </div>
                <div className="border border-gray-300 text-center rounded-full px-3 py-1">user</div>
            </div>
        </div>
    )
}
export default Header;