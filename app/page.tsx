"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type View = "projetos" | "sobre mim" | "experiência" | "contato";
const views: View[] = ["projetos", "sobre mim", "experiência", "contato"];
type Project = { title: string; subtitle: string; description: string; tags: string[]; development: string; overview: string; highlights: string[]; images: string[]; url?: string; unavailableMessage?: string };
const projects: Project[] = [
  { title: "PortOps", subtitle: "Gestão Portuária com IA", description: "Protótipo de gestão portuária com assistente de IA que responde perguntas sobre dados fictícios do MVP.", tags: ["LLM", "Groq API", "Integração de IA"], highlights: ["Centralização de informações operacionais", "Visualização de navios e informações operacionais", "Assistente contextual sobre os dados fictícios do protótipo"], development: "MVP com integração à Groq API para o assistente de IA.", overview: "Protótipo para reunir informações portuárias fictícias e apoiar a consulta de operações.", images: ["/assets/portfolio/projetos/portops-1.png", "/assets/portfolio/projetos/portops-2.png"], url: "https://portopss.vercel.app/" },
  { title: "iFresh", subtitle: "Identificador de Alimentos por Visão Computacional", description: "Classificação de imagens de maçãs, bananas e laranjas como frescas ou deterioradas.", tags: ["Python", "YOLO", "Visão computacional"], highlights: ["Análise por fotografia", "Classificação da fruta e do estado de conservação", "Exibição da confiança do modelo"], development: "Aplicação de visão computacional com Python e YOLO para classificar imagens de frutas.", overview: "Identifica a fruta e apresenta uma classificação de seu estado de conservação.", images: ["/assets/portfolio/projetos/ifresh-1.png"], url: "https://github.com/anaoliveiravv/iFresh-ia" },
  { title: "Adequa", subtitle: "Plataforma de Adequação à LGPD", description: "MVP de gestão de processos e adequação à LGPD desenvolvido para a STC/MA.", tags: ["React", "TypeScript", "Tailwind CSS", "Gemini", "Lovable AI Gateway"], highlights: ["Inventário de dados pessoais e classificação de riscos", "Dashboards e histórico de auditoria", "Assistente de IA contextual"], development: "MVP construído com React, TypeScript e Tailwind CSS, integrando Gemini via Lovable AI Gateway.", overview: "Apoia a organização de processos e informações relacionados à adequação à LGPD.", images: ["/assets/portfolio/projetos/adequa-1.png", "/assets/portfolio/projetos/adequa-2.png"], unavailableMessage: "Este projeto não pode ser compartilhado por se tratar de um projeto governamental." },
  { title: "Titanic", subtitle: "Competição de Machine Learning no Kaggle", description: "Participação na competição Titanic do Kaggle com pontuação pública de 0,76555 (76,56%).", tags: ["Python", "Pandas", "Scikit-learn", "Random Forest"], highlights: ["Preparação dos dados", "Treinamento e validação do modelo", "Previsões submetidas à competição"], development: "Preparação de dados com Pandas e treinamento de Random Forest com Scikit-learn.", overview: "Explora aprendizado de máquina por meio da competição Titanic do Kaggle.", images: ["/assets/portfolio/projetos/titanic-1.png", "/assets/portfolio/projetos/titanic-2.png", "/assets/portfolio/projetos/titanic-3.png", "/assets/portfolio/projetos/titanic-4.png"], url: "https://www.kaggle.com/code/anaoliveiravv/titanic-competition" },
  { title: "Identificador de Flores", subtitle: "Classificação com Decision Tree", description: "Classificação de flores a partir de características informadas pelo usuário.", tags: ["Python", "Pandas", "Scikit-learn", "Decision Tree"], highlights: ["Aprendizado supervisionado", "Modelo de árvore de decisão", "Previsão pelo terminal"], development: "Classificação com Python, Pandas e Scikit-learn usando uma árvore de decisão.", overview: "Prevê a classificação de flores a partir de suas características informadas no terminal.", images: ["/assets/portfolio/projetos/flores-1.png", "/assets/portfolio/projetos/flores-2.png", "/assets/portfolio/projetos/flores-3.png"], url: "https://github.com/anaoliveiravv/Modelo-flores" },
];

