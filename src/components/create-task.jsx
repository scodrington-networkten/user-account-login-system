import React from "react";
import {useState} from "react";

const CreateTask = () => {

    const [formData, setFormData] = useState({
        title: 'Title here',
        description: 'the description thing goes here',
        steps: ['hello', 'world']
    })

    /**
     * Called on every step input box change to keep the data synced
     * @param e - native input changed event
     * @param index - index of the step being changed
     */
    const onStepChanged = (e, index) => {

        const newSteps = [...formData.steps]
        newSteps[index] = e.target.value; //set value based on input
        setFormData({...formData, steps: newSteps})

    }

    /**
     *
     * Called to add a new step to the step arrays
     * @param e
     */
    const addStep = (e) => {
        e.preventDefault();

        setFormData((prevData) => {
            return {...formData, steps: [...formData.steps, '']}
        })
    }

    /**
     * Called to remove a specific step
     * @param e - the native button event that was triggered
     * @param index - the step index to be removed
     */
    const removeStep = (e, index) => {
        e.preventDefault();

        //set the formdata, removing the nominated step
        setFormData((prevData) => {

            //set the steps, removing the specific step
            const newSteps = prevData.steps.filter((_item, _index) => {
                if (_index === index) {
                    return false;
                } else {
                    return true
                }
            })

            //set the new step data
            setFormData((prevData) => {
                return {...formData, steps: newSteps}
            })

        })
    }

    const processSubmit = async (e) => {
        e.preventDefault()
        //alert(`title: ${formData.title} description: ${formData.description} steps: ${formData.steps}`);
        //create a fetch request to the DB

        const response = await fetch('/api/create-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: formData.title,
                description: formData.description,
                steps: formData.steps
            })
        })

        const data = await response.json();

        if(response.ok){
            alert(`Response: ${data}`);
        }else{
            alert(`Error submitting data: ${data.error}`);
        }

    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

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
                            placeholder="text goes here"
                            value={step}
                            onChange={(e) => onStepChanged(e, index)}

                        />
                        <button onClick={(e) => {
                            removeStep(e, index)
                        }}>Remove
                        </button>
                    </div>
                ))}
                <button onClick={addStep}>Add Step</button>

                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}
export default CreateTask
