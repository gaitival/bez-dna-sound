/**
 * ============================================================================
 * MAIN.JS — 3D INTERACTIVE SACRED GEOMETRY ENGINE
 * Проект «Без-Дна» — Лаборатория глубинной настройки
 * ============================================================================
 * Интерактивная 3D WebGL сцена на Three.js + GSAP:
 * - Основное (нижнее) изображение анимируется в 3D пространстве (наклон, параллакс, дыхание, левитация)
 * - Дублирующее верхнее изображение удалено (нет наслоения)
 * - 3D орбитальные кольца (золотое, бирюзовое, сакральные маркеры)
 * - Квантовое 3D облако золотых и бирюзовых микрочастиц
 * - Динамические источники света, следующие за курсором
 * - Автопауза при скролле через IntersectionObserver для 60-120 FPS
 */

import * as THREE from "three";
import gsap from "gsap";

/**
 * Инициализирует интерактивную 3D анимацию для блока Hero
 * @param {HTMLElement} container - DOM-контейнер (.hero-3d-stage)
 * @returns {Function} Функция очистки (destroy)
 */
export function initHero3D(container) {
  if (!container) return () => {};

  let isDestroyed = false;
  let isVisible = true;
  let animationFrameId = null;

  // Очищаем старые canvas элементы, если есть
  const existingCanvas = container.querySelector("canvas");
  if (existingCanvas) {
    existingCanvas.remove();
  }

  // Проверка поддержки WebGL
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch (e) {
    console.warn("[Hero 3D] WebGL not supported, fallback to CSS 3D", e);
    return initCSS3DOnly(container);
  }

  const rect = container.getBoundingClientRect();
  const width = rect.width || 295;
  const height = rect.height || 295;

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.className = "hero-3d-canvas";
  container.appendChild(renderer.domElement);

  // Сцена и камера
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  // Корневая группа для 3D элементов сцены
  const sceneRoot = new THREE.Group();
  scene.add(sceneRoot);

  // --- ОСВЕЩЕНИЕ ---
  const ambientLight = new THREE.AmbientLight(0xfff1cf, 1.5);
  scene.add(ambientLight);

  // Золотой свет за курсором
  const goldCursorLight = new THREE.PointLight(0xffd56b, 4.0, 14);
  goldCursorLight.position.set(0, 0, 3.5);
  scene.add(goldCursorLight);

  // Бирюзовый контурный свет
  const cyanRimLight = new THREE.PointLight(0x00e5ff, 2.4, 10);
  cyanRimLight.position.set(-2.5, -2.5, 2.0);
  scene.add(cyanRimLight);

  // Верхний акцентный свет
  const topAccentLight = new THREE.PointLight(0xffa834, 2.0, 9);
  topAccentLight.position.set(2.5, 3.0, 2.2);
  scene.add(topAccentLight);

  // --- 1. ОРБИТАЛЬНЫЕ САМОСТОЯТЕЛЬНЫЕ КОЛЬЦА (СТРОГО В 2D ПЛОСКОСТИ) ---
  const ringsGroup = new THREE.Group();
  sceneRoot.add(ringsGroup);

  // Кольцо 1: Тонкий золотой тор (вращение по кругу в плоскости экрана)
  const ring1Geo = new THREE.TorusGeometry(1.98, 0.014, 16, 120);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: 0xffd275,
    transparent: true,
    opacity: 0.8,
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = 0;
  ring1.rotation.y = 0;
  ringsGroup.add(ring1);

  // Кольцо 2: Бирюзовый пояс (вращение по кругу в плоскости экрана)
  const ring2Geo = new THREE.TorusGeometry(2.12, 0.01, 16, 120);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x4be1ec,
    transparent: true,
    opacity: 0.65,
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = 0;
  ring2.rotation.y = 0;
  ringsGroup.add(ring2);

  // Кольцо 3: 12 сакральных световых узлов (бегут по кругу)
  const markersCount = 12;
  const markersGeo = new THREE.BufferGeometry();
  const markerPositions = new Float32Array(markersCount * 3);
  const markerRadius = 2.05;
  for (let i = 0; i < markersCount; i++) {
    const angle = (i / markersCount) * Math.PI * 2;
    markerPositions[i * 3] = Math.cos(angle) * markerRadius;
    markerPositions[i * 3 + 1] = Math.sin(angle) * markerRadius;
    markerPositions[i * 3 + 2] = 0;
  }
  markersGeo.setAttribute("position", new THREE.BufferAttribute(markerPositions, 3));
  const markersMat = new THREE.PointsMaterial({
    color: 0xffe699,
    size: 0.055,
    transparent: true,
    opacity: 0.95,
  });
  const markersMesh = new THREE.Points(markersGeo, markersMat);
  ringsGroup.add(markersMesh);

  // --- 2. КВАНТОВОЕ ОБЛАКО ЗОЛОТЫХ ЧАСТИЦ (STARDUST ПО КРУГУ) ---
  const particlesCount = 420;
  const particlesGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particlesCount * 3);
  const particleColors = new Float32Array(particlesCount * 3);

  const goldColor = new THREE.Color(0xffcf53);
  const cyanColor = new THREE.Color(0x38e1ed);
  const whiteColor = new THREE.Color(0xffffff);

  for (let i = 0; i < particlesCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 1.85 + Math.random() * 0.95;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    const z = (Math.random() - 0.5) * 0.2; // строго вблизи плоскости экрана

    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;

    const pick = Math.random();
    const chosenColor = pick < 0.75 ? goldColor : pick < 0.95 ? cyanColor : whiteColor;
    particleColors[i * 3] = chosenColor.r;
    particleColors[i * 3 + 1] = chosenColor.g;
    particleColors[i * 3 + 2] = chosenColor.b;
  }

  particlesGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  particlesGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
  sceneRoot.add(particlesMesh);

  // --- 3. ИНТЕРАКТИВНОСТЬ (БЕЗ 3D НАКЛОНА, ТОЛЬКО ДИНАМИЧЕСКИЙ СВЕТ И МАСШТАБ) ---
  const state = {
    mouseX: 0,
    mouseY: 0,
    isHovered: false,
  };

  function updateMouseCoordinates(clientX, clientY) {
    const r = container.getBoundingClientRect();
    const centerX = r.left + r.width / 2;
    const centerY = r.top + r.height / 2;

    const normX = (clientX - centerX) / (r.width / 2);
    const normY = (clientY - centerY) / (r.height / 2);

    state.mouseX = Math.max(-1.5, Math.min(1.5, normX));
    state.mouseY = Math.max(-1.5, Math.min(1.5, normY));

    // Перемещение источника света в 2D плоскости над символом
    gsap.to(goldCursorLight.position, {
      x: state.mouseX * 2.2,
      y: -state.mouseY * 2.2,
      z: 3.2,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  function onPointerMove(e) {
    updateMouseCoordinates(e.clientX, e.clientY);
  }

  function onMouseEnter() {
    state.isHovered = true;
    gsap.to(container, {
      scale: 1.03,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(goldCursorLight, {
      intensity: 5.2,
      duration: 0.5,
    });
  }

  function onMouseLeave() {
    state.isHovered = false;
    gsap.to(container, {
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(goldCursorLight, {
      intensity: 4.0,
      x: 0,
      y: 0,
      duration: 1.0,
    });
  }

  // Слушатели событий
  window.addEventListener("pointermove", onPointerMove);
  container.addEventListener("mouseenter", onMouseEnter);
  container.addEventListener("mouseleave", onMouseLeave);

  container.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches && e.touches[0]) {
        updateMouseCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );

  // ResizeObserver
  const resizeObserver = new ResizeObserver((entries) => {
    if (!entries[0] || isDestroyed) return;
    const { width: newWidth, height: newHeight } = entries[0].contentRect;
    if (newWidth > 0 && newHeight > 0) {
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }
  });
  resizeObserver.observe(container);

  // IntersectionObserver для экономии ресурсов
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      isVisible = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0.05 }
  );
  intersectionObserver.observe(container);

  // Плавное медитативное дыхание контейнера
  const breatheTimeline = gsap.timeline({ repeat: -1, yoyo: true });
  breatheTimeline.to(container, {
    scale: 1.025,
    duration: 3.6,
    ease: "sine.inOut",
  });

  // --- ЦИКЛ АНИМАЦИИ (60-120 FPS) ---
  const clock = new THREE.Clock();

  function animate() {
    if (isDestroyed) return;
    animationFrameId = requestAnimationFrame(animate);

    if (!isVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // Мягкая левитация по вертикали (строго 2D, без 3D перспективы и без поворотов по X/Y)
    const levitationY = Math.sin(elapsedTime * 1.5) * 5;
    container.style.transform = `translateY(${levitationY}px)`;

    // Вращение колец, узлов и частиц ПО КРУГУ (строго в плоскости экрана по оси Z)
    ring1.rotation.z = elapsedTime * 0.22;
    ring2.rotation.z = -elapsedTime * 0.16;
    markersMesh.rotation.z = elapsedTime * 0.1;
    particlesMesh.rotation.z = elapsedTime * 0.08;

    // Пульсация свечения
    cyanRimLight.intensity = 2.2 + Math.sin(elapsedTime * 2.5) * 0.6;
    topAccentLight.intensity = 1.8 + Math.cos(elapsedTime * 1.8) * 0.5;

    renderer.render(scene, camera);
  }

  animate();

  return function destroy() {
    isDestroyed = true;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    breatheTimeline.kill();

    window.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("mouseenter", onMouseEnter);
    container.removeEventListener("mouseleave", onMouseLeave);

    container.style.transform = "";

    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
    });

    if (renderer) {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
  };
}

function initCSS3DOnly(container) {
  const breatheTimeline = gsap.timeline({ repeat: -1, yoyo: true });
  breatheTimeline.to(container, {
    scale: 1.025,
    y: -5,
    duration: 3.2,
    ease: "sine.inOut",
  });

  return function destroy() {
    breatheTimeline.kill();
  };
}
