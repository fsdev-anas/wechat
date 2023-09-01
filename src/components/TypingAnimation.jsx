import React, { useState, useEffect } from "react";
import Heading from "./Heading";

const TypingAnimation = ({ texts, currentIndex }) => {
  const [displayText, setDisplayText] = useState("");
  const currentTextObject = texts[currentIndex];
  const [shouldAnimate, setShouldAnimate] = useState(false);
  let count = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (shouldAnimate && count <= currentTextObject.text.length) {
        setDisplayText(currentTextObject.text.slice(0, count));
        count++;
      } else {
        count = 0;
        // setDisplayText("");
        setShouldAnimate(false);
      }
    }, 80); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [currentIndex, currentTextObject.text, shouldAnimate]);

  useEffect(() => {
    setShouldAnimate(true);
  }, [currentIndex]);

  return (
    <div className="total">
      <Heading className="title" title={currentTextObject.title} />
      <Heading className="type" data-speed="1000" title={displayText} />
      <style jsx>{/* Your CSS styles here */}</style>
    </div>
  );
};

export default TypingAnimation;
