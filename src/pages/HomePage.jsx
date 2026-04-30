import { useState, useEffect, useRef, memo } from 'react'
import '../App.css'
import profileImage from '../images/avatar.jpg'
import ProfileCard from '../components/ProfileCard'

// Componente de partículas animadas (optimizado con memo)
const ParticleBackground = memo(() => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Crear partículas
    const createParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1
        })
      }
    }

    createParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(100, 108, 255, 0.1)'
        ctx.fill()

        // Conectar partículas cercanas
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(100, 108, 255, ${0.1 - distance / 1000})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
})

ParticleBackground.displayName = 'ParticleBackground'

// Componente de efecto typewriter (optimizado con memo)
const TypewriterText = memo(({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return <span>{displayText}<span className="cursor">|</span></span>
})

TypewriterText.displayName = 'TypewriterText'

// Componente de tarjeta con efecto hover (optimizado con memo)
const ProjectCard = memo(({ title, description, tech, link }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tech-stack">
          {tech.map((t, i) => (
            <span key={i} className="tech-tag">{t}</span>
          ))}
        </div>
        <a href={link} className="project-link" target="_blank" rel="noopener noreferrer">
          Ver Proyecto →
        </a>
      </div>
      <div className="card-glow"></div>
    </div>
  )
})

ProjectCard.displayName = 'ProjectCard'

const HomePage = memo(() => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="portfolio">
      <ParticleBackground />
      
      {/* Header */}
      <header className={`header ${isVisible ? 'visible' : ''}`}>
        <nav className="nav">
          <div className="nav-brand">Portfolio</div>
          <div className="nav-links">
            <a href="#about">Sobre mí</a>
            <a href="#projects">Proyectos</a>
            <a href="#contact">Contacto</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <TypewriterText text="Hola, soy RzenDev" />
          </h1>
          <p className="hero-subtitle">
            Desarrollador Frontend autodidacta, creando experiencias digitales con tecnologías modernas
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Ver Proyectos</button>
            <button className="btn-secondary">Contactar</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <div className="code-snippet">
              <div className="code-line">
                <span className="code-keyword">const</span> 
                <span className="code-variable"> developer</span> = 
                <span className="code-string">'Frontend'</span>
              </div>
              <div className="code-line">
                <span className="code-keyword">return</span> 
                <span className="code-string">'Amazing UI'</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">Sobre mí</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Desarrollador frontend autodidacta con experiencia en WordPress y 
                tecnologías modernas. Mi trayectoria comenzó con un curso de HTML, CSS y JavaScript, 
                y desde entonces he estado explorando React, Laravel y otras tecnologías.
              </p>
              <p>
                He trabajado en proyectos reales como <a href="https://eficonsulting.es/" target="_blank" rel="noopener noreferrer">Eficonsulting</a> y 
                <a href="https://nomads-living.com/" target="_blank" rel="noopener noreferrer"> Nomads Living</a>, 
                donde he aprendido sobre migraciones, hosting, DNS y optimización de sitios web.
              </p>
              <div className="skills">
                <h3>Habilidades</h3>
                <div className="skill-tags">
                  {['HTML5', 'CSS3', 'JavaScript', 'React', 'WordPress', 'PHP', 'Laravel', 'Git', 'Docker'].map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-visual">
              <ProfileCard
                avatarUrl={profileImage}
                name="RzenDev"
                title="Desarrollador Frontend"
                handle="rzendev"
                status="Disponible"
                contactText="Contactar"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact clicked')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Proyectos</h2>
          <div className="projects-grid">
            <ProjectCard
              title="Eficonsulting.es"
              description="Sitio web corporativo para asesoría energética. Desarrollado en WordPress con migraciones masivas de email y optimización de DNS."
              tech={['WordPress', 'PHP', 'CSS3', 'JavaScript']}
              link="https://eficonsulting.es/"
            />
            <ProjectCard
              title="Nomads Living"
              description="Plataforma de colivings para nómadas digitales. Modificaciones en functions.php y implementación de funcionalidades personalizadas."
              tech={['WordPress', 'PHP', 'Elementor Pro', 'MySQL']}
              link="https://nomads-living.com/"
            />
            <ProjectCard
              title="Kleij Laboratory"
              description="Sitio web para el laboratorio de investigación del Prof. Arjan W. Kleij. Portal académico con publicaciones, miembros del grupo y galería de fotos."
              tech={['WordPress', 'PHP', 'CSS3', 'JavaScript']}
              link="https://groupkleij.com/"
            />
            <ProjectCard
              title="El Morabito"
              description="Sitio web para restaurante en Ronda. Mi primer proyecto con código nativo, desarrollado con Vercel. Frontend completo con sistema de reservas y menús."
              tech={['HTML5', 'CSS3', 'JavaScript', 'Vercel']}
              link="https://el-morabito.vercel.app/"
            />
            <ProjectCard
              title="AmpWave Music Player"
              description="Reproductor de música inspirado en Winamp con estética retro 90s. Incluye ecualizador visual, drag & drop y modo oscuro cyberpunk."
              tech={['HTML5', 'CSS3', 'JavaScript', 'Web Audio API']}
              link="https://ampwave-music-player.vercel.app/"
            />
            <ProjectCard
              title="Muros de Escollera San Juan"
              description="Sitio web para software de cálculo de muros de escollera. Desarrollo completo desde local hasta producción en Ionos. Diseño funcional para audiencia técnica."
              tech={['WordPress', 'PHP', 'CSS3', 'Ionos']}
              link="https://murosdeescollerasanjuan.es/"
            />
            <ProjectCard
              title="Portfolio React"
              description="Portafolio personal desarrollado con React y Vite. Incluye efectos modernos, partículas animadas y diseño responsive."
              tech={['React', 'Vite', 'CSS3', 'JavaScript']}
              link="https://github.com/RzenDev"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Contacto</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>¡Hablemos!</h3>
              <p>¿Tienes un proyecto en mente? Me encantaría escuchar sobre él.</p>
              <div className="contact-links">
                <a href="https://github.com/RzenDev" className="contact-link">
                  <span className="contact-icon">🐙</span>
                  GitHub
                </a>
                <a href="https://linkedin.com/in/pablo-marin-dev" className="contact-link">
                  <span className="contact-icon">💼</span>
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <input type="text" placeholder="Tu nombre" />
                <input type="email" placeholder="Tu email" />
                <textarea placeholder="Tu mensaje" rows="5"></textarea>
                <button type="submit" className="btn-primary">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

HomePage.displayName = 'HomePage'

export default HomePage

