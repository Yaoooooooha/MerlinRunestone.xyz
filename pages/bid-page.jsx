import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Runestone3D = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(); // 添加对渲染器的引用

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 0);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load("path/to/model.glb", (gltf) => {
      // Traverse the scene
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          // Check if the object is a mesh
          // Set the additive blending mode
          child.material.blending = THREE.AdditiveBlending;
        }
      });
      scene.add(gltf.scene);
      gltf.scene.scale.set(1, 1, 1); // 确保模型可见
      gltf.scene.position.set(0, 0, 0); // 校正模型位置
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // 拍照并下载图片
  const captureImage = () => {
    if (rendererRef.current) {
      const imgData = rendererRef.current.domElement.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "rune-model.png";
      link.click();
    }
  };

  return (
    <div>
      <div ref={mountRef} />
      <button onClick={captureImage}>Capture Image</button>
    </div>
  );
};

export default Runestone3D;
