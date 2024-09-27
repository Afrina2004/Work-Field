import { Link, useRouteError } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
   const error = useRouteError();
  

    return (
        <div>
            <Helmet>
                <title>BD Handicrafts | Error Page</title>
            </Helmet>
       
        <div className='text-center'>

            <h2>Error!!!!!</h2>
            <p>{error.statusText || error.message }</p>
         {
            error.status === 404 && <div>
                <h3>Page not founded </h3>
                <Link to = '/'><button className="btn btn-primary">Go Back</button></Link>
                </div>
         }
        
        
        </div> </div>
    );
};

export default ErrorPage;