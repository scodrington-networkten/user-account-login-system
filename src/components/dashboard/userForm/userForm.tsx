import '@components/forms.css';
import {useUser} from "@contexts/UserContext";
import {useState, useEffect, JSX} from "react";
import {User} from "@contracts/user";
import {UserMetadata} from "@contracts/UserMetadata";


/**
 * Shows the user their details and allows updating it
 * @returns {JSX.Element}
 * @constructor
 */
const UserForm = (): JSX.Element | null => {


    const {user} = useUser();

    // Local form state initialized with user values
    const [formData, setFormData] = useState<User | null>(null);
    const [userMetadataForm, setUserMetadataForm] = useState<UserMetadata | null>(null);

    // When `user` updates, sync local state once
    useEffect(() => {
        if (user) {
            setFormData(user);
            setUserMetadataForm(user.metadata)
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

                <fieldset>
                    <h2>Primary Account Settings</h2>
                    <hr/>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" value={formData.first_name}
                               onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" value={formData.last_name}
                               onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} required readOnly/>
                        <span className="help-text">Your email associated with this account cannot be changed</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password}
                               onChange={handleChange}/>
                    </div>

                </fieldset>

                <fieldset>
                    <h2>Extra Account Settings</h2>
                    <hr/>
                </fieldset>

                <button type="submit">Update</button>
            </form>
        </section>

    )
}
export default UserForm;
