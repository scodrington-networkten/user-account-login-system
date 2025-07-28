import React, {ChangeEvent, MouseEvent, useState} from "react";

const CreateTask = () => {

    const [formData, setFormData] = useState({
        title: 'Title here',
        description: 'the description thing goes here',
        steps: ['hello', 'world']
    });

    /**
     * Called on every step input box change to keep the data synced
     */
    const onStepChanged = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newSteps = [...formData.steps];
        newSteps[index] = e.target.value;
        setFormData({...formData, steps: newSteps});
    };

    /**
     * Called to add a new step
     */
    const addStep = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormData(prevData => ({
            ...prevData,
            steps: [...prevData.steps, '']
        }));
    };

    /**
     * Called to remove a specific step
     */
    const removeStep = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        const newSteps = formData.steps.filter((_item, _index) => _index !== index);
        setFormData(prevData => ({
            ...prevData,
            steps: newSteps
        }));
    };

    /**
     * Submits the task
     */
    const processSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('/api/create-task', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Response: ${data}`);
        } else {
            alert(`Error submitting data: ${data.error}`);
        }
    };

    /**
     * Handles input/textarea changes
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div>
            <form onSubmit={processSubmit}>
                <label htmlFor="title">Title</label><br/>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                /><br/>

                <label htmlFor="description">Description</label><br/>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                /><br/>

                {formData.steps.map((step, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={step}
                            onChange={(e) => onStepChanged(e, index)}
                        />
                        <button onClick={(e) => removeStep(e, index)}>Remove</button>
                    </div>
                ))}

                <button onClick={addStep}>Add Step</button><br/>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default CreateTask;