function ProjectImageCarousel({ title, images, index, onChange, onOpen }: { title: string; images: string[]; index: number; onChange: (index: number) => void; onOpen: () => void }) {
  if (!images.length) return null;
  const change = (next: number) => onChange((next + images.length) % images.length);
  return <div className="project-image-carousel" aria-label={`Imagens de ${title}`}>
    <div className="project-carousel-frame"><button className="project-carousel-open" type="button" onClick={onOpen} aria-label={`Ampliar imagem ${index + 1} de ${title}`}><Image key={index} fill src={images[index]} alt={`${title}, imagem ${index + 1} de ${images.length}`} sizes="(max-width: 700px) 84vw, 44vw" quality={90} /></button></div>
    {images.length > 1 && <>
      <button className="project-carousel-arrow previous" type="button" aria-label="Imagem anterior" onClick={() => change(index - 1)}>‹</button>
      <button className="project-carousel-arrow next" type="button" aria-label="Próxima imagem" onClick={() => change(index + 1)}>›</button>
    </>}
    <div className="project-carousel-footer"><span className="project-photos-badge">Fotos reais do projeto</span><div className="project-carousel-indicators" aria-label="Selecionar imagem">{images.map((src, slide) => <button key={src} type="button" aria-label={`Imagem ${slide + 1}`} aria-current={slide === index ? "true" : undefined} onClick={() => change(slide)} />)}</div><button className="project-zoom-hint" type="button" onClick={onOpen}>↗ Clique para ampliar</button></div>
  </div>;
}

function ProjectImageViewer({ title, images, index, onChange, onClose }: { title: string; images: string[]; index: number; onChange: (index: number) => void; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);
  const changeImage = useCallback((next: number) => { onChange((next + images.length) % images.length); setZoom(1); setOffset({ x: 0, y: 0 }); }, [images.length, onChange]);
  const changeZoom = (amount: number) => { setZoom(current => Math.max(1, Math.min(3, current + amount))); if (zoom + amount <= 1) setOffset({ x: 0, y: 0 }); };
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.stopPropagation(); onClose(); }
      if (event.key === "ArrowLeft") { event.preventDefault(); changeImage(index - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); changeImage(index + 1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changeImage, index, onClose]);
  return <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={`Visualização de imagens: ${title}`} onClick={onClose}>
    <section className="project-lightbox-window" onClick={event => event.stopPropagation()}>
      <header><span>{title} · {index + 1}/{images.length}</span><div><button type="button" aria-label="Reduzir imagem" onClick={() => changeZoom(-0.25)}>−</button><button type="button" aria-label="Ampliar imagem" onClick={() => changeZoom(0.25)}>+</button><button type="button" aria-label="Restaurar zoom" onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}>⟳</button><button type="button" aria-label="Fechar imagem" onClick={onClose}>×</button></div></header>
      <div className={`project-lightbox-view${zoom > 1 ? " is-zoomed" : ""}`} onWheel={event => { event.preventDefault(); changeZoom(event.deltaY < 0 ? 0.15 : -0.15); }} onPointerDown={event => { if (zoom <= 1 || !(event.target instanceof HTMLImageElement)) return; drag.current = { x: event.clientX, y: event.clientY, offsetX: offset.x, offsetY: offset.y }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (drag.current) setOffset({ x: drag.current.offsetX + event.clientX - drag.current.x, y: drag.current.offsetY + event.clientY - drag.current.y }); }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
        <button type="button" aria-label="Imagem anterior" onClick={() => changeImage(index - 1)}>‹</button><div className="project-lightbox-image-stage"><Image fill src={images[index]} alt={`${title}, imagem ${index + 1} de ${images.length}`} sizes="(max-width: 700px) 84vw, 80vw" quality={90} draggable={false} style={{ objectFit: "contain", transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }} /></div><button type="button" aria-label="Próxima imagem" onClick={() => changeImage(index + 1)}>›</button>
      </div>
    </section>
  </div>;
}

function ProjectAction({ project, onUnavailable }: { project: Project; onUnavailable: () => void }) {
  const className = "project-action";
  return project.url
    ? <a className={className} href={project.url} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span> Ver projeto</a>
    : <button className={className} type="button" onClick={onUnavailable}><span aria-hidden="true">↗</span> Ver projeto</button>;
}

function PixelIcon() {
  return <span className="pixel-icon" aria-hidden="true" />;
}

