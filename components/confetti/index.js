import React from "react";
import Confetti from "react-confetti";

const ConfettiItem = () => {
  return (
    <div className="fixed top-0 z-10">
      <Confetti
        recycle={false}
        width={window.screen.width}
        height={parseInt(window.screen.height) + 300}
        tweenDuration={6000}
      />
    </div>
  );
};

export default ConfettiItem;
