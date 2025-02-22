
import { Outlet } from 'react-router-dom';
import Navbar from './../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Main = () => {
      return (
            <div >
                  <Navbar/>
                  <div className='min-h-screen'>
                  <Outlet/>
                  </div>
                  <Footer/>
            </div>
      );
};

export default Main;