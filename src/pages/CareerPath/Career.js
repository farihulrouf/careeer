import React, { useEffect, useState } from "react";
import ProgressBar from "../../components/chart/ProgressBar";
import { AiOutlineFilter, AiOutlineFilePdf, AiFillGold, AiOutlineTrophy, AiOutlineUsergroupDelete } from "react-icons/ai";
import { BiRun } from "react-icons/bi"
import { Chart } from "react-google-charts";
import Dropdown from 'react-multilevel-dropdown';
import DataTable from 'react-data-table-component';
import NavBar from "../../components/NavBar";
//import Datepicker from "react-tailwindcss-datepicker";
import NavSub from "../../components/NavSub";
//import moment from 'moment';
import ApiService from "../../service/ApiService";

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



const Career = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });
  const data = [
    ["Skill Gap Covered", "Skill Gap"],
    ["Skill Gap Covered", 60],
    ["Skill Gap", 40],
  ];

  const options = {
    legend: "none",
    pieSliceText: "label",
    pieStartAngle: 100,
    sliceVisibilityThreshold: 0.2, // 20%

  };

  const datatwo = [
    ["C1", "C2"],
    ["C1", 11],
    ["C2", 2],
    ["C3", 2],
  ];

  const optionstwo = {
    pieHole: 0.7,
    legend: "none",
    pieSliceText: "label",
    pieStartAngle: 100,
    is3D: false,

  };


  const optionsBar = {

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
  const [dataCareer, setDataCareer] = useState({})
  const [dataMatrix, setdataMatrix] = useState({
    message: {
      allAssessments: 0,
      basic: 0,
      intermediate: 0,
      singleAssessment: 0,
      totalAssesmentsTaken: 0,
      twoAssessments: 0,
    }
  })
  const [dataSkillGap, setdataSkillGap] = useState({
    SkillGapByType: [
      {
        skillname: "Technical",
        skillGap: 0
    },
    {
        skillname: "Functional",
        skillGap: 0
    },
    {
        skillname: "Interpersonal",
        skillGap: 0
    },
    {
        skillname: "Stake holder",
        skillGap: 0
    }

    ]
  
})
  const [dataAttriTion, setDataAttrition] = useState([])
  const [dataActivity, setDataActivity] = useState([])
  //startDate = '1677577046000'
  //endDate='1677577046000'

  useEffect(() => {
    ApiService.Competency('1677577046000', '1677577046000').then(
      (response) => {
        setdataMatrix(response)

        //console.log('cob test,', response)
      },
      (error) => {
        console.log(error)
      }
    )
    ApiService.SkillGap('1677577046000', '1677577046000').then(
      (response) => {
        setdataSkillGap(response)

        //console.log('cob test,', response)
      },
      (error) => {
        console.log(error)
      }
    )
    ApiService.AttritionApi('1677577046000', '1677577046000').then(
      (response) => {
        // setdataSkillGap(response)
        setDataAttrition(response)
        //console.log('cob test,', response)
      },
      (error) => {
        console.log(error)
      }
    )
    ApiService.ActivityApi('1677577046000', '1677577046000').then(
      (response) => {
        // setdataSkillGap(response)
        setDataActivity(response)
        //console.log('cob test,', response)
      },
      (error) => {
        console.log(error)
      }
    )
    ApiService.CareerPathApi('1677577046000', '1677577046000').then(
      (response) => {
        // setdataSkillGap(response)
        setDataCareer(response)
        //console.log('cob test,', response)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])


  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    console.log(new Date())
    ChangeComptencyMatrix()
    setValue(newValue);
  }

  const ChangeComptencyMatrix = () => {
    ApiService.Competency('1677577046000', '1677577046000').then(
      (response) => {
        //console.log("compentency", response)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  const filter = () => {
    console.log("filter")
  }

  const dataBar = [
    [
      "Month",
      "",
    ],
    ["Q1", dataAttriTion.Q1],
    ["Q2", dataAttriTion.Q2],
    ["Q3", dataAttriTion.Q3,],
    ["Q4", dataAttriTion.Q4,],
  ];
  console.log("data Attritions", dataAttriTion)
  console.log('activity data',dataActivity)
  console.log("data Compenteny Matrix",dataMatrix)
  console.log("data skill gaps", dataSkillGap)
  console.log("data careerpath", dataCareer)
  return (
    <>
      <div className="container mx-auto">
        <NavBar />
        <NavSub />
      </div>
      <div className="container mx-auto p-4 min-h-full bg-gray-50">
        <div className="bg-gray-50">
          <div>
            <h1 className="text-lg text-black px-2 py-2 w-52 rounded-sm">Analytics Dashboard</h1>
          </div>
          <div className="mb-2 w-full justify-between flex">
            <div>
              <div className="flex space-x-6">
                <div className="text-center font-semibold flex items-center">
                  <ul className="w-64 relative drop-shadow-lg rounded-md bg-white p-2">
                    <li className="text-black text-2xl">Total Employees</li>
                    <li className="text-2xl text-black">800</li>
                    <div className="absolute  text-indigo-800 text-md bottom-1 right-1">
                      <AiOutlineUsergroupDelete size={24} />
                    </div>
                  </ul>
                </div>

                <div className="text-center font-semibold flex items-center">
                  <ul className="w-64 relative bg-white drop-shadow-lg rounded-md p-2">
                    <li className="text-black text-2xl">Exit Employees</li>
                    <li className="text-2xl text-black">200</li>
                    <div className="absolute  text-indigo-800 text-md bottom-1 right-1">
                      <BiRun size={24} />
                    </div>
                  </ul>
                </div>
                <div className="text-center font-semibold flex items-center">
                  <ul className="w-64 relative drop-shadow-lg rounded-md bg-white p-2">
                    <li className="text-black text-2xl">Attrition</li>
                    <li className="text-2xl text-black">10%</li>

                    <div className="absolute text-indigo-800 text-md bottom-1 right-1">
                      <AiFillGold size={24} />
                    </div>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-left font-semibold flex items-center w-96">
              <ul className="bg-red-400 w-full rounded-md drop-shadow-lg text-center p-2 bg-white">
                <li className="text-2xl text-black">Top Dept On Leader board</li>
                <li className="relative text-2xl">
                Client Services <span className="ml-2 text-black font-bold text-sxl">486</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-between z-20 pb-2">
            <div className="w-72">
              {/*
                <Datepicker
                    value={value}
                    onChange={handleValueChange}
                />
              */}
            </div>
            <div className="flex space-x-2 mb-1">
              <div className="bg-indigo-700 text-white drop-shadow-lg rounded-sm flex space-x-2 px-1 items-center">
                <Dropdown
                  className="bg-indigo-700 z-20"
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
              <button className="px-2 bg-green-600 text-white py-1 drop-shadow-lg rounded-sm flex space-x-1 items-center"><span>Download Pdf</span><AiOutlineFilePdf /></button>
            </div>
          </div>
        </div>

        <div className="w-full flex space-x-4 bg-white p-2">
          <div className="w-1/2">
            <h3 className="text-lg">Overall Skill Gap</h3>
            <div className="w-full flex rounded-md h-[450px] drop-shadow-lg">
              <div className="w-1/2 bg-white">
                <div className="p-2 bg-white h-full w-full ">
                  <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              </div>
              <div className="w-1/2 p-2 flex justify-center flex-col bg-white">
                <div className="p-2">
                  <p className="text-red-500">TECHNINCAL</p>
                  <ProgressBar progressPercentage={dataSkillGap.SkillGapByType[0].skillGap} />
                </div>
                <div className="p-2 mt-4">
                  <p className="text-indigo-700">FUNCTIONAL</p>
                  <ProgressBar progressPercentage={dataSkillGap.SkillGapByType[1].skillGap} />
                </div>
                <div className="p-2 mt-4">
                  <p className="text-green-800">INTER PERSONAL</p>
                  <ProgressBar progressPercentage={dataSkillGap.SkillGapByType[2].skillGap} />
                </div>
                <div className="p-2 mt-4">
                  <p className="font-semibold text-orange-500">STAKE HOLDER</p>
                  <ProgressBar progressPercentage={dataSkillGap.SkillGapByType[3].skillGap} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <h3 className="text-lg">Competency Matrix </h3>
            <div className="drop-shadow-lg rounded-md h-[450px] flex">
              <div className="w-3/5 h-full relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <p className="text-indigo-500 text-lg font-bold text-center">800<br /><span className="text-sm">USERS</span></p>
                </div>
                <div className="p-2 bg-white h-full w-full">
                  <Chart
                    chartType="PieChart"
                    data={datatwo}
                    options={optionstwo}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              </div>
              <div className="w-2/5 flex flex-col justify-center items-center bg-white">
                <div className="flex space-x-2">
                  <div className="text-center">
                    <h4 className="text-4xl font-bold">{dataMatrix.message.singleAssessment}</h4>
                    <button className="bg-red-500 text-white px-2 py-2 rounded-xl w-28 hover:bg-indigo-700">
                      Taken one Assesment
                    </button>
                  </div>
                  <div className="text-center">
                    <h4 className="text-4xl font-bold">{dataMatrix.message.twoAssessments}</h4>
                    <button className="text-white bg-green-500 px-2 py-2 rounded-xl w-28 hover:bg-indigo-700">
                      Taken two Assesment
                    </button>
                  </div>
                </div>
                <ul className="p-2 text-lg font-semibold mt-6">
                  <li className="text-blue-700 w-44 justify-between flex"><span>Beginner</span> <span className="text-black">{dataMatrix.message.basic}</span></li>
                  <li className="text-red-400 w-44 justify-between flex"><span>Intermediate</span> <span className="text-black">{dataMatrix.message.intermediate}</span></li>
                  <li className="text-orange-400 w-44 justify-between flex"><span>Expert</span> <span className="text-black">{dataMatrix.message.expert}</span></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
        <div className="w-full flex space-x-4 bg-white p-2">
          <div className="w-1/2">
            <h3 className="text-lg">Attrition Analytics</h3>
            <div className="drop-shadow-lg h-[400px]">
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
            <div className="shadow-sm drop-shadow-lg bg-white rounded-md h-[400px]">
              <div className="w-full p-2">
                <DataTable
                  columns={columnstable}
                  data={datatable}
                  customStyles={customStyles}
                  pagination={5}
                />
              </div>

            </div>

          </div>
        </div>
        <div className="w-full flex space-x-4 bg-white p-2">
          <div className="w-1/2">
            <h3 className="text-lg">Career Path</h3>
            <div className="drop-shadow-lg bg-white h-[400px] flex items-center">
              <div className="flex justify-center items-center flex-wrap gap-4 mt-4 mb-4">
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">{dataCareer.approvedCareerPaths}</li>
                    <li className="text-indigo-900">Approved</li>
                    <li className="text-indigo-900">Career Path</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">{dataCareer.totalCareerPathsRequested}</li>
                    <li className="text-indigo-900">Total Career</li>
                    <li className="text-indigo-900">Path Requested</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">{dataCareer.upwardCareerPathsProposed}</li>
                    <li className="text-indigo-900">Upward Path</li>
                    <li className="text-indigo-900">Proposed</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">{dataCareer.alternateCareerPathsProposed}</li>
                    <li className="text-indigo-900">Alternate Path</li>
                    <li className="text-indigo-900">Proposed</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">{dataCareer.rejectedCareerPaths}</li>
                    <li className="text-indigo-900">Rejected</li>
                    <li className="text-indigo-900">Career Path</li>
                  </ul>
                </div>
                <div className="w-48 bg-white drop-shadow-md hover:bg-gray-100">
                  <ul className="text-center font-semibold">
                    <li className="text-orange-700 text-3xl font-bold">0</li>
                    <li className="text-indigo-900">Proposed PATH</li>
                    <li className="text-indigo-900">Moved To Role</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <h3 className="text-lg">Activity</h3>
            <div className="drop-shadow-lg bg-white rounded-md h-[400px]">
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
              <div className="w-full p-4 flex flex-wrap gap-2">
                {dataActivity.map((data, index) => {
                  return (
                    <ul className="text-center font-semibold w-44 bg-white drop-shadow-md hover:bg-gray-100 p-2">
                      <li className="text-orange-900 mb-2 mt-2 uppercase">{data.activityName}</li>
                      
                      <li className="text-orange-700 mt-2 mb-2 text-3xl">{data.activityCount}</li>
                    </ul>
                  )
                })}

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default Career