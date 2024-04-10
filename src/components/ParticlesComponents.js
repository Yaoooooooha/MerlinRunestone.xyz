import React, { useEffect } from "react";
import Script from "next/script";

const ParticlesComponent = () => {
  useEffect(() => {
    const initParticlesJS = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: true,
              speed: 10,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
          },
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 0,
              line_linked: {
                opacity: 0.5,
              },
            },
          },
        },
      });
    };

    // 检查particlesJS是否已经可用
    if (window.particlesJS) {
      initParticlesJS();
    } else {
      // 监听script加载完成事件
      window.addEventListener("particlesJSLoaded", initParticlesJS);
    }

    // 鼠標遮罩
    const handleMouseMove = (event) => {
      const mask = document.getElementById("mouse-mask");
      const x = event.pageX;
      const y = event.pageY;
      mask.style.left = `${x}px`;
      mask.style.top = `${y}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("particlesJSLoaded", initParticlesJS);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          // 触发事件表示particles.js已加载完毕
          window.dispatchEvent(new Event("particlesJSLoaded"));
        }}
      />
      <div
        id="particles-js"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: "-1",
        }}
      ></div>
      {/* 注意确保容器有明确的尺寸 */}
      <div className="count-particles">
        <span className="js-count-particles"></span>
      </div>
      <div
        id="mouse-mask"
        style={{
          position: "absolute",
          transform: "translate(-50%,-50%)",
          width: "200px", // 遮罩的大小
          height: "200px",
          borderRadius: "50%", // 圆形遮罩
          backgroundColor: "#000000", // 遮罩的颜色
          pointerEvents: "none", // 确保遮罩不会阻止下面元素的事件
          zIndex: 1, // 确保遮罩在最顶层
        }}
      ></div>
    </div>
  );
};

export default ParticlesComponent;
