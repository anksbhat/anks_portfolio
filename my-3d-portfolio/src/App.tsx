

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, SoftShadows, Html } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import { Group } from 'three';
// Floating math formulas for background
const MATH_FORMULAS = [
  'E = mc²',
  'x = [-b ± √(b²-4ac)] / 2a',
  '∫₀^∞ e^{-x²} dx = √π / 2',
  'f(x) = sin(x)',
  'a² + b² = c²',
  '∇·E = ρ/ε₀',
  'z_{n+1} = z_n² + c',
  'σ = √[Σ(xᵢ-μ)²/N]',
  'd/dx e^x = e^x',
  'limₓ→₀ (sinx)/x = 1',
];

type FloatingFormulaProps = {
  formula: string;
  position: [number, number, number];
  floatSpeed: number;
  rotSpeed: number;
  fontSize?: number;
};

function FloatingFormula({ formula, position, floatSpeed, rotSpeed, fontSize = 32 }: FloatingFormulaProps) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      // Floating up and down
      ref.current.position.y = position[1] + Math.sin(t * floatSpeed) * 0.4;
      // Rotating
      ref.current.rotation.y = t * rotSpeed;
      ref.current.rotation.x = t * rotSpeed * 0.5;
    }
  });
  return (
    <group ref={ref} position={position}>
      <Html
        center
        style={{
          color: 'rgba(255,255,255,0.18)',
          fontFamily: 'VT323, monospace',
          fontWeight: 700,
          fontSize,
          letterSpacing: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          textShadow: '0 2px 12px #0008',
          whiteSpace: 'nowrap',
        }}
        zIndexRange={[0, 0]}
      >
        {formula}
      </Html>
    </group>
  );
}
// ...existing code...
import emailjs from 'emailjs-com';
import { Mesh } from 'three';

function RotatingGrid() {
  const mesh = useRef<Mesh>(null!);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.002;
      mesh.current.rotation.y += 0.003;
      mesh.current.rotation.z += 0.001;
    }
  });
  return (
    <mesh ref={mesh} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[10, 10, 20, 20]} />
      <meshStandardMaterial color="#f5f5f5" wireframe side={2} />
    </mesh>
  );
}



type SpheresProps = {
  active: number | null;
  setActive: (idx: number | null) => void;
};

