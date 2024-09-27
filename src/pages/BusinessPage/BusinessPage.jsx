import { useLoaderData } from 'react-router-dom';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Banner from '../../assets/pic.png';
import { FcRating } from "react-icons/fc";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from "../../hooks/useCart";
import useAuth from '../../hooks/useAuth'; // Import the useAuth hook
import Swal from 'sweetalert2';

const BusinessPage = () => {
    const { user } = useAuth(); // Get the user information
    const data = useLoaderData();
    const navigate = useNavigate();
    const [, refetch] = useCart();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const idInt = parseInt(id);
    const business = data.find(b => b.id === idInt);

    if (!business) {
        return <div>Business not found</div>;
    }

    const handleAddToCart = () => {
        if (user && user.email) {
            // Send cart item to the database
            const cartItem = {
                businessId: idInt,
                email: user.email,
                businessName: business.businessName,
                businessImg: business.businessImg,
                rating: business.rating,
            };

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${business.businessName} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch(); 
                    }
                })
                .catch(error => {
                    console.error("Error adding to cart:", error);
                });
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please log in to add items to the cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>BD Handicrafts | BusinessPage</title>
            </Helmet>
            <img src={Banner} alt="Banner" />
            <div>
                <div className="card card-side mt-4">
                    <figure>
                        <img 
                            src={business.businessImg}
                            alt="business"
                            className='max-h-[500px] h-auto max-w-[600px] w-auto'
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-bold">
                            Product Name: <span className='text-yellow-200'>{business.businessName}</span>
                        </h2>
                        <p className='border-b-2'></p>
                        <p className='text-2xl'>Materials Used: {business.materialsUsed}</p>
                        <p className='text-2xl'>Crafting Method: {business.craftingMethod}</p>
                        <p className='border-b-4'></p>
                        <div className='flex space-y-4 justify-between'>
                            <div className='flex'>
                                <FcRating className='text-[25px] text-yellow-600 mr-1 mt-3' />
                                <span className='text-xl mt-3'>Rating: {business.rating}</span>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
                            >
                                Favourite
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Link to='/'>
                    <span className='link link-primary p-8'>Go Back</span>
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BusinessPage;
