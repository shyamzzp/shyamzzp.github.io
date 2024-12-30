import React, { useState, useEffect } from "react";
import "./Work.css";
import "./bulma.min.css";

function Work() {
  const [values, setValues] = useState<string[]>(() => {
    const savedValues = localStorage.getItem("textAreaValues");
    try {
      const parsedValues = savedValues ? JSON.parse(savedValues) : [];
      return parsedValues.length === 20 ? parsedValues : Array(20).fill("");
    } catch (e) {
      return Array(20).fill(""); // Fallback if JSON parsing fails
    }
  });

  // Save values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("textAreaValues", JSON.stringify(values));
  }, [values]);

  // Handle the change for individual text areas
  const handleChange = (index: number, value: string) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues); // Update the state
  };

  // Listen for Ctrl+S event
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the 'Ctrl' (or 'Cmd' on macOS) and 'S' keys are pressed
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault(); // Prevent the default "Save" action
        alert("Ctrl+S was pressed!");
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="matrix-container">
      {Array.from({ length: 20 }).map((_, index) => (
        <textarea
          key={index}
          placeholder={`Section ${index + 1}`}
          value={values[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
        />
      ))}
    </div>
  );
}

export default Work;
