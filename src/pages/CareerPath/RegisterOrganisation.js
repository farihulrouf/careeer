import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineCopy, AiOutlineClose } from "react-icons/ai"
import Datepicker from "react-tailwindcss-datepicker";
import Select from 'react-select'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
//import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, } from 'react-accessible-accordion';
import NavBar from "../../components/NavBar";
import { useState, useEffect } from 'react';
import NavSub from "../../components/NavSub";
import DataTable from 'react-data-table-component';
import ReactStars from "react-rating-stars-component";
import { Chart } from "react-google-charts";
import 'react-accessible-accordion/dist/fancy-example.css';
import ProgressBar from '../../components/chart/ProgressBar';
import Popup from 'reactjs-popup';
import ApiService from "../../service/ApiService";
import { render } from '@testing-library/react';
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

    const [dataQuestion, setDataQuestion] = useState(
        [
            {
                options: [],
                questionId: 1,
                question: "Question",
                ratings: [

                ]
            }
        ]
    )
    const [open, setOpen] = useState(false)
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        //console.log(new Date())
        //ChangeComptencyMatrix()
        setValue(newValue);
    }
    const datachart = [
        ["Language", "Speakers (in millions)"],
        ["Low", 30],
        ["Medium", 35],
        ["Hight", 35],
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
    const closeModal = () => setOpen(false)
    useEffect(() => {
        ApiService.getQuestion().then(
            (response) => {
                setDataQuestion(response.data.questions)
            },
            (error) => {
                console.log(error)
            }
        )
    }, [])

    console.log("data question", dataQuestion)
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
                        <div className="w-full flex items-center justify-between p-2 ">

                            <div className='w-1/2 flex'>
                            <Select className='w-36' placeholder="Select Audit" options={options} />
                            <div className=''>
                                <div className='flex space-x-2 items-center'>
                                    <p className='pt-2'>Audit Name</p>
                                    <input type="text" className="border rounded- py-2" />
                                </div>
                            </div>
                            </div>
                            <div className="flex bg-pink-500 space-x-2 justify-between item-center mt-2 mb-2 py-2 w-1/2">
                                <div className='flex items-center space-x-2'>
                                    <div className='flex items-center'>
                                        <label className='pt-2'>No Of employees to Audit</label>
                                        <input className='py-2' border type="text" />
                                    </div>
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
                            <div className='w-1/2 flex justify-center drop-shadow-lg relative'>
                                <div className='absolute -0'>

                                </div>
                                <div className='w-full bg-white p-2 drop-shadow-lg'>
                                    <div className='flex justify-center items-center gap-4'>
                                        <div className='flex mt-2 space-x-2 items-center'>
                                            <label>Audit Type</label>
                                            <input type="text" placeholder='Audit Type' className='border w-24 rounded-sm px-2 py-1' />
                                        </div>
                                        <div className='flex space-x-2 items-center'>
                                            <label>Audit Name</label>
                                            <input type="text" placeholder='Audit Name' className='border w-24 rounded-sm px-2 py-1' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center items-center mt-12 mb-2'>
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
                        <div className='mt-4 bg-white'>
                            <div className='border'>
                                <h3 className='text-2xl uppercase text-center'>Employee Audit Screen</h3>
                                <div className='w-full'>
                                    <div className='flex space-x-16 justify-center mt-8'>
                                        <div className='flex gap-2 items-center'>
                                            <p className='mt-2'>Name</p>
                                            <input type="text" className='border px-2 py-1' />
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <p className='mt-2'>Email</p>
                                            <input type="text" className='border px-2 py-1' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center mt-8 mb-4 rounded-sm'>
                                    <button className='text-white bg-red-500 px-4 py-2'>Start Audit</button>
                                </div>
                            </div>
                            <div className='border mt-2'>
                                <h4 className='text-xl p-4'>Question : 50 </h4>
                            </div>

                            {dataQuestion.map((questions, index) => {
                                return (
                                    <div className='drop-shadow-lg border mt-2 mb-2'>
                                        <p className='p-4'> {index+1} {questions.question}</p>

                                        <div className='flex w-full gap-8 p-4 flex-wrap'>
                                        {questions.options.map((answer, i) => {
                                            return (
                                                <div className="radio">
                                                    <label className='flex space-x-2'>
                                                        <input type="radio" value="option1" checked={false} />
                                                        <span>{answer}</span>
                                                    </label>
                                                </div>
                                           
                                            )
                                               
                                         })}
                                          </div>
                                    </div>
                                )
                            })}
                            <div className='flex justify-center mt-8 mb-2'>
                                <button className='bg-red-500 text-white px-3 py-2' onClick={() => setOpen(!open)}>Submit</button>
                            </div>

                        </div>

                        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                            <div className='md:w-[678px] w-[350px] bg-white shadow-md flex flex-col items-center border p-2'>
                                <div className='w-full flex justify-end'>
                                    <AiOutlineClose size={24} onClick={closeModal} />
                                </div>
                                <div className='w-full bg-white flex space-x-2 mt-2'>
                                    <div className='w-1/2 h-[300px] border flex justify-center items-center'>
                                        <h3 className='w-44 text-2xl'>Thank You For Answering The Survey</h3>
                                    </div>
                                    <div className='w-1/2 h-[300px] border'>
                                        <h3 className='text-center text-xl uppercase'>instructions</h3>
                                        <p className='text-left text-lg uppercase p-2'>All question are mandatory</p>
                                    </div>
                                </div>
                            </div>
                        </Popup>


                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}
export default RegisterOrganisation