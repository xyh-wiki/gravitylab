/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description:
 *  - 初始化物理世界（只初始化一次）
 *  - 处理鼠标/触摸事件生成不同类型球体
 *  - 触发天气事件
 *  - 通过 DOM 层渲染 Emoji 标签，并自动清理无效节点
 *  - 每帧调用 stepSpecialEffects 让不同球有可感知的特殊行为
 */

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { initEngine, getEngine } from "../core/physics/engine";
import { createBall } from "../core/objects/ballFactory";
import { triggerWeather } from "../core/weather/weatherEngine";
import { stepSpecialEffects } from "../core/physics/effects";
import type { BallType, WeatherType } from "../pages/Game";

interface GameCanvasProps {
  currentType: BallType;
  pendingWeather: WeatherType;
  onWeatherConsumed: () => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
                                                 currentType,
                                                 pendingWeather,
                                                 onWeatherConsumed,
                                               }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const emojiLayerRef = useRef<HTMLDivElement | null>(null);

  // bodyId -> emoji DOM 映射
  const emojiMapRef = useRef<Map<number, HTMLDivElement>>(new Map());

  // 当前球类型（用 ref，避免重新初始化引擎）
  const currentTypeRef = useRef<BallType>("fire");
  useEffect(() => {
    currentTypeRef.current = currentType;
  }, [currentType]);

  /**
   * 物理引擎 + 事件绑定，只初始化一次
   */
  useEffect(() => {
    if (!canvasRef.current || !emojiLayerRef.current) return;

    initEngine(canvasRef.current);
    const engine = getEngine();
    if (!engine) return;
    const world = engine.world;

    const emojiLayer = emojiLayerRef.current;

    // 创建小球 + 对应 emoji DOM
    const spawnBall = (x: number, y: number, type: BallType) => {
      const body = createBall(world, x, y, type);
      const plugin = (body as any).plugin || { emoji: "⚪" };

      const div = document.createElement("div");
      div.textContent = plugin.emoji;
      div.style.position = "absolute";
      div.style.fontSize = "22px";
      div.style.transform = "translate(-50%, -50%)";
      div.style.pointerEvents = "none";
      emojiLayer.appendChild(div);

      emojiMapRef.current.set(body.id, div);
    };

    // 鼠标
    const handleMouseDown = (e: MouseEvent) => {
      spawnBall(e.clientX, e.clientY, currentTypeRef.current);
      if (navigator.vibrate) navigator.vibrate(10);
    };

    // 触摸
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        spawnBall(t.clientX, t.clientY, currentTypeRef.current);
        if (navigator.vibrate) navigator.vibrate(10);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart);

    let animationId: number;

    // 每帧更新 emoji + 特效
    const updateLoop = () => {
      const eng = getEngine();
      if (eng) {
        const worldNow = eng.world;
        const bodies = Matter.Composite.allBodies(worldNow);
        const aliveIds = new Set<number>();

        // 调用物理特效：玻璃碎裂 / 金属磁力 / 冰球滑动 / 火球冲击
        stepSpecialEffects(worldNow, emojiMapRef.current);

        // 更新还在世界中的 emoji 位置
        bodies.forEach((b) => {
          aliveIds.add(b.id);
          const dom = emojiMapRef.current.get(b.id);
          if (dom) {
            dom.style.left = b.position.x + "px";
            dom.style.top = b.position.y + "px";
          }
        });

        // 清理已经被移出世界的 body 对应 DOM
        emojiMapRef.current.forEach((dom, id) => {
          if (!aliveIds.has(id)) {
            dom.remove();
            emojiMapRef.current.delete(id);
          }
        });
      }

      animationId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
      cancelAnimationFrame(animationId);
      emojiMapRef.current.forEach((dom) => dom.remove());
      emojiMapRef.current.clear();
    };
  }, []);

  /**
   * 天气事件：有新值就触发一次
   */
  useEffect(() => {
    if (!pendingWeather) return;
    const engine = getEngine();
    if (!engine) return;
    triggerWeather(engine.world, pendingWeather);
    onWeatherConsumed();
  }, [pendingWeather, onWeatherConsumed]);

  return (
      <>
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
        />
        <div
            ref={emojiLayerRef}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
        />
      </>
  );
};

export default GameCanvas;