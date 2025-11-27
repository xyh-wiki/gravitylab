/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description: 封装 Matter.js 物理引擎初始化与全局 Engine 获取
 */
import Matter from "matter-js";

let engine: Matter.Engine | null = null;
let render: Matter.Render | null = null;

/**
 * 初始化物理引擎与渲染器
 */
export const initEngine = (canvas: HTMLCanvasElement): void => {
  engine = Matter.Engine.create();

  render = Matter.Render.create({
    canvas,
    engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: "#000000",
    },
  });

  const world = engine.world;

  // 地面
  const ground = Matter.Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight - 20,
    window.innerWidth,
    40,
    {
      isStatic: true,
      render: {
        fillStyle: "#111111",
      },
    }
  );

  Matter.World.add(world, ground);

  Matter.Engine.run(engine);
  Matter.Render.run(render);
};

/**
 * 获取全局 Engine
 */
export const getEngine = (): Matter.Engine | null => engine;
