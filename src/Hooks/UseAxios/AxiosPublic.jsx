import axios from "axios";

const axiosPublic = axios.create({
      baseURL:'https://todo-server-three-pi.vercel.app'
})

const AxiosPublic = () => {
return axiosPublic;
};

export default AxiosPublic;