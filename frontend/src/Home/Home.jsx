import axios from "axios";
import { useState } from "react";

const HomePage = () => {
    const [prompt, setPrompt] = useState();
    const [response, setResponse] = useState([]);

    const handlePrompt = async(e)=>{
        e.preventDefault();
        try
        {
            const response = await axios.post(`http://localhost:3001/api/groq/groq-prompt`, {prompt}, {
                withCredentials: true
            });

            setResponse(response.data.reply);
        }
        catch(error)
        {
            console.log(error.response.data.message)
        }
    }
    return (
        <div className="container py-5">

            {/* Page Heading */}
            <div className="row justify-content-center mb-4">
                <div className="col-md-8 text-center">
                    <h1 className="fw-bold">AI Assistant</h1>
                    <p className="text-muted">
                        Ask a question and let AI help you find an answer.
                    </p>
                </div>
            </div>

            {/* Prompt Form */}
            <div className="row justify-content-center">
                <div className="col-md-8">

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">

                            <form onSubmit={handlePrompt}>

                                <div className="mb-3">
                                    <label
                                        htmlFor="prompt"
                                        className="form-label fw-semibold"
                                    >
                                        Your Prompt
                                    </label>

                                    <textarea
                                        id="prompt"
                                        name="prompt"
                                        value={prompt}
                                        onChange={(e)=>setPrompt(e.target.value)}
                                        className="form-control"
                                        rows="5"
                                        placeholder="Ask something... e.g. Explain JavaScript functions"
                                    ></textarea>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                    >
                                        Ask AI
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>

                </div>
            </div>

            {/* Response Section */}
            <div className="row justify-content-center mt-4">
                <div className="col-md-8">

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-3">
                                AI Response
                            </h5>

                            <div className="bg-light rounded p-3">
                                <p className="text-muted mb-0">
                                    {response || "Your AI response will appear here..."}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default HomePage;