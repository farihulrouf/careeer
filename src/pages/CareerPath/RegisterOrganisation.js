import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineCopy } from "react-icons/ai"
import Datepicker from "react-tailwindcss-datepicker";
import Select from 'react-select'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, } from 'react-accessible-accordion';
import NavBar from "../../components/NavBar";
import { useState } from 'react';
import NavSub from "../../components/NavSub";
import DataTable from 'react-data-table-component';
import ReactStars from "react-rating-stars-component";
import { Chart } from "react-google-charts";
import 'react-accessible-accordion/dist/fancy-example.css';
import ProgressBar from '../../components/chart/ProgressBar';

const datatable = [
    {
        id: 1,
        title: 'John Doe',
        leader: 'johndoe@gmail.com',
        position: '20 PTS'
    },
    {
        id: 2,
        title: 'John Doe',
        leader: 'johndoe@gmail.com',
        position: '20 PTS'
    },
    {
        id: 3,
        title: 'John Doe',
        leader: 'johndoe@gmail.com',
        position: '20 PTS'
    },
    {
        id: 4,
        title: 'John Doe',
        leader: 'johndoe@gmail.com',
        position: '20 PTS'
    },
    {
        id: 5,
        title: 'Antonie Silver',
        leader: 'johndoe@gmail.com',
        position: '20 PTS'
    },
]
const columnstable = [
    {
        name: 'Name',
        selector: row => row.title,
    },
    {
        name: 'Email',
        selector: row => row.leader,
    },
    {
        name: 'Risk Index',
        selector: row => row.position,
    },
];
const customStyles = {
    rows: {
        style: {
            minHeight: '50px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontSize: '16px',
            display: 'flex',
            justifyContent: 'center',

        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'center',


        },

    },
};

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
    const datachart = [
        ["Language", "Speakers (in millions)"],
        ["Low Risk", 30],
        ["Medium Risk", 35],
        ["Hight risk", 35],
    ];

    const optionschart = {
        legend: "none",
        pieSliceText: "label",
        pieStartAngle: 100,
    };
    const options = [
        { value: 'select audit', label: 'select audit' },
        { value: 'select2', label: 'select2' },
        { value: 'select3', label: 'select3' }
    ]
    const ratingChanged = (newRating) => {
        console.log(newRating);
    }
    return (
        <>
            <div className='container mx-auto'>
                <NavBar />
                <NavSub />
            </div>

            <div className="container mx-auto p-4 min-h-full bg-gray-50">
                <p className="text-lg">Audit</p>
                <Tabs
                    defaultIndex={0} onSelect={(index) => console.log(index)}
                >
                    <TabList className="bg-white">
                        <Tab>Create Audit</Tab>
                        <Tab> Audit Report</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="w-full flex items-center justify-between p-2">

                            <Select className='w-36' placeholder="Select Audit" options={options} />



                            <div>
                                <div className='flex space-x-2 items-center'>
                                    <p className='pt-2'>Audit Name</p>
                                    <input type="text" className="border rounded- py-2" />
                                </div>
                            </div>
                            <div className="flex space-x-2 justify-between item-center mt-2 mb-2 py-2 w-1/2">
                                <div className='flex items-center space-x-2'>
                                    <p className='w-96 pt-2'>No Of employees to Audit</p>
                                    <Datepicker
                                        placeholder={"Start Date  -  End Date"}
                                        value={value}
                                        onChange={handleValueChange}
                                    />
                                </div>

                                <button className="bg-red-300 px-2 w-44 rounded-sm text-white hover:bg-teal-500">Generate Audit</button>
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
                    </TabPanel>
                    <TabPanel>
                        <div className='w-full flex mt-4 gap-2'>
                            <div className='w-1/2 flex justify-center drop-shadow-lg'>
                                <div className='w-full bg-white p-2 drop-shadow-lg'>
                                    <div className='flex justify-center items-center gap-4'>
                                        <p className='text-gray-500 text-lg'>Employees Name</p>
                                        <h4 className='text-2xl'>Audit Report</h4>
                                    </div>
                                    <div className='flex flex-col justify-center items-center mt-4 mb-2'>
                                        <h2 className='text-black text-3xl font-semibold'>4.5 Score</h2>
                                        <ReactStars
                                            count={5}
                                            onChange={ratingChanged}
                                            size={36}
                                            activeColor="#ffd700"
                                        />
                                    </div>
                                    <div className="w-full flex justify-center flex-wrap gap-2">
                                        <ul className="text-center font-semibold w-28  hover:bg-gray-100">
                                            <li className="text-orange-700 mt-2 mb-2 text-lg">6787</li>
                                            <li className="text-orange-900 mb-2 mt-2 uppercase">Total users audited</li>
                                        </ul>
                                        <ul className="text-center font-semibold w-28  hover:bg-gray-100">
                                            <li className="text-orange-700 mt-2 mb-2 text-lg">90</li>
                                            <li className="text-orange-900 mb-2 mt-2 uppercase">Respondents</li>
                                        </ul>
                                        <ul className="text-center font-semibold w-28  hover:bg-gray-100">
                                            <li className="text-orange-700 mt-2 mb-2 text-lg">85</li>
                                            <li className="text-orange-900 mb-2 mt-2 uppercase">Completed</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2 drop-shadow-lg bg-white flex flex-col items-center justify-center'>
                                <h2 className='text-3xl text-center'>Precentage Of Employees</h2>
                                <Chart
                                    chartType="PieChart"
                                    data={datachart}
                                    options={optionschart}
                                    width={"300px"}
                                    height={"300px"}
                                />


                            </div>
                        </div>
                        <div className='bg-white mt-4 flex mb-4 justify-between p-4 shadow-sm border p-2'>
                            <div className='p-2 w-72'>
                                <h3 className='text-lg'>Theme Career Growth</h3>
                                <h3 className='text-lg'>Respondents Users :70</h3>
                            </div>
                            <div className='p-2 w-72 flex flex-col justify-center'>
                                <ProgressBar progressPercentage={65} />
                                <h3 className='text-lg pt-2 text-indigo-700'>Theme Score : 65</h3>
                            </div>
                            <div className='p-2 w-72 flex flex-col justify-center'>
                                <ul className='text-xl pl-6 pt-4 font-semibold'>
                                    <li className='flex items-center w-44 justify-between text-green-500'>Positive  <span>50</span></li>
                                    <li className='flex items-center w-44 justify-between text-indigo-700'>Neutral <span>50</span></li>
                                    <li className='flex items-center w-44 justify-between text-red-500'>Negative <span>50</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className='bg-white p-4 shadow-sm border p-2'>
                            <h3 className='text-2xl'>Top Risk Employees</h3>
                            <DataTable
                                columns={columnstable}
                                data={datatable}
                                customStyles={customStyles}
                                pagination={5}
                            />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}
export default RegisterOrganisation