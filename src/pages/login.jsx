import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ApiHelper from "../../utils/apihelper.js";
import {useUser} from "../contexts/UserContext.jsx";

const Login = () => {

    const [formData, setFormData] = useState({
        email: 'tesasdasdt@gmail.com',
        password: 'password'
    })

    const navigate = useNavigate();
    const {login} = useUser();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            let data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }


            //collect token and call the login function
            const token = data.token;
            await login(token);


        }
            //catch the error and set it to our local state variable
        catch (e) {
            setError(e.message);
            setSuccessMessage(null);
        }

        setLoading(false);
    }

    /**
     * Sync changes to state from form
     * @param e
     * @returns {Promise<void>}
     */
    const uploadFormChange = async (e) => {

        setFormData(prevData => {
            return {
                ...prevData, [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className="signup-form">
            {setSuccessMessage !== null &&
                <p>{successMessage}</p>
            }
            {error !== null &&
                <p>There was an error logging in to your account: {error}</p>
            }
            <form id="login" onSubmit={onFormSubmit} className="border container m-auto">
                <div>
                    <label>Email:</label><br/>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={uploadFormChange}

                        autoComplete="email"
                        className="border"
                    />
                </div>

                <div>
                    <label>Password:</label><br/>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={uploadFormChange}

                        autoComplete="new-password"
                        className="border"
                    />
                </div>
                <button type="submit" disabled={loading} className="text-white">
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </form>
        </div>
    )
}
export default Login;
