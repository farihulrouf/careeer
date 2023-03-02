import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineCopy } from "react-icons/ai"

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
const RegisterOrganisation = () => {
    return (
        <>
            <div className="container mx-auto p-4 min-h-full bg-gray-50">
               <div className='bg-white'>
               <div>
                    <h4 className='text-2xl text-center'>Organisation audit register screen</h4>
                </div>
                <div className='p-2'>
                    <p className="text-indigo-600 font-semibold text-lg">Audit</p>
                </div>
                <div className="flex space-x-4 border py-2 font-semibold p-2">
                    <div>
                        Create Audit
                    </div>
                    <div>
                        Audit Report
                    </div>
                </div>
                <div className="w-full flex justify-between p-2">
                    <div className="flex space-x-2 item-center mt-2 mb-2 max-w-sm py-2">
                        <div>Audit Name</div>
                        <input type="text" className="border rounded-sm" />
                        <input type="date" className="border rounded-sm" data-date-inline-picker="true" />
                    </div>
                    <div className="flex space-x-2 item-center mt-2 mb-2 py-2">
                        <div>No Of employees to audit</div>
                        <input type="text" className="border rounded-sm" />
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
                <div className='mt-2 p-2'>
                    <Accordion>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Career Growth
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>
                                    Exercitation in fugiat est ut ad ea cupidatat ut in
                                    cupidatat occaecat ut occaecat consequat est minim minim
                                    esse tempor laborum consequat esse adipisicing eu
                                    reprehenderit enim.
                                </p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Skill Assigment
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>
                                    Exercitation in fugiat est ut ad ea cupidatat ut in
                                    cupidatat occaecat ut occaecat consequat est minim minim
                                    esse tempor laborum consequat esse adipisicing eu
                                    reprehenderit enim.
                                </p>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    Monitory Benefits
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>
                                    In ad velit in ex nostrud dolore cupidatat consectetur
                                    ea in ut nostrud velit in irure cillum tempor laboris
                                    sed adipisicing eu esse duis nulla non.
                                </p>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
               </div>
            </div>
        </>
    )
}
export default RegisterOrganisation