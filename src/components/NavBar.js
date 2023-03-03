import { FaTelegramPlane } from "react-icons/fa"

import Dropdown from 'react-multilevel-dropdown';
const NavBar = () => {
    const doSomething = () => {
        console.log('tes')
    }
    return (
        <nav className="flex items-center justify-between flex-wrap bg-indigo-700 p-2">
            <div className="flex items-center space-x-1 flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Elcariera</span>
                <FaTelegramPlane size={20} />
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                </div>
                <div className="bg-indigo-700 text-white drop-shadow-lg rounded-sm flex space-x-2 px-1 items-center">
                <Dropdown
                  className="bg-indigo-700"
                  title='Filter'

                >
                  <Dropdown.Item
                    onClick={() => doSomething()}
                  >
                    <p className="text-lg font-semibold">Departments</p>
                    <Dropdown.Submenu>
                      <Dropdown.Item>
                        Department 1
                      </Dropdown.Item>
                      <Dropdown.Item>
                        Department 2
                      </Dropdown.Item>
                      <Dropdown.Item>
                        Department 3
                      </Dropdown.Item>
                      <Dropdown.Item>
                        Department 4
                      </Dropdown.Item>
                      <Dropdown.Item>
                        Department 5
                      </Dropdown.Item>
                    </Dropdown.Submenu>
                  </Dropdown.Item>
                  <div className="w-32 h-24 relative">
                    <div className="flex justify-between w-full absolute bottom-0 ml-2">
                      <button className="text-white bg-black h-6 px-2 rounded-sm">Clear</button>
                      <button className="text-white bg-teal-500 h-6 px-2 rounded-sm">Submit</button>
                    </div>
                  </div>
                </Dropdown>
                <FaTelegramPlane />
              </div>
              
            </div>
        </nav>
    )

}
export default NavBar