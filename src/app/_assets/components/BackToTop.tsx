"use client";

import { ArrowUpOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="back-to-top animated infinite pulse"
          onClick={handleScrollToTop}
          title="Back To Top"
        >
          <ArrowUpOutlined style={{ color: "#000" }} />
        </div>
      )}
    </>
  );
};

export default BackToTop;
