(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/PLINKO/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BALL_RADIUS",
    ()=>BALL_RADIUS,
    "BUCKET_HEIGHT",
    ()=>BUCKET_HEIGHT,
    "CHUTE_RADIUS",
    ()=>CHUTE_RADIUS,
    "COLORS",
    ()=>COLORS,
    "MULTIPLIERS",
    ()=>MULTIPLIERS,
    "PEG_RADIUS",
    ()=>PEG_RADIUS,
    "PHYSICS",
    ()=>PHYSICS,
    "ROWS",
    ()=>ROWS
]);
const PEG_RADIUS = 3;
const BALL_RADIUS = 7;
const ROWS = 15;
const BUCKET_HEIGHT = 15;
const CHUTE_RADIUS = 6;
const COLORS = {
    PEG: 'rgb(28, 39, 58)',
    GREEN: '#AFFC41',
    YELLOW: '#4392F1',
    RED: '#FF331F',
    BG_START: 'rgb(6, 19, 22)',
    BG_END: 'rgb(0, 191, 165)',
    UI_ACCENT: 'rgb(87, 250, 37)',
    UI_PANEL: 'rgb(5, 50, 57)',
    BALL_GREEN: '#AFFC41',
    BALL_YELLOW: '#4392F1',
    BALL_RED: '#FF331F'
};
const PHYSICS = {
    GRAVITY: 1,
    ENGINE_ITERATIONS: 25,
    BALL_DENSITY: 0.05,
    BALL_RESTITUTION: 1.1,
    BALL_FRICTION: 0.005,
    BALL_FRICTION_STATIC: 0.005,
    BALL_FRICTION_AIR: 0.05,
    PEG_RESTITUTION: 2,
    PEG_FRICTION: 0,
    SPAWN_RANGE_X: 3,
    INITIAL_V_X_VARIANCE: 0.8,
    INITIAL_V_Y: 0,
    COLLISION_JITTER: 1.5,
    SLOP: 0
};
const MULTIPLIERS = {
    GREEN: [
        18,
        3.2,
        1.6,
        1.3,
        1.2,
        1.1,
        1,
        0.5,
        1,
        1.1,
        1.2,
        1.3,
        1.6,
        3.2,
        18
    ],
    YELLOW: [
        55,
        12,
        5.6,
        3.2,
        1.6,
        1,
        0.7,
        0.2,
        0.7,
        1,
        1.6,
        3.2,
        5.6,
        12,
        55
    ],
    RED: [
        353,
        49,
        14,
        5.3,
        2.1,
        0.5,
        0.2,
        0,
        0.2,
        0.5,
        2.1,
        5.3,
        14,
        49,
        353
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CollisionLabel",
    ()=>CollisionLabel
]);
var CollisionLabel = /*#__PURE__*/ function(CollisionLabel) {
    CollisionLabel["BALL"] = "BALL";
    CollisionLabel["PEG"] = "PEG";
    CollisionLabel["BUCKET"] = "BUCKET";
    return CollisionLabel;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/PlinkoGame.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/matter-js/build/matter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
// Collision categories to prevent ball-ball interactions (like online Plinko games)
const COLLISION_CATEGORIES = {
    BALL: 0x0001,
    PEG: 0x0002,
    BUCKET: 0x0004,
    WALL: 0x0008 // Category for walls (if any)
};
const PlinkoGame = ({ onScore, lastDrop, soundEnabled, isAutoDrop })=>{
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const engineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const renderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dimensions, setDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    const ballsToRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const activeHits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const pegHits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map()); // Track single hits
    const [backgroundLoaded, setBackgroundLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Store scaled values for use in other effects
    const scaledValuesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        ballRadius: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BALL_RADIUS"],
        pegRadius: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEG_RADIUS"],
        chuteRadius: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHUTE_RADIUS"],
        boardOffsetX: 0,
        boardWidth: 0,
        dropY: 0
    });
    // Sound effects with Web Audio API for smooth playback
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioBuffers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    // Initialize Web Audio API context and preload sounds
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoGame.useEffect": ()=>{
            const initAudio = {
                "PlinkoGame.useEffect.initAudio": async ()=>{
                    try {
                        // Create audio context
                        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                        // Load and decode audio files
                        const loadAudio = {
                            "PlinkoGame.useEffect.initAudio.loadAudio": async (url, key)=>{
                                try {
                                    console.log(`Loading audio: ${key} from ${url}`);
                                    const response = await fetch(url);
                                    if (!response.ok) {
                                        throw new Error(`Failed to fetch ${url}: ${response.status}`);
                                    }
                                    const arrayBuffer = await response.arrayBuffer();
                                    console.log(`Decoding audio: ${key}, size: ${arrayBuffer.byteLength} bytes`);
                                    const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
                                    audioBuffers.current.set(key, audioBuffer);
                                    console.log(`Successfully loaded: ${key}, duration: ${audioBuffer.duration}s`);
                                } catch (error) {
                                    console.error(`Failed to load audio ${key}:`, error);
                                }
                            }
                        }["PlinkoGame.useEffect.initAudio.loadAudio"];
                        await Promise.all([
                            loadAudio('/ui/sounds/positive.wav', 'bucket'),
                            loadAudio('/ui/sounds/negative.wav', 'negative'),
                            loadAudio('/ui/sounds/drop.wav', 'drop')
                        ]);
                        console.log('Audio loading complete. Loaded buffers:', Array.from(audioBuffers.current.keys()));
                    } catch (error) {
                        console.warn('Audio initialization failed:', error);
                    }
                }
            }["PlinkoGame.useEffect.initAudio"];
            initAudio();
            // Resume audio context on user interaction (critical for mobile)
            const resumeAudio = {
                "PlinkoGame.useEffect.resumeAudio": async ()=>{
                    if (audioContextRef.current) {
                        if (audioContextRef.current.state === 'suspended') {
                            await audioContextRef.current.resume();
                            console.log('Audio context resumed');
                        }
                        // Play a silent sound to "unlock" audio on iOS
                        try {
                            const silentBuffer = audioContextRef.current.createBuffer(1, 1, 22050);
                            const source = audioContextRef.current.createBufferSource();
                            source.buffer = silentBuffer;
                            source.connect(audioContextRef.current.destination);
                            source.start(0);
                            console.log('Silent sound played to unlock audio');
                        } catch (e) {
                            console.log('Silent sound failed:', e);
                        }
                    }
                }
            }["PlinkoGame.useEffect.resumeAudio"];
            // Add both mouse and touch events for better mobile support
            document.addEventListener('click', resumeAudio);
            document.addEventListener('touchstart', resumeAudio, {
                once: true
            });
            document.addEventListener('keydown', resumeAudio);
            return ({
                "PlinkoGame.useEffect": ()=>{
                    document.removeEventListener('click', resumeAudio);
                    document.removeEventListener('touchstart', resumeAudio);
                    document.removeEventListener('keydown', resumeAudio);
                }
            })["PlinkoGame.useEffect"];
        }
    }["PlinkoGame.useEffect"], []);
    const playSound = (soundKey, volume = 0.3, duration, pitch = 1.0)=>{
        if (!soundEnabled || !audioContextRef.current || !audioBuffers.current.has(soundKey)) return;
        // Ensure audio context is running (critical for mobile)
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
        try {
            const audioBuffer = audioBuffers.current.get(soundKey);
            const source = audioContextRef.current.createBufferSource();
            const gainNode = audioContextRef.current.createGain();
            source.buffer = audioBuffer;
            source.playbackRate.value = pitch; // Apply pitch shifting
            gainNode.gain.value = volume;
            // Use custom duration or full buffer duration
            const playDuration = duration || audioBuffer.duration;
            // Add fade in/out to prevent clicks - longer fades for smoother playback
            const now = audioContextRef.current.currentTime;
            const fadeInTime = 0; // 15ms fade in
            const fadeOutTime = 0.025; // 25ms fade out
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(volume, now + fadeInTime);
            // Hold volume, then fade out before the end
            if (playDuration > fadeInTime + fadeOutTime) {
                gainNode.gain.setValueAtTime(volume, now + playDuration - fadeOutTime);
                gainNode.gain.linearRampToValueAtTime(0, now + playDuration);
            } else {
                // If duration is too short, just do a quick fade out
                gainNode.gain.linearRampToValueAtTime(0, now + playDuration);
            }
            source.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);
            // Start and stop at specified duration
            source.start(0);
            if (duration) {
                source.stop(now + duration);
            }
        } catch (error) {
            // Fallback to simple Audio if Web Audio API fails
            console.warn('Web Audio API failed, using fallback');
            try {
                let audioPath = '';
                if (soundKey === 'bucket') audioPath = '/ui/sounds/positive.wav';
                else if (soundKey === 'negative') audioPath = '/ui/sounds/negative.wav';
                else if (soundKey === 'drop') audioPath = '/ui/sounds/drop.wav';
                if (audioPath) {
                    const audio = new Audio(audioPath);
                    audio.volume = volume;
                    audio.play().catch(()=>{});
                }
            } catch (fallbackError) {
            // Silently fail
            }
        }
    };
    const playBucketHitSound = ()=>playSound('bucket', 0.25);
    const playNegativeSound = ()=>playSound('negative', 0.25);
    const playDropSound = ()=>playSound('drop', 0.08);
    // Dynamic board dimensions that scale with available space
    const BOARD_HEIGHT = Math.max(200, Math.min(dimensions.height * 0.6, dimensions.width * 0.6)); // 70% of height or proportional to width
    const BOARD_WIDTH = BOARD_HEIGHT; // Keep square aspect ratio
    const BOARD_START_Y = 0; // Adjusted starting position
    // Center the board in the available space
    const boardOffsetX = Math.max(0, (dimensions.width - BOARD_WIDTH) / 2);
    const boardOffsetY = Math.max(10, (dimensions.height - BOARD_HEIGHT) / 2);
    const startY = BOARD_START_Y + boardOffsetY;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoGame.useEffect": ()=>{
            if (!containerRef.current) return;
            const resizeObserver = new ResizeObserver({
                "PlinkoGame.useEffect": (entries)=>{
                    for (const entry of entries){
                        const { width, height } = entry.contentRect;
                        setDimensions({
                            width,
                            height
                        });
                    }
                }
            }["PlinkoGame.useEffect"]);
            resizeObserver.observe(containerRef.current);
            return ({
                "PlinkoGame.useEffect": ()=>resizeObserver.disconnect()
            })["PlinkoGame.useEffect"];
        }
    }["PlinkoGame.useEffect"], []);
    // Load background image
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoGame.useEffect": ()=>{
            const img = new Image();
            img.src = '/ui/Pulse Branding/Banner/Dark/minimal.png';
            img.onload = ({
                "PlinkoGame.useEffect": ()=>{
                    setBackgroundLoaded(true);
                    console.log('Background image loaded successfully');
                }
            })["PlinkoGame.useEffect"];
            img.onerror = ({
                "PlinkoGame.useEffect": ()=>{
                    console.error('Failed to load background image');
                }
            })["PlinkoGame.useEffect"];
        }
    }["PlinkoGame.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoGame.useEffect": ()=>{
            if (!canvasRef.current || dimensions.width === 0) return;
            const engine = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Engine.create({
                gravity: {
                    x: 0,
                    y: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].GRAVITY
                },
                positionIterations: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].ENGINE_ITERATIONS,
                velocityIterations: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].ENGINE_ITERATIONS
            });
            engineRef.current = engine;
            const render = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Render.create({
                element: containerRef.current,
                canvas: canvasRef.current,
                engine: engine,
                options: {
                    width: dimensions.width,
                    height: dimensions.height,
                    wireframes: false,
                    background: 'transparent'
                }
            });
            renderRef.current = render;
            // Dynamic peg spacing that scales with board size
            const pegGapX = BOARD_WIDTH / 10.833; // Proportional horizontal spacing (24/260 ratio)
            const pegGapY = BOARD_HEIGHT / 14.444; // Proportional vertical spacing (18/260 ratio)
            // Scale radii proportionally with board size (base reference: 260px board)
            const scaleFactor = BOARD_HEIGHT / 260;
            const scaledPegRadius = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEG_RADIUS"] * scaleFactor;
            const scaledBallRadius = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BALL_RADIUS"] * scaleFactor;
            const scaledChuteRadius = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHUTE_RADIUS"] * scaleFactor;
            // Discs fall from above the top row (considering scaled peg radius)
            const dropY = startY - scaledPegRadius - 1;
            // Store scaled values in ref for use in other effects
            scaledValuesRef.current = {
                ballRadius: scaledBallRadius,
                pegRadius: scaledPegRadius,
                chuteRadius: scaledChuteRadius,
                boardOffsetX,
                boardWidth: BOARD_WIDTH,
                dropY
            };
            const pegs = [];
            for(let r = 0; r < __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"]; r++){
                const rowY = startY + r * pegGapY;
                const rowPegCount = r + 2;
                const rowWidth = (rowPegCount - 1) * pegGapX;
                const startX = boardOffsetX + (BOARD_WIDTH - rowWidth) / 2; // Center in fixed board
                for(let c = 0; c < rowPegCount; c++){
                    const x = startX + c * pegGapX;
                    pegs.push(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.circle(x, rowY, scaledPegRadius, {
                        isStatic: true,
                        label: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].PEG,
                        restitution: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].PEG_RESTITUTION,
                        friction: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].PEG_FRICTION,
                        slop: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].SLOP,
                        collisionFilter: {
                            category: COLLISION_CATEGORIES.PEG,
                            mask: COLLISION_CATEGORIES.BALL // Pegs only collide with balls
                        },
                        render: {
                            fillStyle: 'transparent',
                            strokeStyle: 'transparent',
                            lineWidth: 0
                        }
                    }));
                }
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].World.add(engine.world, pegs);
            const bucketCount = 15;
            const bucketWidth = pegGapX; // Same spacing as pegs for consistent look
            const bucketsTotalWidth = bucketCount * bucketWidth;
            const bucketsStartX = boardOffsetX + (BOARD_WIDTH - bucketsTotalWidth) / 2;
            const bucketBaseY = startY + (__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] + 1) * pegGapY - BOARD_HEIGHT / 10.833; // Scaled offset (24/260 ratio)
            // Create 3 rows of bucket sensors (one for each risk tier)
            const tiers = [
                'GREEN',
                'YELLOW',
                'RED'
            ];
            const tierHeight = BOARD_HEIGHT / 14.444; // Scaled bucket height (18/260 ratio)
            const tierGap = BOARD_HEIGHT / 130; // Scaled gap (2/260 ratio)
            tiers.forEach({
                "PlinkoGame.useEffect": (tier, tierIdx)=>{
                    const tierY = bucketBaseY + tierIdx * (tierHeight + tierGap);
                    for(let i = 0; i < bucketCount; i++){
                        const x = bucketsStartX + i * bucketWidth + bucketWidth / 2;
                        const sensor = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.rectangle(x, tierY + tierHeight / 2, bucketWidth, tierHeight, {
                            isStatic: true,
                            isSensor: true,
                            label: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].BUCKET,
                            plugin: {
                                index: i,
                                tier: tier
                            },
                            collisionFilter: {
                                category: COLLISION_CATEGORIES.BUCKET,
                                mask: COLLISION_CATEGORIES.BALL // Buckets only collide with balls
                            },
                            render: {
                                fillStyle: 'transparent'
                            }
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].World.add(engine.world, sensor);
                    }
                }
            }["PlinkoGame.useEffect"]);
            __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Events.on(engine, 'collisionStart', {
                "PlinkoGame.useEffect": (event)=>{
                    event.pairs.forEach({
                        "PlinkoGame.useEffect": (pair)=>{
                            const { bodyA, bodyB } = pair;
                            const ball = bodyA.label === __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].BALL ? bodyA : bodyB.label === __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].BALL ? bodyB : null;
                            const peg = bodyA.label === __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].PEG ? bodyA : bodyB.label === __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].PEG ? bodyB : null;
                            const bucket = bodyA.label === __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].BUCKET ? bodyA : bodyB.label === __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].BUCKET ? bodyB : null;
                            if (ball && peg) {
                                // Track peg hit for animation - only if not already animating
                                const existingHitTime = pegHits.current.get(peg.id);
                                if (!existingHitTime) {
                                    // First hit - start animation
                                    pegHits.current.set(peg.id, Date.now());
                                }
                            // Don't restart animation if peg is already glowing
                            }
                            if (ball && bucket && !ballsToRemove.current.has(ball)) {
                                const index = bucket.plugin.index;
                                const tier = bucket.plugin.tier; // Get tier from bucket sensor
                                const ballRisk = ball.plugin.risk; // Get ball's risk level
                                // Only activate bucket if ball risk matches bucket tier
                                if (ballRisk === tier) {
                                    const multiplier = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MULTIPLIERS"][tier][index];
                                    activeHits.current.set(`${tier}-${index}`, Date.now());
                                    onScore(multiplier);
                                    ballsToRemove.current.add(ball);
                                    // Play appropriate sound based on multiplier
                                    if (multiplier > 1) {
                                        playBucketHitSound();
                                    } else if (multiplier < 1) {
                                        playNegativeSound();
                                    }
                                }
                            }
                        }
                    }["PlinkoGame.useEffect"]);
                }
            }["PlinkoGame.useEffect"]);
            // Draw background and elements "Behind" the balls
            __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Events.on(render, 'beforeRender', {
                "PlinkoGame.useEffect": ()=>{
                    const ctx = render.context;
                    if (!ctx) return;
                    const chuteX = boardOffsetX + BOARD_WIDTH / 2;
                    const chuteY = dropY - 2; // Offset slightly for aesthetics
                    ctx.save();
                    // Outer rim
                    ctx.beginPath();
                    ctx.arc(chuteX, chuteY, scaledChuteRadius + 2, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.fill();
                    // Deep dark hole
                    ctx.beginPath();
                    ctx.arc(chuteX, chuteY, scaledChuteRadius, 0, Math.PI * 2);
                    const grad = ctx.createRadialGradient(chuteX, chuteY, 0, chuteX, chuteY, scaledChuteRadius);
                    grad.addColorStop(0, '#000000');
                    grad.addColorStop(0.8, '#0a0a0a');
                    grad.addColorStop(1, '#1a1a1a');
                    ctx.fillStyle = grad;
                    ctx.fill();
                    // Inner shadow/depth
                    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.restore();
                }
            }["PlinkoGame.useEffect"]);
            __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Events.on(render, 'afterRender', {
                "PlinkoGame.useEffect": ()=>{
                    const ctx = render.context;
                    if (!ctx) return;
                    const now = Date.now();
                    // Draw all pegs
                    const pegs = engine.world.bodies.filter({
                        "PlinkoGame.useEffect.pegs": (body)=>body.label === __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].PEG
                    }["PlinkoGame.useEffect.pegs"]);
                    // First pass: Clean up expired peg hits BEFORE drawing
                    pegHits.current.forEach({
                        "PlinkoGame.useEffect": (hitTime, pegId)=>{
                            const elapsed = now - hitTime;
                            if (elapsed >= 2900) {
                                pegHits.current.delete(pegId);
                            }
                        }
                    }["PlinkoGame.useEffect"]);
                    // Draw non-hit pegs in batch for better performance
                    pegs.forEach({
                        "PlinkoGame.useEffect": (peg)=>{
                            if (!pegHits.current.has(peg.id)) {
                                ctx.save();
                                // Add shadow for depth
                                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                                ctx.shadowBlur = 4 * scaleFactor;
                                ctx.shadowOffsetX = 1 * scaleFactor;
                                ctx.shadowOffsetY = 1 * scaleFactor;
                                // Draw white peg
                                ctx.fillStyle = '#FFFFFF';
                                ctx.beginPath();
                                ctx.arc(peg.position.x, peg.position.y, scaledPegRadius, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                            }
                        }
                    }["PlinkoGame.useEffect"]);
                    // Draw hit pegs with white glow animation
                    pegs.forEach({
                        "PlinkoGame.useEffect": (peg)=>{
                            const hitTime = pegHits.current.get(peg.id);
                            if (!hitTime) return;
                            const elapsed = now - hitTime;
                            ctx.save();
                            // Add shadow for depth
                            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                            ctx.shadowBlur = 4 * scaleFactor;
                            ctx.shadowOffsetX = 1 * scaleFactor;
                            ctx.shadowOffsetY = 1 * scaleFactor;
                            // Draw base peg with white color
                            ctx.fillStyle = '#FFFFFF';
                            ctx.beginPath();
                            ctx.arc(peg.position.x, peg.position.y, scaledPegRadius, 0, Math.PI * 2);
                            ctx.fill();
                            // Reset shadow for glow
                            ctx.shadowColor = 'transparent';
                            ctx.shadowBlur = 0;
                            ctx.shadowOffsetX = 0;
                            ctx.shadowOffsetY = 0;
                            // Draw simple white glow with fade in/out
                            // Calculate opacity with short fade in (150ms) and long fade out
                            let glowOpacity = 0;
                            if (elapsed < 150) {
                                // Quick fade in
                                glowOpacity = elapsed / 150;
                            } else if (elapsed < 400) {
                                // Full opacity in the middle
                                glowOpacity = 1.0;
                            } else if (elapsed < 2900) {
                                // Long fade out (2500ms)
                                glowOpacity = 1.0 - (elapsed - 400) / 2500;
                            }
                            // Clamp opacity to valid range
                            glowOpacity = Math.max(0, Math.min(1, glowOpacity));
                            // Apply white glow with opacity (only if visible)
                            if (glowOpacity > 0.01) {
                                // Draw outer glow
                                ctx.shadowColor = `rgba(255, 255, 255, ${glowOpacity * 0.8})`;
                                ctx.shadowBlur = 10 * glowOpacity * scaleFactor;
                                ctx.fillStyle = `rgba(255, 255, 255, ${glowOpacity * 0.6})`;
                                ctx.beginPath();
                                ctx.arc(peg.position.x, peg.position.y, scaledPegRadius + 2 * scaleFactor, 0, Math.PI * 2);
                                ctx.fill();
                            }
                            ctx.restore();
                        }
                    }["PlinkoGame.useEffect"]);
                    // Draw ball trails (fading neon effect)
                    const balls = engine.world.bodies.filter({
                        "PlinkoGame.useEffect.balls": (body)=>body.label === __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].BALL
                    }["PlinkoGame.useEffect.balls"]);
                    balls.forEach({
                        "PlinkoGame.useEffect": (ball)=>{
                            // Store trail positions for this ball
                            if (!ball.plugin.trail) {
                                ball.plugin.trail = [];
                            }
                            // Add current position to trail
                            ball.plugin.trail.push({
                                x: ball.position.x,
                                y: ball.position.y,
                                timestamp: now
                            });
                            // Keep only recent positions (last 8 positions, ~200ms)
                            if (ball.plugin.trail.length > 8) {
                                ball.plugin.trail.shift();
                            }
                            // Remove old positions
                            ball.plugin.trail = ball.plugin.trail.filter({
                                "PlinkoGame.useEffect": (pos)=>now - pos.timestamp < 200
                            }["PlinkoGame.useEffect"]);
                            // Draw trail with decreasing opacity
                            ball.plugin.trail.forEach({
                                "PlinkoGame.useEffect": (pos, index)=>{
                                    const age = now - pos.timestamp;
                                    const opacity = Math.max(0.1, 1 - age / 200); // Fade over 200ms
                                    const trailRadius = scaledBallRadius * (0.8 - index * 0.05); // Shrink trail
                                    if (trailRadius > 0 && opacity > 0.05) {
                                        ctx.save();
                                        ctx.globalAlpha = opacity * 0.3; // Make trail semi-transparent
                                        // Get ball color for trail
                                        const trailColor = ball.plugin.risk === 'GREEN' ? __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BALL_GREEN : ball.plugin.risk === 'YELLOW' ? __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BALL_YELLOW : __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BALL_RED;
                                        // Create trail gradient
                                        const trailGradient = ctx.createRadialGradient(pos.x - trailRadius * 0.3, pos.y - trailRadius * 0.3, 0, pos.x, pos.y, trailRadius);
                                        // Parse RGB for trail color
                                        const rgbMatch = trailColor.match(/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/);
                                        if (rgbMatch) {
                                            const [_, r, g, b] = rgbMatch.map({
                                                "PlinkoGame.useEffect": (x)=>parseInt(x, 16)
                                            }["PlinkoGame.useEffect"]);
                                            trailGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`);
                                            trailGradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`);
                                            trailGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${opacity * 0.1})`);
                                        }
                                        // Draw trail
                                        ctx.fillStyle = trailGradient;
                                        ctx.beginPath();
                                        ctx.arc(pos.x, pos.y, trailRadius, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                }
                            }["PlinkoGame.useEffect"]);
                        }
                    }["PlinkoGame.useEffect"]);
                    // Draw balls with gradient fills (on top of trails)
                    balls.forEach({
                        "PlinkoGame.useEffect": (ball)=>{
                            ctx.save();
                            // Create radial gradient for ball fill
                            const gradient = ctx.createRadialGradient(ball.position.x - scaledBallRadius * 0.3, ball.position.y - scaledBallRadius * 0.3, 0, ball.position.x, ball.position.y, scaledBallRadius);
                            // Get ball color and create gradient
                            const ballColor = ball.plugin.risk === 'GREEN' ? __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BALL_GREEN : ball.plugin.risk === 'YELLOW' ? __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BALL_YELLOW : __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BALL_RED;
                            // Parse RGB values from ball color
                            const rgbMatch = ballColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                            if (rgbMatch) {
                                const [_, r, g, b] = rgbMatch;
                                // Create gradient: center (lighter), middle, edge (darker)
                                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`); // Center - bright
                                gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.7)`); // Middle
                                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.4)`); // Edge - darker
                            }
                            // Fill ball with gradient
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(ball.position.x, ball.position.y, scaledBallRadius, 0, Math.PI * 2);
                            ctx.fill();
                            // Add subtle stroke for definition
                            ctx.strokeStyle = ballColor;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            ctx.restore();
                        }
                    }["PlinkoGame.useEffect"]);
                    // Bucket Multipliers Rendering - Professional Clean Layout
                    const tiers = [
                        'GREEN',
                        'YELLOW',
                        'RED'
                    ];
                    const tierColors = {
                        GREEN: {
                            normal: '#AFFC41',
                            dark: '#8CE63A'
                        },
                        YELLOW: {
                            normal: '#4392F1',
                            dark: '#2A6BC8'
                        },
                        RED: {
                            normal: '#FF331F',
                            dark: '#D12822'
                        }
                    };
                    tiers.forEach({
                        "PlinkoGame.useEffect": (tier, tIdx)=>{
                            const tierHeight = BOARD_HEIGHT / 14.444; // Scaled bucket height
                            const tierGap = BOARD_HEIGHT / 100; // Scaled gap
                            const yBase = bucketBaseY + tIdx * (tierHeight + tierGap);
                            const mults = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MULTIPLIERS"][tier];
                            const tierColor = tierColors[tier];
                            mults.forEach({
                                "PlinkoGame.useEffect": (m, i)=>{
                                    const x = bucketsStartX + i * bucketWidth;
                                    const bW = bucketWidth - 0.5; // Minimal gap
                                    const bH = tierHeight;
                                    let scale = 1.0;
                                    let glowIntensity = 0;
                                    const hitKey = `${tier}-${i}`;
                                    const hitTime = activeHits.current.get(hitKey);
                                    if (hitTime) {
                                        const elapsed = now - hitTime;
                                        if (elapsed < 350) {
                                            scale = 1.0 + Math.sin(elapsed / 350 * Math.PI) * 0.15; // Zoom animation
                                        }
                                        if (elapsed < 1500) {
                                            glowIntensity = 1.0 - elapsed / 1500;
                                        } else {
                                            activeHits.current.delete(hitKey);
                                        }
                                    }
                                    const finalBW = bW * scale;
                                    const finalBH = bH * scale;
                                    const offsetX = (finalBW - bW) / 2;
                                    const offsetY = (finalBH - bH) / 2;
                                    ctx.save();
                                    // Solid color background - darker for multipliers under 1
                                    const isDark = m < 1;
                                    const bgColor = isDark ? tierColor.dark : tierColor.normal;
                                    // Glow effect when hit
                                    if (glowIntensity > 0) {
                                        ctx.shadowBlur = 15 * glowIntensity;
                                        ctx.shadowColor = `rgba(255, 255, 255, ${glowIntensity * 0.8})`;
                                    }
                                    // Draw bucket - sharp corners, no rounding
                                    ctx.fillStyle = bgColor;
                                    ctx.fillRect(x - offsetX, yBase - offsetY, finalBW, finalBH);
                                    // Draw multiplier text - clean and simple
                                    ctx.shadowBlur = 0;
                                    ctx.fillStyle = '#000000'; // Black text for maximum legibility
                                    ctx.font = `bold ${Math.min(9, bW / 2.5) * scale}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(m.toString(), x + bW / 2, yBase + bH / 2);
                                    ctx.restore();
                                }
                            }["PlinkoGame.useEffect"]);
                        }
                    }["PlinkoGame.useEffect"]);
                    if (ballsToRemove.current.size > 0) {
                        ballsToRemove.current.forEach({
                            "PlinkoGame.useEffect": (ball)=>__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].World.remove(engine.world, ball)
                        }["PlinkoGame.useEffect"]);
                        ballsToRemove.current.clear();
                    }
                }
            }["PlinkoGame.useEffect"]);
            const runner = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Runner.create();
            __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Runner.run(runner, engine);
            __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Render.run(render);
            return ({
                "PlinkoGame.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Render.stop(render);
                    __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Runner.stop(runner);
                    __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Engine.clear(engine);
                }
            })["PlinkoGame.useEffect"];
        }
    }["PlinkoGame.useEffect"], [
        dimensions
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoGame.useEffect": ()=>{
            if (!lastDrop || !engineRef.current) return;
            const risk = lastDrop.risk;
            const ballColor = risk === 'GREEN' ? __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BALL_GREEN : risk === 'YELLOW' ? __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BALL_YELLOW : __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLORS"].BALL_RED;
            // Use scaled values from ref
            const { ballRadius, boardOffsetX, boardWidth, dropY } = scaledValuesRef.current;
            // Spawn centered within the fixed board with narrow spread
            const spawnX = boardOffsetX + boardWidth / 2 + (Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].SPAWN_RANGE_X - __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].SPAWN_RANGE_X / 2);
            const initialVelX = (Math.random() - 0.5) * __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].INITIAL_V_X_VARIANCE;
            const ball = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.circle(spawnX, dropY, ballRadius, {
                restitution: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].BALL_RESTITUTION,
                friction: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].BALL_FRICTION,
                frictionStatic: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].BALL_FRICTION_STATIC,
                frictionAir: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].BALL_FRICTION_AIR,
                density: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].BALL_DENSITY,
                label: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollisionLabel"].BALL,
                slop: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].SLOP,
                plugin: {
                    risk
                },
                collisionFilter: {
                    category: COLLISION_CATEGORIES.BALL,
                    mask: COLLISION_CATEGORIES.PEG | COLLISION_CATEGORIES.BUCKET // Balls don't collide with other balls
                },
                render: {
                    visible: false // We'll draw balls manually with gradients
                }
            });
            // Give them a downward velocity so they don't just sit on the top peg
            __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Body.setVelocity(ball, {
                x: initialVelX,
                y: __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHYSICS"].INITIAL_V_Y
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].World.add(engineRef.current.world, ball);
            // Play drop sound when ball is released (but not during auto-drop)
            if (!isAutoDrop) {
                playDropSound();
            }
        }
    }["PlinkoGame.useEffect"], [
        lastDrop,
        isAutoDrop
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "w-full h-full relative",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef
        }, void 0, false, {
            fileName: "[project]/PLINKO/components/PlinkoGame.tsx",
            lineNumber: 752,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/PlinkoGame.tsx",
        lineNumber: 748,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PlinkoGame, "gVcPWsY0ttrCCHIthSZGPATlQno=");
_c = PlinkoGame;
const __TURBOPACK__default__export__ = PlinkoGame;
var _c;
__turbopack_context__.k.register(_c, "PlinkoGame");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const Dialog = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const DialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const DialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const DialogClose = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"];
const DialogOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/dialog.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c = DialogOverlay;
DialogOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const DialogContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/PLINKO/components/ui/dialog.tsx",
                lineNumber: 35,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/components/ui/dialog.tsx",
                                lineNumber: 46,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/components/ui/dialog.tsx",
                                lineNumber: 47,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/PLINKO/components/ui/dialog.tsx",
                        lineNumber: 45,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/PLINKO/components/ui/dialog.tsx",
                lineNumber: 36,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/PLINKO/components/ui/dialog.tsx",
        lineNumber: 34,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = DialogContent;
DialogContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const DialogHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = DialogHeader;
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/dialog.tsx",
        lineNumber: 72,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = DialogFooter;
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c5 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/dialog.tsx",
        lineNumber: 86,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c6 = DialogTitle;
DialogTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c7 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/dialog.tsx",
        lineNumber: 101,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c8 = DialogDescription;
DialogDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "DialogOverlay");
__turbopack_context__.k.register(_c1, "DialogContent$React.forwardRef");
__turbopack_context__.k.register(_c2, "DialogContent");
__turbopack_context__.k.register(_c3, "DialogHeader");
__turbopack_context__.k.register(_c4, "DialogFooter");
__turbopack_context__.k.register(_c5, "DialogTitle$React.forwardRef");
__turbopack_context__.k.register(_c6, "DialogTitle");
__turbopack_context__.k.register(_c7, "DialogDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const Tabs = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const TabsList = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/tabs.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = TabsList;
TabsList.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"].displayName;
const TabsTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/tabs.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = TabsTrigger;
TabsTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const TabsContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/tabs.tsx",
        lineNumber: 42,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = TabsContent;
TabsContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "TabsList$React.forwardRef");
__turbopack_context__.k.register(_c1, "TabsList");
__turbopack_context__.k.register(_c2, "TabsTrigger$React.forwardRef");
__turbopack_context__.k.register(_c3, "TabsTrigger");
__turbopack_context__.k.register(_c4, "TabsContent$React.forwardRef");
__turbopack_context__.k.register(_c5, "TabsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/HowToPlayModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HowToPlayModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/dialog.tsx [app-client] (ecmascript)");
'use client';
;
;
function HowToPlayModal({ open, onOpenChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[700px] bg-white max-h-[80vh] overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "text-3xl font-bold text-gray-900 text-center",
                        children: "How to Play Plinko"
                    }, void 0, false, {
                        fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900",
                                    children: "Welcome to Plinko!"
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                    lineNumber: 29,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-700 leading-relaxed",
                                    children: "Plinko is an exciting game of chance where you drop balls down a peg-filled board and watch them bounce unpredictably to land in prize buckets at the bottom."
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 bg-green-50 rounded-lg p-4 border-2 border-green-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900",
                                    children: "Game Rules"
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                    className: "list-decimal list-inside space-y-2 text-gray-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Set Your Wager:"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 41,
                                                    columnNumber: 17
                                                }, this),
                                                " Choose how much you want to bet per ball drop (minimum $0.10)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 40,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Select Risk Level:"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 17
                                                }, this),
                                                " Pick from three risk tiers:",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "ml-8 mt-1 space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "text-green-600",
                                                                    children: "Low Risk (Green):"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                                    lineNumber: 46,
                                                                    columnNumber: 23
                                                                }, this),
                                                                " Safer play with more consistent payouts"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                            lineNumber: 46,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "text-yellow-600",
                                                                    children: "Medium Risk (Yellow):"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                                    lineNumber: 47,
                                                                    columnNumber: 23
                                                                }, this),
                                                                " Balanced risk and reward"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                            lineNumber: 47,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "text-red-600",
                                                                    children: "High Risk (Red):"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                                    lineNumber: 48,
                                                                    columnNumber: 23
                                                                }, this),
                                                                " Higher volatility with bigger potential wins"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                            lineNumber: 48,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 45,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Drop the Ball:"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 52,
                                                    columnNumber: 17
                                                }, this),
                                                " Click your chosen risk button to release a ball down the board"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Watch It Fall:"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 55,
                                                    columnNumber: 17
                                                }, this),
                                                " The ball bounces off pegs randomly as it descends"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "leading-relaxed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Collect Your Prize:"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 17
                                                }, this),
                                                " When the ball lands in a bucket, you win the multiplier shown times your wager"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900",
                                    children: "Features"
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 rounded-lg p-3 border border-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold text-gray-900 mb-1",
                                                    children: "Auto-Drop"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-700",
                                                    children: "Set up automatic ball drops with customizable settings for extended play"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 rounded-lg p-3 border border-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold text-gray-900 mb-1",
                                                    children: "Quick Wagers"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-700",
                                                    children: "Use ½ and 2× buttons to quickly adjust your bet amount"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 rounded-lg p-3 border border-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold text-gray-900 mb-1",
                                                    children: "History Tracking"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-700",
                                                    children: "View your recent multipliers in the top bar to track your luck"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 rounded-lg p-3 border border-gray-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold text-gray-900 mb-1",
                                                    children: "Sound Effects"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-700",
                                                    children: "Customize peg sounds or turn them off in Settings"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 bg-blue-50 rounded-lg p-4 border-2 border-blue-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900",
                                    children: "Pro Tips"
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2 text-gray-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-blue-600 font-bold mr-2",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Start with lower wagers to get a feel for the game mechanics"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-blue-600 font-bold mr-2",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Edge buckets often have higher multipliers but are harder to hit"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-blue-600 font-bold mr-2",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Use Auto-Drop for a hands-free experience with your preferred risk level"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-blue-600 font-bold mr-2",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Keep an eye on your balance and bet responsibly"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center pt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-semibold text-gray-900",
                                children: "Ready to play? Good luck! 🎯"
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/HowToPlayModal.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = HowToPlayModal;
var _c;
__turbopack_context__.k.register(_c, "HowToPlayModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/MainNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$HowToPlayModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/HowToPlayModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function MainNav({ balance, soundEnabled, onSoundToggle, history, onShowExtendedHistory }) {
    _s();
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [howToPlayOpen, setHowToPlayOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "fixed top-0 left-0 right-0 backdrop-blur-sm z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-2 py-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-white shadow-lg font-bold",
                                        children: "PLINKO"
                                    }, void 0, false, {
                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onShowExtendedHistory,
                                                className: "w-7 h-7 rounded-full bg-gradient-to-b from-green-500 via-green-600 to-gray-800 border-b-4 border-gray-900 shadow-xl shadow-gray-900/80 hover:from-gray-400 hover:via-gray-500 hover:to-gray-700 hover:shadow-gray-900/90 hover:border-gray-800 active:shadow-inner active:shadow-gray-900/60 active:border-gray-900 active:scale-95 transition-all duration-75 text-white flex items-center justify-center flex-shrink-0",
                                                title: "View extended history",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: "fas fa-history text-[10px]"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                    lineNumber: 56,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 51,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1 overflow-x-auto no-scrollbar scroll-smooth max-w-[200px]",
                                                children: history.length > 0 ? history.slice(0, 4).map((item, index)=>{
                                                    // Determine color based on risk level and multiplier
                                                    let bgColor = '';
                                                    const isDark = item.multiplier < 1;
                                                    if (item.risk === 'GREEN') {
                                                        bgColor = isDark ? 'bg-[rgb(100,140,45)]' : 'bg-[rgb(140,185,60)]';
                                                    } else if (item.risk === 'YELLOW') {
                                                        bgColor = isDark ? 'bg-[rgb(20,100,200)]' : 'bg-[rgb(30,144,255)]';
                                                    } else if (item.risk === 'RED') {
                                                        bgColor = isDark ? 'bg-[rgb(160,35,35)]' : 'bg-[rgb(210,50,50)]';
                                                    }
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `${index === 0 ? 'history-item-enter' : ''} ${bgColor} px-1.5 py-0.5 text-[10px] font-black min-w-fit text-white transition-all duration-300`,
                                                        children: [
                                                            item.multiplier,
                                                            "x"
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 23
                                                    }, this);
                                                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[9px] text-white/60 font-bold uppercase tracking-wide px-1 italic",
                                                    children: "Waiting..."
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 58,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-0 px-2 py-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white font-black text-[13px] px-2 py-0.5 tracking-tight",
                                                children: balance.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white/80 text-[13px] font-black px-1.5 py-0.5",
                                                children: "USD"
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 94,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setMenuOpen(!menuOpen),
                                                className: "w-9 h-9 flex flex-col items-center justify-center gap-[5px] transition-all active:scale-95",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-[3px] bg-white rounded-full shadow-[0_2px_6px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-[3px] bg-white rounded-full shadow-[0_2px_6px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-[3px] bg-white rounded-full shadow-[0_2px_6px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this),
                                            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "fixed inset-0 z-40",
                                                        onClick: ()=>setMenuOpen(false)
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute right-0 top-12 w-48 bg-black/15 backdrop-blur-md rounded-lg shadow-[0_8px_0_0_rgba(34,197,94,0.4)] border border-white/10 z-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "px-3 py-2 border-b border-white/10",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white/30 font-bold text-sm",
                                                                    children: "PLINKO"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                    lineNumber: 121,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                lineNumber: 120,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "py-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            setMenuOpen(false);
                                                                        },
                                                                        className: "w-full px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium",
                                                                        children: "Home"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                        lineNumber: 126,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            setHowToPlayOpen(true);
                                                                            setMenuOpen(false);
                                                                        },
                                                                        className: "w-full px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium",
                                                                        children: "How to Play"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                        lineNumber: 134,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            setMenuOpen(false);
                                                                        },
                                                                        className: "w-full px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium",
                                                                        children: "Buy"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                        lineNumber: 143,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            setSettingsOpen(true);
                                                                            setMenuOpen(false);
                                                                        },
                                                                        className: "w-full px-3 py-2 text-left text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium",
                                                                        children: "Settings"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                        lineNumber: 151,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "px-3 py-2 border-t border-white/10 mt-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center justify-between",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-white/70 text-xs font-medium",
                                                                                    children: "Sound"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                                    lineNumber: 164,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: onSoundToggle,
                                                                                    className: `relative w-10 h-5 rounded-full transition-all duration-300 ${soundEnabled ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-gray-600 to-gray-700'} shadow-lg`,
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: `absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${soundEnabled ? 'left-[22px]' : 'left-0.5'}`,
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                            className: `fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'} text-[7px] ${soundEnabled ? 'text-green-600' : 'text-gray-600'}`
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                                            lineNumber: 178,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                                        lineNumber: 173,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                                    lineNumber: 165,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                            lineNumber: 163,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                        lineNumber: 162,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/PLINKO/components/MainNav.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: settingsOpen,
                onOpenChange: setSettingsOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-[600px] bg-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-2xl font-bold text-gray-900",
                                children: "Settings"
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/PLINKO/components/MainNav.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                            defaultValue: "visual",
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                    className: "grid w-full grid-cols-3 bg-gray-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "visual",
                                            className: "data-[state=active]:bg-gradient-to-b from-blue-600 to-blue-800 data-[state=active]:text-white font-semibold",
                                            children: "Visual"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/MainNav.tsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "autodrop",
                                            className: "data-[state=active]:bg-gradient-to-b from-blue-600 to-blue-800 data-[state=active]:text-white font-semibold",
                                            children: "Auto-drop"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/MainNav.tsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "agreement",
                                            className: "data-[state=active]:bg-gradient-to-b from-blue-600 to-blue-800 data-[state=active]:text-white font-semibold",
                                            children: "Agreement"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/MainNav.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                    value: "visual",
                                    className: "space-y-4 py-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "Visual Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 226,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "Visual settings coming soon..."
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                        lineNumber: 225,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                    value: "autodrop",
                                    className: "space-y-4 py-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "Auto-drop Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 234,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "Auto-drop settings coming soon..."
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 235,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                    value: "agreement",
                                    className: "space-y-4 py-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "User Agreement"
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 242,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "User agreement coming soon..."
                                            }, void 0, false, {
                                                fileName: "[project]/PLINKO/components/MainNav.tsx",
                                                lineNumber: 243,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/PLINKO/components/MainNav.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/MainNav.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/PLINKO/components/MainNav.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/PLINKO/components/MainNav.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$HowToPlayModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: howToPlayOpen,
                onOpenChange: setHowToPlayOpen
            }, void 0, false, {
                fileName: "[project]/PLINKO/components/MainNav.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(MainNav, "6474A1raiMbhpncBkaLUCFHxXAI=");
_c = MainNav;
var _c;
__turbopack_context__.k.register(_c, "MainNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(labelVariants(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/label.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Label;
Label.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Label$React.forwardRef");
__turbopack_context__.k.register(_c1, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/HighPercentageWarningModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HighPercentageWarningModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/button.tsx [app-client] (ecmascript)");
'use client';
;
;
;
const modalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .modal-enter {
    animation: fadeIn 0.4s ease-out, slideIn 0.4s ease-out;
  }
`;
function HighPercentageWarningModal({ open, onOpenChange, onConfirm, onCancel, settings }) {
    // Calculate example progression assuming $1000 balance and 10% increase
    const calculateExample = ()=>{
        if (!settings) return {
            progression: [],
            totalWagered: 0,
            remainingBalance: 1000
        };
        const initialBet = 10.00; // 1% of $1000 balance
        let currentBalance = 1000;
        const progression = [
            {
                bet: initialBet,
                balance: currentBalance,
                result: 'START'
            }
        ];
        for(let i = 0; i < 10; i++){
            const lastEntry = progression[progression.length - 1];
            const currentBet = lastEntry.bet;
            // Simulate alternating wins/losses
            const isWin = i % 2 === 0; // Win on even rounds for variety
            const payoutMultiplier = isWin ? 1.1 : 0; // 10% win or total loss
            // Calculate win/loss amount
            const winAmount = currentBet * payoutMultiplier;
            const netResult = winAmount - currentBet;
            // Update balance
            currentBalance = +(currentBalance + netResult).toFixed(2);
            // Calculate next bet (10% increase regardless of win/loss for this example)
            const nextBet = +(currentBet * 1.10).toFixed(2);
            progression.push({
                bet: nextBet,
                balance: currentBalance,
                result: isWin ? `+$${(winAmount - currentBet).toFixed(2)}` : `-$${currentBet.toFixed(2)}`
            });
        }
        const totalWagered = progression.slice(0, -1).reduce((sum, entry)=>sum + entry.bet, 0);
        return {
            progression,
            totalWagered: +totalWagered.toFixed(2),
            remainingBalance: currentBalance
        };
    };
    const exampleData = calculateExample();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: modalStyles
                }
            }, void 0, false, {
                fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: open,
                onOpenChange: onOpenChange,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-2xl max-h-[85vh] overflow-y-auto modal-enter mx-4",
                    style: {
                        backgroundImage: `url("/ui/pg4.png")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        backgroundBlendMode: 'multiply'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-white text-xl font-bold text-center mb-2",
                                children: "⚠️ HIGH PERCENTAGE WARNING"
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                            lineNumber: 124,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-red-900/80 border border-red-500 rounded-lg p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-white text-sm font-semibold text-center mb-1",
                                            children: "Warning: Setting this higher can lose a significant portion of your funds if you have not set these parameters correctly."
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                            lineNumber: 133,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-yellow-200 text-center text-sm font-medium",
                                            children: 'If you do not have a real strategy, keep this option set to "Return to initial bet".'
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                            lineNumber: 136,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-green-300 text-center font-bold text-sm mt-1",
                                            children: "Play Safe. Play Smart."
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                            lineNumber: 139,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                    lineNumber: 132,
                                    columnNumber: 11
                                }, this),
                                settings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-black/60 border border-yellow-500 rounded-lg p-4 animate-in slide-in-from-bottom-4 duration-500 delay-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-white text-lg font-bold text-center mb-4",
                                            children: "⚠️ DANGER EXAMPLE: $1,000 Balance + 10% Increase Each Round"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "overflow-x-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                className: "w-full text-white text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-b border-yellow-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-left py-1 px-2",
                                                                    children: "Round"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                    lineNumber: 155,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-center py-1 px-2",
                                                                    children: "Bet"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                    lineNumber: 156,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-center py-1 px-2",
                                                                    children: "Result"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                    lineNumber: 157,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-center py-1 px-2",
                                                                    children: "Balance"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                    lineNumber: 158,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    className: "text-center py-1 px-2",
                                                                    children: "Math"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                    lineNumber: 159,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        children: exampleData.progression.slice(0, 6).map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "border-b border-gray-700 hover:bg-gray-800/50 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-2 px-2 font-bold text-xs",
                                                                        children: index === 0 ? 'Start' : `R${index}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                        lineNumber: 165,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-2 px-2 text-center text-yellow-400 font-bold text-xs",
                                                                        children: [
                                                                            "$",
                                                                            entry.bet.toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                        lineNumber: 168,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: `py-2 px-2 text-center font-bold text-xs ${entry.result.startsWith('+') ? 'text-green-400' : entry.result.startsWith('-') ? 'text-red-400' : 'text-blue-400'}`,
                                                                        children: entry.result
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                        lineNumber: 171,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-2 px-2 text-center text-cyan-400 font-bold text-xs",
                                                                        children: [
                                                                            "$",
                                                                            entry.balance.toFixed(2)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                        lineNumber: 177,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-2 px-2 text-center text-xs text-gray-300",
                                                                        children: index === 0 ? 'Initial' : `${exampleData.progression[index - 1].bet.toFixed(2)} × 1.10`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                        lineNumber: 180,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, index, true, {
                                                                fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 grid grid-cols-2 gap-3 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-red-900/60 rounded-lg p-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-red-300 font-bold text-sm",
                                                            children: "Total Wagered"
                                                        }, void 0, false, {
                                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-white font-bold text-lg",
                                                            children: [
                                                                "$",
                                                                exampleData.totalWagered.toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-blue-900/60 rounded-lg p-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-blue-300 font-bold text-sm",
                                                            children: "Final Balance"
                                                        }, void 0, false, {
                                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `font-bold text-lg ${exampleData.remainingBalance > 1000 ? 'text-green-400' : exampleData.remainingBalance < 1000 ? 'text-red-400' : 'text-white'}`,
                                                            children: [
                                                                "$",
                                                                exampleData.remainingBalance.toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-yellow-400 font-semibold text-sm",
                                                    children: "10% increases on $1,000 balance over 10 rounds"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-orange-300 font-medium text-xs mt-1",
                                                    children: "⚠️ Results vary based on wins/losses"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                            lineNumber: 206,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 pt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: onCancel,
                                            variant: "outline",
                                            className: "flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white border-gray-500 text-sm",
                                            children: "Cancel - Go Back"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                            lineNumber: 219,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: onConfirm,
                                            className: "flex-1 py-2 bg-yellow-600 hover:bg-yellow-700 text-black font-bold text-sm",
                                            children: "I Understand - Continue"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                            lineNumber: 226,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                                    lineNumber: 218,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                            lineNumber: 130,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                    lineNumber: 113,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/PLINKO/components/HighPercentageWarningModal.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = HighPercentageWarningModal;
var _c;
__turbopack_context__.k.register(_c, "HighPercentageWarningModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/AutoPlayModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AutoPlayModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$HighPercentageWarningModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/HighPercentageWarningModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AutoPlayModal({ open, onOpenChange, onStart, currentBalance }) {
    _s();
    const [showMoreOptions, setShowMoreOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showWarningModal, setShowWarningModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingSettings, setPendingSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasSeenWarning, setHasSeenWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AutoPlayModal.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                return localStorage.getItem('plinko-high-percentage-warning-seen') === 'true';
            }
            //TURBOPACK unreachable
            ;
        }
    }["AutoPlayModal.useState"]);
    const [showNumpad, setShowNumpad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [numpadTarget, setNumpadTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [numpadValue, setNumpadValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        riskLevel: 'GREEN',
        numberOfRounds: 10,
        stopOnLossEnabled: false,
        stopOnLossAmount: 0,
        stopOnBigWinEnabled: false,
        stopOnBigWinAmount: 0,
        stopOnProfitEnabled: false,
        stopOnProfitAmount: 0,
        onLossStrategy: 'reset',
        onLossPercent: 1,
        onWinStrategy: 'reset',
        onWinPercent: 1
    });
    const roundOptions = [
        3,
        10,
        25,
        50,
        100,
        200
    ];
    const updateSetting = (key, value)=>{
        setSettings((prev)=>({
                ...prev,
                [key]: value
            }));
    };
    const adjustValue = (key, delta)=>{
        setSettings((prev)=>{
            const currentValue = prev[key];
            const newValue = Math.max(0, Math.min(200, currentValue + delta));
            // Check if percentage exceeds 10% and show warning (only once)
            if ((key === 'onLossPercent' || key === 'onWinPercent') && newValue > 10 && !hasSeenWarning) {
                setPendingSettings({
                    ...prev,
                    [key]: newValue
                });
                setShowWarningModal(true);
                return prev; // Don't update the actual settings yet
            }
            return {
                ...prev,
                [key]: key === 'onLossPercent' || key === 'onWinPercent' ? Math.max(0, Math.min(200, newValue)) : Math.max(0, newValue)
            };
        });
    };
    const handleStart = ()=>{
        // Validate settings before starting
        if (settings.numberOfRounds <= 0) {
            alert('Please select a valid number of rounds');
            return;
        }
        // Validate stop conditions have positive amounts when enabled
        if (settings.stopOnLossEnabled && settings.stopOnLossAmount <= 0) {
            alert('Stop on loss amount must be greater than 0');
            return;
        }
        if (settings.stopOnBigWinEnabled && settings.stopOnBigWinAmount <= 0) {
            alert('Stop on big win amount must be greater than 0');
            return;
        }
        if (settings.stopOnProfitEnabled && settings.stopOnProfitAmount <= 0) {
            alert('Stop on profit amount must be greater than 0');
            return;
        }
        // No warning on start - only when adjusting percentages
        onStart(settings);
        onOpenChange(false);
    };
    const handleConfirmHighPercentage = ()=>{
        if (pendingSettings) {
            setSettings(pendingSettings); // Update the actual settings
            setHasSeenWarning(true);
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('plinko-high-percentage-warning-seen', 'true');
            }
            setShowWarningModal(false);
            setPendingSettings(null);
        // Don't close the main modal, just update settings and close warning
        }
    };
    const handleCancelHighPercentage = ()=>{
        setShowWarningModal(false);
        setPendingSettings(null);
    };
    const openNumpad = (target)=>{
        setNumpadTarget(target);
        setNumpadValue(settings[target].toString());
        setShowNumpad(true);
    };
    const handleNumpadConfirm = ()=>{
        if (numpadTarget && numpadValue) {
            const numValue = parseInt(numpadValue);
            if (!isNaN(numValue)) {
                adjustValue(numpadTarget, numValue - settings[numpadTarget]);
            }
        }
        setShowNumpad(false);
        setNumpadTarget(null);
        setNumpadValue('');
    };
    const handleNumpadCancel = ()=>{
        setShowNumpad(false);
        setNumpadTarget(null);
        setNumpadValue('');
    };
    const addNumpadDigit = (digit)=>{
        if (numpadValue.length < 3) {
            setNumpadValue((prev)=>prev + digit);
        }
    };
    const clearNumpad = ()=>{
        setNumpadValue('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: open,
                onOpenChange: onOpenChange,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-[600px] bg-gray-900 border-gray-700 max-h-[90vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-2xl font-bold text-white flex items-center justify-between",
                                children: "AUTO PLAY"
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                            lineNumber: 176,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-gray-400 text-sm mb-3 block",
                                            children: "Bet color"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 185,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateSetting('riskLevel', 'GREEN'),
                                                    className: `p-4 rounded-lg flex items-center gap-3 transition-all ${settings.riskLevel === 'GREEN' ? 'bg-gray-700 ring-2 ring-green-500' : 'bg-gray-800 hover:bg-gray-700'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-3 h-3 rounded-full ${settings.riskLevel === 'GREEN' ? 'bg-green-500' : 'bg-gray-600'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-medium flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-3 h-3 bg-green-500 rounded-full"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 197,
                                                                    columnNumber: 19
                                                                }, this),
                                                                "Green"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateSetting('riskLevel', 'YELLOW'),
                                                    className: `p-4 rounded-lg flex items-center gap-3 transition-all ${settings.riskLevel === 'YELLOW' ? 'bg-gray-700 ring-2 ring-yellow-500' : 'bg-gray-800 hover:bg-gray-700'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-3 h-3 rounded-full ${settings.riskLevel === 'YELLOW' ? 'bg-yellow-500' : 'bg-gray-600'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-medium flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-3 h-3 bg-yellow-500 rounded-full"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 211,
                                                                    columnNumber: 19
                                                                }, this),
                                                                "Yellow"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 186,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateSetting('riskLevel', 'RED'),
                                            className: `w-full mt-3 p-4 rounded-lg flex items-center gap-3 transition-all ${settings.riskLevel === 'RED' ? 'bg-gray-700 ring-2 ring-red-500' : 'bg-gray-800 hover:bg-gray-700'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-3 h-3 rounded-full ${settings.riskLevel === 'RED' ? 'bg-red-500' : 'bg-gray-600'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white font-medium flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-3 h-3 bg-red-500 rounded-full"
                                                        }, void 0, false, {
                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 17
                                                        }, this),
                                                        "Red"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 216,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                    lineNumber: 184,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-gray-400 text-sm mb-3 block",
                                            children: "Number of rounds"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 234,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: roundOptions.map((rounds)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateSetting('numberOfRounds', rounds),
                                                    className: `p-4 rounded-lg transition-all ${settings.numberOfRounds === rounds ? 'bg-gray-700 ring-2 ring-green-500' : 'bg-gray-800 hover:bg-gray-700'}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-3 h-3 rounded-full ${settings.numberOfRounds === rounds ? 'bg-green-500' : 'bg-gray-600'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white font-bold text-lg",
                                                                children: rounds
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 19
                                                    }, this)
                                                }, rounds, false, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 17
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 235,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                    lineNumber: 233,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-800 rounded-lg p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>updateSetting('stopOnLossEnabled', !settings.stopOnLossEnabled),
                                                                className: `w-12 h-6 rounded-full transition-colors relative ${settings.stopOnLossEnabled ? 'bg-green-500' : 'bg-gray-600'}`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.stopOnLossEnabled ? 'translate-x-6' : 'translate-x-0.5'}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 267,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white text-sm",
                                                                children: "Stop if cash decreases by"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 271,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>adjustValue('stopOnLossAmount', -10),
                                                                className: "w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center",
                                                                children: "−"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white font-mono text-lg min-w-[80px] text-center",
                                                                children: settings.stopOnLossAmount.toFixed(2)
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>adjustValue('stopOnLossAmount', 10),
                                                                className: "w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center",
                                                                children: "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 283,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                lineNumber: 259,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 258,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-800 rounded-lg p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>updateSetting('stopOnBigWinEnabled', !settings.stopOnBigWinEnabled),
                                                                className: `w-12 h-6 rounded-full transition-colors relative ${settings.stopOnBigWinEnabled ? 'bg-green-500' : 'bg-gray-600'}`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.stopOnBigWinEnabled ? 'translate-x-6' : 'translate-x-0.5'}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 303,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 297,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white text-sm",
                                                                children: "Stop if single win exceeds"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 307,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>adjustValue('stopOnBigWinAmount', -10),
                                                                className: "w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center",
                                                                children: "−"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 310,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white font-mono text-lg min-w-[80px] text-center",
                                                                children: settings.stopOnBigWinAmount.toFixed(2)
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 316,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>adjustValue('stopOnBigWinAmount', 10),
                                                                className: "w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center",
                                                                children: "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 319,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                lineNumber: 295,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 294,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                    lineNumber: 256,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowMoreOptions(!showMoreOptions),
                                    className: "w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-colors",
                                    children: [
                                        "More options",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `transition-transform ${showMoreOptions ? 'rotate-180' : ''}`,
                                            children: "▼"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 336,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                    lineNumber: 331,
                                    columnNumber: 11
                                }, this),
                                showMoreOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 animate-in slide-in-from-top-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-800 rounded-lg p-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>updateSetting('stopOnProfitEnabled', !settings.stopOnProfitEnabled),
                                                                className: `w-12 h-6 rounded-full transition-colors relative ${settings.stopOnProfitEnabled ? 'bg-green-500' : 'bg-gray-600'}`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.stopOnProfitEnabled ? 'translate-x-6' : 'translate-x-0.5'}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 352,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white text-sm",
                                                                children: "Stop if cash increases by"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 356,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>adjustValue('stopOnProfitAmount', -10),
                                                                className: "w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center",
                                                                children: "−"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white font-mono text-lg min-w-[80px] text-center",
                                                                children: settings.stopOnProfitAmount.toFixed(2)
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 365,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>adjustValue('stopOnProfitAmount', 10),
                                                                className: "w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center",
                                                                children: "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                lineNumber: 344,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-gray-400 text-sm mb-3 block text-center",
                                                    children: "If I lost"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateSetting('onLossStrategy', 'reset'),
                                                    className: `w-full p-4 rounded-lg mb-3 transition-all ${settings.onLossStrategy === 'reset' ? 'bg-gray-700 ring-2 ring-green-500' : 'bg-gray-800 hover:bg-gray-700'}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-3 h-3 rounded-full ${settings.onLossStrategy === 'reset' ? 'bg-green-500' : 'bg-gray-600'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 392,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white font-medium",
                                                                children: "Return to initial bet"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 393,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `p-4 rounded-lg ${settings.onLossStrategy === 'increase' ? 'bg-gray-700 ring-2 ring-green-500' : 'bg-gray-800'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>updateSetting('onLossStrategy', 'increase'),
                                                                    className: "w-full text-left mb-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-3 mb-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: `w-3 h-3 rounded-full ${settings.onLossStrategy === 'increase' ? 'bg-green-500' : 'bg-gray-600'}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                                lineNumber: 411,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white text-sm font-medium",
                                                                                children: "Increase bet by"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                                lineNumber: 412,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                        lineNumber: 410,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 406,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>adjustValue('onLossPercent', -1),
                                                                            className: "w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center text-xs",
                                                                            children: "−"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 416,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-white font-bold text-xl cursor-pointer hover:text-yellow-400 transition-colors",
                                                                            onClick: ()=>openNumpad('onLossPercent'),
                                                                            children: [
                                                                                settings.onLossPercent,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 422,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>adjustValue('onLossPercent', 1),
                                                                            className: "w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center text-xs",
                                                                            children: "+"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 428,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 415,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                            lineNumber: 399,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `p-4 rounded-lg ${settings.onLossStrategy === 'decrease' ? 'bg-gray-700 ring-2 ring-green-500' : 'bg-gray-800'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>updateSetting('onLossStrategy', 'decrease'),
                                                                    className: "w-full text-left mb-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-3 mb-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: `w-3 h-3 rounded-full ${settings.onLossStrategy === 'decrease' ? 'bg-green-500' : 'bg-gray-600'}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                                lineNumber: 449,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white text-sm font-medium",
                                                                                children: "Decrease bet by"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                                lineNumber: 450,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                        lineNumber: 448,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 444,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>adjustValue('onLossPercent', -1),
                                                                            className: "w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center text-xs",
                                                                            children: "−"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 454,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-white font-bold text-xl cursor-pointer hover:text-yellow-400 transition-colors",
                                                                            onClick: ()=>openNumpad('onLossPercent'),
                                                                            children: [
                                                                                settings.onLossPercent,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 460,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>adjustValue('onLossPercent', 1),
                                                                            className: "w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center text-xs",
                                                                            children: "+"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 466,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 453,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                            lineNumber: 437,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-gray-400 text-sm mb-3 block text-center",
                                                    children: "If I win"
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateSetting('onWinStrategy', 'reset'),
                                                    className: `w-full p-4 rounded-lg mb-3 transition-all ${settings.onWinStrategy === 'reset' ? 'bg-gray-700 ring-2 ring-green-500' : 'bg-gray-800 hover:bg-gray-700'}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-3 h-3 rounded-full ${settings.onWinStrategy === 'reset' ? 'bg-green-500' : 'bg-gray-600'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 491,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white font-medium",
                                                                children: "Return to initial bet"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                lineNumber: 492,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                        lineNumber: 490,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 482,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `p-4 rounded-lg ${settings.onWinStrategy === 'increase' ? 'bg-gray-700 ring-2 ring-green-500' : 'bg-gray-800'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>updateSetting('onWinStrategy', 'increase'),
                                                                    className: "w-full text-left mb-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-3 mb-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: `w-3 h-3 rounded-full ${settings.onWinStrategy === 'increase' ? 'bg-green-500' : 'bg-gray-600'}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                                lineNumber: 510,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white text-sm font-medium",
                                                                                children: "Increase bet by"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                                lineNumber: 511,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                        lineNumber: 509,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 505,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>adjustValue('onWinPercent', -1),
                                                                            className: "w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center text-xs",
                                                                            children: "−"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 515,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-white font-bold text-xl cursor-pointer hover:text-yellow-400 transition-colors",
                                                                            onClick: ()=>openNumpad('onWinPercent'),
                                                                            children: [
                                                                                settings.onWinPercent,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 521,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>adjustValue('onWinPercent', 1),
                                                                            className: "w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center text-xs",
                                                                            children: "+"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 527,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 514,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `p-4 rounded-lg ${settings.onWinStrategy === 'decrease' ? 'bg-gray-700 ring-2 ring-green-500' : 'bg-gray-800'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>updateSetting('onWinStrategy', 'decrease'),
                                                                    className: "w-full text-left mb-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-3 mb-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: `w-3 h-3 rounded-full ${settings.onWinStrategy === 'decrease' ? 'bg-green-500' : 'bg-gray-600'}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                                lineNumber: 548,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-white text-sm font-medium",
                                                                                children: "Decrease bet by"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                                lineNumber: 549,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                        lineNumber: 547,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 543,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>adjustValue('onWinPercent', -1),
                                                                            className: "w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center text-xs",
                                                                            children: "−"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 553,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-white font-bold text-xl cursor-pointer hover:text-yellow-400 transition-colors",
                                                                            onClick: ()=>openNumpad('onWinPercent'),
                                                                            children: [
                                                                                settings.onWinPercent,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 559,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>adjustValue('onWinPercent', 1),
                                                                            className: "w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center text-xs",
                                                                            children: "+"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                            lineNumber: 565,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                                    lineNumber: 552,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                            lineNumber: 536,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 478,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleStart,
                                    className: "w-full py-6 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition-colors",
                                    children: "START AUTO"
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                    lineNumber: 579,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                            lineNumber: 182,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                    lineNumber: 175,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                lineNumber: 174,
                columnNumber: 5
            }, this),
            showNumpad && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showNumpad,
                onOpenChange: setShowNumpad,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-[300px] bg-gray-900 border-gray-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-white text-center",
                                children: [
                                    "Enter ",
                                    numpadTarget === 'onWinPercent' ? 'Win' : 'Loss',
                                    " Percentage"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                lineNumber: 594,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                            lineNumber: 593,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-800 p-4 rounded-lg text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white text-2xl font-bold",
                                            children: numpadValue || '0'
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 602,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white text-xl ml-1",
                                            children: "%"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 603,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                    lineNumber: 601,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-2",
                                    children: [
                                        [
                                            1,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6,
                                            7,
                                            8,
                                            9,
                                            0
                                        ].map((digit)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>addNumpadDigit(digit.toString()),
                                                className: "bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg font-bold text-xl transition-colors",
                                                children: digit
                                            }, digit, false, {
                                                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                                lineNumber: 609,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: clearNumpad,
                                            className: "bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg font-bold text-lg transition-colors col-span-2",
                                            children: "Clear"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 617,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                    lineNumber: 607,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleNumpadCancel,
                                            className: "flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 627,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleNumpadConfirm,
                                            className: "flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors",
                                            children: "OK"
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                            lineNumber: 633,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                                    lineNumber: 626,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                            lineNumber: 599,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                    lineNumber: 592,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                lineNumber: 591,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$HighPercentageWarningModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: showWarningModal,
                onOpenChange: setShowWarningModal,
                onConfirm: handleConfirmHighPercentage,
                onCancel: handleCancelHighPercentage,
                settings: pendingSettings
            }, void 0, false, {
                fileName: "[project]/PLINKO/components/AutoPlayModal.tsx",
                lineNumber: 646,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
}
_s(AutoPlayModal, "YA64ww1bBV/b1qHIhLRADLr2X4c=");
_c = AutoPlayModal;
var _c;
__turbopack_context__.k.register(_c, "AutoPlayModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/PresetAmountsModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PresetAmountsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/dialog.tsx [app-client] (ecmascript)");
'use client';
;
;
const PRESET_AMOUNTS = [
    0.10,
    0.20,
    0.30,
    0.40,
    0.50,
    0.60,
    0.70,
    0.80,
    1,
    2,
    5,
    10,
    20,
    50,
    100
];
function PresetAmountsModal({ open, onOpenChange, onSelectAmount }) {
    const handleSelectAmount = (amount)=>{
        onSelectAmount(amount);
        onOpenChange(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[300px] bg-gradient-to-b from-white via-blue-500 to-blue-700 border-2 border-blue-600",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "text-md font-bold text-blue-600 text-center",
                        children: "Bet USD"
                    }, void 0, false, {
                        fileName: "[project]/PLINKO/components/PresetAmountsModal.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/PLINKO/components/PresetAmountsModal.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 gap-2 p-2",
                    children: PRESET_AMOUNTS.map((amount)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleSelectAmount(amount),
                            className: "text-xs bg-gradient-to-b from-green-600 to-green-700 shadow-lg shadow-black/60 hover:from-green-500 hover:to-green-600 text-white font-bold py-1 px-2 rounded-lg active:scale-95 transition-all",
                            children: amount.toFixed(2)
                        }, amount, false, {
                            fileName: "[project]/PLINKO/components/PresetAmountsModal.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/PLINKO/components/PresetAmountsModal.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/PLINKO/components/PresetAmountsModal.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/PresetAmountsModal.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = PresetAmountsModal;
var _c;
__turbopack_context__.k.register(_c, "PresetAmountsModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/ExtendedHistoryModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExtendedHistoryModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/dialog.tsx [app-client] (ecmascript)");
'use client';
;
;
function ExtendedHistoryModal({ open, onOpenChange, history }) {
    // Function to determine color based on risk level and multiplier
    const getMultiplierColor = (item)=>{
        const isDark = item.multiplier < 1;
        if (item.risk === 'GREEN') {
            return isDark ? 'bg-[rgb(100,140,45)]' : 'bg-[rgb(140,185,60)]';
        } else if (item.risk === 'YELLOW') {
            return isDark ? 'bg-[rgb(200,190,30)]' : 'bg-[rgb(255,240,60)]';
        } else if (item.risk === 'RED') {
            return isDark ? 'bg-[rgb(160,35,35)]' : 'bg-[rgb(210,50,50)]';
        }
        return 'bg-gray-500';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[400px] border-2 border-white p-3",
            style: {
                backgroundImage: `url("/ui/pg3.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    className: "pb-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "text-sm font-bold text-white uppercase tracking-wide text-center",
                        children: "Last Results"
                    }, void 0, false, {
                        fileName: "[project]/PLINKO/components/ExtendedHistoryModal.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/PLINKO/components/ExtendedHistoryModal.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-y-auto max-h-[400px] pr-1 custom-scrollbar",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-7 gap-1.5",
                        children: history.length > 0 ? history.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${getMultiplierColor(item)} rounded-sm px-0 py-0 text-center font-black text-lg shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/40 text-white transition-transform hover:scale-105`,
                                children: item.multiplier
                            }, item.id, false, {
                                fileName: "[project]/PLINKO/components/ExtendedHistoryModal.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-4 text-center text-white py-4 text-sm",
                            children: "No results yet"
                        }, void 0, false, {
                            fileName: "[project]/PLINKO/components/ExtendedHistoryModal.tsx",
                            lineNumber: 68,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/PLINKO/components/ExtendedHistoryModal.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/PLINKO/components/ExtendedHistoryModal.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/PLINKO/components/ExtendedHistoryModal.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ExtendedHistoryModal.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = ExtendedHistoryModal;
var _c;
__turbopack_context__.k.register(_c, "ExtendedHistoryModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/CustomAmountModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomAmountModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/dialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CustomAmountModal({ open, onOpenChange, onSetAmount, currentAmount }) {
    _s();
    const [displayValue, setDisplayValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentAmount.toFixed(2));
    const handleNumberClick = (num)=>{
        if (displayValue === '0.00') {
            setDisplayValue(num === '.' ? '0.' : num);
        } else if (num === '.') {
            if (!displayValue.includes('.')) {
                setDisplayValue(displayValue + '.');
            }
        } else {
            setDisplayValue(displayValue + num);
        }
    };
    const handleClear = ()=>{
        setDisplayValue('0.00');
    };
    const handleBackspace = ()=>{
        if (displayValue.length > 1) {
            setDisplayValue(displayValue.slice(0, -1));
        } else {
            setDisplayValue('0.00');
        }
    };
    const handleConfirm = ()=>{
        const amount = parseFloat(displayValue);
        if (!isNaN(amount) && amount >= 0.1) {
            onSetAmount(amount);
            onOpenChange(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[400px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-2 border-gray-700",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "text-2xl font-bold text-white text-center",
                        children: "Enter Bet Amount"
                    }, void 0, false, {
                        fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-black/40 rounded-lg p-4 border-2 border-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-white/60 text-sm font-medium uppercase text-center mb-1",
                                    children: "Bet USD"
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-white font-bold text-4xl font-mono text-center",
                                    children: displayValue
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-2",
                            children: [
                                [
                                    '1',
                                    '2',
                                    '3',
                                    '4',
                                    '5',
                                    '6',
                                    '7',
                                    '8',
                                    '9'
                                ].map((num)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleNumberClick(num),
                                        className: "h-14 rounded-lg bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 text-white font-bold text-xl shadow-lg border-b-4 border-slate-800 hover:from-slate-600 hover:via-slate-500 hover:to-slate-600 active:scale-95 transition-all duration-75",
                                        children: num
                                    }, num, false, {
                                        fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleClear,
                                    className: "h-14 rounded-lg bg-gradient-to-b from-red-600 via-red-500 to-red-700 text-white font-bold text-sm shadow-lg border-b-4 border-red-800 hover:from-red-500 hover:via-red-400 hover:to-red-600 active:scale-95 transition-all duration-75",
                                    children: "CLEAR"
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleNumberClick('0'),
                                    className: "h-14 rounded-lg bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 text-white font-bold text-xl shadow-lg border-b-4 border-slate-800 hover:from-slate-600 hover:via-slate-500 hover:to-slate-600 active:scale-95 transition-all duration-75",
                                    children: "0"
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleBackspace,
                                    className: "h-14 rounded-lg bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 text-white font-bold text-sm shadow-lg border-b-4 border-yellow-800 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-600 active:scale-95 transition-all duration-75 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fas fa-backspace"
                                    }, void 0, false, {
                                        fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleNumberClick('.'),
                            className: "w-full h-12 rounded-lg bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 text-white font-bold text-xl shadow-lg border-b-4 border-slate-800 hover:from-slate-600 hover:via-slate-500 hover:to-slate-600 active:scale-95 transition-all duration-75",
                            children: "."
                        }, void 0, false, {
                            fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleConfirm,
                            className: "w-full h-14 rounded-lg bg-gradient-to-b from-green-500 via-green-600 to-green-700 text-white font-bold text-lg shadow-lg border-b-4 border-green-800 hover:from-green-400 hover:via-green-500 hover:to-green-600 active:scale-95 transition-all duration-75 uppercase tracking-wider",
                            children: "Confirm"
                        }, void 0, false, {
                            fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/CustomAmountModal.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(CustomAmountModal, "nQTLOnzhxo5Rb03/N7oKe+LtB+I=");
_c = CustomAmountModal;
var _c;
__turbopack_context__.k.register(_c, "CustomAmountModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/components/ui/background-ripple-effect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundRippleEffect",
    ()=>BackgroundRippleEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const BackgroundRippleEffect = ({ rows = 8, cols = 27, cellSize = 56, fillColor = "rgba(14,165,233,0.3)" })=>{
    _s();
    const [clickedCell, setClickedCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rippleKey, setRippleKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 h-full w-full", "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]", "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative h-auto w-auto overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden"
                }, void 0, false, {
                    fileName: "[project]/PLINKO/components/ui/background-ripple-effect.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DivGrid, {
                    className: "mask-radial-from-20% mask-radial-at-top opacity-600",
                    rows: rows,
                    cols: cols,
                    cellSize: cellSize,
                    borderColor: "var(--cell-border-color)",
                    fillColor: fillColor,
                    clickedCell: clickedCell,
                    onCellClick: (row, col)=>{
                        setClickedCell({
                            row,
                            col
                        });
                        setRippleKey((k)=>k + 1);
                    },
                    interactive: true
                }, `base-${rippleKey}`, false, {
                    fileName: "[project]/PLINKO/components/ui/background-ripple-effect.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/PLINKO/components/ui/background-ripple-effect.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/background-ripple-effect.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BackgroundRippleEffect, "mmm3HCJ51NOqo3LewPa0lxjkBzQ=");
_c = BackgroundRippleEffect;
const DivGrid = ({ className, rows = 7, cols = 30, cellSize = 56, borderColor = "#3f3f46", fillColor = "rgba(14,165,233,0.3)", clickedCell = null, onCellClick = ()=>{}, interactive = true })=>{
    _s1();
    const cells = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DivGrid.useMemo[cells]": ()=>Array.from({
                length: rows * cols
            }, {
                "DivGrid.useMemo[cells]": (_, idx)=>idx
            }["DivGrid.useMemo[cells]"])
    }["DivGrid.useMemo[cells]"], [
        rows,
        cols
    ]);
    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        width: cols * cellSize,
        height: rows * cellSize,
        marginInline: "auto"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-[3]", className),
        style: gridStyle,
        children: cells.map((idx)=>{
            const rowIdx = Math.floor(idx / cols);
            const colIdx = idx % cols;
            const distance = clickedCell ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx) : 0;
            const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
            const duration = 200 + distance * 80; // ms
            const style = clickedCell ? {
                "--delay": `${delay}ms`,
                "--duration": `${duration}ms`
            } : {};
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]", clickedCell && "animate-cell-ripple [animation-fill-mode:none]", !interactive && "pointer-events-none"),
                style: {
                    backgroundColor: fillColor,
                    borderColor: borderColor,
                    ...style
                },
                onClick: interactive ? ()=>onCellClick?.(rowIdx, colIdx) : undefined
            }, idx, false, {
                fileName: "[project]/PLINKO/components/ui/background-ripple-effect.tsx",
                lineNumber: 115,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0));
        })
    }, void 0, false, {
        fileName: "[project]/PLINKO/components/ui/background-ripple-effect.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(DivGrid, "M1j72coUl7JyMTMKfnollIaW2jE=");
_c1 = DivGrid;
var _c, _c1;
__turbopack_context__.k.register(_c, "BackgroundRippleEffect");
__turbopack_context__.k.register(_c1, "DivGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/PLINKO/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$PlinkoGame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/PlinkoGame.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$MainNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/MainNav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$AutoPlayModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/AutoPlayModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$PresetAmountsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/PresetAmountsModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ExtendedHistoryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ExtendedHistoryModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$CustomAmountModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/CustomAmountModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$background$2d$ripple$2d$effect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/PLINKO/components/ui/background-ripple-effect.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function IntroScreen({ onComplete }) {
    _s();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IntroScreen.useEffect": ()=>{
            const duration = 5000; // 3 seconds
            const interval = 50; // Update every 50ms
            const steps = duration / interval;
            let currentStep = 0;
            const progressInterval = setInterval({
                "IntroScreen.useEffect.progressInterval": ()=>{
                    currentStep++;
                    const newProgress = currentStep / steps * 100;
                    setProgress(Math.min(newProgress, 100));
                    if (currentStep >= steps) {
                        clearInterval(progressInterval);
                        setTimeout(onComplete, 200); // Small delay after completion
                    }
                }
            }["IntroScreen.useEffect.progressInterval"], interval);
            // Start video playback
            if (videoRef.current) {
                videoRef.current.play().catch({
                    "IntroScreen.useEffect": ()=>{
                    // Video failed to play, continue with progress bar only
                    }
                }["IntroScreen.useEffect"]);
            }
            return ({
                "IntroScreen.useEffect": ()=>clearInterval(progressInterval)
            })["IntroScreen.useEffect"];
        }
    }["IntroScreen.useEffect"], [
        onComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black flex flex-col items-center justify-center z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                className: "absolute inset-0 w-full h-full object-cover",
                muted: true,
                playsInline: true,
                preload: "auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                    src: "/ui/intro.mp4",
                    type: "video/mp4"
                }, void 0, false, {
                    fileName: "[project]/PLINKO/app/page.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/PLINKO/app/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex flex-col justify-between h-full py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                        fileName: "[project]/PLINKO/app/page.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-80 max-w-sm mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/20 rounded-full h-3 overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-75 ease-out",
                                    style: {
                                        width: `${progress}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/PLINKO/app/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/app/page.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-lg font-semibold",
                                    children: [
                                        "Loading... ",
                                        Math.round(progress),
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/PLINKO/app/page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/app/page.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/PLINKO/app/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/PLINKO/app/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/PLINKO/app/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/PLINKO/app/page.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(IntroScreen, "O5CwPM6GPXPUb2ykJQz/T6ICJ6E=");
_c = IntroScreen;
const Home = ()=>{
    _s1();
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        balance: 755.37,
        ballCount: 0
    });
    // Initialize wager from localStorage or default to $1
    const [wager, setWager] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Home.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const saved = localStorage.getItem('plinko-wager');
                return saved ? parseFloat(saved) : 1.00;
            }
            //TURBOPACK unreachable
            ;
        }
    }["Home.useState"]);
    const [lastDrop, setLastDrop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isAutoDrop, setIsAutoDrop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAutoPlayModal, setShowAutoPlayModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPresetModal, setShowPresetModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showExtendedHistory, setShowExtendedHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCustomAmountModal, setShowCustomAmountModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoPlaySettings, setAutoPlaySettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [remainingBalls, setRemainingBalls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [winLossBadge, setWinLossBadge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [soundEnabled, setSoundEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showIntro, setShowIntro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const lastRiskRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('GREEN');
    const historyIdCounter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // AutoPlay state tracking
    const initialWagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0.30);
    const startingBalanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(755.37);
    const lastWinAmountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const currentWagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1.00); // Track current wager for auto-play calculations
    const isAutoDropRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false); // Track auto-drop status synchronously
    const autoPlaySettingsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Track settings synchronously
    // Keep currentWagerRef in sync with wager state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            currentWagerRef.current = wager;
        }
    }["Home.useEffect"], [
        wager
    ]);
    const handleScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleScore]": (multiplier)=>{
            const winAmount = wager * multiplier;
            const profit = winAmount - wager;
            lastWinAmountRef.current = winAmount;
            console.log('=== SCORE EVENT ===');
            console.log('Multiplier:', multiplier);
            console.log('Current Wager:', wager);
            console.log('Is Auto Drop:', isAutoDrop);
            console.log('Auto Play Settings:', autoPlaySettings);
            console.log('Remaining Balls:', remainingBalls);
            console.log('Game Balance:', gameState.balance);
            setGameState({
                "Home.useCallback[handleScore]": (prev)=>{
                    const newBalance = prev.balance + winAmount;
                    // Check AutoPlay stop conditions
                    console.log('Auto-drop check:', isAutoDropRef.current, '&&', !!autoPlaySettingsRef.current, '=', isAutoDropRef.current && autoPlaySettingsRef.current);
                    if (isAutoDropRef.current && autoPlaySettingsRef.current) {
                        // Stop if cash decreases by
                        if (autoPlaySettingsRef.current.stopOnLossEnabled) {
                            const totalLoss = startingBalanceRef.current - newBalance;
                            if (totalLoss >= autoPlaySettingsRef.current.stopOnLossAmount) {
                                console.log('=== AUTO-DROP DISABLED: Loss condition met ===');
                                isAutoDropRef.current = false;
                                autoPlaySettingsRef.current = null;
                                setAutoPlaySettings(null);
                                setIsAutoDrop(false);
                                setRemainingBalls(0);
                            }
                        }
                        // Stop if single win exceeds
                        if (autoPlaySettingsRef.current.stopOnBigWinEnabled && winAmount >= autoPlaySettingsRef.current.stopOnBigWinAmount) {
                            console.log('=== AUTO-DROP DISABLED: Big win condition met ===');
                            isAutoDropRef.current = false;
                            autoPlaySettingsRef.current = null;
                            setAutoPlaySettings(null);
                            setIsAutoDrop(false);
                            setRemainingBalls(0);
                        }
                        // Stop if cash increases by
                        if (autoPlaySettingsRef.current.stopOnProfitEnabled) {
                            const totalProfit = newBalance - startingBalanceRef.current;
                            if (totalProfit >= autoPlaySettingsRef.current.stopOnProfitAmount) {
                                console.log('=== AUTO-DROP DISABLED: Profit condition met ===');
                                isAutoDropRef.current = false;
                                autoPlaySettingsRef.current = null;
                                setAutoPlaySettings(null);
                                setIsAutoDrop(false);
                                setRemainingBalls(0);
                            }
                        }
                        // Apply bet progression strategy
                        const isWin = multiplier > 1;
                        const strategy = isWin ? autoPlaySettingsRef.current.onWinStrategy : autoPlaySettingsRef.current.onLossStrategy;
                        const percent = isWin ? autoPlaySettingsRef.current.onWinPercent : autoPlaySettingsRef.current.onLossPercent;
                        console.log('Win/Loss:', isWin ? 'WIN' : 'LOSS');
                        console.log('Strategy:', strategy);
                        console.log('Percent:', percent);
                        console.log('*** APPLYING WAGER STRATEGY ***');
                        console.log('currentWagerRef.current:', currentWagerRef.current);
                        console.log('wager state:', wager);
                        // Use currentWagerRef to get the most up-to-date wager value
                        let currentWager = currentWagerRef.current || wager;
                        console.log('Using currentWager:', currentWager);
                        let newWager = currentWager;
                        if (strategy === 'reset') {
                            newWager = initialWagerRef.current;
                            console.log('Resetting bet to initial:', newWager);
                        } else if (strategy === 'increase') {
                            newWager = +(currentWager * (1 + percent / 100)).toFixed(2);
                            console.log('Increasing bet from', currentWager, 'to', newWager);
                        } else if (strategy === 'decrease') {
                            newWager = Math.max(0.1, +(currentWager * (1 - percent / 100)).toFixed(2));
                            console.log('Decreasing bet from', currentWager, 'to', newWager);
                        }
                        // Update wager immediately
                        if (newWager !== currentWager) {
                            console.log('*** UPDATING WAGER FROM', currentWager, 'TO', newWager, '***');
                            setWagerWithPersistence(newWager);
                        }
                    }
                    return {
                        ...prev,
                        balance: newBalance
                    };
                }
            }["Home.useCallback[handleScore]"]);
            // Generate unique ID using counter to prevent duplicate keys
            historyIdCounter.current += 1;
            const uniqueId = Date.now() * 1000 + historyIdCounter.current;
            setHistory({
                "Home.useCallback[handleScore]": (prev)=>[
                        {
                            id: uniqueId,
                            multiplier,
                            risk: lastRiskRef.current
                        },
                        ...prev
                    ].slice(0, 15)
            }["Home.useCallback[handleScore]"]);
            // Show win/loss badge
            setWinLossBadge({
                amount: profit,
                key: Date.now()
            });
            // Clear badge after animation completes
            setTimeout({
                "Home.useCallback[handleScore]": ()=>{
                    setWinLossBadge(null);
                }
            }["Home.useCallback[handleScore]"], 2000);
        }
    }["Home.useCallback[handleScore]"], [
        wager,
        isAutoDrop,
        autoPlaySettings
    ]);
    const dropBall = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[dropBall]": (risk)=>{
            setGameState({
                "Home.useCallback[dropBall]": (prev)=>{
                    if (prev.balance < wager) {
                        isAutoDropRef.current = false;
                        autoPlaySettingsRef.current = null;
                        setAutoPlaySettings(null);
                        setIsAutoDrop(false);
                        return prev;
                    }
                    lastRiskRef.current = risk;
                    setLastDrop({
                        id: Date.now(),
                        risk
                    });
                    return {
                        ...prev,
                        balance: prev.balance - wager,
                        ballCount: prev.ballCount + 1
                    };
                }
            }["Home.useCallback[dropBall]"]);
        }
    }["Home.useCallback[dropBall]"], [
        wager
    ]);
    // AutoPlay handler
    const handleStartAutoPlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleStartAutoPlay]": (settings)=>{
            console.log('=== STARTING AUTO-PLAY ===');
            console.log('Settings:', settings);
            console.log('Initial Wager:', wager);
            console.log('Initial Balance:', gameState.balance);
            autoPlaySettingsRef.current = settings; // Set ref synchronously
            setAutoPlaySettings(settings);
            setRemainingBalls(settings.numberOfRounds);
            initialWagerRef.current = wager;
            startingBalanceRef.current = gameState.balance;
            isAutoDropRef.current = true; // Set ref synchronously
            setIsAutoDrop(true);
            console.log('Auto-drop enabled');
        }
    }["Home.useCallback[handleStartAutoPlay]"], [
        wager,
        gameState.balance
    ]);
    // Auto Drop Logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            let interval = null;
            if (isAutoDrop && remainingBalls > 0 && autoPlaySettings) {
                interval = window.setInterval({
                    "Home.useEffect": ()=>{
                        dropBall(autoPlaySettings.riskLevel);
                        setRemainingBalls({
                            "Home.useEffect": (prev)=>{
                                const newCount = prev - 1;
                                if (newCount <= 0) {
                                    console.log('=== AUTO-DROP DISABLED: All balls completed ===');
                                    isAutoDropRef.current = false;
                                    autoPlaySettingsRef.current = null;
                                    setAutoPlaySettings(null);
                                    setIsAutoDrop(false);
                                    setRemainingBalls(0);
                                }
                                return newCount;
                            }
                        }["Home.useEffect"]);
                    }
                }["Home.useEffect"], 1000); // Fixed 1 second interval
            }
            return ({
                "Home.useEffect": ()=>{
                    if (interval) clearInterval(interval);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        isAutoDrop,
        dropBall,
        remainingBalls,
        autoPlaySettings
    ]);
    // Detect mobile devices for responsive background
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const checkMobile = {
                "Home.useEffect.checkMobile": ()=>{
                    setIsMobile(window.innerWidth < 440); // Mobile breakpoint at 640px
                }
            }["Home.useEffect.checkMobile"];
            checkMobile(); // Check on mount
            window.addEventListener('resize', checkMobile);
            return ({
                "Home.useEffect": ()=>window.removeEventListener('resize', checkMobile)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    const adjustWager = (amount)=>{
        setWagerWithPersistence((prev)=>Math.max(0.1, +(prev + amount).toFixed(2)));
    };
    // Helper to set wager with localStorage persistence
    const setWagerWithPersistence = (newWager)=>{
        setWager((prev)=>{
            const newValue = typeof newWager === 'function' ? newWager(prev) : newWager;
            // Update ref synchronously for immediate access
            currentWagerRef.current = newValue;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('plinko-wager', newValue.toString());
            }
            return newValue;
        });
    };
    // Hold-to-repeat functionality for wager buttons
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startAdjusting = (amount)=>{
        adjustWager(amount); // Immediate adjustment
        // Wait 300ms before starting to repeat
        timeoutRef.current = setTimeout(()=>{
            intervalRef.current = setInterval(()=>{
                adjustWager(amount);
            }, 50); // Repeat every 50ms
        }, 300);
    };
    const stopAdjusting = ()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            return ({
                "Home.useEffect": ()=>{
                    stopAdjusting();
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    // Show intro screen first
    if (showIntro) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IntroScreen, {
            onComplete: ()=>setShowIntro(false)
        }, void 0, false, {
            fileName: "[project]/PLINKO/app/page.tsx",
            lineNumber: 392,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-screen w-full transition-all duration-1000 overflow-hidden relative",
        style: {
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #0f0f1e 70%, #000000 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-0 pointer-events-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ui$2f$background$2d$ripple$2d$effect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackgroundRippleEffect"], {
                    rows: 12,
                    cols: 30,
                    cellSize: 50,
                    fillColor: "rgba(34, 197, 94, 0.08)"
                }, void 0, false, {
                    fileName: "[project]/PLINKO/app/page.tsx",
                    lineNumber: 404,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/PLINKO/app/page.tsx",
                lineNumber: 403,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-20 flex flex-col h-full pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$MainNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                balance: gameState.balance,
                                soundEnabled: soundEnabled,
                                onSoundToggle: ()=>setSoundEnabled(!soundEnabled),
                                history: history,
                                onShowExtendedHistory: ()=>setShowExtendedHistory(true)
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/app/page.tsx",
                                lineNumber: 416,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed top-14 right-2 z-30",
                                children: winLossBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `win-loss-badge-enter px-2 py-1 rounded text-[10px] font-black ${winLossBadge.amount >= 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} shadow-md border border-black/20`,
                                    children: [
                                        winLossBadge.amount >= 0 ? '+' : '',
                                        winLossBadge.amount.toFixed(2)
                                    ]
                                }, winLossBadge.key, true, {
                                    fileName: "[project]/PLINKO/app/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/app/page.tsx",
                                lineNumber: 425,
                                columnNumber: 7
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                className: "flex-1 flex flex-col gap-1 p-1 pb-40 sm:pb-1 overflow-hidden mt-12 pointer-events-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 w-full flex justify-center items-start bg-black/5 rounded-lg border border-black/10 shadow-inner pt-1 overflow-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$PlinkoGame$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            onScore: handleScore,
                                            lastDrop: lastDrop,
                                            soundEnabled: soundEnabled,
                                            isAutoDrop: isAutoDrop
                                        }, void 0, false, {
                                            fileName: "[project]/PLINKO/app/page.tsx",
                                            lineNumber: 444,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/PLINKO/app/page.tsx",
                                        lineNumber: 443,
                                        columnNumber: 9
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0 bg-black/20 rounded-2xl",
                                        style: {
                                            backgroundColor: 'rgba(29, 246, 221, 0)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hidden sm:flex items-center justify-center gap-2 p-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setShowCustomAmountModal(true),
                                                        className: "bg-gradient-to-b from-[#1BE7FF] via-[#1BE7FF]/80 to-[#1BE7FF]/60 rounded-full px-5 py-2 shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 min-w-[140px] hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75",
                                                        style: {
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-white/60 text-[9px] font-medium uppercase tracking-wide",
                                                                    children: "Bet USD"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/app/page.tsx",
                                                                    lineNumber: 470,
                                                                    columnNumber: 17
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-white font-bold text-lg font-poppins",
                                                                    children: wager.toFixed(2)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/app/page.tsx",
                                                                    lineNumber: 471,
                                                                    columnNumber: 17
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/PLINKO/app/page.tsx",
                                                            lineNumber: 469,
                                                            columnNumber: 15
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/app/page.tsx",
                                                        lineNumber: 462,
                                                        columnNumber: 13
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onMouseDown: ()=>startAdjusting(-0.1),
                                                                onMouseUp: stopAdjusting,
                                                                onMouseLeave: stopAdjusting,
                                                                onTouchStart: ()=>startAdjusting(-0.1),
                                                                onTouchEnd: stopAdjusting,
                                                                className: "w-8 h-8 rounded-full bg-gradient-to-b from-[#1BE7FF] via-[#1BE7FF]/80 to-[#1BE7FF]/60 text-black font-bold text-xl shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75",
                                                                style: {
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                                },
                                                                children: "−"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 477,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setShowPresetModal(true),
                                                                className: "w-11 h-11 rounded-full bg-gradient-to-b from-[#1BE7FF] via-[#1BE7FF]/80 to-[#1BE7FF]/60 text-black shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75 flex items-center justify-center",
                                                                style: {
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fas fa-layer-group text-sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/app/page.tsx",
                                                                    lineNumber: 497,
                                                                    columnNumber: 17
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 490,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onMouseDown: ()=>startAdjusting(0.1),
                                                                onMouseUp: stopAdjusting,
                                                                onMouseLeave: stopAdjusting,
                                                                onTouchStart: ()=>startAdjusting(0.1),
                                                                onTouchEnd: stopAdjusting,
                                                                className: "w-8 h-8 rounded-full bg-gradient-to-b from-[#1BE7FF] via-[#1BE7FF]/80 to-[#1BE7FF]/60 text-black font-bold text-xl shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75",
                                                                style: {
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                                },
                                                                children: "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 499,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/app/page.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 13
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>dropBall('GREEN'),
                                                        className: "h-10 px-6 rounded-full bg-gradient-to-b from-[#AFFC41] via-[#AFFC41]/80 to-[#AFFC41]/60 text-black font-bold text-sm shadow-xl shadow-black/60 border-b-4 border-[#AFFC41]/80 hover:from-[#AFFC41] hover:via-[#AFFC41]/90 hover:to-[#AFFC41]/70 hover:shadow-black/80 hover:border-[#AFFC41] active:shadow-inner active:shadow-black/40 active:border-[#AFFC41]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider",
                                                        style: {
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(175, 252, 65, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                        },
                                                        children: "GREEN"
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/app/page.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 13
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>dropBall('YELLOW'),
                                                        className: "h-10 px-6 rounded-full bg-gradient-to-b from-[#4392F1] via-[#4392F1]/80 to-[#4392F1]/60 text-white font-bold text-sm shadow-xl shadow-black/60 border-b-4 border-[#4392F1]/80 hover:from-[#4392F1] hover:via-[#4392F1]/90 hover:to-[#4392F1]/70 hover:shadow-black/80 hover:border-[#4392F1] active:shadow-inner active:shadow-black/40 active:border-[#4392F1]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider",
                                                        style: {
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(67, 146, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                        },
                                                        children: "BLUE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/app/page.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 13
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>dropBall('RED'),
                                                        className: "h-10 px-6 rounded-full bg-gradient-to-b from-[#FF331F] via-[#FF331F]/80 to-[#FF331F]/60 text-white font-bold text-sm shadow-xl shadow-black/60 border-b-4 border-[#FF331F]/80 hover:from-[#FF331F] hover:via-[#FF331F]/90 hover:to-[#FF331F]/70 hover:shadow-black/80 hover:border-[#FF331F] active:shadow-inner active:shadow-black/40 active:border-[#FF331F]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider",
                                                        style: {
                                                            boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(255, 51, 31, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                        },
                                                        children: "RED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/app/page.tsx",
                                                        lineNumber: 533,
                                                        columnNumber: 13
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            if (isAutoDrop) {
                                                                isAutoDropRef.current = false;
                                                                autoPlaySettingsRef.current = null;
                                                                setAutoPlaySettings(null);
                                                                setIsAutoDrop(false);
                                                                setRemainingBalls(0);
                                                            } else {
                                                                setShowAutoPlayModal(true);
                                                            }
                                                        },
                                                        className: `w-12 h-12 rounded-full shadow-xl border-b-4 active:scale-95 transition-all duration-75 flex items-center justify-center ${isAutoDrop ? 'bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-700 text-white shadow-black/60 border-yellow-800 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600 hover:shadow-yellow-900/90 hover:border-yellow-700 active:shadow-inner active:shadow-yellow-900/60 active:border-yellow-900' : 'bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-700 text-white shadow-black/60 border-yellow-800 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600 hover:shadow-black/80 hover:border-yellow-700 active:shadow-inner active:shadow-black/60 active:border-yellow-900'}`,
                                                        children: isAutoDrop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-sm",
                                                            children: remainingBalls
                                                        }, void 0, false, {
                                                            fileName: "[project]/PLINKO/app/page.tsx",
                                                            lineNumber: 563,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "fas fa-sync-alt text-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/PLINKO/app/page.tsx",
                                                            lineNumber: 565,
                                                            columnNumber: 17
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/PLINKO/app/page.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 13
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                lineNumber: 460,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sm:hidden flex flex-col gap-2 p-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>dropBall('GREEN'),
                                                                className: "h-10 px-6 rounded-full bg-gradient-to-b from-[#AFFC41] via-[#AFFC41]/80 to-[#AFFC41]/60 text-black font-bold text-md shadow-xl shadow-black/60 border-b-4 border-[#AFFC41]/80 hover:from-[#AFFC41] hover:via-[#AFFC41]/90 hover:to-[#AFFC41]/70 hover:shadow-black/80 hover:border-[#AFFC41] active:shadow-inner active:shadow-black/40 active:border-[#AFFC41]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider",
                                                                style: {
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(175, 252, 65, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                                },
                                                                children: "GREEN"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 574,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>dropBall('YELLOW'),
                                                                className: "h-10 px-6 rounded-full bg-gradient-to-b from-[#4392F1] via-[#4392F1]/80 to-[#4392F1]/60 text-white font-bold text-md shadow-xl shadow-black/60 border-b-4 border-[#4392F1]/80 hover:from-[#4392F1] hover:via-[#4392F1]/90 hover:to-[#4392F1]/70 hover:shadow-black/80 hover:border-[#4392F1] active:shadow-inner active:shadow-black/40 active:border-[#4392F1]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider",
                                                                style: {
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(67, 146, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                                },
                                                                children: "BLUE"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 583,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>dropBall('RED'),
                                                                className: "h-10 px-6 rounded-full bg-gradient-to-b from-[#FF331F] via-[#FF331F]/80 to-[#FF331F]/60 text-white font-bold text-md shadow-xl shadow-black/60 border-b-4 border-[#FF331F]/80 hover:from-[#FF331F] hover:via-[#FF331F]/90 hover:to-[#FF331F]/70 hover:shadow-black/80 hover:border-[#FF331F] active:shadow-inner active:shadow-black/40 active:border-[#FF331F]/60 active:scale-95 transition-all duration-75 uppercase tracking-wider",
                                                                style: {
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(255, 51, 31, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                                },
                                                                children: "RED"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 592,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>{
                                                                    if (isAutoDrop) {
                                                                        setIsAutoDrop(false);
                                                                        setRemainingBalls(0);
                                                                    } else {
                                                                        setShowAutoPlayModal(true);
                                                                    }
                                                                },
                                                                className: `w-10 h-10 rounded-full shadow-xl border-b-4 active:scale-95 transition-all duration-75 flex items-center justify-center ${isAutoDrop ? 'bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-700 text-white shadow-black/60 border-yellow-800 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600 hover:shadow-black/80 hover:border-yellow-700 active:shadow-inner active:shadow-black/60 active:border-yellow-900' : 'bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-700 text-white shadow-black/60 border-yellow-800 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600 hover:shadow-black/80 hover:border-yellow-700 active:shadow-inner active:shadow-black/60 active:border-yellow-900'}`,
                                                                children: isAutoDrop ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-bold text-sm",
                                                                    children: remainingBalls
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/app/page.tsx",
                                                                    lineNumber: 619,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fas fa-sync-alt text-lg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/app/page.tsx",
                                                                    lineNumber: 621,
                                                                    columnNumber: 19
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 603,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/app/page.tsx",
                                                        lineNumber: 573,
                                                        columnNumber: 13
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setShowCustomAmountModal(true),
                                                                className: "bg-transparent rounded-full px-5 py-0 shadow-xl shadow-white border-b-4 border-white flex-1 max-w-[120px] hover:shadow-white hover:border-green-500 active:shadow-inner active:shadow-white/60 active:border-white active:scale-95 transition-all duration-75",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-green-500 text-[10px] font-medium uppercase",
                                                                            children: "Bet USD"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/app/page.tsx",
                                                                            lineNumber: 633,
                                                                            columnNumber: 19
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-white font-bold text-lg font-poppins",
                                                                            children: wager.toFixed(2)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/PLINKO/app/page.tsx",
                                                                            lineNumber: 634,
                                                                            columnNumber: 19
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/PLINKO/app/page.tsx",
                                                                    lineNumber: 632,
                                                                    columnNumber: 17
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 628,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onMouseDown: ()=>startAdjusting(-0.1),
                                                                onMouseUp: stopAdjusting,
                                                                onMouseLeave: stopAdjusting,
                                                                onTouchStart: ()=>startAdjusting(-0.1),
                                                                onTouchEnd: stopAdjusting,
                                                                className: "w-8 h-8 rounded-full bg-gradient-to-b from-[#1BE7FF] via-[#1BE7FF]/80 to-[#1BE7FF]/60 text-black font-bold text-xl shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75",
                                                                style: {
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                                },
                                                                children: "−"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 638,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setShowPresetModal(true),
                                                                className: "w-11 h-11 rounded-full bg-gradient-to-b from-[#1BE7FF] via-[#1BE7FF]/80 to-[#1BE7FF]/60 text-black shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75 flex items-center justify-center",
                                                                style: {
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fas fa-layer-group text-sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/PLINKO/app/page.tsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 17
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 651,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onMouseDown: ()=>startAdjusting(0.1),
                                                                onMouseUp: stopAdjusting,
                                                                onMouseLeave: stopAdjusting,
                                                                onTouchStart: ()=>startAdjusting(0.1),
                                                                onTouchEnd: stopAdjusting,
                                                                className: "w-8 h-8 rounded-full bg-gradient-to-b from-[#1BE7FF] via-[#1BE7FF]/80 to-[#1BE7FF]/60 text-black font-bold text-xl shadow-xl shadow-black/60 border-b-4 border-[#1BE7FF]/80 hover:from-[#1BE7FF] hover:via-[#1BE7FF]/90 hover:to-[#1BE7FF]/70 hover:shadow-black/80 hover:border-[#1BE7FF] active:shadow-inner active:shadow-black/40 active:border-[#1BE7FF]/60 active:scale-95 transition-all duration-75",
                                                                style: {
                                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.6), 0 0 20px rgba(27, 231, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                                },
                                                                children: "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                                lineNumber: 660,
                                                                columnNumber: 15
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/PLINKO/app/page.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 13
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/PLINKO/app/page.tsx",
                                                lineNumber: 571,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/PLINKO/app/page.tsx",
                                        lineNumber: 453,
                                        columnNumber: 9
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/PLINKO/app/page.tsx",
                                lineNumber: 441,
                                columnNumber: 7
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/PLINKO/app/page.tsx",
                        lineNumber: 414,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$AutoPlayModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                open: showAutoPlayModal,
                                onOpenChange: setShowAutoPlayModal,
                                onStart: handleStartAutoPlay,
                                currentBalance: gameState.balance
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/app/page.tsx",
                                lineNumber: 681,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$PresetAmountsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                open: showPresetModal,
                                onOpenChange: setShowPresetModal,
                                onSelectAmount: setWagerWithPersistence
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/app/page.tsx",
                                lineNumber: 688,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$ExtendedHistoryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                open: showExtendedHistory,
                                onOpenChange: setShowExtendedHistory,
                                history: history
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/app/page.tsx",
                                lineNumber: 694,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$PLINKO$2f$components$2f$CustomAmountModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                open: showCustomAmountModal,
                                onOpenChange: setShowCustomAmountModal,
                                onSetAmount: setWagerWithPersistence,
                                currentAmount: wager
                            }, void 0, false, {
                                fileName: "[project]/PLINKO/app/page.tsx",
                                lineNumber: 700,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/PLINKO/app/page.tsx",
                        lineNumber: 680,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/PLINKO/app/page.tsx",
                lineNumber: 413,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/PLINKO/app/page.tsx",
        lineNumber: 396,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(Home, "6rT8juMLYs1TCYsj+8/gN/k6kRQ=");
_c1 = Home;
const __TURBOPACK__default__export__ = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "IntroScreen");
__turbopack_context__.k.register(_c1, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=PLINKO_20b5d10f._.js.map