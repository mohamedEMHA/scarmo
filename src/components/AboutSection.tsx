import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import aboutBg from '@/assets/about-bg.jpg';

const AboutSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { number: '2019', label: 'Founded' },
    { number: '10K+', label: 'Happy Customers' },
    { number: '100%', label: 'Premium Materials' },
    { number: '5★', label: 'Average Rating' },
  ];

  return (
    <section id="about" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{ backgroundImage: `url(${aboutBg})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
              Crafting Excellence Since 2019
            </h2>
            
            <motion.p
              className="text-xl lg:text-2xl font-light mb-8 text-white/90"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              At Scarmo, we believe that exceptional menswear should be an expression 
              of personal style and uncompromising quality.
            </motion.p>

            <motion.div
              className="prose prose-lg prose-invert mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg leading-relaxed">
                Founded by a team of passionate designers and craftsmen, our brand emerged 
                from a simple belief: every man deserves clothing that not only looks 
                exceptional but feels exceptional too. We source the finest materials from 
                around the world, from premium Egyptian cotton to luxurious cashmere, 
                ensuring each piece in our collection meets the highest standards of quality 
                and comfort.
              </p>
              
              <p className="text-lg leading-relaxed">
                Our commitment to sustainable fashion means we work closely with ethical 
                manufacturers who share our values of fair trade and environmental 
                responsibility. When you choose Scarmo, you're not just choosing premium 
                menswear – you're investing in a philosophy of excellence that extends 
                beyond the fabric to the very foundation of how we do business.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-white/80 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Values */}
            <motion.div
              className="mt-16 grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                {
                  title: 'Premium Quality',
                  description: 'Every piece is crafted from the finest materials with meticulous attention to detail.',
                },
                {
                  title: 'Timeless Design',
                  description: 'Our designs transcend trends, offering classic elegance that never goes out of style.',
                },
                {
                  title: 'Sustainable Fashion',
                  description: 'We are committed to ethical practices and environmental responsibility in every aspect.',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-accent">
                    {value.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;