function LoginScreen({ onEnter }: { onEnter: () => void }) {
  const usernameTarget = "anapaula";
  const passwordTarget = "portfolio";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUsername(usernameTarget);
      setPassword(passwordTarget);
      return;
    }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setUsername(usernameTarget.slice(0, Math.min(index, usernameTarget.length)));
      setPassword(passwordTarget.slice(0, Math.max(0, index - usernameTarget.length)));
      if (index >= usernameTarget.length + passwordTarget.length) {
        window.clearInterval(timer);
      }
    }, 35);
    return () => window.clearInterval(timer);
  }, []);

  return <main className="login-screen">
    <div className="login-composition">
    <div className="login-brand">
      <img className="login-brand-star login-brand-star-left" src="/assets/sobre-mim/decoracoes/estrela_amarela.png" alt="" />
      <h1 aria-label="Ana's Portfolio"><span className="login-title-letters" aria-hidden="true"><span>A</span><span>n</span><span>a</span><span>'</span><span>s</span><span className="login-title-space" /><span>P</span><span>o</span><span>r</span><span>t</span><span>f</span><span>o</span><span>l</span><span>i</span><span>o</span></span></h1>
      <img className="login-brand-star login-brand-star-right" src="/assets/sobre-mim/decoracoes/estrela_amarela.png" alt="" />
    </div>
    <form className="login-window" onSubmit={event => { event.preventDefault(); onEnter(); }}>
      <header className="login-titlebar"><h1>Login</h1><span aria-hidden="true">×</span></header>
      <div className="login-content">
        <span className="login-avatar" aria-hidden="true"><i /><b /></span>
        <label className="login-field"><span className="login-user-icon" aria-hidden="true"><i /><b /></span><span className="sr-only">Nome de usuário</span><input aria-label="Nome de usuário" type="password" autoComplete="off" value={username} readOnly /></label>
        <label className="login-field"><span className="login-lock-icon" aria-hidden="true" /><span className="sr-only">Senha</span><input aria-label="Senha" type="password" autoComplete="new-password" value={password} readOnly /><span className="login-eye" aria-hidden="true"><i /></span></label>
        <button className="login-enter" type="submit">Enter</button>
      </div>
    </form>
    </div>
  </main>;
}

type WindowPosition = { x: number; y: number };

function DesktopWindow({ app, depth, onClose, onFocus, onDragStart, position, children }: { app: View; depth: number; onClose: () => void; onFocus: () => void; onDragStart: (app: View, event: React.PointerEvent<HTMLElement>) => void; position?: WindowPosition; children: ReactNode }) {
  const slug = ["projetos", "sobre_mim", "experiencia", "contato"][views.indexOf(app)];
  return <article onPointerDown={onFocus} className={`desktop-app-window desktop-app-window-${app === "projetos" ? "projects" : slug}${app === "sobre mim" ? " about-window" : ""}${depth === 0 ? " is-first-window" : ""}${position ? " is-dragged" : ""}`} style={{ zIndex: depth + 1, ...(position ? { left: position.x, top: position.y, transform: "none" } : {}) }} aria-label={slug + ".app"}>
    <header className="about-window-titlebar" onPointerDown={event => { if ((event.target as HTMLElement).closest("button")) return; event.currentTarget.setPointerCapture(event.pointerId); onDragStart(app, event); }}><div className="window-buttons"><button type="button" className="window-close" aria-label={`Fechar ${slug}.app`} onPointerDown={event => event.stopPropagation()} onClick={event => { event.stopPropagation(); onClose(); }} /><span className="window-minimize" /><span className="window-expand" /></div><span>{slug}.app</span></header>
    {children}
  </article>;
}

