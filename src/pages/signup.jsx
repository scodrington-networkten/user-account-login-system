import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ApiHelper from "../../utils/apihelper.js";

const Signup = () => {

    const [formData, setFormData] = useState({
        email: `test${ApiHelper.generateRandomString(5)}@gmail.com`,
        username: 'someguy',
        password: 'password'
    })

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/user-signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            let data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            setError(null);
            setSuccessMessage(data.message);
            console.log(data);
            navigate('/dashboard');
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
                <p>There was an error creating your account: {error}</p>
            }
            <form id="signup" onSubmit={onFormSubmit} className="border container m-auto">
                <div>
                    <label>Username:</label><br/>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={uploadFormChange}

                        autoComplete="username"
                        className="border"
                    />
                </div>

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
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={uploadFormChange}

                        autoComplete="new-password"
                        className="border"
                    />
                </div>
                <button type="submit" disabled={loading} className="text-white">
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}
export default Signup;
