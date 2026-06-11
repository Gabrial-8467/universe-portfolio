import React from "react";
import { useUniverseStore } from "../../store/universe";

const ContactForm: React.FC = () => {
  const { isContactOpen, setIsContactOpen } = useUniverseStore();

  if (!isContactOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
      }}
      onClick={() => setIsContactOpen(false)}
    >
      <div
        className="cockpit-panel"
        style={{
          width: "min(90vw, 500px)",
          pointerEvents: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-eyebrow">
          <span>ENCRYPTED CHANNEL</span>
          <i />
        </div>
        <h1>ESTABLISH CONNECTION</h1>
        
        <form 
          className="commander-panel"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
            alert("Transmission sent to the void...");
            setIsContactOpen(false);
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label>IDENTIFIER</label>
            <input type="text" placeholder="YOUR NAME" required />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>FREQUENCY</label>
            <input type="email" placeholder="YOUR EMAIL" required />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>TRANSMISSION</label>
            <textarea 
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "15px",
                border: "1px solid rgba(94, 194, 239, 0.42)",
                background: "rgba(2, 12, 20, 0.8)",
                color: "#e5f8ff",
                fontFamily: "Consolas, monospace",
                outline: "none",
                resize: "none"
              }}
              placeholder="YOUR MESSAGE..."
              required
            />
          </div>
          <button type="submit">SEND TRANSMISSION</button>
          <button 
            type="button" 
            onClick={() => setIsContactOpen(false)}
            style={{ 
              marginTop: "10px", 
              background: "transparent", 
              borderColor: "rgba(255, 107, 157, 0.5)",
              color: "#ff6b9d"
            }}
          >
            TERMINATE CONNECTION
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