function Spheres({ active, setActive }: SpheresProps) {
  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    setSent(false);
    emailjs.send(
      'service_d3hm54z',
      'template_2if38vp',
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      'AslhUoFncFC8hOuaF'
    )
      .then(() => {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setError('Failed to send. Please try again.');
      })
      .finally(() => setSending(false));
  }
  // Spheres arranged vertically, each positioned in a small-radius circle (vertical helix/circular column)
  const labels = [
    'Contact',         // 0
    'Extracurricular', // 1
    'Work Experience', // 2
    'Certifications',  // 3
    'Skills',          // 4
    'Projects',        // 5
    'Education',       // 6
    'About',           // 7
  ];
  const descriptions = [
    [
      'Bengaluru, IN',
      'P: +91 6360080852',
      {
        type: 'email',
        text: 'ankithashridharbhat@gmail.com',
        link: 'https://mail.google.com/mail/?view=cm&fs=1&to=ankithashridharbhat@gmail.com'
      },
      {
        type: 'linkedin',
        text: 'Linkedin',
        link: 'https://www.linkedin.com/in/ankitha-bhat-436611255/'
      },
      {
        type: 'github',
        text: 'Github',
        link: 'https://github.com/anksbhat/'
      }
    ], // Contact
    [
      'GOOGLE DEVELOPERS STUDENT CLUB | Bengaluru, IN',
      'Core Team Member | May 2023 – October 2024',
      'Orchestrated and delivered 10+ technical workshops and seminars, genuinely leveling up peer knowledge in emerging technologies.',
      'As a core team member, I actively contributed to driving engagement and skill-building initiatives for 200+ participants.'
    ],  // Activities
    [
      [
        'SIEMENS TECHNOLOGY AND SERVICES | Bengaluru, IN',
        'Intern - Machine Learning | February 2025 - Present',
        'Developing Proof-of-Concepts (POCs) for Tiny Machine Learning applications focused on predictive maintenance in self-optimizing grids.',
        'Tech Stack: TinyML, Podman, TensorFlow, Python.'
      ],
      [
        'HUBS (An Early Stage Startup) | Bengaluru, IN',
        'Software Developer | March 2024 – July 2024',
        'Led a team of 4 in the design and development of an MVP Android application using Flutter, successfully delivering the project within 4 months and demonstrating strong software design capabilities.',
        'Achieved recognition as one of the top 100 ideas at START Mahakumbh, G20 Summit 2024, highlighting the app\'s significant potential for real-world impact.'
      ],
      [
        'NUCLEAR POWER CORPORATION OF INDIA | Karwar, KA, IN',
        'Software Engineering Intern | November 2023 - December 2023',
        'Designed and developed a robust Library Management Software utilizing HTML5, CSS, ColdFusion Markup Language, and MS SQL, which reduced cataloging and check-out times by 30%.',
        'Collaborated with scientists and senior developers on code reviews in C, enhancing network security protocols and ensuring system reliability.'
      ]
    ], // Work Experience
    [
      'Supervised Machine Learning: Regression and Classification (deeplearning.ai)',
      'Certifications & Training: IBM Data Science Professional (Coursera)',
      'Elements of AI (University of Helsinki)',
      'Introduction to C (NPTEL)',
      'Google Cloud Study Jams.'
    ], // Certifications
    [
      'Technical Skills: Python, HTML/CSS, TensorFlow, Machine Learning, Java, R, Linux.',
      'Familiar with: Podman, Docker, Javascript, Typescript, React, Spring Boot, RAG, Transformer Architecture, LLMs, NLP.',
      'Languages: English (fluent), German (beginner), Hindi (regional proficiency), Kannada (native)'
    ], // Skills
    [
      {
        text: 'Neighborhood Issue Tracker (STINC): Developed an Android application in Flutter with PostgreSQL integration, enabling users to post and vote on local issues, fostering community engagement. Implemented post feed and add-post functionalities for a seamless user experience.',
        link: 'https://github.com/anksbhat/STINC',
      },
      {
        text: 'Deep Fake Detection Model: Fine-tuned ResNet to identify forged images, achieving high accuracy in detecting subtle inconsistencies unique to deep fakes using a labeled dataset.',
        link: 'https://github.com/anksbhat/DeepFake-Detection-Model',
      },
      {
        text: 'Fault Detection in IEEE 9-Bus Power System: Classified different fault types occurring in an IEEE 9-bus power system using Vision Transformers (Swin Transformer and CrossViT) adapted to work with non-image signal data.',
        link: 'https://github.com/anksbhat/fault_detection_transformer',
      },
      {
        text: 'Distribyte: An AI-powered Bi-LSTM model for sales demand forecasting across multiple decentralized nodes.',
        link: 'https://github.com/anksbhat/distribtyteapp',
      },
    ], // Projects
    [
      'MVJ COLLEGE OF ENGINEERING | Bengaluru, KA, IN',
      'Bachelor of Engineering | 2021 - 2025',
      [
        'Major in Computer Science and Data Science',
        'Cumulative GPA: 8.9/10',
        'Relevant Coursework: Artificial Intelligence, Machine Learning, Operating Systems, Data Structures and Algorithms, Computer Networks.'
      ]
    ], // Education
    [
      'Proactive ML/Software Engineer fresher constantly leveling up',
      'Passionate about applying ML to real-world challenges',
      'Continuously expanding technical toolkit',
      'I channel my creativity through photo journaling and reading books',
    ], // About
  ];
  const count = labels.length;
  const spacing = 1.5; // increased space between spheres
  const circleRadius = 1.2; // reduced radius for tighter circle
  const groupRef = useRef<Group>(null!);
  // active and setActive are now passed as props from App
  // Animate the group to rotate vertically (around Y axis) only if no panel is open
  useFrame(() => {
    if (groupRef.current && active === null) {
      groupRef.current.rotation.y += 0.003;
    }
  });
  const spheres = [];
  // Center the vertical stack at y=0
  const startY = -((count - 1) * spacing) / 2;
  for (let i = 0; i < count; i++) {
    const y = startY + i * spacing;
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * circleRadius;
    const z = Math.sin(angle) * circleRadius + 2.5;
    const meshRef = useRef<Mesh>(null!);
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
      }
    });
    // Place a spotlight above each sphere for shadow effect
    spheres.push(
      <group key={i}>
        <spotLight
          position={[x, y + 2, z]}
          angle={Math.PI / 4}
          intensity={1.2}
          penumbra={0.7}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <mesh
          ref={meshRef}
          position={[x, y, z]}
          castShadow
          receiveShadow
          onClick={() => setActive(i)}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#888" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Label overlay using HTML */}
        {/* Hide floating label when any panel is open, except for the active sphere (which is shown in the glass panel) */}
        {active === null && (
          <Html
            position={[x, y, z + 0.7]}
            center
            style={{ pointerEvents: 'none' }}
          >
            <span
              style={{
                color: '#fff',
                fontFamily: 'VT323, monospace',
                fontWeight: 500,
                fontSize: 18,
                textAlign: 'center',
                letterSpacing: 1,
                userSelect: 'none',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
              onClick={() => setActive(i)}
            >
              {labels[i]}
            </span>
          </Html>
        )}
        {/* Glass panel, line, and dot when active */}
        {active === i && (
          <Html
            position={[0, 0.5, 2.5]}
            center
            zIndexRange={[20, 10]}
            style={{ pointerEvents: 'auto' }}
          >
            {/* Glass panel centered above the mesh grid in 3D space */}
            <div
              style={{
                width: 360,
                height: 480, // 3:4 aspect ratio
                minWidth: 240,
                maxWidth: 420,
                minHeight: 320,
                maxHeight: 560,
                padding: '32px 36px',
                borderRadius: 22,
                background: 'rgba(255,255,255,0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '2px solid rgba(255,255,255,0.3)',
                color: '#fff',
                fontFamily: 'VT323, monospace',
                fontWeight: 700,
                fontSize: 22,
                textAlign: 'center',
                letterSpacing: 1,
                userSelect: 'none',
                pointerEvents: 'auto',
                cursor: 'default',
                zIndex: 101,
                transition: 'box-shadow 0.2s',
                position: 'relative',
                overflowY: 'auto',
                overflowX: 'hidden',
                boxSizing: 'border-box',
              }}
              onClick={e => e.stopPropagation()}
            >
              <span style={{ fontWeight: 700, fontSize: 28, color: '#fff', fontFamily: 'VT323, monospace', letterSpacing: 1 }}>{labels[i]}</span>
              <br />
              {i === 0 && Array.isArray(descriptions[0]) ? (
                <div style={{
                  textAlign: 'left',
                  margin: '18px 0 0 0',
                  padding: '0 0 0 8px',
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#fff',
                  opacity: 0.98,
                  fontFamily: 'VT323, monospace',
                  letterSpacing: 0.5,
                  lineHeight: 1.5,
                }}>
                  <div style={{ marginBottom: 4 }}>{(descriptions[0] as any[])[0]}</div>
                  <div style={{ marginBottom: 4 }}>{(descriptions[0] as any[])[1]}</div>
                  <div style={{ marginBottom: 4 }}>
                    <a
                      href={(descriptions[0] as any[])[2].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#90caf9',
                        textDecoration: 'underline',
                        fontFamily: 'VT323, monospace',
                        fontWeight: 600,
                        fontSize: 18,
                        marginRight: 12,
                      }}
                      title="Email Ankitha Bhat"
                    >
                      {(descriptions[0] as any[])[2].text}
                    </a>
                  </div>
                  <div style={{ marginBottom: 4 }}>
                    <a
                      href={(descriptions[0] as any[])[3].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#90caf9',
                        textDecoration: 'underline',
                        fontFamily: 'VT323, monospace',
                        fontWeight: 600,
                        fontSize: 18,
                        marginRight: 12,
                      }}
                      title="LinkedIn"
                    >
                      {(descriptions[0] as any[])[3].text}
                    </a>
                    <a
                      href={(descriptions[0] as any[])[4].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#90caf9',
                        textDecoration: 'underline',
                        fontFamily: 'VT323, monospace',
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                      title="GitHub"
                    >
                      {(descriptions[0] as any[])[4].text}
                    </a>
                  </div>
                  <form onSubmit={handleFormSubmit} style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: 18,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1.5px solid #fff6',
                        background: 'rgba(255,255,255,0.12)',
                        color: '#fff',
                        outline: 'none',
                        marginBottom: 0,
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Gmail"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: 18,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1.5px solid #fff6',
                        background: 'rgba(255,255,255,0.12)',
                        color: '#fff',
                        outline: 'none',
                        marginBottom: 0,
                      }}
                    />
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={form.message}
                      onChange={handleFormChange}
                      required
                      rows={4}
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: 18,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1.5px solid #fff6',
                        background: 'rgba(255,255,255,0.12)',
                        color: '#fff',
                        outline: 'none',
                        resize: 'vertical',
                        marginBottom: 0,
                      }}
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: 20,
                        fontWeight: 700,
                        padding: '10px 0',
                        borderRadius: 8,
                        border: 'none',
                        background: '#90caf9',
                        color: '#111',
                        cursor: sending ? 'not-allowed' : 'pointer',
                        marginTop: 2,
                        transition: 'background 0.2s, color 0.2s',
                        boxShadow: '0 2px 8px 0 #0002',
                      }}
                    >
                      {sending ? 'Sending...' : 'Send Message'}
                    </button>
                    {sent && <div style={{ color: '#7fff7f', fontSize: 18, marginTop: 4 }}>Message sent!</div>}
                    {error && <div style={{ color: '#ff7f7f', fontSize: 18, marginTop: 4 }}>{error}</div>}
                  </form>
                </div>
              ) : i === 1 && Array.isArray(descriptions[1]) ? (
                <div style={{
                  textAlign: 'left',
                  margin: '18px 0 0 0',
                  padding: '0 0 0 8px',
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#fff',
                  opacity: 0.98,
                  fontFamily: 'VT323, monospace',
                  letterSpacing: 0.5,
                  lineHeight: 1.5,
                }}>
                  <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{(descriptions[1] as string[])[0]}</div>
                  <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{(descriptions[1] as string[])[1]}</div>
                  <div style={{ marginBottom: 4 }}>{(descriptions[1] as string[])[2]}</div>
                  <div>{(descriptions[1] as string[])[3]}</div>
                </div>
              ) : i === 2 && Array.isArray(descriptions[2]) ? (
                <ol style={{
                  textAlign: 'left',
                  margin: '18px 0 0 0',
                  padding: '0 0 0 22px',
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#fff',
                  opacity: 0.98,
                  fontFamily: 'VT323, monospace',
                  letterSpacing: 0.5,
                  lineHeight: 1.5,
                }}>
                  {(descriptions[2] as string[][]).map((exp, idx) => (
                    <li key={idx} style={{ marginBottom: 16 }}>
                      <div style={{ marginBottom: 4, fontWeight: 700, fontSize: 20 }}>{exp[0]}</div>
                      <div style={{ marginBottom: 4, fontWeight: 600, fontSize: 18 }}>{exp[1]}</div>
                      <div style={{ marginBottom: 4 }}>{exp[2]}</div>
                      <div style={{}}>{exp[3]}</div>
                    </li>
                  ))}
                </ol>
              ) : i === 3 && Array.isArray(descriptions[3]) ? (
                <ul style={{
                  textAlign: 'left',
                  margin: '18px 0 0 0',
                  padding: '0 0 0 22px',
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#fff',
                  opacity: 0.98,
                  fontFamily: 'VT323, monospace',
                  letterSpacing: 0.5,
                  lineHeight: 1.5,
                }}>
                  {(descriptions[3] as string[]).map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>{item}</li>
                  ))}
                </ul>
              ) : i === 4 && Array.isArray(descriptions[4]) ? (
                <ul style={{
                  textAlign: 'left',
                  margin: '18px 0 0 0',
                  padding: '0 0 0 22px',
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#fff',
                  opacity: 0.98,
                  fontFamily: 'VT323, monospace',
                  letterSpacing: 0.5,
                  lineHeight: 1.5,
                }}>
                  {(descriptions[4] as string[]).map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>{item}</li>
                  ))}
                </ul>
              ) : i === 5 && Array.isArray(descriptions[5]) ? (
                <ol style={{
                  textAlign: 'left',
                  margin: '18px 0 0 0',
                  padding: '0 0 0 22px',
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#fff',
                  opacity: 0.98,
                  fontFamily: 'VT323, monospace',
                  letterSpacing: 0.5,
                  lineHeight: 1.5,
                }}>
                  {(descriptions[5] as {text: string, link: string}[]).map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 10, lineHeight: 1.6 }}>
                      <span style={{}}>
                        {item.text}
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            marginLeft: 4,
                            padding: '1px 4px',
                            background: '#fff',
                            color: 'rgb(0, 0, 238)', // Windows XP blue
                            fontFamily: 'VT323, monospace',
                            fontWeight: 600,
                            fontSize: 17,
                            border: '1px solid #e0e0e0',
                            borderRadius: 4,
                            textDecoration: 'none',
                            transition: 'color 0.2s, background 0.2s',
                            display: 'inline',
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                            boxShadow: '0 1px 4px 0 #0002',
                          }}
                          title="View on GitHub"
                        >
                          ↗
                        </a>
                      </span>
                    </li>
                  ))}
                </ol>
              ) : i === 6 && Array.isArray(descriptions[6]) ? (
                <>
                  <span style={{ fontWeight: 700, fontSize: 22, color: '#fff', fontFamily: 'VT323, monospace', letterSpacing: 0.5 }}>{(descriptions[6] as any[])[0]}</span>
                  <br />
                  <span style={{ fontWeight: 600, fontSize: 20, color: '#fff', fontFamily: 'VT323, monospace', letterSpacing: 0.5 }}>{(descriptions[6] as any[])[1]}</span>
                  <ul style={{
                    textAlign: 'left',
                    margin: '18px 0 0 0',
                    padding: '0 0 0 22px',
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#fff',
                    opacity: 0.98,
                    fontFamily: 'VT323, monospace',
                    letterSpacing: 0.5,
                    lineHeight: 1.5,
                  }}>
                    {((descriptions[6] as any[])[2] as string[]).map((item, idx) => (
                      <li key={idx} style={{ marginBottom: 6 }}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : i === 7 && Array.isArray(descriptions[7]) ? (
                <ul style={{
                  textAlign: 'left',
                  margin: '18px 0 0 0',
                  padding: '0 0 0 22px',
                  fontWeight: 600,
                  fontSize: 20,
                  color: '#fff',
                  opacity: 0.98,
                  fontFamily: 'VT323, monospace',
                  letterSpacing: 0.5,
                  lineHeight: 1.5,
                }}>
                  {(descriptions[7] as string[]).map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>{item}</li>
                  ))}
                </ul>
              ) : (
                <span style={{ fontWeight: 600, fontSize: 22, color: '#fff', opacity: 0.98, fontFamily: 'VT323, monospace', letterSpacing: 0.5 }}>
                  {(() => {
                    const desc = descriptions[i];
                    if (typeof desc === 'string') return desc;
                    if (Array.isArray(desc)) {
                      // Only join string elements, ignore objects/arrays
                      return desc.filter(item => typeof item === 'string').join(' ');
                    }
                    return '';
                  })()}
                </span>
              )}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 24,
                  fontSize: 28,
                  color: '#fff',
                  cursor: 'pointer',
                  opacity: 0.8,
                  fontFamily: 'VT323, monospace',
                }}
                onClick={() => setActive(null)}
                title="Close"
              >
                ×
              </div>
            </div>
          </Html>
        )}
      </group>
    );
  }
  return <group ref={groupRef}>{spheres}</group>;
}

