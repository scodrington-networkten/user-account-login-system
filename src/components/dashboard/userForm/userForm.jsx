import '@components/forms.css';
import {useUser} from "@contexts/UserContext.jsx";
import {useState, useEffect} from "react";


/**
 * Shows the user their details and allows updating it
 * @returns {JSX.Element}
 * @constructor
 */
const UserForm = () => {

    const {user} = useUser();

    // Local form state initialized with user values
    const [formData, setFormData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        created_at: "",
        is_active: "",
    });

    // When `user` updates, sync local state once
    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                password: user.password || "",
                created_at: user.created_at || "",
                is_active: user.is_active || false
            });
        }
    }, [user]);

    //Handle changes to the form to update local state
    function handleChange(e) {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Now formData contains all edits — send to API/DB here
        console.log("Submit data", formData);

        // After successful update, you might update your UserContext `user` state elsewhere
    }


    if (user == null) {
        return (
            <p>User account loading..</p>
        )
    }

    return (
        <section className={"user-account-section my-2"}>
            <h1 className={"text-3xl mb-2"}>User Account</h1>
            <p className={"mb-2"}>Your account information is listed below</p>
            <form>
                <div className="form-group">
                    <label htmlFor="id">User ID</label>
                    <input type="text" id="id" name="id" value={formData.id} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" id="first_name" name="first_name" value={formData.first_name} required
                           onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" id="last_name" name="last_name" value={formData.last_name} required
                           onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={formData.email} required onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} required
                           onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="created_at">Created At</label>
                    <input type="text" id="created_at" name="created_at" value={formData.created_at} readOnly
                           onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange}/>
                        Active User
                    </label>
                </div>

                <button type="submit">Save</button>
            </form>
        </section>

    )
}
export default UserForm;
