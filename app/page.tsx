"use client";

import { useEffect, useLayoutEffect, useState } from "react";

type View = "inicio" | "projetos" | "sobre mim" | "experiência" | "contato";
const views: View[] = ["inicio", "projetos", "sobre mim", "experiência", "contato"];
type Project = { title: string; description: string; tags: string[]; development: string; overview: string; art: string | null; images: string[]; url?: string };
// shortcut: these crops temporarily fill projects without their own screenshots; replace them when their assets exist.
const baseImages = ["/assets/portfolio/projetos/classificador-tela-1.png", "/assets/portfolio/projetos/classificador-tela-2.png", "/assets/portfolio/projetos/classificador-tela-3.png"];
const projects: Project[] = [
  { title: "SP Spaces", description: "Plataforma de gerenciamento de espaços e reservas.", tags: ["Java", "Spring Boot", "PostgreSQL"], development: "Desenvolvido em equipe, com back-end em Java e Spring Boot, modelagem de dados e integração com o front-end.", overview: "Permite o cadastro de espaços, gestão de reservas, avaliações e fotos, com foco em uma experiência simples e intuitiva.", art: "landscape-art", images: ["/assets/portfolio/projetos/sp-spaces-capa.png", "/assets/portfolio/projetos/sp-spaces-tela-1.png", "/assets/portfolio/projetos/sp-spaces-tela-2.png", "/assets/portfolio/projetos/sp-spaces-tela-3.png"] },
  { title: "Classificador de Flores", description: "Experimento de classificação de flores com Python e aprendizado de máquina.", tags: ["Python", "Pandas", "Scikit-learn"], development: "Experimento de classificação usando Python e bibliotecas de análise de dados.", overview: "Explora o uso de aprendizado de máquina para classificar flores a partir de suas características.", art: "flower-art", images: baseImages },
  { title: "Data Garden", description: "Visualização de dados em um ambiente interativo e lúdico.", tags: ["D3.js", "TypeScript"], development: "Visualizações interativas desenvolvidas com D3.js e TypeScript.", overview: "Apresenta dados em uma interface visual e interativa.", art: "mosaic-art", images: baseImages },
  { title: "Projetos Acadêmicos", description: "Trabalhos desenvolvidos durante a graduação.", tags: ["Python", "Java", "TypeScript"], development: "Projetos e exercícios desenvolvidos ao longo da graduação em Engenharia de Software.", overview: "Uma coleção de trabalhos acadêmicos e experimentos de desenvolvimento.", art: null, images: baseImages },
  { title: "Outros Estudos", description: "Experimentos e estudos independentes.", tags: ["Estudos", "Experimentos"], development: "Explorações independentes de ferramentas e ideias de desenvolvimento.", overview: "Pequenos estudos reunidos em uma pasta de experimentos.", art: null, images: baseImages },
];

function ProjectImageCarousel({ title, images }: { title: string; images: string[] }) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;
  return <div className="project-image-carousel" aria-label={`Imagens de ${title}`}>
    <div className="project-carousel-frame"><img key={index} src={images[index]} alt={`${title}, imagem ${index + 1} de ${images.length}`} /></div>
    {images.length > 1 && <>
      <button className="project-carousel-arrow previous" type="button" aria-label="Imagem anterior" onClick={() => setIndex((index - 1 + images.length) % images.length)}>‹</button>
      <button className="project-carousel-arrow next" type="button" aria-label="Próxima imagem" onClick={() => setIndex((index + 1) % images.length)}>›</button>
      <div className="project-carousel-indicators" aria-label="Selecionar imagem">{images.map((src, slide) => <button key={src} type="button" aria-label={`Imagem ${slide + 1}`} aria-current={slide === index ? "true" : undefined} onClick={() => setIndex(slide)} />)}</div>
    </>}
  </div>;
}

function ProjectAction({ project, onUnavailable }: { project: Project; onUnavailable: () => void }) {
  const className = "project-action";
  return project.url
    ? <a className={className} href={project.url} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span> Ver projeto</a>
    : <button className={className} type="button" onClick={onUnavailable}><span aria-hidden="true">↗</span> Ver projeto</button>;
}

function PixelIcon({ children }: { children: React.ReactNode }) {
  return <span className="pixel-icon" aria-hidden="true">{children}</span>;
}

