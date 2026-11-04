import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Zap, Globe, Shield, Code, Palette,
  ArrowRight, Star, ChevronLeft, ChevronRight,
  Menu, X, Play, Send, MousePointer2, Layers,
  Rocket, Users, Award, TrendingUp
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { useMousePosition } from './hooks';
import confetti from 'canvas-confetti';

// ==================== NAVBAR ====================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['Inicio', 'Servicios', 'Proyectos', 'Testimonios', 'Contacto'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-xl font-bold"
        >
          <div className="w-8 h-8 rounded-lg animated-gradient flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-gradient">NexusFlow</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm text-gray-300 hover:text-white transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
          >
            Empezar
          </motion.button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-2xl p-6"
          >
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="block py-3 text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ==================== HERO ====================
function Hero() {
  const mouse = useMousePosition();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b']
    });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </motion.div>

      {/* Mouse follower */}
      <div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          left: mouse.x - 128,
          top: mouse.y - 128,
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-gray-300"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Disponible para nuevos proyectos
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          Creamos{' '}
          <span className="text-gradient">experiencias</span>
          <br />
          digitales{' '}
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block"
          >
            ✨
          </motion.span>
          <br />
          <span className="text-gradient">extraordinarias</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Transformamos ideas en productos digitales que cautivan, inspiran y generan resultados.
          Diseño + Tecnología + Creatividad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConfetti}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2 shadow-xl"
          >
            <Rocket size={18} />
            Explorar Proyectos
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full glass text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <Play size={18} />
            Ver Demo
          </motion.button>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Next.js'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="px-4 py-2 rounded-full glass text-sm text-gray-300 hover:text-white hover:border-indigo-500/50 transition-all cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-500 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-indigo-400"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ==================== SERVICES ====================
