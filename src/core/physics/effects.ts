/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description:
 *  特效逻辑：
 *   - 玻璃球高速运动时碎裂成小碎片（碎片不会再次碎裂）
 *   - 金属球之间产生轻微磁力吸引
 *   - 冰球在接近地面时向两侧滑动
 *   - 火球对周围球施加轻微向上冲击
 */

import Matter from "matter-js";
import type { BallType } from "../../pages/Game";

/**
 * 扩展插件数据：
 *  - type: 普通球类型 或 glass_frag（玻璃碎片）
 */
interface PluginData {
    type: BallType | "glass_frag";
    emoji: string;
    // 标记是否为碎片（只读语义，不强制使用）
    isFragment?: boolean;
}

// 全局上限，防止物体数量过多卡死
const MAX_BODIES = 600;

/**
 * 每帧调用一次，处理所有特殊效果
 */
export const stepSpecialEffects = (
    world: Matter.World,
    emojiMap: Map<number, HTMLDivElement>
): void => {
    const bodies = Matter.Composite.allBodies(world);

    // 如果数量已经很多了，只做轻量效果，不再制造新碎片
    const tooManyBodies = bodies.length > MAX_BODIES;

    const glassBodies: Matter.Body[] = [];
    const metalBodies: Matter.Body[] = [];
    const iceBodies: Matter.Body[] = [];
    const fireBodies: Matter.Body[] = [];

    for (const b of bodies) {
        const plugin = (b as any).plugin as PluginData | undefined;
        if (!plugin) continue;

        // 注意：glass_frag 不参与玻璃“再次碎裂”的逻辑
        if (plugin.type === "glass") {
            glassBodies.push(b);
        } else if (plugin.type === "metal") {
            metalBodies.push(b);
        } else if (plugin.type === "ice") {
            iceBodies.push(b);
        } else if (plugin.type === "fire") {
            fireBodies.push(b);
        }
    }

    // 1) 玻璃球碎裂：速度过大时打碎（但当前体数量不能太多）
    if (!tooManyBodies && glassBodies.length > 0) {
        const toRemove: Matter.Body[] = [];
        const fragments: Matter.Body[] = [];

        for (const b of glassBodies) {
            const speed = Matter.Vector.magnitude(b.velocity);
            if (speed > 8) {
                toRemove.push(b);

                // 生成若干碎片（小光点），但标记为 glass_frag，后续不会再次碎裂
                const count = 6;
                for (let i = 0; i < count; i++) {
                    const fragment = Matter.Bodies.circle(
                        b.position.x + (Math.random() - 0.5) * 12,
                        b.position.y + (Math.random() - 0.5) * 12,
                        5,
                        {
                            restitution: 0.7,
                            friction: 0.1,
                            density: 0.0003,
                            render: {
                                fillStyle: "#ffeefc",
                                strokeStyle: "#ffb3f0",
                                lineWidth: 1,
                            },
                        }
                    );
                    (fragment as any).plugin = {
                        type: "glass_frag", // ✅ 碎片类型，不再参与碎裂逻辑
                        emoji: "✨",
                        isFragment: true,
                    } as PluginData;
                    fragments.push(fragment);
                }
            }
        }

        if (toRemove.length > 0) {
            for (const b of toRemove) {
                Matter.World.remove(world, b);
                // 同时移除对应 emoji
                const dom = emojiMap.get(b.id);
                if (dom) dom.remove();
                emojiMap.delete(b.id);
            }
            Matter.World.add(world, fragments);
        }
    }

    // 2) 金属球“磁力”互相吸引（轻微）
    const maxPairs = 40; // 限制计算量
    let pairCount = 0;
    for (let i = 0; i < metalBodies.length; i++) {
        for (let j = i + 1; j < metalBodies.length; j++) {
            if (pairCount++ > maxPairs) break;
            const a = metalBodies[i];
            const b = metalBodies[j];
            const dx = b.position.x - a.position.x;
            const dy = b.position.y - a.position.y;
            const distSq = dx * dx + dy * dy;
            if (distSq <= 1) continue;
            const dist = Math.sqrt(distSq);
            if (dist > 260) continue; // 距离太远忽略

            const forceMag = 0.0000025 * (1 / dist);
            const fx = (dx / dist) * forceMag;
            const fy = (dy / dist) * forceMag;

            Matter.Body.applyForce(a, a.position, { x: fx, y: fy });
            Matter.Body.applyForce(b, b.position, { x: -fx, y: -fy });
        }
    }

    // 3) 冰球：接近地面时，稍微向随机方向滑动
    const groundY = window.innerHeight - 40;
    for (const b of iceBodies) {
        if (b.position.y > groundY - 10) {
            const dir = Math.random() > 0.5 ? 1 : -1;
            Matter.Body.applyForce(b, b.position, {
                x: dir * 0.0005,
                y: 0,
            });
        }
    }

    // 4) 火球：对附近的球施加轻微向上推力
    if (fireBodies.length > 0) {
        for (const f of fireBodies) {
            for (const b of bodies) {
                if (b === f) continue;
                const dx = b.position.x - f.position.x;
                const dy = b.position.y - f.position.y;
                const distSq = dx * dx + dy * dy;
                if (distSq > 160 * 160) continue;
                Matter.Body.applyForce(b, b.position, {
                    x: 0,
                    y: -0.0004,
                });
            }
        }
    }
};