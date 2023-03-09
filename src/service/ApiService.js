import axios from "axios";
import AuthHeader from "./AuthHeader";
const API_URL = "https://apidev.elcarreira.com/";
//const API = 'https://be.dresstyleone.com/'
const getAllPublicPosts = () => {
  return axios.get(API_URL + "/public");
};

const getAllPrivatePosts = () => {
  return axios.get(API_URL + "analytics/competencyAnalysis/orgId/5?startTime=1677577046000&endTime=1677577046000", 
  { headers: AuthHeader() });
};

const Competency = async (startTime, endTime) => {
    //startDate = '1677577046000'
    //endDate='1677577046000'
    //competencyAnalysis/orgId/5
    return await axios
      .post(API_URL + "analytics/competencyAnalysis/orgId/5?startTime=1677577046000&endTime=1677577046000", { headers: { 'Content-Type': 'application/json', 'Authorization': 'f0b0cee3eb9f87014ff6' } },  {
        startTime,
        endTime,
      })
      .then((response) => {
    
        return response.data;
      });
  };
  
  const SkillGap = async (startTime, endTime) => {
    //startDate = '1677577046000'
    //endDate='1677577046000'
    return await axios
      .post(API_URL + "analytics/skillGapAnalysis/orgId/7?startTime=1677577046000&endTime=1677577046000", { headers: { 'Content-Type': 'application/json', 'Authorization': 'f0b0cee3eb9f87014ff6' } },  {
        startTime,
        endTime,
      })
      .then((response) => {
        //console.log(response)
        return response.data;
      });
  };

  const AttritionApi = async (startTime, endTime) => {
    //startDate = '1677577046000'
    //endDate='1677577046000'
    return await axios
      .post(API_URL + "analytics/attrition/orgId/5?startTime=1677577046000&endTime=1677577046000", { headers: { 'Content-Type': 'application/json', 'Authorization': 'f0b0cee3eb9f87014ff6' } },  {
        startTime,
        endTime,
      })
      .then((response) => {
        //console.log(response)
        return response.data;
      });
  };
  const ActivityApi = async (startTime, endTime) => {
    return await axios
    .post(API_URL + "analytics/top5Activities/orgId/5?startTime=1677577046000&endTime=1677577046000", { headers: { 'Content-Type': 'application/json', 'Authorization': 'f0b0cee3eb9f87014ff6' } },  {
      startTime,
      endTime,
    })
    .then((response) => {
      //console.log(response)
      return response.data;
    });
  }

  
  const CareerPathApi = async (startTime, endTime) => {
    return await axios
    .post(API_URL + "analytics/careerPath/orgId/7?", { headers: { 'Content-Type': 'application/json', 'Authorization': 'f0b0cee3eb9f87014ff6' } },  {
      startTime,
      endTime,
    })
    .then((response) => {
      //console.log(response)
      return response.data;
    });
  }
 
  const getQuestion = () => {
    return axios.get(API_URL + "audit/getAuditUrl?category=Pulse&orgId=18&auditName=SGR", 
    { headers: AuthHeader() });
  };
  
  

const ApiService = {
  Competency,
  getQuestion,
  CareerPathApi,
  AttritionApi,
  ActivityApi,
  SkillGap,
  getAllPublicPosts,
  getAllPrivatePosts,
};

export default ApiService;