function Services() {
  const services = [
    { icon: Code, title: 'Desarrollo Web', desc: 'Aplicaciones web modernas con las últimas tecnologías y frameworks.', color: 'from-blue-500 to-cyan-500' },
    { icon: Palette, title: 'Diseño UI/UX', desc: 'Interfaces intuitivas que enamoran a los usuarios desde el primer clic.', color: 'from-purple-500 to-pink-500' },
    { icon: Globe, title: 'Apps Móviles', desc: 'Experiencias nativas multiplataforma con rendimiento excepcional.', color: 'from-orange-500 to-red-500' },
    { icon: Shield, title: 'Ciberseguridad', desc: 'Protección avanzada para tus activos digitales y datos sensibles.', color: 'from-green-500 to-emerald-500' },
    { icon: Zap, title: 'Optimización', desc: 'Rendimiento extremo. Tu sitio cargará en milisegundos.', color: 'from-yellow-500 to-amber-500' },
    { icon: Layers, title: 'Cloud & DevOps', desc: 'Infraestructura escalable y automatizada para crecer sin límites.', color: 'from-indigo-500 to-violet-500' },
  ];

  return (
    <section id="servicios" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Nuestros Servicios</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Soluciones que <span className="text-gradient">impulsan</span> tu negocio
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Combinamos creatividad y tecnología para crear productos digitales que marcan la diferencia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl glass card-shine cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              <div className="mt-5 flex items-center gap-2 text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Saber más <ArrowRight size={14} />
              </div>
              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== STATS ====================
function Stats() {
  const stats = [
    { value: 250, suffix: '+', label: 'Proyectos Completados', icon: Rocket },
    { value: 98, suffix: '%', label: 'Clientes Satisfechos', icon: Users },
    { value: 15, suffix: '+', label: 'Años de Experiencia', icon: Award },
    { value: 40, suffix: 'M', label: 'Usuarios Alcanzados', icon: TrendingUp },
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <stat.icon size={22} className="text-indigo-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== PROJECTS ====================
function Projects() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const filters = ['Todos', 'Web', 'Mobile', 'Branding', 'UI/UX'];

  const projects = [
    { title: 'Fintech Dashboard', category: 'Web', color: 'from-blue-600 to-cyan-500', desc: 'Plataforma de análisis financiero en tiempo real' },
    { title: 'EcoTrack App', category: 'Mobile', color: 'from-green-600 to-emerald-500', desc: 'App de seguimiento de huella de carbono' },
    { title: 'Luxe Brand', category: 'Branding', color: 'from-amber-600 to-orange-500', desc: 'Identidad visual para marca de lujo' },
    { title: 'HealthHub', category: 'UI/UX', color: 'from-pink-600 to-rose-500', desc: 'Rediseño de plataforma de salud digital' },
    { title: 'CryptoVault', category: 'Web', color: 'from-purple-600 to-violet-500', desc: 'Exchange de criptomonedas descentralizado' },
    { title: 'FoodieGo', category: 'Mobile', color: 'from-red-600 to-pink-500', desc: 'Delivery de comida con IA predictiva' },
  ];

  const filtered = activeFilter === 'Todos' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section id="proyectos" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Proyectos <span className="text-gradient">destacados</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cada proyecto es una historia de innovación, colaboración y resultados excepcionales.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} p-8 flex flex-col justify-end relative`}>
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl bg-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                  
                  <div className="relative z-10">
                    <span className="text-xs font-medium text-white/70 bg-white/10 px-3 py-1 rounded-full">{project.category}</span>
                    <h3 className="text-xl font-bold text-white mt-3">{project.title}</h3>
                    <p className="text-white/70 text-sm mt-1">{project.desc}</p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                    >
                      <ArrowRight className="text-gray-900" size={20} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== TESTIMONIALS ====================
function Testimonials() {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    { name: 'María García', role: 'CEO, TechStart', text: 'NexusFlow transformó completamente nuestra presencia digital. El equipo es excepcional y los resultados superaron todas nuestras expectativas.', rating: 5 },
    { name: 'Carlos López', role: 'Director, InnovateLab', text: 'Profesionalismo de primer nivel. Entregaron un producto increíble en tiempo récord. Sin duda volveremos a trabajar juntos.', rating: 5 },
    { name: 'Ana Martínez', role: 'Fundadora, EcoVerde', text: 'La mejor inversión que hemos hecho. Nuestra app ha recibido más de 100K descargas en el primer mes gracias a su diseño.', rating: 5 },
    { name: 'Roberto Sánchez', role: 'CTO, DataFlow', text: 'Su expertise técnico y creatividad son incomparables. Cada detalle fue pensado con el usuario en mente.', rating: 5 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonios" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Testimonios</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Lo que dicen nuestros <span className="text-gradient">clientes</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <div>
                <p className="font-bold text-white">{testimonials[current].name}</p>
                <p className="text-indigo-400 text-sm">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? 'bg-indigo-500 w-8' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== CONTACT ====================
function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.7 } });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contacto" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-indigo-400 text-sm font-medium tracking-wider uppercase">Contacto</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
              ¿Listo para <span className="text-gradient">empezar</span>?
            </h2>
            <p className="text-gray-400 mb-8">
              Cuéntanos sobre tu proyecto y juntos crearemos algo extraordinario.
              Respondemos en menos de 24 horas.
            </p>

            <div className="space-y-4">
              {[
                { icon: Send, text: 'hola@nexusflow.dev' },
                { icon: Globe, text: 'Madrid, España' },
                { icon: MousePointer2, text: 'Lun - Vie, 9:00 - 18:00' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-gray-300">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <item.icon size={18} className="text-indigo-400" />
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-5"
          >
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Nombre</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors text-white"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors text-white"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Mensaje</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors text-white resize-none"
                placeholder="Cuéntanos sobre tu proyecto..."
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/30 transition-shadow"
            >
              {sent ? (
                <>¡Mensaje Enviado! ✨</>
              ) : (
                <>Enviar Mensaje <Send size={16} /></>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// ==================== MARQUEE ====================
function Marquee() {
  const items = ['Diseño Web', '•', 'Apps Móviles', '•', 'Branding', '•', 'UI/UX', '•', 'E-Commerce', '•', 'SEO', '•', 'Marketing Digital', '•'];
  return (
    <div className="py-8 overflow-hidden border-y border-white/5">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`text-2xl md:text-3xl font-bold ${item === '•' ? 'text-indigo-500' : 'text-gray-600 hover:text-white transition-colors cursor-default'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg animated-gradient flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="text-gradient font-bold">NexusFlow</span>
        </div>
        <p className="text-gray-500 text-sm">
          © 2026 NexusFlow. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
            <a key={social} href="#" className="text-gray-500 hover:text-indigo-400 text-sm transition-colors">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Stats />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
