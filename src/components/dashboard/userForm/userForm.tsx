import '@components/forms.css';
import {useUser} from "@contexts/UserContext";
import {useState, useEffect, JSX} from "react";
import {User} from "@contracts/user";
import {UserMetadata} from "@contracts/UserMetadata";
import {UserActionsApiResult} from "@contracts/userActionsApiResult";
import {UpdateUserApiResponse} from "@contracts/updateUserApiResponse";

/**
 * Shows the user their details and allows updating it (passing it to backend
 * for the updation of the user)
 * @returns {JSX.Element}
 * @constructor
 */
const UserForm = (): JSX.Element | null => {


    const {user, setUser, updateUserInformation} = useUser();

    // Local form state initialized with user values
    const [formData, setFormData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    // When `user` updates, sync the formdata
    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    useEffect(() => {
        ///console.log("Form data updated:", formData);
    }, [formData]);

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

    /**
     * Handle updating the metadata specifically, such as bio and sex
     * @param e
     */
    function handleMetadataFiedldChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {

        const {name, type, value} = e.target;

        //update metadata state
        setFormData((prev) => ({
            ...prev!,
            metadata: {
                ...prev!.metadata,
                [name]: value
            }
        }));

    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (formData === null) return;

        setLoading(true);

        //pass updated user form data to backend for saving
        const result: UpdateUserApiResponse = await updateUserInformation(formData);

        //on success, show message + set user to the updated user to refesh the UI
        if (result.success) {
            window.showToastNotification(result.message, 'success');
            setUser(result.user);
        } else {
            window.showToastNotification(result.message, 'error');
        }

        setLoading(false);

    }

    if (!user || !formData) return null;

    return (
        <section className={"user-account-section my-2"}>
            <p className={"mb-2"}>Your account information is listed below</p>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={loading}>
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
                        <input type="email" id="email" name="email" value={formData.email} readOnly/>
                        <span className="help-text">Your email associated with this account cannot be changed</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password}
                               onChange={handleChange}/>
                    </div>

                </fieldset>

                <fieldset disabled={loading}>
                    <h2>Extra Account Settings</h2>
                    <hr/>

                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea id="bio" name="bio" value={formData.metadata?.bio}
                                  onChange={handleMetadataFiedldChange}/>
                    </div>
                    <div className="form-group checkbox-group">
                        <label>Sex</label>

                        <div className="options">
                            <div className="option">
                                <label htmlFor="sex_male">Male</label>
                                <input type="radio" id="sex_male" name="sex" value="male"
                                       checked={formData.metadata?.sex
                                           == "male"}
                                       onChange={handleMetadataFiedldChange}/>
                            </div>
                            <div className="option">
                                <label htmlFor="sex_female">Female</label>
                                <input type="radio" id="sex_female" name="sex" value="female"
                                       checked={formData.metadata?.sex
                                           == "female"}
                                       onChange={handleMetadataFiedldChange}/>
                            </div>
                            <div className="option">
                                <label htmlFor="sex_unknown">Unknown</label>
                                <input type="radio" id="sex_unknown" name="sex" value="unknown"
                                       checked={formData.metadata?.sex
                                           == "unknown"}
                                       onChange={handleMetadataFiedldChange}/>
                            </div>
                        </div>


                    </div>

                </fieldset>
                <fieldset disabled={loading}>
                    <button type="submit">Update</button>
                </fieldset>

            </form>
        </section>

    )
}
export default UserForm;
