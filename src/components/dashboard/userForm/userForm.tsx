import '@components/forms.css';
import {useUser} from "@contexts/UserContext";
import {useState, useEffect, JSX} from "react";
import {User} from "@contracts/user";


/**
 * Shows the user their details and allows updating it
 * @returns {JSX.Element}
 * @constructor
 */
const UserForm = (): JSX.Element | null => {


    const {user} = useUser();

    // Local form state initialized with user values
    const [formData, setFormData] = useState<User | null>(null);

    // When `user` updates, sync local state once
    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    //Handle changes to the form to update local state
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const {name, type, value, checked} = e.target;

        if (!formData) return;

        // Use a clear if/else chain so it's obvious what's happening
        let newValue: string | number | boolean;

        if (type === 'checkbox') {
            newValue = checked;
        } else if (name === 'id') {
            newValue = Number(value);
        } else {
            newValue = value;
        }

        setFormData(prev => ({
            ...prev!,
            [name]: newValue,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Submit data", formData);
    }


    if (user == null || formData == null) {
        return null;
    }

    return (
        <section className={"user-account-section my-2"}>
            <p className={"mb-2"}>Your account information is listed below</p>
            <form>
                <div className="form-group">
                    <label htmlFor="id">User ID</label>
                    <input type="text" id="id" name="id" value={formData.id.toString()} onChange={handleChange}/>
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
                    <input type="email" id="email" name="email" value={formData.email} required
                           onChange={handleChange}/>
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