export default function App() {
  // Add VT323 font from Google Fonts
  const [active, setActive] = useState<number|null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introText, setIntroText] = useState('');
  const fullIntro = "Hi I am Ankitha Bhat. I love building software and anything that involves math... ";

  useEffect(() => {
    let timeout1: number;
    let timeout2: number;
    let idx = 0;
    function typeLetter() {
      setIntroText(fullIntro.slice(0, idx));
      if (idx < fullIntro.length) {
        idx++;
        timeout1 = setTimeout(typeLetter, 24); // typing speed
      } else {
        timeout2 = setTimeout(() => setShowIntro(false), 1200); // show for 1.2s after typing
      }
    }
    typeLetter();
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111', fontFamily: 'VT323, monospace', position: 'relative' }}>
      <link
        href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
        rel="stylesheet"
      />
      {/* Responsive styles for overlays and panels */}
      <style>{`
        @media (max-width: 600px) {
          .intro-panel {
            min-width: 80vw !important;
            min-height: 80px !important;
            font-size: 1.2rem !important;
            padding: 18px 8vw !important;
          }
          .glass-panel {
            width: 92vw !important;
            min-width: 0 !important;
            max-width: 98vw !important;
            height: auto !important;
            min-height: 220px !important;
            max-height: 90vh !important;
            padding: 18px 4vw !important;
            font-size: 1.1rem !important;
          }
          .top-buttons {
            top: 10px !important;
            right: 8px !important;
            gap: 8px !important;
          }
        }
      `}</style>
      {/* Intro Panel */}
      {showIntro && (
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            pointerEvents: 'auto',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(0,0,0,0.18)',
          }} />
          <div className="intro-panel" style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            minWidth: 340,
            minHeight: 120,
            background: '#111',
            color: '#fff',
            fontFamily: 'VT323, monospace',
            fontSize: 28,
            fontWeight: 700,
            border: '4px double #fff',
            boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
            padding: '38px 44px',
            textAlign: 'center',
            letterSpacing: 1,
            userSelect: 'none',
            transition: 'box-shadow 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span>{introText}</span>
          </div>
        </>
      )}
      {/* Top right corner buttons */}
      {!showIntro && (
        <div className="top-buttons" style={{
          position: 'fixed',
          top: 24,
          right: 32,
          zIndex: 200,
          display: 'flex',
          gap: 18,
          alignItems: 'center',
        }}>
          {/* AB Button */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'VT323, monospace',
              fontWeight: 700,
              fontSize: 26,
              color: '#111',
              boxShadow: '0 2px 8px 0 #0002',
              cursor: 'pointer',
              border: '2px solid #eee',
              userSelect: 'none',
            }}
            title="Ankitha Bhat"
            onClick={() => window.location.reload()}
          >
            AB
          </div>
          {/* GitHub Button */}
          <a
            href="https://github.com/anksbhat/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px 0 #0002',
              border: '2px solid #eee',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            title="GitHub"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48C19.13 20.54 22 16.74 22 12.26 22 6.58 17.52 2 12 2z"/></svg>
          </a>
          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/ankitha-bhat-436611255/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px 0 #0002',
              border: '2px solid #eee',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            title="LinkedIn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><line x1="16" y1="11" x2="16" y2="16"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/></svg>
          </a>
          {/* Download Button */}
          <a
            href={"/Ankitha_July'25.pdf"}
            download
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px 0 #0002',
              border: '2px solid #eee',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            title="Download Resume"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
        </div>
      )}
      {/* Blur overlay above Canvas when a glass panel is open */}
      {!showIntro && active !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 10,
            pointerEvents: 'none',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transition: 'backdrop-filter 0.2s',
          }}
        />
      )}
      {/* Main Canvas */}
      {!showIntro && (
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
          <color attach="background" args={["#111"]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[0, 8, 8]}
            intensity={0.7}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <SoftShadows />
          {/* Floating math formulas in background */}
          {MATH_FORMULAS.map((formula, i) => {
            // Distribute formulas in a larger ring, more sparsely, and with smaller font size
            const angle = (i / MATH_FORMULAS.length) * Math.PI * 2;
            const radius = 10; // increased radius for more sparsity
            const y = i % 2 === 0 ? 3.5 : -3.5; // slightly higher/lower for more spread
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            return (
              <FloatingFormula
                key={i}
                formula={formula}
                position={[x, y, z]}
                floatSpeed={0.4 + 0.2 * (i % 3)}
                rotSpeed={0.12 + 0.07 * (i % 4)}
                fontSize={18 + (i % 3) * 3} // smaller font size
              />
            );
          })}
          <RotatingGrid />
          <Spheres active={active} setActive={setActive} />
          <OrbitControls enableDamping dampingFactor={0.05} />
        </Canvas>
      )}
      {/* Footer */}
      <footer
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100vw',
          background: 'rgba(17,17,17,0.92)',
          color: '#fff',
          fontFamily: 'VT323, monospace',
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: 1,
          textAlign: 'center',
          padding: '10px 0 8px 0',
          zIndex: 10001,
          userSelect: 'none',
          boxShadow: '0 -2px 12px 0 #0006',
        }}
      >
        Made by Anks <sup style={{fontSize:12, verticalAlign:'super'}}>™</sup> | 2025
      </footer>
    </div>
  );
}
