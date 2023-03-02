import React, { Component } from 'react';
import axios from 'axios';
const baseURL = "https://apidev.elcarreira.com/";


const endpointviewaddorg = 'organizations/';
const endpointviewmanagerassesmnet = 'dashboard/'

export const getToken = () => {
  return localStorage.getItem("token");

}
export const isLoggedIn = (token = null) => {
  if (!token) {
    token = getToken();
  }
}
class aunticationServices {
    updategoal(orgId,managerId,data,token) {
      console.log(token)
    const headers = {
      'Content-Type': 'application/json',
      "Authorization" :token
    };
    var config = {
      method: 'put',
      url: baseURL + endpointviewaddorg+orgId+'/'+'manager/'+managerId+'/goals',
      headers: headers,
      token: token,
      data: data,
    };
    return axios(config)
      .then((response) => {
        return response;
      })
  }
  getgoaltypes(orgId,managerId,data,token) {
    console.log(token)
  const headers = {
    'Content-Type': 'application/json',
    "Authorization" :token
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewaddorg+orgId+'/'+'manager/'+managerId+'/goaltypes',
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
deletegoletype(orgId,managerId,goltypeID,data,token) {
    console.log(token)
  const headers = {
    'Content-Type': 'application/json',
    // "Authorization" :token
  };
  var config = {
    method: 'delete',
    url: baseURL + endpointviewaddorg+orgId+'/'+'manager/'+managerId+'/goals/'+goltypeID,
    headers: headers,
    // token: token,
    // data: data,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getassessmentlistdetsilsmanager (orgId,managerId,token) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'manager/'+managerId+'/assessmentList/',
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getassessmentlistdetsilsforadmin(orgId,managerId,token) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'admin/'+managerId+'/assessmentList/',
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getAssessmentlistsAdminSearch(orgId,managerId,token,month,searchstring) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'admin/'+managerId+'/assessmentList?durationInDays='+month+'&searchstring='+searchstring,
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getAssessmentlistsAdminSearchByDate (orgId,managerId,token,satartDate,endDate) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'admin/'+managerId+'/assessmentList?startDate='+satartDate+'&endDate='+endDate,
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getAssessmentlistsManagerSearchByDate (orgId,managerId,token,satartDate,endDate) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'manager/'+managerId+'/assessmentList?startDate='+satartDate+'&endDate='+endDate,
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getAssessmentlistsManagerSearch(orgId,managerId,token,month,searchstring) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'manager/'+managerId+'/assessmentList?durationInDays='+month+'&searchstring='+searchstring,
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getActivitylistsAdminSearch(orgId,managerId,token,month,searchstring) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'admin/'+managerId+'/usersLastLogin?durationInDays='+month+'&searchstring='+searchstring,
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getActivitylistsAdminSearchByDate(orgId,managerId,token,startDate,endDate) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'admin/'+managerId+'/usersLastLogin/?startDate='+startDate+'&endDate='+endDate,
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getActivitylistsmanagerSearchByDate (orgId,managerId,token,startDate,endDate){
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'manager/'+managerId+'/usersLastLogin/?startDate='+startDate+'&endDate='+endDate,
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getActivitylistsManagerSearch (orgId,managerId,token,month,searchstring) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'manager/'+managerId+'/usersLastLogin?durationInDays='+month+'&searchstring='+searchstring,
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getloginactivityetailsmanager (orgId,managerId,token) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'manager/'+managerId+'/usersLastLogin/',
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getloginactivityetailsadmin (orgId,managerId,token) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewmanagerassesmnet+orgId+'/'+'admin/'+managerId+'/usersLastLogin/',
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getAllUsersList (orgId,managerId,token) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewaddorg+orgId+'/'+'employeeslist/',
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}
getAlldepartment (token) {
  console.log(token)
  const headers = {
    'Content-Type': 'application/json',
  };
  var config = {
    method: 'get',
    url: baseURL + endpointviewaddorg,
    headers: headers,
  };
  return axios(config)
    .then((response) => {
      return response;
    })
}

}
const auntacationInstance = new aunticationServices();

export default auntacationInstance;