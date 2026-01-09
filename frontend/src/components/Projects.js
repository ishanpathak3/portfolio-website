import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

function Projects({ projects }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="projects"
      ref={ref}
      className="section relative overflow-hidden bg-[#030303]"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-dark-200 font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2 justify-center">
            <span className="font-mono text-white">&lt;</span> Portfolio <span className="font-mono text-white">/&gt;</span>
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-lg text-dark-300">
            A collection of my recent work — from accessible voting platforms to full-stack applications. 
            Each project represents a unique challenge I've tackled with <span className="text-white font-semibold">passion</span> and <span className="text-white font-semibold">precision</span>.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center glass-card border border-white/10 p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-4">
            Want to see more?
          </h3>
          <p className="text-dark-300 mb-6">
            Check out my GitHub for more projects, experiments, and open-source contributions.
          </p>
          <motion.a
            href="https://github.com/ishanpathak3?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
            View All on GitHub
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;