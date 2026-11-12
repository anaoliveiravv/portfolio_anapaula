"use client";

import { useLayoutEffect, useState } from "react";

type View = "inicio" | "projetos" | "sobre mim" | "experiência" | "contato";
const views: View[] = ["inicio", "projetos", "sobre mim", "experiência", "contato"];
const projects = [
  { title: "SP Spaces", description: "Plataforma de gerenciamento de espaços e reservas.", tags: ["Java", "Spring Boot", "PostgreSQL"], development: "Desenvolvido em equipe, com back-end em Java e Spring Boot, modelagem de dados e integração com o front-end.", overview: "Permite o cadastro de espaços, gestão de reservas, avaliações e fotos, com foco em uma experiência simples e intuitiva.", art: "landscape-art", cover: "/assets/portfolio/projetos/sp-spaces-capa.png", screens: ["/assets/portfolio/projetos/sp-spaces-tela-1.png", "/assets/portfolio/projetos/sp-spaces-tela-2.png", "/assets/portfolio/projetos/sp-spaces-tela-3.png"] },
  { title: "Classificador de Flores", description: "Experimento de classificação de flores com Python e aprendizado de máquina.", tags: ["Python", "Pandas", "Scikit-learn"], development: "Experimento de classificação usando Python e bibliotecas de análise de dados.", overview: "Explora o uso de aprendizado de máquina para classificar flores a partir de suas características.", art: "flower-art" },
  { title: "Data Garden", description: "Visualização de dados em um ambiente interativo e lúdico.", tags: ["D3.js", "TypeScript"], development: "Visualizações interativas desenvolvidas com D3.js e TypeScript.", overview: "Apresenta dados em uma interface visual e interativa.", art: "mosaic-art" },
  { title: "Projetos Acadêmicos", description: "Trabalhos desenvolvidos durante a graduação.", tags: ["Python", "Java", "TypeScript"], development: "Projetos e exercícios desenvolvidos ao longo da graduação em Engenharia de Software.", overview: "Uma coleção de trabalhos acadêmicos e experimentos de desenvolvimento.", art: null },
  { title: "Outros Estudos", description: "Experimentos e estudos independentes.", tags: ["Estudos", "Experimentos"], development: "Explorações independentes de ferramentas e ideias de desenvolvimento.", overview: "Pequenos estudos reunidos em uma pasta de experimentos.", art: null },
];

function PixelIcon({ children }: { children: React.ReactNode }) {
  return <span className="pixel-icon" aria-hidden="true">{children}</span>;
}

