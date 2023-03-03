import React, { useState } from 'react'
import Popup from "reactjs-popup";
import { BsChevronDown } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg"
const DropdownUser = () => {

    const [open, setOpen] = useState(false)
    const [clicked, setClicked] = useState(false)
    const closeModal = () => setOpen(false)
    const clickTes = () => {
        console.log("rest")
    }
    const openModal = () => {
        setOpen(true)
        setClicked(false)
    }
    return (
        <React.Fragment>
            <div className="menu">
                <Popup
                    trigger={
                        <div className='text-white font-medium font-play py-2 flex items-center space-x-2'>
                            
                            <CgProfile size={20} />
                            <BsChevronDown size={18} />

                        </div>
                    }
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none' }}
                    arrow={false}
                >
                    <div className="w-44 absolute bg-white shadow-md top-6 right-0 mt-12 flex flex-col px-6">
                        <li className='border-b p-2 border-gray-300 py-2.5 flex items-center space-x-2' onClick={openModal}><FaRegUserCircle size={22} className="text-gray-400" /><a className='md:text-base text-sm text-gray-400'> My Profile</a></li>
                        <li className='p-2 py-2.5 flex items-center space-x-2'><FiLogOut size={22}  className="text-gray-400" /> <span className='md:text-base text-sm text-gray-400'>Log out</span></li>
                    </div>
                </Popup>
            </div>
           
        </React.Fragment>
    )

}
export default DropdownUser