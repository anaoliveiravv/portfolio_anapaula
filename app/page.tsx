"use client";

import { useState } from "react";

type View = "inicio" | "projetos" | "sobre mim" | "experiência" | "contato";
const views: View[] = ["inicio", "projetos", "sobre mim", "experiência", "contato"];

function PixelIcon({ children }: { children: React.ReactNode }) {
  return <span className="pixel-icon" aria-hidden="true">{children}</span>;
}

export default function Home() {
  const [view, setView] = useState<View>("inicio");
  const open = (next: View) => { setView(next); window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); };

  return (
    <main className={`app-shell ${view === "inicio" ? "is-home" : "is-inner"}`}>
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
            {view === "projetos" && <section className="projects-page" aria-labelledby="projects-title"><div className="section-heading"><span className="heading-spark">✦</span><div><h2 id="projects-title">Projetos</h2><p>Alguns trabalhos que desenvolvi e quero compartilhar.</p></div></div><div className="projects-grid"><article className="project-card project-large"><div className="project-art landscape-art"><div className="art-cloud" /><div className="art-sun" /><div className="art-hill" /></div><div className="project-body"><h3>SP Spaces</h3><p>Projeto desenvolvido com Java, Spring Boot e PostgreSQL.</p><div className="tags"><span>Java</span><span>Spring Boot</span><span>PostgreSQL</span></div></div></article><div className="project-side"><article className="project-card project-small"><div className="mini-art flower-art">✿<span>✿</span></div><div className="project-body"><h3>Classificador de Flores</h3><p>Classificação de flores com Python, Pandas e Scikit-learn.</p><div className="tags"><span>Python</span><span>Pandas</span><span>Scikit-learn</span></div></div></article><article className="project-card project-small"><div className="mini-art port-art"><span>▥</span><span>〰</span></div><div className="project-body"><h3>Plataforma de Gestão Portuária</h3><p>Interface em Next.js e TypeScript com back-end Spring Boot.</p><div className="tags"><span>Next.js</span><span>TypeScript</span><span>Spring Boot</span></div></div></article></div></div><p className="missing-note">Ilustrações provisórias. Links dos projetos poderão ser adicionados quando você os fornecer.</p></section>}
            {view === "sobre mim" && <section className="about-page" aria-labelledby="about-title"><div className="portrait-card" role="img" aria-label="Ilustração em pixel art de uma personagem com fones de ouvido"><span className="tape" /><div className="portrait-placeholder"><span>AP</span><small>retrato a adicionar</small></div><span className="portrait-heart">♡</span></div><div className="about-text"><div className="section-heading"><span className="heading-spark">✦</span><div><h2 id="about-title">Sobre mim</h2><p>Desenvolvedora back-end, curiosa por inteligência artificial e por como tecnologia pode criar novas possibilidades.</p></div></div><div className="about-block"><PixelIcon>♧</PixelIcon><div><h3>Formação</h3><strong>Engenharia de Software</strong><p>Universidade Ceuma <span>·</span> Em andamento</p></div></div><div className="about-block"><PixelIcon>♥</PixelIcon><div><h3>Interesses</h3><div className="tags interests"><span>Back-end</span><span>IA</span><span>Dados</span><span>Sistemas</span></div></div></div></div></section>}
            {view === "experiência" && <section className="experience-page" aria-labelledby="experience-title"><div className="section-heading"><span className="heading-spark">✦</span><div><h2 id="experience-title">Experiência</h2><p>Minha trajetória profissional e acadêmica até aqui.</p></div></div><div className="timeline"><article className="timeline-card"><PixelIcon>▣</PixelIcon><div><h3>Software Engineer Intern</h3><p>Instituto Evereste</p><small>Estágio iniciado em junho de 2026. Responsabilidades e tecnologias específicas ainda não informadas.</small></div><span className="date">Jun 2026 – Atual</span></article><article className="timeline-card"><PixelIcon>▤</PixelIcon><div><h3>Engenharia de Software</h3><p>Universidade Ceuma</p><small>Formação acadêmica em andamento.</small></div><span className="date">Em andamento</span></article></div></section>}
            {view === "contato" && <section className="contact-page" aria-labelledby="contact-title"><div className="contact-envelope" aria-hidden="true"><span>♥</span></div><div className="contact-text"><div className="section-heading"><span className="heading-spark">✦</span><div><h2 id="contact-title">Contato</h2><p>Vamos conversar? Você pode me encontrar por aqui:</p></div></div><div className="contact-links"><div><PixelIcon>◉</PixelIcon><span>GitHub</span><small>URL pendente</small></div><div><PixelIcon>in</PixelIcon><span>LinkedIn</span><small>URL pendente</small></div><div><PixelIcon>✉</PixelIcon><span>E-mail</span><small>endereço pendente</small></div><div><PixelIcon>HF</PixelIcon><span>Hugging Face</span><small>URL pendente</small></div></div></div></section>}
          </div>
        </>
      )}
    </main>
  );
}
