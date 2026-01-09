import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink} from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

export default function ProjectCard({ project, index }) {
  const imageSrc = require(`../assets/${project.imageUrl}`);
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      className="group relative h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Border glow on hover */}
      <div
        className={`absolute -inset-1 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur-lg transition-opacity duration-300 ${
          isHovered ? 'opacity-60' : 'opacity-0'
        }`}
      />

      {/* Main card */}
      <div className="relative glass-card border border-white/10 h-full flex flex-col overflow-hidden">
        {/* Image container */}
        <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-dark-800 to-dark-900">
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
            style={{ transform: 'translateZ(20px)' }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

          {/* Tech stack on hover */}
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 glass-card text-white text-xs font-medium border border-white/20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: i * 0.05, type: 'spring' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Project number badge */}
          <div className="absolute top-4 right-4 w-12 h-12 glass-card flex items-center justify-center font-mono font-bold text-white text-lg border border-white/20">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Live indicator */}
          {project.liveUrl && (
            <motion.div
              className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 glass-card text-xs font-medium text-white border border-white/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Live
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col" style={{ transform: 'translateZ(40px)' }}>
          {/* Title */}
          <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-dark-100 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-dark-300 mb-6 leading-relaxed flex-1 text-sm">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white font-medium hover:text-dark-200 transition-colors group/link"
                whileHover={{ x: 5 }}
              >
                <span className="text-sm">View Live</span>
                <ExternalLink className="w-3 h-3 group-hover/link:rotate-45 transition-transform" />
              </motion.a>
            )}
            
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 glass-card text-dark-300 hover:text-white transition-colors ml-auto text-sm border border-white/5 hover:border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <FiGithub className="w-4 h-4" />
                <span>Code</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/5 to-transparent pointer-events-none" />
      </div>
    </motion.article>
  );
}