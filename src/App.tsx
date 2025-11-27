/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description:
 *  应用根组件
 *  - 顶部 HeaderHero：网站 Hero + 导航 + About/How/FAQ 文案
 *  - TutorialOverlay：新手英文引导遮罩层（首次进入时出现一次）
 *  - Game：GravityLab 核心游戏画布
 */

import React, { useEffect, useState } from "react";
import Game from "./pages/Game";
import TutorialOverlay from "./components/TutorialOverlay";
import HeaderHero from "./components/HeaderHero";

const App: React.FC = () => {
    // 是否展示新手教程
    const [showTutorial, setShowTutorial] = useState(false);

    useEffect(() => {
        // 只在首次访问时展示一次新手教程
        const hasSeen = localStorage.getItem("gravitylab_tutorial_seen");
        if (!hasSeen) {
            setShowTutorial(true);
            localStorage.setItem("gravitylab_tutorial_seen", "1");
        }
    }, []);

    return (
        <div
            className="app-root"
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#000000"
            }}
        >
            {/* 游戏主画布（在最底层） */}
            <Game />

            {/* 顶部 Hero + 导航 + 文案/FAQ 面板（中间层） */}
            <HeaderHero />

            {/* 新手教程遮罩层（最上层） */}
            {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />}
        </div>
    );
};

export default App;