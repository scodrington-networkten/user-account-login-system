import dotenv from "dotenv";
import {useState} from "react";

const Dashboard = () => {


    const [testRequest, setTestRequest] = useState(null);

    const checkDbConnection = async () => {

        const apiUrl = ('/api/test-db-connection');

        const apiResult = await fetch(apiUrl);
        if (!apiResult.ok) {
            console.log(`there was an error connecting to ${apiUrl}`);
        }

        const json = await apiResult.json();
        console.log(json);
        setTestRequest(json);

    }

    return (
        <div className="container mx-auto mt-2 mb-2">
            <p>Check the connection to the Postgres DB below</p>
            <button
                className={"text-white"}
                onClick={checkDbConnection}>
                Check DB connection
            </button>
            {testRequest != null &&
                <div className="response-section">
                    <p>The response is as such</p>
                    <pre>
                        {JSON.stringify(testRequest, null, 2)}
                    </pre>
                </div>
            }
        </div>
    )
}
export default Dashboard;

