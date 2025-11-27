/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description: 游戏页面容器，负责管理当前物体类型和天气状态，并将其传递给画布和 UI
 */
import React, { useState } from "react";
import GameCanvas from "../components/GameCanvas";
import UI from "../components/UI";

export type BallType = "fire" | "ice" | "glass" | "rubber" | "metal" | "custom";
export type WeatherType = "fire_rain" | "water_rain" | "rainbow_sky" | "storm" | null;

const Game: React.FC = () => {
  // 当前选择的物体类型
  const [currentType, setCurrentType] = useState<BallType>("fire");
  // 当前触发的天气事件（一次触发后立即清空）
  const [pendingWeather, setPendingWeather] = useState<WeatherType>(null);

  return (
    <>
      <GameCanvas
        currentType={currentType}
        pendingWeather={pendingWeather}
        onWeatherConsumed={() => setPendingWeather(null)}
      />
      <UI
        currentType={currentType}
        onTypeChange={setCurrentType}
        onWeatherTrigger={setPendingWeather}
      />
    </>
  );
};

export default Game;
