import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ApiHelper from "../../utils/apihelper.js";
import {useUser} from "../contexts/UserContext.jsx";

const Login = () => {

    const [formData, setFormData] = useState({
        email: 'admin@example.com',
        password: 'password'
    })

    const navigate = useNavigate();
    const {user, login} = useUser();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null)

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

            //collect token data and attempt login
            const token = data.token;
            await login(token);
            setSuccessMessage("Successfully logged into your account");
        }
            //catch any errors
        catch (e) {
            console.error(e.message);
            setError(e.message);
            setSuccessMessage(null);
        } finally {
            setLoading(false);
        }
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
        <div className="signup-form flex gap-2 flex-col mx-auto container my-2">
            {loading &&
                <p className="message-loading">Logging you into your account</p>
            }
            {successMessage !== null &&
                <p className="message-success">{successMessage}</p>
            }
            {error !== null &&
                <p className="message-error">There was an error logging in to your account: {error}</p>
            }
            <form id="login" onSubmit={onFormSubmit} className=" container m-auto">
                <fieldset disabled={loading}>
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
                    <button type="submit" className="text-white">Login</button>
                </fieldset>
            </form>
            {user !== null &&
                <p>{JSON.stringify(user)}</p>
            }
        </div>
    )
}
export default Login;
