import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/Context";
import "../css/footer.css";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const { workers,showFooter } = useContext(AppContext);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= docHeight) {
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

  const shouldShowFooter = (isVisible || workers.length === 0) && showFooter;

  return (
    <div className={`footer-container ${shouldShowFooter ? "visible" : ""}`}>
      <div className="footer-content">
        © 2024 Worker Search Application. All rights reserved.
      </div>
    </div>
  );
}
