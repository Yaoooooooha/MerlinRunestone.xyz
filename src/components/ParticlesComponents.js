import React, { useEffect } from "react";
import Script from "next/script";

const ParticlesComponent = () => {
  useEffect(() => {
    const initParticlesJS = () => {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 250,
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
              distance: 100,
              line_linked: {
                opacity: 0.9,
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

    return () => {
      window.removeEventListener("particlesJSLoaded", initParticlesJS);
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
        style={{ position: "fixed", width: "100vw", height: "100vh" }}
      ></div>
      {/* 注意确保容器有明确的尺寸 */}
      <div className="count-particles">
        <span className="js-count-particles"></span>
      </div>
    </div>
  );
};

export default ParticlesComponent;
