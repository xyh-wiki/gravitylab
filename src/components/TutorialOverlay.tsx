/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description: 新手引导遮罩层，简单说明基础操作（点击关闭）
 */
import React from "react";

interface TutorialOverlayProps {
  onClose: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          padding: "24px 32px",
          borderRadius: 18,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          maxWidth: 420,
          textAlign: "center",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        <h2 style={{ marginBottom: 12, fontSize: 18 }}>👋 GravityLab</h2>
        <p>• Click / tap to spawn emoji balls.</p>
        <p>• Switch object type using the top row toolbar.</p>
        <p>• Trigger global weather on the second row (fire rain, water rain, rainbow, storm).</p>
        <p style={{ marginTop: 12, opacity: 0.8 }}>
          Tap anywhere to start.
        </p>
      </div>
    </div>
  );
};

export default TutorialOverlay;
