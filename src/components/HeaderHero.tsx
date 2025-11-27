/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description:
 *  GravityLab 顶部 Hero + 导航栏组件（增强版）
 *  - 顶部固定 Hero：标题 + 简要描述
 *  - 导航按钮：About / How to play / FAQ / Play now
 *  - How to play 中加入详细玩法攻略：基础操作、各材质特性、天气效果、推荐玩法挑战
 */

import React, { useState } from "react";

type InfoSection = "none" | "about" | "how" | "faq";

const HeaderHero: React.FC = () => {
    const [activeSection, setActiveSection] = useState<InfoSection>("none");

    const toggleSection = (section: InfoSection) => {
        setActiveSection((prev) => (prev === section ? "none" : section));
    };

    return (
        <>
            {/* 顶部 Hero / 导航条 */}
            <header
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 56,
                    padding: "0 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.0))",
                    color: "#ffffff",
                    zIndex: 10,
                    pointerEvents: "auto",
                }}
            >
                {/* 左侧标题 + 副标题 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        maxWidth: "60%",
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontSize: 18,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                        }}
                    >
                        GravityLab — relaxing physics sandbox
                    </h1>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 11,
                            opacity: 0.9,
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                        }}
                    >
                        Click or tap to spawn emoji balls and play with gravity on
                        gravity.xyh.wiki.
                    </p>
                </div>

                {/* 右侧导航按钮 */}
                <nav
                    aria-label="GravityLab navigation"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 11,
                    }}
                >
                    <button
                        onClick={() => toggleSection("about")}
                        style={navButtonStyle(activeSection === "about")}
                    >
                        About
                    </button>
                    <button
                        onClick={() => toggleSection("how")}
                        style={navButtonStyle(activeSection === "how")}
                    >
                        How to play
                    </button>
                    <button
                        onClick={() => toggleSection("faq")}
                        style={navButtonStyle(activeSection === "faq")}
                    >
                        FAQ
                    </button>
                    <button
                        onClick={() => setActiveSection("none")}
                        style={{
                            ...navButtonStyle(false),
                            padding: "5px 10px",
                            fontWeight: 600,
                            background: "rgba(255,255,255,0.18)",
                        }}
                    >
                        Play now
                    </button>
                </nav>
            </header>

            {/* 文案 / 攻略面板 */}
            {activeSection !== "none" && (
                <section
                    style={{
                        position: "absolute",
                        top: 56,
                        left: 16,
                        width: "min(380px, 62vw)",
                        maxHeight: 280,
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: "rgba(0,0,0,0.78)",
                        color: "#ffffff",
                        fontSize: 12,
                        lineHeight: 1.5,
                        zIndex: 9,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.65)",
                        backdropFilter: "blur(12px)",
                        overflowY: "auto",
                        pointerEvents: "auto",
                    }}
                >
                    {activeSection === "about" && (
                        <div id="about">
                            <h2 style={{ fontSize: 13, margin: "0 0 6px 0" }}>About</h2>
                            <p style={{ margin: "0 0 6px 0" }}>
                                GravityLab is a small but addictive physics toy hosted on
                                <strong> gravity.xyh.wiki</strong>. You can click or tap
                                anywhere on the screen to spawn emoji balls, then choose
                                different materials such as fire, ice, glass, rubber or metal
                                and trigger global effects like fire rain, water rain, rainbow
                                sky or storm.
                            </p>
                            <p style={{ margin: 0 }}>
                                The game is designed as a simple stress relief and sandbox
                                experimentation tool. There is no score, no timer and no
                                pressure – you just watch gravity and physics create satisfying
                                patterns.
                            </p>
                        </div>
                    )}

                    {activeSection === "how" && (
                        <div id="how-to-play">
                            <h2 style={{ fontSize: 13, margin: "0 0 6px 0" }}>
                                Basic controls
                            </h2>
                            <ul style={{ paddingLeft: 18, margin: "0 0 8px 0" }}>
                                <li>Click or tap anywhere to spawn balls at that position.</li>
                                <li>
                                    Use the tools panel in the bottom-right corner to choose the
                                    current material type.
                                </li>
                                <li>
                                    Use the second row in the tools panel to trigger global
                                    events like fire rain, water rain, rainbow sky or storm.
                                </li>
                                <li>
                                    On mobile, simply tap the screen with one finger — all tools
                                    work with touch.
                                </li>
                            </ul>

                            <h2 style={{ fontSize: 13, margin: "0 0 4px 0" }}>
                                Material types & behavior
                            </h2>
                            <ul style={{ paddingLeft: 18, margin: "0 0 8px 0" }}>
                                <li>
                                    <strong>Fire 🔥</strong> – Bouncy balls that slightly push
                                    nearby balls upward, great for “explosions”.
                                </li>
                                <li>
                                    <strong>Ice ❄️</strong> – Low-friction balls that slide more
                                    when they touch the ground.
                                </li>
                                <li>
                                    <strong>Glass 🔮</strong> – Fragile balls that can shatter
                                    into shiny fragments when they move too fast and hit
                                    something.
                                </li>
                                <li>
                                    <strong>Rubber 🟢</strong> – Super bouncy balls, perfect for
                                    dense bouncing piles.
                                </li>
                                <li>
                                    <strong>Metal ⚙️</strong> – Heavy balls with a slight
                                    magnetic pull, slowly clustering together.
                                </li>
                                <li>
                                    <strong>Custom 🎨</strong> – Special emoji-style balls for
                                    fun patterns and screenshots.
                                </li>
                            </ul>

                            <h2 style={{ fontSize: 13, margin: "0 0 4px 0" }}>
                                Weather & global effects
                            </h2>
                            <ul style={{ paddingLeft: 18, margin: "0 0 8px 0" }}>
                                <li>
                                    <strong>Fire Rain</strong> – Drops a shower of fire balls from
                                    the top of the screen.
                                </li>
                                <li>
                                    <strong>Water Rain</strong> – Drops lots of ice/water-like
                                    balls to fill the scene.
                                </li>
                                <li>
                                    <strong>Rainbow Sky</strong> – Spawns random colorful emoji
                                    balls in the air for a party-like mood.
                                </li>
                                <li>
                                    <strong>Storm</strong> – Applies a strong sideways wind to all
                                    balls, bending the whole scene.
                                </li>
                            </ul>

                            <h2 style={{ fontSize: 13, margin: "0 0 4px 0" }}>
                                Suggested play styles & mini challenges
                            </h2>
                            <ul style={{ paddingLeft: 18, margin: 0 }}>
                                <li>
                                    <strong>Zen mode:</strong> Pick one material (for example,
                                    glass), drop balls slowly and just watch them settle.
                                </li>
                                <li>
                                    <strong>Chain reaction:</strong> Build a dense pile of glass
                                    balls, then drop a heavy metal ball from high above and watch
                                    everything shatter.
                                </li>
                                <li>
                                    <strong>Magnetic cluster:</strong> Spawn only metal balls on
                                    one side, then trigger a storm to blow them across the screen
                                    and let them re-cluster.
                                </li>
                                <li>
                                    <strong>Color painting:</strong> Use custom balls and rainbow
                                    sky to “paint” a corner of the screen, then use fire rain or
                                    storm to erase and restart.
                                </li>
                                <li>
                                    <strong>Mobile finger drawing:</strong> On a phone or tablet,
                                    drag your finger while tapping to create falling trails of
                                    balls and capture screenshots.
                                </li>
                            </ul>
                        </div>
                    )}

                    {activeSection === "faq" && (
                        <div id="faq">
                            <h2 style={{ fontSize: 13, margin: "0 0 6px 0" }}>FAQ</h2>
                            <p style={{ margin: "0 0 4px 0" }}>
                                <strong>Is GravityLab free?</strong> – Yes, it is completely
                                free to play in your browser.
                            </p>
                            <p style={{ margin: "0 0 4px 0" }}>
                                <strong>Does GravityLab work on mobile?</strong> – Yes, it
                                supports touch controls. Tap to spawn balls and use the tools
                                panel to switch materials and effects.
                            </p>
                            <p style={{ margin: "0 0 4px 0" }}>
                                <strong>Is there any goal or score?</strong> – No. GravityLab is
                                a pure sandbox focused on relaxation and visual experiments with
                                physics. You play at your own pace.
                            </p>
                            <p style={{ margin: "0 0 4px 0" }}>
                                <strong>Can I share screenshots?</strong> – Absolutely. Feel
                                free to capture your favorite patterns or explosions and share
                                them anywhere.
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong>Who made GravityLab?</strong> – The game is developed
                                and maintained by XYH as part of the gravity.xyh.wiki and
                                relax-game.xyh.wiki collection of relaxing web tools and games.
                            </p>
                        </div>
                    )}
                </section>
            )}
        </>
    );
};

const navButtonStyle = (active: boolean): React.CSSProperties => ({
    appearance: "none",
    WebkitAppearance: "none",
    border: "none",
    borderRadius: 999,
    padding: "4px 8px",
    fontSize: 11,
    cursor: "pointer",
    background: active
        ? "rgba(255,255,255,0.24)"
        : "rgba(255,255,255,0.10)",
    color: "#ffffff",
    whiteSpace: "nowrap",
});

export default HeaderHero;