import React, { Component, useEffect } from "react";
import ProgressBar from "../../components/chart/ProgressBar";
import { AiOutlineFilter, AiOutlineFilePdf, AiOutlineTrophy } from "react-icons/ai";
import { Chart } from "react-google-charts";
import Dropdown from 'react-multilevel-dropdown';

const className = {

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
    "Quartal",
  ],
  ["Q1", 100,],
  ["Q2", 50,],
  ["Q3", 50,],
  ["Q4", 90,],
];

export const optionsBar = {
  title: "ATTRITION ANALYTIC",
  vAxis: { title: "Y" },
  hAxis: { title: "X" },
  seriesType: "bars",
  series: { 3: { type: "line" } },
};



const Career = () => {
  const filter = () => {
    console.log("filter")
  }
  return (
    <>
      <div className="container mx-auto p-4 min-h-full bg-gray-50">
        <div className="bg-gray-50">
          <div>
            <h1 className="text-2xl text-green-700">Dashboard</h1>
          </div>
          <div className="mb-2 w-full flex">
            <div className="w-3/5 justify-center gap-4 items-center flex">
              <div className="text-center text-indigo-500 font-semibold">
                <ul>
                  <li className="text-lg">800</li>
                  <li>Total Users</li>
                </ul>
              </div>
              <div className="text-center text-red-500 font-semibold">
                <ul>
                  <li className="text-lg">200</li>
                  <li>Exit Employees</li>
                </ul>
              </div>
              <div className="text-center text-yellow-500 font-semibold">
                <ul>
                  <li className="text-lg">100%</li>
                  <li>Attention</li>
                </ul>
              </div>
            </div>
            <div className="w-1/3 flex justify-end space-x-4">
              <div className="font-semibold">
                <p>Top Department</p>
                <p className="text-indigo-500">Cient Services</p>
              </div>
              <div className="font-semibold">
                <p>On Leader board</p>
                <div className="flex space-x-2 item-center">
                  <p className="text-green-800 text-2xl">486</p>
                  <AiOutlineTrophy className="text-pink-500" size={32} />
                </div>
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
                    <div>
                      <h4 className="text-4xl font-bold">10</h4>
                      <button className="bg-red-500 text-white px-2 py-2 rounded-xl w-28">
                        Taken one Assesment
                      </button>
                    </div>
                    <div>
                      <h4 className="text-4xl font-bold">25</h4>
                      <button className="text-white bg-green-500 px-2 py-2 rounded-xl w-28">
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
                <table className="table-auto w-full">
                  <thead className="bg-indigo-600 text-white">
                    <tr className="text-left text-lg">
                      <th>No</th>
                      <th>Dept Name</th>
                      <th>Leader Board PTS</th>
                      <th>Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-left text-lg">
                      <td>1</td>
                      <td>Cient Services</td>
                      <td >486</td>
                      <td>20 ptst</td>
                    </tr>
                    <tr className="text-left text-lg">
                      <td>2</td>
                      <td>TAL-CS</td>
                      <td>486</td>
                      <td>20 ptst</td>
                    </tr>
                    <tr className="text-left text-lg">
                      <td>3</td>
                      <td>TAL-CS</td>
                      <td>486</td>
                      <td>20 ptst</td>
                    </tr>
                    <tr className="text-left text-lg">
                      <td>4</td>
                      <td>TAL-CS</td>
                      <td>486</td>
                      <td>20 ptst</td>
                    </tr>
                    <tr className="text-left text-lg">
                      <td>5</td>
                      <td>TAL-CS</td>
                      <td>486</td>
                      <td>20 ptst</td>
                    </tr>
                    <tr className="text-left text-lg">
                      <td>6</td>
                      <td>TAL-CS</td>
                      <td>486</td>
                      <td>20 ptst</td>
                    </tr>
                    <tr className="text-left text-lg">
                      <td>7</td>
                      <td>TAL-CS</td>
                      <td>486</td>
                      <td>20 ptst</td>
                    </tr>
                    <tr className="text-left text-lg">
                      <td>8</td>
                      <td>TAL-CS</td>
                      <td>486</td>
                      <td>20 ptst</td>
                    </tr>
                    <tr className="text-left text-lg">
                      <td>9</td>
                      <td>TAL-CS</td>
                      <td>486</td>
                      <td>20 ptst</td>
                    </tr>
                    <tr className="text-left text-lg">
                      <td>10</td>
                      <td>TAL-CS</td>
                      <td>486</td>
                      <td>20 ptst</td>
                    </tr>

                  </tbody>
                </table>
              </div>
              <div className="flex justify-end p-2 mr-12">
                <button className="px-2 py-1 bg-indigo-500 text-white font-semibold">View all</button>
              </div>
            </div>

          </div>
        </div>
        <div className="w-full flex space-x-4 bg-white p-2">
          <div className="w-1/2">
            <h3 className="text-lg">Career Path</h3>
            <div className="shadow-sm border h-[300px] flex items-center">
              <div className="flex p-4 justify-center items-center flex-wrap gap-4 mt-4 mb-4">
                <div className="w-48">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-2xl">400</li>
                    <li className="text-gray-400">Career Path</li>
                    <li className="text-gray-400">Assigned To Employees</li>
                  </ul>
                </div>
                <div className="w-48">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-2xl">400</li>
                    <li className="text-gray-400">Career PATH</li>
                    <li className="text-gray-400">Registered</li>
                  </ul>
                </div>
                <div className="w-48">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-2xl">100</li>
                    <li className="text-gray-400">Upward Path</li>
                    <li className="text-gray-400">Propposed</li>
                  </ul>
                </div>
                <div className="w-48">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-2xl">50</li>
                    <li className="text-gray-400">Aalternate Path</li>
                    <li className="text-gray-400">Propposed</li>
                  </ul>
                </div>
                <div className="w-48">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-2xl">40</li>
                    <li className="text-gray-400">Denied Path</li>
                    <li className="text-gray-400">Career Path</li>
                  </ul>
                </div>
                <div className="w-48">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-2xl">10</li>
                    <li className="text-gray-400">Propposed PATH</li>
                    <li className="text-gray-400">Moved To Role</li>
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
              <div className="w-full p-4 flex">
                <ul className="text-center font-semibold w-48">
                  <li className="text-gray-400">On Boarding</li>
                  <li className="text-gray-400">Process Commited</li>
                  <li className="text-orange-700 text-2xl">10</li>
                </ul>

                <ul className="text-center font-semibold w-48 border-l-2 border-r-2">
                  <li className="text-gray-400">Assesments</li>
                  <li className="text-gray-400">Taken</li>
                  <li className="text-orange-700 text-2xl">80</li>
                </ul>

                <ul className="text-center font-semibold w-48">
                  <li className="text-gray-400">Technical</li>
                  <li className="text-gray-400">Assesments</li>
                  <li className="text-orange-700 text-2xl">60</li>
                </ul>

              </div>
              <div className="w-full p-4 flex">
                <ul className="text-center font-semibold w-48">
                  <li className="text-gray-400">Inner Personal</li>
                  <li className="text-gray-400">Assesment</li>
                  <li className="text-orange-700 text-2xl">20</li>
                </ul>

                <ul className="text-center font-semibold w-48 border-l-2">
                  <li className="text-gray-400">Login</li>
                  <li className="text-gray-400">Activitiy</li>
                  <li className="text-orange-700 text-2xl">350</li>
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