
import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const containerRef = useRef(null);
  const [elements, setElements] = useState([1]); // start with first element
  const [isRendering, setIsRendering] = useState(false);

  // Debounce scroll handler to avoid too many calls
  let scrollTimeout = null;

  const startRenderBatch = () => {
    if (isRendering || elements.length >= 50) return;

    setIsRendering(true);

    let count = 0;
    const interval = setInterval(() => {
      setElements((prev) => {
        const next = prev.length + 1;
        if (next > 50) {
          clearInterval(interval);
          setIsRendering(false);
          return prev;
        }
        return [...prev, next];
      });
      count++;
      if (elements.length + count >= 50) {
        clearInterval(interval);
        setIsRendering(false);
      }
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setIsRendering(false);
    }, 500 * (50 - elements.length));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        startRenderBatch();
      }, 100); // small debounce delay
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [elements, isRendering]);

  const renderSection = () => {
    const verticalTop = elements.filter((el) => el <= 20);
    const horizontal = elements.filter((el) => el > 20 && el <= 30);
    const verticalBottom = elements.filter((el) => el > 30);

    return (
      <>
        {/* Top vertical */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {verticalTop.map((el) => (
            <div
              key={el}
              style={{
                padding: "4rem",
                background: "#def",
                borderRadius: "10px",
                minHeight: "150px",
              }}
            >
              Element {el}
            </div>
          ))}
        </div>

        {/* Horizontal */}
        {horizontal.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              gap: "1rem",
              margin: "2rem 0",
            }}
          >
            {horizontal.map((el) => (
              <div
                key={el}
                style={{
                  minWidth: "150px",
                  padding: "4rem",
                  background: "#fed",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                Element {el}
              </div>
            ))}
          </div>
        )}

        {/* Bottom vertical */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {verticalBottom.map((el) => (
            <div
              key={el}
              style={{
                padding: "4rem",
                background: "#dfd",
                borderRadius: "10px",
                minHeight: "150px",
              }}
            >
              Element {el}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        padding: "1rem",
        background: "#fafafa",
      }}
    >
      {renderSection()}
      {/* Add extra spacer div to ensure scroll area */}
      <div style={{ height: "300vh" }}></div>
    </div>
  );
}
