import { useLoaderData } from "react-router-dom";
import BusinessCard from "../BusinessCard/BusinessCard";
import Banner from '../../assets/banner.png';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    const news = useLoaderData();
    console.log(news)
    return (
        <div>
              <Helmet>
                <title>BD Handicrafts | Home Page</title>
            </Helmet>
<img src ={Banner}  />

            <BusinessCard></BusinessCard>
        </div>
    );
};

export default Home;