/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description:
 *  右下角悬浮双层工具栏 UI（可折叠 + 自定义 Hover 英文提示）
 *  - 第一行：物体类型（Fire / Ice / Glass / Rubber / Metal / Custom）
 *  - 第二行：天气事件（Fire Rain / Water Rain / Rainbow Sky / Storm）
 */

import React, { useState } from "react";
import type { BallType, WeatherType } from "../pages/Game";

interface UIProps {
    currentType: BallType;
    onTypeChange: (type: BallType) => void;
    onWeatherTrigger: (weather: WeatherType) => void;
}

// 物体类型
const OBJECT_BUTTONS: {
    type: BallType;
    label: string;
    emoji: string;
    hint: string;
}[] = [
    { type: "fire", label: "Fire", emoji: "🔥", hint: "Spawn bouncy fire balls." },
    { type: "ice", label: "Ice", emoji: "❄️", hint: "Spawn low-friction ice balls." },
    { type: "glass", label: "Glass", emoji: "🔮", hint: "Fragile glass balls that can shatter." },
    { type: "rubber", label: "Rubber", emoji: "🟢", hint: "Super bouncy rubber balls." },
    { type: "metal", label: "Metal", emoji: "⚙️", hint: "Heavy metal balls with magnetic pull." },
    { type: "custom", label: "Custom", emoji: "🎨", hint: "Custom-style balls." },
];

// 天气
const WEATHER_BUTTONS: {
    type: WeatherType;
    label: string;
    emoji: string;
    hint: string;
}[] = [
    {
        type: "fire_rain",
        label: "Fire Rain",
        emoji: "🔥",
        hint: "Drop a shower of fire balls from the sky.",
    },
    {
        type: "water_rain",
        label: "Water Rain",
        emoji: "💧",
        hint: "Drop a shower of ice/water balls.",
    },
    {
        type: "rainbow_sky",
        label: "Rainbow Sky",
        emoji: "🌈",
        hint: "Spawn random colorful emoji balls in the air.",
    },
    {
        type: "storm",
        label: "Storm",
        emoji: "🌪️",
        hint: "Apply a strong wind force to all balls.",
    },
];

