import React from 'react'
import { motion } from 'framer-motion'
function ScaleWrapper({ children, id }) {
    return (
        <motion.div key={id} whileHover={{
            z: 1,
            scale: 1.2,
            transition: {
                duration: .1
            }
        }}>
            {children}
        </motion.div>
    )
}

export default ScaleWrapper
