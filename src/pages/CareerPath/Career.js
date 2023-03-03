import React, { Component, useEffect } from "react";
import ProgressBar from "../../components/chart/ProgressBar";
import { AiOutlineFilter, AiOutlineFilePdf, AiOutlineTrophy } from "react-icons/ai";
import { Chart } from "react-google-charts";
import Dropdown from 'react-multilevel-dropdown';
import DataTable from 'react-data-table-component';



const customStyles = {
  rows: {
      style: {
          minHeight: '64px', // override the row height
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
          fontSize: '16px',
        
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
          fontSize: '14px',

      },
  },
};

export const data = [
  ["Covered", "Skill Gap"],
  ["Covered", 40],
  ["Skill Gap", 60],
];

export const options = {
  legend: "none",
  pieSliceText: "label",
  sliceVisibilityThreshold: 0.2, // 20%

};

export const datatwo = [
  ["C1", "C2"],
  ["C1", 11],
  ["C2", 2],
  ["C3", 2],
];

export const optionstwo = {
  pieHole: 0.7,
  legend: "none",
  pieSliceText: "label",
  pieStartAngle: 100,
  is3D: false,

};

export const dataBar = [
  [
    "Month",
    "Quarter",
  ],
  ["Q1", 100,],
  ["Q2", 50,],
  ["Q3", 50,],
  ["Q4", 90,],
];

export const optionsBar = {
  title: "Attrition",
  vAxis: { title: "Y-Axis" },
  hAxis: { title: "X-Axis" },
  seriesType: "bars",
  series: { 3: { type: "line" } },
};


const columnstable = [
  {
      name: 'Department Name',
      selector: row => row.title,
  },
  {
      name: 'Leader Board PTS',
      selector: row => row.leader,
  },
  {
    name: 'Position Moved',
    selector: row => row.position,
},
];

const datatable = [
  {
      id: 1,
      title: 'TAL-CS',
      leader: '486',
      position: '20 PTS'
  },
  {
      id: 2,
      title: 'TAL-CS',
      leader: '486',
      position: '20 PTS'
  },
  {
    id: 3,
    title: 'TAL-CS',
    leader: '486',
    position: '20 PTS'
},
  {
      id: 4,
      title: 'TAL-CS',
      leader: '486',
      position: '20 PTS'
  },
  {
    id: 5,
    title: 'TAL-TX',
    leader: '486',
    position: '20 PTS'
},
]


