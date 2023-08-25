import React, { useState, useEffect } from "react";
import Heading from "./Heading";

const TypingAnimation = ({ texts, currentIndex }) => {
  const [displayText, setDisplayText] = useState("");
  const currentTextObject = texts[currentIndex];
  let count = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (count <= currentTextObject.text.length) {
        setDisplayText(currentTextObject.text.slice(0, count));
        count++;
      } else {
        count = 0;
        setDisplayText("");
      }
    }, 80); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [currentIndex, currentTextObject.text]);

  return (
    <div className="total">
      <Heading className="title" title={currentTextObject.title} />
      <Heading className="type" data-speed="1000" title={displayText} />
      <style jsx>{/* Your CSS styles here */}</style>
    </div>
  );
};

export default TypingAnimation;
