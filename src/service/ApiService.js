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

const Competency = async (startDate, endDate) => {
    //startDate = '1677577046000'
    //endDate='1677577046000'
    return await axios
      .post(API_URL + "analytics/competencyAnalysis/orgId/5?", { headers: { 'Content-Type': 'application/json', 'Authorization': 'f0b0cee3eb9f87014ff6' } },  {
        startDate,
        endDate,
      })
      .then((response) => {
        console.log("baca sekai", response)
        //console.log(response.data)
        //if (response.data.accessToken) {
       //   localStorage.setItem("user", JSON.stringify(response.data));
       // }
  
        return response.data;
      });
  };
  

  
  const SkillGap = (startDate, endDate) => {
    //startDate = '1677577046000'
    //endDate='1677577046000'
    return axios
      .post(API_URL + "analytics/skillGapAnalysis/orgId/5?", { headers: { 'Content-Type': 'application/json', 'Authorization': 'f0b0cee3eb9f87014ff6' } },  {
        startDate,
        endDate,
      })
      .then((response) => {
        //console.log(response.data)
        //if (response.data.accessToken) {
       //   localStorage.setItem("user", JSON.stringify(response.data));
       // }
  
        return response.data;
      });
  };

  
  

const ApiService = {
  Competency,
  SkillGap,
  getAllPublicPosts,
  getAllPrivatePosts,
};

export default ApiService;