const Career = () => {
  const filter = () => {
    console.log("filter")
  }
  return (
    <>
      <div className="container mx-auto p-4 min-h-full bg-gray-50">
        <div className="bg-gray-50">
          <div>
            <h1 className="text-xl text-white bg-indigo-700 px-2 py-2 w-52 rounded-sm">Analytics Dashboard</h1>
          </div>
          <div className="mb-2 w-full flex">
            <div className="w-1/3 justify-center gap-4 items-center flex">
             
            </div>
            <div className="w-2/3 flex justify-end space-x-1">
              <div className="text-center font-semibold flex items-center">
                <ul className="bg-teal-500 text-white p-2 hover:text-white hover:bg-indigo-500">
                  <li className="text-lg">800</li>
                  <li>Total Users</li>
                </ul>
              </div>

              <div className="text-center font-semibold flex items-center">
                <ul className="bg-pink-500 text-white p-2 hover:text-white hover:bg-indigo-500">
                  <li className="text-lg">200</li>
                  <li>Exit Employees</li>
                </ul>
              </div>
              <div className="text-center font-semibold flex items-center">
                <ul className="bg-orange-500 text-white p-2 hover:text-white hover:bg-indigo-500">
                  <li className="text-lg">10%</li>
                  <li>Attrition</li>
                </ul>
              </div>
              <div className="text-left font-semibold flex items-center">
                <ul className="bg-indigo-700 text-white p-2 hover:text-white hover:bg-indigo-500">
                  <li className="text-lg">Top Dept On Leader board</li>
                  <li className="relative">
                    Cient Services <span className="text-red-500 ml-2">486</span>
                    <AiOutlineTrophy className="text-pink-700 absolute right-0 top-0"  size={28}/>
                  </li>
                </ul>
              </div>
             
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="flex space-x-2 mb-1">
              <div className="bg-indigo-700 text-white flex space-x-2 px-1 items-center">
              <Dropdown
                className="bg-indigo-700"
                title='Filter'
                
              >
                <Dropdown.Item
                  onClick={() => filter()}
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
               <AiOutlineFilter />
              </div>
              <button className="px-2 bg-green-600 text-white py-1 flex space-x-1 items-center"><span>Download Pdf</span><AiOutlineFilePdf /></button>
            </div>
          </div>
        </div>

        <div className="w-full flex space-x-4 bg-white p-2">
          <div className="w-1/2">
            <h3 className="text-lg">Overall Skill Gap</h3>
            <div className="w-full flex border rounded-md h-[450px]">
              <div className="w-1/2">
                <div className="p-2 w-full h-full">
                  <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              </div>
              <div className="w-1/2 p-2 flex justify-center flex-col">
                <div className="p-2">
                  <p className="text-red-500">TEECHNINCAL</p>
                  <ProgressBar progressPercentage={50} />
                </div>
                <div className="p-2 mt-4">
                  <p className="text-indigo-700">FUNCTIONAL</p>
                  <ProgressBar progressPercentage={70} />
                </div>
                <div className="p-2 mt-4">
                  <p className="text-green-800">INTER PERSONAL</p>
                  <ProgressBar progressPercentage={100} />
                </div>
                <div className="p-2 mt-4">
                  <p className="font-semibold text-orange-500">STAKE HOLDER</p>
                  <ProgressBar progressPercentage={90} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <h3 className="text-lg">Competency Matrix </h3>
            <div className="shadow-sm border rounded-md h-[450px] flex">
              <div className="w-3/5 h-full relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <p className="text-indigo-500 text-lg font-bold text-center">800<br /><span className="text-sm">USERS</span></p>
                </div>
                <div className="p-2 w-full h-full">
                  <Chart
                    chartType="PieChart"
                    data={datatwo}
                    options={optionstwo}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              </div>
              <div className="w-2/5">
                <div className="flex space-x-2 mt-16">
                    <div className="text-center">
                      <h4 className="text-4xl font-bold">10</h4>
                      <button className="bg-red-500 text-white px-2 py-2 rounded-xl w-28 hover:bg-indigo-700">
                        Taken one Assesment
                      </button>
                    </div>
                    <div className="text-center">
                      <h4 className="text-4xl font-bold">25</h4>
                      <button className="text-white bg-green-500 px-2 py-2 rounded-xl w-28 hover:bg-indigo-700">
                        Taken two Assesment
                      </button>
                    </div>
                </div>
                <ul className="p-2 text-lg font-semibold mt-6">
                  <li className="text-blue-700 w-36 justify-between flex"><span>Beginner</span> <span className="text-black">10</span></li>
                  <li className="text-red-400 w-36 justify-between flex"><span>Intermediate</span> <span className="text-black">20</span></li>
                  <li className="text-orange-400 w-36 justify-between flex"><span>Expert</span> <span className="text-black">05</span></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
        <div className="w-full flex space-x-4 bg-white p-2">
          <div className="w-1/2">
            <h3 className="text-lg">Attrition Analytics</h3>
            <div className="shadow-sm border h-[400px]">
              <Chart
                chartType="ComboChart"
                width="100%"
                height="100%"
                data={dataBar}
                options={optionsBar}
              />
            </div>
          </div>
          <div className="w-1/2">
            <h3 className="text-lg"> Leaderboard Analytics </h3>
            <div className="shadow-sm border rounded-md h-[400px]">
              <div className="w-full p-2">
              <DataTable
                  columns={columnstable}
                  data={datatable}
                  customStyles={customStyles}
                  pagination
              />
              </div>
              
            </div>

          </div>
        </div>
        <div className="w-full flex space-x-4 bg-white p-2">
          <div className="w-1/2">
            <h3 className="text-lg">Career Path</h3>
            <div className="shadow-sm border h-[300px] flex items-center">
              <div className="flex p-4 justify-center items-center flex-wrap gap-4 mt-4 mb-4">
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">400</li>
                    <li className="text-indigo-900">Career Path</li>
                    <li className="text-indigo-900">Assigned To Employees</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">400</li>
                    <li className="text-indigo-900">Career PATH</li>
                    <li className="text-indigo-900">Registered</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">100</li>
                    <li className="text-indigo-900">Upward Path</li>
                    <li className="text-indigo-900">Propposed</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">50</li>
                    <li className="text-indigo-900">Aalternate Path</li>
                    <li className="text-indigo-900">Propposed</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">40</li>
                    <li className="text-indigo-900">Denied Path</li>
                    <li className="text-indigo-900">Career Path</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">10</li>
                    <li className="text-indigo-900">Propposed PATH</li>
                    <li className="text-indigo-900">Moved To Role</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <h3 className="text-lg">Activity</h3>
            <div className="shadow-sm border rounded-md h-[300px]">
              <div className="w-full p-4 flex">
                <div className="w-40 h-8 bg-pink-500">
                </div>
                <div className="w-40 h-8 bg-yellow-500">
                </div>
                <div className="w-40 h-8 bg-green-500">
                </div>
                <div className="w-40 h-8 bg-sky-500">
                </div>
                <div className="w-40 h-8 bg-red-500">
                </div>
              </div>
              <div className="w-full p-4 flex gap-2">
                <ul className="text-center font-semibold w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <li className="text-orange-900">On Boarding</li>
                  <li className="text-orange-900">Process Commited</li>
                  <li className="text-orange-700 text-3xl">10</li>
                </ul>

                <ul className="text-center font-semibold w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <li className="text-orange-900">Assesments</li>
                  <li className="text-orange-900">Taken</li>
                  <li className="text-orange-700 text-3xl">80</li>
                </ul>

                <ul className="text-center font-semibold w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <li className="text-orange-900">Technical</li>
                  <li className="text-orange-900">Assesments</li>
                  <li className="text-orange-700 text-3xl">60</li>
                </ul>

              </div>
              <div className="w-full p-4 flex gap-2">
                <ul className="text-center font-semibold w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <li className="text-orange-900">Inner Personal</li>
                  <li className="text-orange-900">Assesment</li>
                  <li className="text-orange-700 text-3xl">20</li>
                </ul>

                <ul className="text-center font-semibold w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <li className="text-orange-900">Login</li>
                  <li className="text-orange-900">Activitiy</li>
                  <li className="text-orange-700 text-3xl">350</li>
                </ul>



              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default Career