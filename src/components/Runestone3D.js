// 首先，导入必要的模块
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Runestone3D = () => {
  const mountRef = useRef(null); // 3D 模型的容器

  useEffect(() => {
    // 場景
    const scene = new THREE.Scene();
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light); // 添加光線
    // 相機
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    // 渲染器 (alpha: true 允許將背景設定成透明)
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0); // 將背景設定成透明
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 加载器
    const loader = new GLTFLoader();
    let model; // 在組件的作用域內聲明模型的引用變數

    // 加载模型
    loader.load(
      "assets/images/hero/rune_test.glb",
      (gltf) => {
        scene.add(gltf.scene);
        model = gltf.scene;
        model.scale.set(0.8, 0.8, 0.8);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded"); // 加載進度
      },
      (error) => {
        console.log("An error happened", error);
      }
    );

    // 渲染循環
    const animate = function () {
      requestAnimationFrame(animate);

      if (model) {
        // 確保模型以加載完畢
        model.rotation.y += 0.005; // 沿著 Y 軸旋轉
      }

      renderer.render(scene, camera);
    };
    animate();

    // 清理資源
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="3D Model"
      ref={mountRef}
      style={{ position: "absolute", zIndex: "3" }}
    />
  );
};

export default Runestone3D;
