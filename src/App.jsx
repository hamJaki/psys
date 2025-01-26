import React, { useState } from 'react';
import OpenAI from 'openai';
import { AiOutlineSend } from 'react-icons/ai';

const QnA = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Replace with your API key if not using environment variables
        dangerouslyAllowBrowser: true, // Allows using the API key in the browser
    });

    const handleAsk = async () => {
        if (!question.trim()) return;
        setLoading(true);
        setAnswer('');
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: question }],
                max_tokens: 100,
                temperature: 0.7,
            });
            setAnswer(response.choices[0]?.message?.content || 'No answer available.');
        } catch (error) {
            console.error(error);
            setAnswer('Error fetching answer. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 space-y-4 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold">Ask OpenAI</h1>
            <div className="w-full max-w-md space-y-4">
        <textarea
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
        />
                <button
                    className={`flex items-center justify-center w-full p-3 text-white font-semibold rounded-md ${
                        loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    onClick={handleAsk}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Ask'}
                    {!loading && <AiOutlineSend className="ml-2" />}
                </button>
                {answer && (
                    <div className="p-4 bg-white rounded-md border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold">Answer:</h2>
                        <p>{answer}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QnA;