export default function Home() {
  const [windowStack, setWindowStack] = useState<View[]>([]);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [poweringOff, setPoweringOff] = useState(false);
  const [loginCycle, setLoginCycle] = useState(0);
  const view = windowStack.at(-1);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectImageIndex, setProjectImageIndex] = useState(0);
  const [projectImageViewerOpen, setProjectImageViewerOpen] = useState(false);
  const [linkNotice, setLinkNotice] = useState(false);
  const [windowPositions, setWindowPositions] = useState<Partial<Record<View, WindowPosition>>>({});
  const activeDrag = useRef<{ app: View; pointerId: number; startX: number; startY: number; left: number; top: number; width: number; height: number; stageWidth: number; stageHeight: number } | null>(null);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (projectImageViewerOpen) { setProjectImageViewerOpen(false); return; }
      if (selectedProject !== null && view === "projetos") { setSelectedProject(null); setLinkNotice(false); }
      else if (view) setWindowStack(stack => stack.slice(0, -1));
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [view, selectedProject, projectImageViewerOpen]);
  const open = (next: View) => {
    setWindowStack(stack => [...stack.filter(item => item !== next), next]);
  };
  const focus = (app: View) => setWindowStack(stack => stack.at(-1) === app ? stack : [...stack.filter(item => item !== app), app]);
  const close = (app: View) => {
    setWindowStack(stack => stack.filter(item => item !== app));
    if (app === "projetos") { setSelectedProject(null); setProjectImageViewerOpen(false); setLinkNotice(false); }
  };
  const startWindowDrag = (app: View, event: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(max-width:700px)").matches) return;
    const stage = event.currentTarget.closest(".desktop-stage");
    const panel = event.currentTarget.parentElement;
    if (!stage || !panel) return;
    const stageRect = stage.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const position = windowPositions[app] ?? { x: panelRect.left - stageRect.left, y: panelRect.top - stageRect.top };
    activeDrag.current = { app, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, left: position.x, top: position.y, width: panelRect.width, height: panelRect.height, stageWidth: stageRect.width, stageHeight: stageRect.height };
    setWindowPositions(current => current[app] ? current : { ...current, [app]: position });
  };
  const moveWindow = (event: React.PointerEvent<HTMLElement>) => {
    const drag = activeDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const x = Math.max(0, Math.min(drag.stageWidth - drag.width, drag.left + event.clientX - drag.startX));
    const y = Math.max(140, Math.min(Math.max(140, drag.stageHeight - drag.height), drag.top + event.clientY - drag.startY));
    setWindowPositions(current => ({ ...current, [drag.app]: { x, y } }));
  };
  const endWindowDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (activeDrag.current?.pointerId === event.pointerId) activeDrag.current = null;
  };
  const project = selectedProject === null ? null : projects[selectedProject];
  const enterDesktop = () => { setWindowStack([]); setDesktopOpen(true); setPoweringOff(false); };
  const powerOff = () => {
    setPoweringOff(true);
    window.setTimeout(() => {
      setWindowStack([]); setSelectedProject(null); setProjectImageViewerOpen(false); setLinkNotice(false); setWindowPositions({});
      setDesktopOpen(false); setLoginCycle(cycle => cycle + 1); setPoweringOff(false);
    }, 240);
  };

  if (!desktopOpen) return <LoginScreen key={loginCycle} onEnter={enterDesktop} />;
  return (
    <main className={`app-shell desktop-shell${poweringOff ? " powering-off" : ""}`}>
      <button className="power-button" type="button" aria-label="Voltar à tela de login" onClick={powerOff}>⏻</button>
      <header className="desktop-header"><nav aria-label="Aplicativos do portfólio">{views.map((item, index) => <button key={item} className={view === item ? "active" : ""} onClick={() => open(item)} aria-current={view === item ? "page" : undefined}><Image className="about-app-icon" src={`/assets/portfolio/apps/${["projetos", "sobre_mim", "experiencia", "contato"][index]}.png`} width={248} height={181} sizes="(max-width: 700px) 52px, (max-width: 1200px) 74px, 86px" quality={90} alt="" /><span>{["projetos", "sobre_mim", "experiência", "contato"][index]}</span></button>)}</nav></header>
      <section className="desktop-stage" aria-label="Área de trabalho" onPointerMove={moveWindow} onPointerUp={endWindowDrag} onPointerCancel={endWindowDrag}>
        {windowStack.map((app, depth) => <DesktopWindow key={app} app={app} depth={depth} onFocus={() => focus(app)} onClose={() => { if (app === "projetos" && selectedProject !== null) { setSelectedProject(null); setProjectImageViewerOpen(false); setLinkNotice(false); } else close(app); }} onDragStart={startWindowDrag} position={windowPositions[app]}>
          {app === "projetos" && <div className="app-window-content projects-app-content"><section className={`projects-page${project ? " has-project" : ""}`} aria-label="Projetos"><div className="project-workspace"><div className="project-folder-grid" aria-label="Pastas de projetos">{projects.map((item, index) => <button className={`project-folder-button${selectedProject === index ? " active" : ""}`} key={item.title} onClick={() => { setSelectedProject(index); setProjectImageIndex(0); setProjectImageViewerOpen(false); setLinkNotice(false); }} aria-pressed={selectedProject === index}><Image className="project-folder-paper" src="/assets/portfolio/decoracao/pagina-pasta.png" width={970} height={652} sizes="(max-width: 700px) 35vw, 120px" quality={95} alt="" /><Image className="project-folder-art" src="/assets/portfolio/pastas/pasta-amarela-fornecida.png" width={1082} height={832} sizes="(max-width: 700px) 45vw, 170px" quality={95} alt="" /><span className="project-folder-label">{item.title}</span></button>)}<div className="project-folder-add" aria-hidden="true">+</div></div>
            {project && <article key={selectedProject} className="project-detail-window" aria-label={project.title}><div className="project-window-content"><div className={`project-overview${project.images.length ? "" : " no-preview"}`}><div className="project-media">{project.images.length ? <ProjectImageCarousel title={project.title} images={project.images} index={projectImageIndex} onChange={setProjectImageIndex} onOpen={() => setProjectImageViewerOpen(true)} /> : <p className="project-images-unavailable">Fotos do projeto em breve.</p>}</div><div className="project-summary"><span className={`project-illustration project-illustration-${selectedProject}`} aria-hidden="true" /><h4>{project.title}</h4><p className="project-subtitle">{project.subtitle}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p>{project.description}</p><section className="project-highlights"><h5>Diferenciais</h5><ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></section></div></div><div className="project-detail-divider" /><div className="project-detail-columns"><section><span aria-hidden="true">›</span><div><h4>Como foi desenvolvido</h4><p>{project.development}</p></div></section><section><span aria-hidden="true">›</span><div><h4>Sobre o projeto</h4><p>{project.overview}</p></div></section></div><div className="project-action-row"><ProjectAction project={project} onUnavailable={() => setLinkNotice(true)} /></div>{linkNotice && <p className="project-link-notice" role="status">{project.unavailableMessage ?? "Link do projeto será adicionado em breve."}</p>}</div></article>}
          </div></section></div>}
          {app === "sobre mim" && <div className="about-window-content"><img className="hello-sticker" src="/assets/sobre-mim/decoracoes/balao_ola.png" width={1425} height={1104} alt="Carinha feliz rosa em um balão verde" /><div className="about-copy"><h2>Oi, eu sou a Ana Paula ♡</h2><p>Sou estudante de Engenharia de Software e quero seguir carreira em Engenharia de IA.</p><p>Meu interesse por IA surgiu dos filmes e jogos que mostravam máquinas capazes de aprender e interagir com as pessoas. Sempre tive curiosidade por agentes de IA e visão computacional, e hoje estou explorando essas áreas por meio dos meus estudos e projetos.</p><p>Entre meus hobbies, adoro jogar videogames, principalmente de FPS, história e jogos cozy. Também gosto de explorar meu lado artístico com modelagem 3D.</p></div><div className="about-photo"><Image src="/assets/sobre-mim/decoracoes/polaroid_foto.png" width={420} height={491} sizes="(max-width: 700px) 42vw, 29vw" quality={90} alt="Fotografia de Ana Paula" /></div><img className="cherries" src="/assets/sobre-mim/decoracoes/cerejas.png" alt="" /><img className="about-star" src="/assets/sobre-mim/decoracoes/estrela_amarela.png" alt="" /><img className="about-shine shine-one" src="/assets/sobre-mim/decoracoes/brilho_dourado_1.png" alt="" /><img className="about-shine shine-two" src="/assets/sobre-mim/decoracoes/brilho_dourado_2.png" alt="" /><span className="question-orb" aria-hidden="true" /><img className="question-sticker" src="/assets/sobre-mim/decoracoes/balao_pergunta.png" alt="So.. what are we?" /></div>}
          {app === "experiência" && <div className="app-window-content experience-app-content"><section className="experience-page" aria-label="Experiência"><Image className="experience-decoration experience-mascot" src="/assets/portfolio/experiencia/claudinho-note-cafe.png" width={438} height={392} sizes="(max-width: 700px) 88px, 200px" quality={90} alt="Claudinho com notebook e café" /><Image className="experience-decoration experience-pendant" src="/assets/portfolio/experiencia/pingente-coracao.png" width={176} height={387} sizes="(max-width: 700px) 52px, 82px" quality={95} alt="" /><Image className="experience-decoration experience-ribbon-top" src="/assets/portfolio/experiencia/fita-xadrez-superior.png" width={388} height={204} sizes="(max-width: 700px) 84px, 140px" quality={95} alt="" /><Image className="experience-decoration experience-ribbon-bottom" src="/assets/portfolio/experiencia/fita-xadrez-inferior.png" width={392} height={211} sizes="(max-width: 700px) 82px, 140px" quality={95} alt="" /><span className="experience-decoration experience-starburst" aria-hidden="true" /><img className="experience-decoration experience-sparkles" src="/assets/portfolio/experiencia/estrelas-amarelas.png" alt="" /><div className="experience-cards"><article className="experience-card"><Image className="experience-card-icon" src="/assets/portfolio/experiencia/icone-maleta-card.png" width={158} height={171} sizes="64px" quality={95} alt="" /><div className="experience-card-divider" /><div className="experience-card-copy"><h3>Instituto Evereste</h3><p className="experience-organization">Experiência profissional | 2026 – atual</p><p>Atuo no desenvolvimento de soluções de software, principalmente com Java, Spring Boot e PostgreSQL. Nesse período, venho adquirindo experiência prática em desenvolvimento back-end, APIs e trabalho em equipe.</p></div><span className="experience-period">2026 – atual</span></article><article className="experience-card"><Image className="experience-card-icon" src="/assets/portfolio/experiencia/icone-notebook-card.png" width={161} height={119} sizes="64px" quality={95} alt="" /><div className="experience-card-divider" /><div className="experience-card-copy"><h3>Universidade CEUMA</h3><p className="experience-organization">Formação acadêmica | 2026 – 2029</p><p>Sou estudante de Engenharia de Software e participo do desenvolvimento de diversos projetos acadêmicos, colocando em prática meus conhecimentos em programação, inteligência artificial e desenvolvimento de sistemas.</p></div><span className="experience-period">2026 – 2029</span></article></div></section></div>}
          {app === "contato" && <div className="app-window-content contact-app-content"><section className="contact-page" aria-label="Contato"><div className="contact-intro"><div className="contact-envelope" aria-hidden="true" /><div className="contact-intro-copy"><h2><span>Vamos nos conectar?</span></h2><p>Estou aberta a novas oportunidades, colaborações e trocas de experiências.</p><div className="contact-heart-divider" aria-hidden="true"><span /></div></div></div><nav className="contact-links" aria-label="Links de contato"><a href="https://github.com/anaoliveiravv" target="_blank" rel="noopener noreferrer"><PixelIcon /><span>GitHub</span><span className="contact-arrow" aria-hidden="true">→</span></a><a href="https://www.linkedin.com/in/anaoliveiravv/" target="_blank" rel="noopener noreferrer"><PixelIcon /><span>LinkedIn</span><span className="contact-arrow" aria-hidden="true">→</span></a><a href="mailto:anaolv.me@gmail.com"><PixelIcon /><span>E-mail</span><span className="contact-arrow" aria-hidden="true">→</span></a><a className="contact-resume" href="/assets/portfolio/Curriculo_AnaPaula_IA.pdf" download="Curriculo_AnaPaula_IA.pdf"><span aria-hidden="true">↓</span><span>Baixar currículo</span><span className="contact-arrow" aria-hidden="true">→</span></a></nav></section></div>}
        </DesktopWindow>)}
        {project && projectImageViewerOpen && view === "projetos" && <ProjectImageViewer title={project.title} images={project.images} index={projectImageIndex} onChange={setProjectImageIndex} onClose={() => setProjectImageViewerOpen(false)} />}
        <div className="desktop-dock" aria-hidden="true"><span><Image src="/assets/portfolio/dock/finder.png" width={222} height={216} sizes="58px" quality={90} alt="" /></span><span><Image src="/assets/portfolio/dock/terminal.png" width={225} height={215} sizes="58px" quality={90} alt="" /></span><span><Image src="/assets/portfolio/dock/configuracoes.png" width={251} height={237} sizes="58px" quality={90} alt="" /></span><span><Image src="/assets/portfolio/dock/lixeira.png" width={214} height={236} sizes="58px" quality={90} alt="" /></span></div>
      </section>
    </main>
  );
}
