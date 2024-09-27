import { FaGoogle, FaGithub } from "react-icons/fa"; // Import GitHub icon
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn, githubSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    });
            });
    };

    const handleGitHubSignIn = () => {
        githubSignIn()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    });
            });
    };

    return (
        <div className="p-8  space-x-4  flex ">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2" />
                    Google
                </button>
            </div>
            <div className="">
                <button onClick={handleGitHubSignIn} className="btn">
                    <FaGithub className="mr-2" />
                    GitHub
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
