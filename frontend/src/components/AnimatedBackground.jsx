import { motion } from "framer-motion";

function AnimatedBackground() {

    return (

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

            {/* GLOW 1 */}
            <motion.div
                animate={{
                    x: [0, 100, -100, 0],
                    y: [0, -50, 50, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity
                }}
                className="
                    absolute
                    top-0
                    left-0
                    w-[500px]
                    h-[500px]
                    bg-purple-600/20
                    rounded-full
                    blur-3xl
                "
            />

            {/* GLOW 2 */}
            <motion.div
                animate={{
                    x: [0, -100, 100, 0],
                    y: [0, 50, -50, 0]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity
                }}
                className="
                    absolute
                    bottom-0
                    right-0
                    w-[500px]
                    h-[500px]
                    bg-cyan-500/20
                    rounded-full
                    blur-3xl
                "
            />

            {/* GLOW 3 */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity
                }}
                className="
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[400px]
                    h-[400px]
                    bg-pink-500/10
                    rounded-full
                    blur-3xl
                "
            />

        </div>

    );
}

export default AnimatedBackground;