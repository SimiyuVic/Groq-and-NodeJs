import axios from "axios";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const HomePage = () => {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlePrompt = async (e) => {
        e.preventDefault();

        if (!prompt.trim() || loading) return;

        const userPrompt = prompt;

        // Add user's message immediately
        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userPrompt
            }
        ]);

        setPrompt("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:3001/api/groq/groq-prompt",
                { prompt: userPrompt },
                {
                    withCredentials: true
                }
            );

            // Add AI response
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: response.data.reply
                }
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, something went wrong. Please try again."
                }
            ]);

            console.log(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">

            {/* Heading */}
            <div className="text-center mb-4">
                <h1 className="fw-bold">AI Assistant</h1>
                <p className="text-muted">
                    Ask a question and let AI help you find an answer.
                </p>
            </div>

            {/* Chat Area */}
            <div className="row justify-content-center">
                <div className="col-md-8">

                    <div
                        className="card shadow-sm border-0"
                        style={{ minHeight: "500px" }}
                    >

                        {/* Chat Messages */}
                        <div className="card-body p-4">

                            {messages.length === 0 && (
                                <div className="text-center text-muted py-5">
                                    <h5>Hello!</h5>
                                    <p>
                                        Ask me anything and I'll try to help.
                                    </p>
                                </div>
                            )}

                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`d-flex mb-4 ${
                                        message.role === "user"
                                            ? "justify-content-end"
                                            : "justify-content-start"
                                    }`}
                                >

                                    <div
                                        className={`p-3 rounded ${
                                            message.role === "user"
                                                ? "bg-primary text-white"
                                                : "bg-light"
                                        }`}
                                        style={{
                                            maxWidth: "80%",
                                            whiteSpace: "pre-wrap"
                                        }}
                                    >

                                        {message.role === "assistant" ? (
                                            <ReactMarkdown>
                                                {message.content}
                                            </ReactMarkdown>
                                        ) : (
                                            message.content
                                        )}

                                    </div>

                                </div>
                            ))}

                            {/* Loading */}
                            {loading && (
                                <div className="d-flex justify-content-start mb-4">
                                    <div className="bg-light p-3 rounded">
                                        <span className="text-muted">
                                            AI is thinking...
                                        </span>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Prompt Form */}
                        <div className="card-footer bg-white border-0 p-3">

                            <form onSubmit={handlePrompt}>

                                <div className="input-group">

                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        placeholder="Ask something..."
                                        value={prompt}
                                        onChange={(e) =>
                                            setPrompt(e.target.value)
                                        }
                                        disabled={loading}
                                    />

                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={loading || !prompt.trim()}
                                    >
                                        {loading ? "..." : "Send"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default HomePage;