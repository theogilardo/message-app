import axios from 'axios'

const axiosDatabaseFirebase = axios.create({
  baseURL: "https://message-app-719f5.firebaseio.com"
})

const axiosAuthFirebase = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1"  
})

// Need to be improved
axiosDatabaseFirebase.interceptors.request.use((req) => {
  console.log(req)
  return req
})

axiosDatabaseFirebase.interceptors.response.use(res => {
  console.log(res);
  return res;
});

export { axiosDatabaseFirebase, axiosAuthFirebase }
  