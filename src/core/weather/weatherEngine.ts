/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description: 天气系统：火焰雨 / 水雨 / 彩虹天空 / 暴风
 */
import Matter from "matter-js";
import type { WeatherType } from "../../pages/Game";
import { createBall } from "../objects/ballFactory";

/**
 * 触发一个天气事件
 * - fire_rain: 从顶部生成大量火球
 * - water_rain: 从顶部生成大量冰球（模拟水滴）
 * - rainbow_sky: 随机生成多彩小球
 * - storm: 给所有物体施加强风力
 */
export const triggerWeather = (
  world: Matter.World,
  weather: WeatherType
): void => {
  if (!weather) return;

  switch (weather) {
    case "fire_rain": {
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * window.innerWidth;
        const y = -50 - Math.random() * 200;
        createBall(world, x, y, "fire");
      }
      break;
    }
    case "water_rain": {
      for (let i = 0; i < 70; i++) {
        const x = Math.random() * window.innerWidth;
        const y = -50 - Math.random() * 200;
        createBall(world, x, y, "ice");
      }
      break;
    }
    case "rainbow_sky": {
      const types: ("fire" | "ice" | "glass" | "rubber" | "metal" | "custom")[] = [
        "fire",
        "ice",
        "glass",
        "rubber",
        "metal",
        "custom",
      ];
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;
        const t = types[Math.floor(Math.random() * types.length)];
        createBall(world, x, y, t);
      }
      break;
    }
    case "storm": {
      const bodies = Matter.Composite.allBodies(world);
      const dir = Math.random() > 0.5 ? 1 : -1;
      bodies.forEach((b) => {
        Matter.Body.applyForce(b, b.position, {
          x: dir * 0.002,
          y: -0.0005,
        });
      });
      break;
    }
    default:
      break;
  }
};