export default function Home() {
  const [view, setView] = useState<View>("inicio");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectMinimized, setProjectMinimized] = useState(false);
  const [linkNotice, setLinkNotice] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(true);
  const [aboutTab, setAboutTab] = useState<"Me conheça" | "Formação" | "Interesses">("Me conheça");
  useLayoutEffect(() => { window.scrollTo(0, 0); }, [view]);
  useEffect(() => {
    if (view !== "projetos" || selectedProject === null) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { setSelectedProject(null); setProjectMinimized(false); setLinkNotice(false); } };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [view, selectedProject]);
  const open = (next: View) => {
    if (next === "projetos") { setSelectedProject(null); setProjectMinimized(false); }
    if (next === "sobre mim") { setAboutOpen(true); setAboutTab("Me conheça"); }
    setView(next);
  };
  const project = selectedProject === null ? null : projects[selectedProject];

  return (
    <main className={`app-shell ${view === "inicio" ? "is-home" : "is-inner"}${view === "contato" ? " is-contact" : ""}${view === "experiência" ? " is-experience" : ""}${view === "sobre mim" ? " is-about" : ""}${view === "projetos" ? " is-projects" : ""}`}>
      {view === "inicio" ? (
        <>
          <header className="home-header"><span className="home-file"><PixelIcon>▰</PixelIcon> portfolio.exe</span><span>v1.0.0</span></header>
          <section className="home-layout" aria-labelledby="home-title">
            <div className="folder-stack">
              <div className="folder-behind folder-behind-one" /><div className="folder-behind folder-behind-two" />
              <div className="hero-folder">
                <span className="folder-tab" /><span className="folder-label">ARQUIVO PESSOAL / 2026</span>
                <span className="hero-spark spark-a" aria-hidden="true">✦</span><span className="hero-spark spark-b" aria-hidden="true">✦</span>
                <p className="hero-eyebrow">ENGENHARIA DE SOFTWARE ✳ IA</p>
                <h1 id="home-title">ANA<br />PAULA</h1>
                <p className="hero-role">Desenvolvedora Back-end <span>✦</span> Entusiasta de IA</p>
                <span className="sticker sticker-bunny" aria-hidden="true">♡</span><span className="sticker sticker-cherry" aria-hidden="true">✿</span>
              </div>
            </div>
            <nav className="game-menu" aria-label="Menu do portfólio">
              {views.slice(1).map((item, index) => <button className={index === 0 ? "selected" : ""} key={item} onClick={() => open(item)}><span className="menu-glyph" aria-hidden="true">{["▷", "♙", "▣", "✉"][index]}</span>{item}<span className="menu-arrow" aria-hidden="true">↗</span></button>)}
            </nav>
          </section>
        </>
      ) : (
        <>
          <header className="inner-header"><button className="inner-brand" onClick={() => open("inicio")}><PixelIcon>▰</PixelIcon> ana paula ♡</button><nav aria-label="Navegação principal">{views.map((item, index) => <button key={item} className={view === item ? "active" : ""} onClick={() => open(item)} aria-current={view === item ? "page" : undefined}>{view === "sobre mim" && <span className="about-nav-icon"><img src={`/assets/sobre-mim/${["inicio", "projetos", "sobre-mim", "experiencia", "contato"][index]}-app.png`} alt="" /></span>}{item}</button>)}</nav></header>
          <div className="inner-content" key={view}>
            {view === "projetos" && <section className={`projects-page${project ? " has-project" : ""}`} aria-labelledby="projects-title">
              <div className="section-heading"><img className="projects-star" src="/assets/portfolio/decoracao/estrela-amarela.png" width={59} height={70} alt="" /><h2 id="projects-title">Projetos</h2></div>
              <div className="project-workspace">
                <div className="project-folder-grid" aria-label="Pastas de projetos">
                  {projects.map((item, index) => project && selectedProject !== index ? null : <button className={`project-folder-button${selectedProject === index ? " active" : ""}`} key={item.title} onClick={() => { setSelectedProject(index); setProjectMinimized(false); setLinkNotice(false); }} aria-pressed={selectedProject === index}><img className="project-folder-paper" src="/assets/portfolio/decoracao/pagina-pasta.png" width={970} height={652} alt="" /><img className="project-folder-art" src="/assets/portfolio/pastas/pasta-amarela-fornecida.png" width={1082} height={832} alt="" /><span className="project-folder-label">{item.title}</span></button>)}
                  {project ? null : <div className="project-folder-add" aria-hidden="true">+</div>}
                </div>
                {project ? <article key={selectedProject} className={`project-detail-window${projectMinimized ? " minimized" : ""}`} aria-label={project.title}>
                  <header className="project-window-bar"><h3 id="project-detail-title">{project.title}</h3><div className="project-window-controls"><button type="button" aria-label="Minimizar janela" onClick={() => setProjectMinimized(!projectMinimized)}>−</button><button type="button" aria-label="Fechar janela" onClick={() => { setSelectedProject(null); setProjectMinimized(false); setLinkNotice(false); }}>×</button></div></header>
                  {projectMinimized ? null : <div className="project-window-content">
                    <div className={`project-overview${project.images.length || project.art ? "" : " no-preview"}`}>
                      {project.images.length ? <div className="project-media"><ProjectImageCarousel title={project.title} images={project.images} /></div> : project.art ? <div className="project-media"><div className={`project-preview ${project.art}`} role="img" aria-label={`Prévia de ${project.title}`} /></div> : null}
                      <div className="project-summary"><h4>{project.title}</h4><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                    </div>
                    <div className="project-detail-divider" />
                    <div className="project-detail-columns"><section><span aria-hidden="true">›</span><div><h4>Como foi desenvolvido</h4><p>{project.development}</p></div></section><section><span aria-hidden="true">›</span><div><h4>Sobre o projeto</h4><p>{project.overview}</p></div></section></div>
                    <div className="project-action-row"><ProjectAction project={project} onUnavailable={() => setLinkNotice(true)} /></div>
                  </div>}
                  {linkNotice && !projectMinimized && <p className="project-link-notice" role="status">Link do projeto será adicionado em breve.</p>}
                </article> : null}
              </div>
            </section>}
            {view === "sobre mim" && <section className="about-desktop" aria-label="Sobre mim">
              <img className="about-character" src="/assets/sobre-mim/personagem-pixel-art.png" alt="Ana Paula em pixel art, com cabelos pretos e blusa vinho" />
              {aboutOpen && <div className="about-window" role="dialog" aria-label="Sobre mim">
                <button className="about-close" type="button" aria-label="Fechar janela Sobre mim" onClick={() => setAboutOpen(false)} />
                <div className="about-sidebar" role="tablist" aria-label="Seções sobre mim">
                  {(["Me conheça", "Formação", "Interesses"] as const).map((item) => <button key={item} type="button" role="tab" aria-selected={aboutTab === item} onClick={() => setAboutTab(item)}><img src={`/assets/sobre-mim/icone-${item === "Me conheça" ? "perfil" : item === "Formação" ? "formacao" : "interesses"}.png`} alt="" />{item}</button>)}
                  <img className="about-flowers" src="/assets/sobre-mim/florzinhas.png" alt="" />
                </div>
                <div className="about-window-body" role="tabpanel">
                  {aboutTab === "Me conheça" && <><h2>Oi, eu sou a Ana Paula ♡</h2><p>Sou estudante de Engenharia de Software e atuo como estagiária em desenvolvimento.</p><p>Meu interesse por IA surgiu dos filmes e jogos, e hoje estou explorando projetos com Machine Learning e LLMs.</p></>}
                  {aboutTab === "Formação" && <><h2>Formação</h2><p><strong>Engenharia de Software</strong><br />Universidade Ceuma · 2026–2029</p></>}
                  {aboutTab === "Interesses" && <><h2>Interesses</h2><p>Engenharia de IA · Agentes inteligentes · Visão computacional · Machine Learning</p></>}
                </div>
              </div>}
              <img className="about-dock" src="/assets/sobre-mim/dock-completo.png" alt="" />
            </section>}
            {view === "experiência" && <section className="experience-page" aria-labelledby="experience-title"><div className="section-heading"><span className="heading-spark">✦</span><div><h2 id="experience-title">Experiência</h2><p>Minha trajetória profissional e acadêmica até aqui.</p></div></div><div className="timeline"><article className="timeline-card"><PixelIcon>▣</PixelIcon><div><h3>Software Engineer Intern</h3><p>Instituto Evereste</p><small>Estágio iniciado em junho de 2026. Responsabilidades e tecnologias específicas ainda não informadas.</small></div><span className="date">Jun 2026 – Atual</span></article><article className="timeline-card"><PixelIcon>▤</PixelIcon><div><h3>Engenharia de Software</h3><p>Universidade Ceuma</p><small>Formação acadêmica em andamento.</small></div><span className="date">Em andamento</span></article></div></section>}
            {view === "contato" && <section className="contact-page" aria-labelledby="contact-title"><div className="section-heading"><img className="contact-star" src="/assets/portfolio/decoracao/estrela-amarela.png" width={40} height={44} alt="" /><div><h2 id="contact-title">Contato</h2><p>Vamos conversar? Você pode me encontrar por aqui:</p></div></div><div className="contact-envelope" aria-hidden="true" /><nav className="contact-links" aria-label="Links de contato"><a href="https://github.com/anaoliveiravv" target="_blank" rel="noopener noreferrer"><PixelIcon>◉</PixelIcon><span>GitHub</span><span className="contact-arrow" aria-hidden="true">→</span></a><a href="https://www.linkedin.com/in/anaoliveiravv/" target="_blank" rel="noopener noreferrer"><PixelIcon>in</PixelIcon><span>LinkedIn</span><span className="contact-arrow" aria-hidden="true">→</span></a><a href="mailto:anaolv.me@gmail.com"><PixelIcon>✉</PixelIcon><span>E-mail</span><span className="contact-arrow" aria-hidden="true">→</span></a></nav></section>}
          </div>
        </>
      )}
    </main>
  );
}
