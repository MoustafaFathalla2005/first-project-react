import axios from "axios";

const instance = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 8000,
  params: {
    limit: 20,
  },
});

// request interceptor
instance.interceptors.request.use(
  (req) => {
    // add configurations here ( headers)
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// response interceptor
instance.interceptors.response.use(
  (res) => {
    if (res.status === 201) {
      console.log("Posted Successfully");
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
