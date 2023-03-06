const AuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.accessToken) {
      // return { Authorization: 'Bearer ' + user.accessToken };
      return { "Authorization": "f0b0cee3eb9f87014ff6" };
    } else {
      return {};
    }
    return { "Authorization": "f0b0cee3eb9f87014ff6" }
  }
  export default AuthHeader