const UI: React.FC<UIProps> = ({
                                   currentType,
                                   onTypeChange,
                                   onWeatherTrigger,
                               }) => {
    // 工具栏折叠状态
    const [collapsed, setCollapsed] = useState<boolean>(false);
    // 当前 hover 的提示文案
    const [tooltip, setTooltip] = useState<string | null>(null);

    // 折叠状态：右下角一个小按钮
    if (collapsed) {
        return (
            <div
                style={{
                    position: "absolute",
                    right: "calc(env(safe-area-inset-right, 0px) + 16px)",
                    bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
                    zIndex: 20,
                    pointerEvents: "none",
                }}
            >
                <button
                    onClick={() => setCollapsed(false)}
                    style={{
                        pointerEvents: "auto",
                        appearance: "none",
                        WebkitAppearance: "none",
                        border: "none",
                        borderRadius: 999,
                        padding: "6px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        cursor: "pointer",
                        fontSize: 12,
                        background: "rgba(0,0,0,0.7)",
                        color: "#ffffff",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.6)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <span>🎛</span>
                    <span>Tools</span>
                </button>
            </div>
        );
    }

    // 展开状态：右下角悬浮双层面板 + 顶部 Tooltip
    return (
        <div
            style={{
                position: "absolute",
                right: "calc(env(safe-area-inset-right, 0px) + 16px)",
                bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
                zIndex: 20,
                pointerEvents: "none",
            }}
        >
            {/* 整个面板容器 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 6,
                    pointerEvents: "auto",
                }}
            >
                {/* 自绘 Tooltip：显示当前按钮的 hint */}
                {tooltip && (
                    <div
                        style={{
                            maxWidth: 220,
                            marginBottom: 4,
                            padding: "6px 10px",
                            borderRadius: 8,
                            background: "rgba(0,0,0,0.85)",
                            color: "#ffffff",
                            fontSize: 11,
                            lineHeight: 1.4,
                            boxShadow: "0 4px 14px rgba(0,0,0,0.6)",
                            pointerEvents: "none",
                        }}
                    >
                        {tooltip}
                    </div>
                )}

                {/* 折叠按钮（小 ×） */}
                <div
                    style={{
                        alignSelf: "flex-end",
                        marginBottom: 2,
                    }}
                >
                    <button
                        onClick={() => setCollapsed(true)}
                        style={{
                            appearance: "none",
                            WebkitAppearance: "none",
                            border: "none",
                            borderRadius: 999,
                            width: 22,
                            height: 22,
                            cursor: "pointer",
                            fontSize: 12,
                            lineHeight: "22px",
                            textAlign: "center",
                            background: "rgba(0,0,0,0.75)",
                            color: "#ffffff",
                        }}
                        onMouseEnter={() => setTooltip("Hide tools panel")}
                        onMouseLeave={() => setTooltip(null)}
                    >
                        ×
                    </button>
                </div>

                {/* 物体类型工具栏 */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        gap: 8,
                        padding: "8px 12px",
                        borderRadius: 16,
                        background: "rgba(0,0,0,0.7)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.55)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    {OBJECT_BUTTONS.map((btn) => {
                        const active = btn.type === currentType;
                        return (
                            <button
                                key={btn.type}
                                onClick={() => onTypeChange(btn.type)}
                                onMouseEnter={() => setTooltip(btn.hint)}
                                onMouseLeave={() => setTooltip(null)}
                                style={{
                                    appearance: "none",
                                    WebkitAppearance: "none",
                                    outline: "none",
                                    border: "none",
                                    borderRadius: 12,
                                    padding: "6px 8px",
                                    minWidth: 52,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: 12,
                                    background: active
                                        ? "rgba(255,255,255,0.22)"
                                        : "rgba(255,255,255,0.10)",
                                    color: "#ffffff",
                                    boxShadow: active
                                        ? "0 0 0 1px rgba(255,255,255,0.85)"
                                        : "none",
                                    transition: "background 0.15s ease, transform 0.1s ease",
                                }}
                                onMouseDown={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.transform =
                                        "scale(0.96)";
                                }}
                                onMouseUp={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.transform =
                                        "scale(1)";
                                }}
                                onMouseLeaveCapture={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.transform =
                                        "scale(1)";
                                }}
                            >
                                <span style={{ fontSize: 18, lineHeight: 1 }}>{btn.emoji}</span>
                                <span style={{ fontSize: 10, marginTop: 2 }}>{btn.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 天气工具栏 */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                        gap: 8,
                        padding: "6px 10px",
                        borderRadius: 14,
                        background: "rgba(0,0,0,0.7)",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    {WEATHER_BUTTONS.map((btn) => (
                        <button
                            key={btn.type || "none"}
                            onClick={() => btn.type && onWeatherTrigger(btn.type)}
                            onMouseEnter={() => setTooltip(btn.hint)}
                            onMouseLeave={() => setTooltip(null)}
                            style={{
                                appearance: "none",
                                WebkitAppearance: "none",
                                outline: "none",
                                border: "none",
                                borderRadius: 10,
                                padding: "4px 8px",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                cursor: "pointer",
                                fontSize: 11,
                                background: "rgba(255,255,255,0.12)",
                                color: "#ffffff",
                                whiteSpace: "nowrap",
                                transition: "background 0.15s ease, transform 0.1s ease",
                            }}
                            onMouseDown={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.transform =
                                    "scale(0.96)";
                            }}
                            onMouseUp={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.transform =
                                    "scale(1)";
                            }}
                            onMouseLeaveCapture={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.transform =
                                    "scale(1)";
                            }}
                        >
                            <span>{btn.emoji}</span>
                            <span>{btn.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UI;