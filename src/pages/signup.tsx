import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Utilities from "../utilities";
import {useUser} from "@contexts/UserContext";


type FieldErrors = {
    email?: boolean;
    password?: boolean;
    name?: boolean
}

const Signup = () => {

    const {login} = useUser();

    const [formData, setFormData] = useState({
        email: `test${Utilities.generateRandomString(5)}@gmail.com`,
        password: '',
        name: ''
    })

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(false);
            setErrorMessage('');

            const response = await fetch('api/user/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            let data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            //collect the jwt from the payload and put it in sessions
            sessionStorage.setItem('jwt', data.token);
            //try and login with that token
            await login(data.token)

            setSuccessMessage(data.message);
            navigate('/dashboard');
        }
            //catch the error and set it to our local state variable
        catch (error) {
            setErrorMessage((error as Error).message);
            setError(true);
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
    }

    /**
     * Sync changes to state from form
     * @param e
     * @returns {Promise<void>}
     */
    const uploadFormChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;

        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })

        //check validity of fields
        setFieldErrors(prevData => {
            return {
                ...prevData,
                [name]: !e.target.checkValidity()
            }
        })
    }


    return (
        <div className="signup-form">
            <h1 className="title">Signup</h1>
            <p>Create a free account today to add movies to your watch later and favorites list</p><br/>
            {successMessage !== '' &&
                <p>{successMessage}</p>
            }
            {loading &&
                <p>Loading...</p>
            }
            {error &&
                <p>{errorMessage}</p>
            }
            <form id="signup" onSubmit={onFormSubmit} className={`container m-auto ${loading ? 'waiting' : ''}`}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={uploadFormChange}
                        autoComplete="email"
                        required
                    />
                    {fieldErrors.email &&
                        <div className="form-help error-message">This field is required</div>
                    }

                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={uploadFormChange}
                        autoComplete="given-name"
                        required
                    />
                    {fieldErrors.name &&
                        <div className="form-help error-message">This field is required</div>
                    }

                </div>

                <div className="form-group">
                    <label htmlFor="user-password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={uploadFormChange}
                        required
                        minLength={8}
                    />
                    {fieldErrors.password &&
                        <div className="form-help error-message">This field is required and must be at least 8
                            characters</div>
                    }
                </div>
                <button type="submit" disabled={loading} className="text-white">
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}
export default Signup;
