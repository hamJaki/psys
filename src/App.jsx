import { useState } from 'react'
import './App.css'

function App() {
    const [relaxationLevel, setRelaxationLevel] = useState(0)

    return (
        <div className="app-container">
            <h1 className="pixel-text">Welcome to Your Calm Space</h1>
            <div className="card">
                <button
                    className="relax-button"
                    onClick={() => setRelaxationLevel(level => level + 1)}
                >
                    Relaxation level: {relaxationLevel}
                </button>
                <p className="pixel-text">
                    Breathe deeply and let your mind settle.
                </p>
            </div>
            <p className="footer-text pixel-text">
                This is a peaceful place. Feel free to explore your thoughts.
            </p>
        </div>
    )
}

export default App
