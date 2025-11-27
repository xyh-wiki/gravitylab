/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description: 物体工厂，统一管理各种球体类型（火球、冰球、玻璃、橡胶、金属、自定义）
 */
import Matter from "matter-js";
import type { BallType } from "../../pages/Game";

/**
 * 每种类型的物理参数配置
 */
interface BallConfig {
  radius: number;
  restitution: number;
  friction: number;
  density: number;
  fillStyle: string;
  strokeStyle: string;
  emoji: string;
}

const BALL_CONFIG: Record<BallType, BallConfig> = {
  fire: {
    radius: 20,
    restitution: 0.9,
    friction: 0.2,
    density: 0.001,
    fillStyle: "#ffb347",
    strokeStyle: "#ff7b00",
    emoji: "🔥",
  },
  ice: {
    radius: 20,
    restitution: 0.2,
    friction: 0.0,
    density: 0.0008,
    fillStyle: "#9dd9ff",
    strokeStyle: "#4aaaf0",
    emoji: "❄️",
  },
  glass: {
    radius: 20,
    restitution: 0.4,
    friction: 0.1,
    density: 0.0009,
    fillStyle: "#d9c4ff",
    strokeStyle: "#a188ff",
    emoji: "🔮",
  },
  rubber: {
    radius: 20,
    restitution: 1.1,
    friction: 0.2,
    density: 0.0007,
    fillStyle: "#6ee16e",
    strokeStyle: "#1fbf4a",
    emoji: "🟢",
  },
  metal: {
    radius: 22,
    restitution: 0.1,
    friction: 0.8,
    density: 0.002,
    fillStyle: "#c0c6d1",
    strokeStyle: "#8b929e",
    emoji: "⚙️",
  },
  custom: {
    radius: 24,
    restitution: 0.6,
    friction: 0.3,
    density: 0.0012,
    fillStyle: "#f9c8ff",
    strokeStyle: "#f08ddf",
    emoji: "🎨",
  },
};

/**
 * 在指定坐标创建指定类型的小球，并添加到世界
 */
export const createBall = (
  world: Matter.World,
  x: number,
  y: number,
  type: BallType
): Matter.Body => {
  const cfg = BALL_CONFIG[type];

  const body = Matter.Bodies.circle(x, y, cfg.radius, {
    restitution: cfg.restitution,
    friction: cfg.friction,
    density: cfg.density,
    render: {
      fillStyle: cfg.fillStyle,
      strokeStyle: cfg.strokeStyle,
      lineWidth: 3,
    },
  });

  (body as any).plugin = {
    type,
    emoji: cfg.emoji,
  };

  Matter.World.add(world, body);
  return body;
};
