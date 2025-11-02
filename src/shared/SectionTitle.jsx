import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({title}) => {
  return (
    <div className="relative text-center mb-14">
      <motion.h2 
      initial={{scale : 0.7 , opacity : 0.5} }
      whileInView={{scale : 1 , opacity : 0.2}}
      transition={{duration : 0.65}}
      viewport={{amount : 0.5}}
      className="text-[45px] sm:text-6xl md:text-[72px] lg:text-[90px]  font-bold uppercase opacity-15">
        {title.toUpperCase()}
      </motion.h2>
      <p className="text-shadow-[2px_2px_10px_rgb(0_0_0/0.15)] text-shadow-primary/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral">
        {title}
      </p>
    </div>
  );
};

export default SectionTitle;
