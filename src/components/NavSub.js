import { RxDashboard } from "react-icons/rx"
import { GiTrophyCup } from "react-icons/gi"
import { AiOutlineUser, AiOutlineEdit } from "react-icons/ai"
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { TbChartInfographic } from 'react-icons/tb'

const NavSub = () => {
    const doSomething = () => {
        console.log('tes')
    }
    return (
        <div>
           <ul className="flex space-x-6 m-6 text-md font-semibold">
                <li className="flex space-x-2 items-center"><AiOutlineEdit />Audit</li>
                <li className="flex space-x-2 items-center"><RxDashboard /> Dashboard</li>
                <li className="flex space-x-2 items-center"><GiTrophyCup /> Leaderboard</li>
                <li className="flex space-x-2 items-center"><AiOutlineUser /> User Management</li>
                <li className="flex space-x-2 items-center"><AiOutlineUser /> Org Management</li>
                <li className="flex space-x-2 items-center"><RxDashboard /> Hirarchy</li>
                <li className="flex space-x-2 items-center"><HiOutlineDocumentReport /> Approval</li>
                <li className="flex space-x-2 items-center"><HiOutlineDocumentReport /> Report</li>
                <li className="flex space-x-2 items-center"><TbChartInfographic /> Analytics</li>
           </ul>
        </div>
    )

}
export default NavSub