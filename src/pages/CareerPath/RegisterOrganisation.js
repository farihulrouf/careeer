import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineCopy } from "react-icons/ai"
import Datepicker from "react-tailwindcss-datepicker";
import Select from 'react-select'
//import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, } from 'react-accessible-accordion';
import NavBar from "../../components/NavBar";
import { useState } from 'react';
import NavSub from "../../components/NavSub";
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
const RegisterOrganisation = () => {
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
      });
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        //console.log(new Date())
        //ChangeComptencyMatrix()
        setValue(newValue);
      }
      const options = [
        { value: 'select1', label: 'select1' },
        { value: 'select2', label: 'select2' },
        { value: 'select3', label: 'select3' }
      ]
    return (
        <>
            <div className='container mx-auto'>
                <NavBar />
                <NavSub />
            </div>  
            <div className="container mx-auto p-4 min-h-full bg-gray-50">
               <div className='bg-white'>
                <div className='p-2'>
                    <p className="text-indigo-600 font-semibold text-lg">Audit</p>
                </div>
                <div className="flex space-x-4 bg-white drop-shadow-lg py-2 font-semibold p-2">
                    <div>
                        Create Audit
                    </div>
                    <div>
                        Audit Report
                    </div>
                </div>
                <div className="w-full flex justify-between p-2">
                    <div className="flex space-x-2 item-center mt-2 mb-2 max-w-sm py-2 w-1/2">
                    <Select options={options} />

                        <div className='flex space-x-2 items-center'>
                            <p className='pt-2'>Audit Name</p>
                             <input type="text" className="border rounded- py-2" />
                        </div>
                    </div>
                    <div className="flex space-x-2 justify-between item-center mt-2 mb-2 py-2 w-1/2">
                        <div className='flex items-center space-x-2'>
                            <p className='w-96 pt-2'>No Of employees to Audit</p>
                                <Datepicker
                            value={value}
                                 onChange={handleValueChange}
                             />
                        </div>
                        
                        <button className="bg-pink-700 px-2 rounded-sm text-white hover:bg-teal-500">Generate Audit</button>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='flex justify-center p-2 py-2'>
                    <CopyToClipboard text="https://wwww.silvers.com/outlinded/login">
                        <button className='flex space-x-3 items-center border px-2 py-1'><span className='text-gray-600'>https://wwww.silvers.com/outlinded/login</span> <AiOutlineCopy size={24} /></button>
                    </CopyToClipboard>
                </div>
                <div className='mt-2 p-4'>
                    <div className='flex items-center justify-between bg-gray-200 pt-2'>
                        <h2 className='text-black text-2xl px-2'>1 Do you recieve sufficient guidance from your manager to do your job well ? </h2>
                        <p className='px-2'>Career Growth</p>
                    </div>
                    <div className='flex items-center justify-between bg-gray-100 pt-2'>
                        <h2 className='text-black text-2xl px-2'>2 Do you recieve sufficient guidance from your manager to do your job well ? </h2>
                        <p className='px-2'>Skill Assigment</p>
                    </div>
                    <div className='flex items-center justify-between bg-gray-100 pt-2'>
                        <h2 className='text-black text-2xl px-2'>3 Do you recieve sufficient guidance from your manager to do your job well ? </h2>
                        <p className='px-2'>Monitory Benefits</p>
                    </div>
                </div>
               </div>
            </div>
        </>
    )
}
export default RegisterOrganisation