import React, {useState} from "react";
import {useUser} from "@contexts/UserContext";
import '../components/forms.css';

const Login = () => {

    const [formData, setFormData] = useState({
        email: 'admin@example.com',
        password: 'password'
    })

    const {login} = useUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        catch (error) {
            console.error((error as Error).message);
            setError((error as Error).message);
            setSuccessMessage(null);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Sync changes to state from form
     * @param e
     */
    const uploadFormChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setFormData(prevData => {
            return {
                ...prevData, [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className="signup-form">
            <h1 className="title">Login</h1>
            {loading &&
                <p className="message-success">Logging you into your account</p>
            }
            {successMessage !== null &&
                <p className="message-success">{successMessage}</p>
            }
            {error !== null &&
                <p className="message-error">There was an error logging in to your account: {error}</p>
            }
            <form id="login" onSubmit={onFormSubmit} className={`container m-auto ${loading ? 'waiting' : ''}`}>
                <fieldset disabled={loading}>
                    <div className="form-group">
                        <label htmlFor="user-email">Email</label>
                        <input
                            id="user-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={uploadFormChange}
                            autoComplete="email"
                            className="border"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="user-password">Password</label>
                        <input
                            id="user-password"
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
        </div>
    )
}
export default Login;