export default function Home() {
  const [view, setView] = useState<View>("inicio");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectMinimized, setProjectMinimized] = useState(false);
  useLayoutEffect(() => { window.scrollTo(0, 0); }, [view]);
  const open = (next: View) => {
    if (next === "projetos") { setSelectedProject(null); setProjectMinimized(false); }
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
          <header className="inner-header"><button className="inner-brand" onClick={() => open("inicio")}><PixelIcon>▰</PixelIcon> ana paula ♡</button><nav aria-label="Navegação principal">{views.map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => open(item)} aria-current={view === item ? "page" : undefined}>{item}</button>)}</nav></header>
          <div className="inner-content" key={view}>
            {view === "projetos" && <section className={`projects-page${project ? " has-project" : ""}`} aria-labelledby="projects-title">
              <div className="section-heading"><img className="projects-star" src="/assets/portfolio/decoracao/estrela-amarela.png" width={59} height={70} alt="" /><h2 id="projects-title">Projetos</h2></div>
              <div className="project-workspace">
                <div className="project-folder-grid" aria-label="Pastas de projetos">
                  {projects.map((item, index) => <button className={`project-folder-button${selectedProject === index ? " active" : ""}`} key={item.title} onClick={() => { setSelectedProject(index); setProjectMinimized(false); }} aria-pressed={selectedProject === index}><img className="project-folder-paper" src="/assets/portfolio/decoracao/pagina-pasta.png" width={970} height={652} alt="" /><img className="project-folder-art" src="/assets/portfolio/pastas/pasta-amarela-fornecida.png" width={1082} height={832} alt="" /><span className="project-folder-label">{item.title}</span></button>)}
                  <div className="project-folder-add" aria-hidden="true">+</div>
                </div>
                {project ? <article key={selectedProject} className={`project-detail-window${projectMinimized ? " minimized" : ""}`} aria-labelledby="project-detail-title">
                  <div className="project-window-back" aria-hidden="true" />
                  <header className="project-window-bar"><img className="project-window-folder" src="/assets/portfolio/pastas/pasta-amarela-fornecida.png" width={44} height={34} alt="" /><h3 id="project-detail-title">{project.title}</h3><div className="project-window-controls"><button type="button" aria-label="Minimizar janela" onClick={() => setProjectMinimized(!projectMinimized)}>−</button><button type="button" aria-label="Fechar janela" onClick={() => { setSelectedProject(null); setProjectMinimized(false); }}>×</button></div></header>
                  {projectMinimized ? null : <div className="project-window-content">
                    <div className={`project-overview${project.art ? "" : " no-preview"}`}>
                      {project.cover ? <div className="project-media"><img className="project-cover" src={project.cover} width={335} height={169} alt={`Prévia de ${project.title}`} /><div className="project-screens">{project.screens.map((src, index) => <img className="project-screen-shot" key={src} src={src} width={index === 0 ? 101 : index === 1 ? 105 : 107} height={73} alt={`Tela ${index + 1} de ${project.title}`} />)}</div></div> : project.art ? <div className="project-media"><div className={`project-preview ${project.art}`} role="img" aria-label={`Prévia de ${project.title}`} /></div> : null}
                      <div className="project-summary"><h4>{project.title}</h4><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                    </div>
                    <div className="project-detail-divider" />
                    <div className="project-detail-columns"><section><span className="development-icon" aria-hidden="true">▤</span><div><h4>Como foi desenvolvido</h4><p>{project.development}</p></div></section><section><span className="overview-icon" aria-hidden="true">▱</span><div><h4>Sobre o projeto</h4><p>{project.overview}</p></div></section></div>
                    <div className="project-action-row"><button className="project-action" type="button" disabled title="Link do projeto ainda não cadastrado"><span aria-hidden="true">↗</span> Ver projeto</button></div>
                  </div>}
                </article> : null}
              </div>
            </section>}
            {view === "sobre mim" && <section className="about-page" aria-labelledby="about-title"><div className="portrait-card" role="img" aria-label="Ilustração em pixel art de uma personagem com fones de ouvido"><span className="tape" /><div className="portrait-placeholder"><span>AP</span><small>retrato a adicionar</small></div><span className="portrait-heart">♡</span></div><div className="about-text"><div className="section-heading"><span className="heading-spark">✦</span><div><h2 id="about-title">Sobre mim</h2><p>Desenvolvedora back-end, curiosa por inteligência artificial e por como tecnologia pode criar novas possibilidades.</p></div></div><div className="about-block"><PixelIcon>♧</PixelIcon><div><h3>Formação</h3><strong>Engenharia de Software</strong><p>Universidade Ceuma <span>·</span> Em andamento</p></div></div><div className="about-block"><PixelIcon>♥</PixelIcon><div><h3>Interesses</h3><div className="tags interests"><span>Back-end</span><span>IA</span><span>Dados</span><span>Sistemas</span></div></div></div></div></section>}
            {view === "experiência" && <section className="experience-page" aria-labelledby="experience-title"><div className="section-heading"><span className="heading-spark">✦</span><div><h2 id="experience-title">Experiência</h2><p>Minha trajetória profissional e acadêmica até aqui.</p></div></div><div className="timeline"><article className="timeline-card"><PixelIcon>▣</PixelIcon><div><h3>Software Engineer Intern</h3><p>Instituto Evereste</p><small>Estágio iniciado em junho de 2026. Responsabilidades e tecnologias específicas ainda não informadas.</small></div><span className="date">Jun 2026 – Atual</span></article><article className="timeline-card"><PixelIcon>▤</PixelIcon><div><h3>Engenharia de Software</h3><p>Universidade Ceuma</p><small>Formação acadêmica em andamento.</small></div><span className="date">Em andamento</span></article></div></section>}
            {view === "contato" && <section className="contact-page" aria-labelledby="contact-title"><div className="contact-envelope" aria-hidden="true"><span>♥</span></div><div className="contact-text"><div className="section-heading"><span className="heading-spark">✦</span><div><h2 id="contact-title">Contato</h2><p>Vamos conversar? Você pode me encontrar por aqui:</p></div></div><div className="contact-links"><div><PixelIcon>◉</PixelIcon><span>GitHub</span><span className="contact-arrow" aria-hidden="true">→</span></div><div><PixelIcon>in</PixelIcon><span>LinkedIn</span><span className="contact-arrow" aria-hidden="true">→</span></div><div><PixelIcon>✉</PixelIcon><span>E-mail</span><span className="contact-arrow" aria-hidden="true">→</span></div></div></div></section>}
          </div>
        </>
      )}
    </main>
  );
}
