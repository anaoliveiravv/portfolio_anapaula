const folders = [
  { name: "projetos", href: "#projetos" },
  { name: "sobre mim", href: "#sobre" },
  { name: "experiência", href: "#experiencia" },
  { name: "contato", href: "#contato" },
];

export default function Home() {
  return (
    <main className="portfolio" id="inicio">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="sky-scene" aria-hidden="true">
        <div className="sun-halo" />
        <div className="cloud cloud-one"><i /><i /><i /></div>
        <div className="cloud cloud-two"><i /><i /><i /></div>
        <div className="cloud cloud-three"><i /><i /><i /></div>
        <div className="hill hill-back" />
        <div className="hill hill-front" />
        <div className="grain" />
      </div>

      <header className="topbar">
        <a className="wordmark" href="#inicio" aria-label="Ana Paula — início">
          <span className="wordmark-seal">a<span>p</span></span>
          <span>ana paula <em>de oliveira</em></span>
        </a>
        <nav className="top-nav" aria-label="Navegação principal">
          <a href="#inicio" aria-current="page">início</a>
          <a href="#projetos">projetos</a>
          <a href="#sobre">sobre</a>
          <a href="#contato">contato</a>
          <span className="nav-status"><i /> engenharia × imaginação</span>
        </nav>
        <span className="top-index">APO — 2026</span>
      </header>

      <section className="home-stage" aria-labelledby="hero-title">
        <div className="stage-note note-top"><span>ARQUIVO PESSOAL / 001</span><span>PORTFÓLIO · V. 01</span></div>

        <div className="intro-window" id="apresentacao">
          <div className="window-bar">
            <div className="window-brand"><span className="tiny-flower">✿</span> bem-vinda(o).exe</div>
            <div className="window-actions" aria-hidden="true"><span>−</span><span>□</span><span>×</span></div>
          </div>
          <div className="window-body">
            <p className="eyebrow"><span className="sparkle">✳</span> um espaço em construção</p>
            <h1 id="hero-title">Oi, eu sou<br /><span>Ana Paula.</span></h1>
            <p className="role">Back-end Developer <b>✳</b> AI Enthusiast</p>
            <p className="intro-copy">Transformo curiosidade em software — explorando sistemas, dados e as possibilidades da inteligência artificial.</p>
            <div className="intro-actions" id="atalhos">
              <a className="button button-primary" href="#projetos">Explorar projetos <span aria-hidden="true">↗</span></a>
              <a className="button button-quiet" href="#sobre">Sobre mim <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="window-foot"><span>CEUMA · ENGENHARIA DE SOFTWARE</span><span>perfil pessoal</span></div>
        </div>

        <div className="crt-scene" aria-hidden="true">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <span className="star star-a">✳</span><span className="star star-b">✦</span>
          <div className="crt-monitor">
            <div className="crt-shell">
              <div className="crt-screen"><div className="screen-glow" /><div className="screen-cloud" /><div className="screen-sun" /><div className="screen-hill" /><span>dreaming in code<span className="cursor-mark">_</span></span></div>
              <div className="crt-controls"><i /><i /><i /><span>♡</span></div>
            </div>
            <div className="crt-neck" /><div className="crt-foot" />
          </div>
          <div className="crt-caption">PENSAMENTOS, EM ÓRBITA <span>✴</span></div>
        </div>

        <div className="floating-label label-left"><span className="label-icon">✿</span><span>feito com<br />curiosidade</span></div>
        <div className="floating-label label-right"><span className="label-orbit">◎</span><span>caderno<br />digital nº 01</span></div>

        <div className="folders-window" id="pastas">
          <div className="folders-title"><span>◧</span> neste universo <small>4 itens</small></div>
          <div className="folder-list">
            {folders.map((folder, index) => (
              <a className="folder-item" href={folder.href} key={folder.name}>
                <span className={`folder-icon folder-${index + 1}`} aria-hidden="true"><i /></span>
                <span>{folder.name}</span><span className="folder-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <p className="folders-hint">algumas janelas ainda estão se abrindo <span>✦</span></p>
        </div>

        <div className="stage-note note-bottom"><span>CONSTRUINDO COM CALMA, UMA LINHA DE CADA VEZ</span><span>✧ 2026</span></div>
      </section>

      <div id="conteudo">
        <section className="content-section about-section" id="sobre" aria-labelledby="about-title">
          <div className="section-inner about-grid">
            <div className="section-heading">
              <p className="section-kicker">01 / quem está por trás da tela</p>
              <h2 id="about-title">Entre sistemas<br />e <em>possibilidades.</em></h2>
            </div>
            <div className="about-copy">
              <p className="about-lead">Sou estudante de Engenharia de Software na Universidade Ceuma e estagiária de Engenharia de Software no Instituto Evereste.</p>
              <p>Tenho experiência em desenvolvimento back-end e curiosidade por Machine Learning, agentes inteligentes e Engenharia de IA. Gosto de entender como as peças de um sistema se conectam — e do que ainda dá para criar com elas.</p>
              <div className="about-stamps"><span>base em software</span><span>olhar para IA</span><span>aprendizado contínuo</span></div>
            </div>
            <div className="note-card education-card">
              <div className="note-card-top"><span>✳ caderno de percurso</span><span>01—02</span></div>
              <p className="timeline-date">EM ANDAMENTO</p>
              <h3>Engenharia de Software</h3>
              <p className="timeline-place">Universidade Ceuma</p>
              <div className="timeline-line" />
              <p className="timeline-date">JUN 2026 — ATUAL</p>
              <h3>Software Engineer Intern</h3>
              <p className="timeline-place">Instituto Evereste</p>
              <span className="note-sticker" aria-hidden="true">aprendendo<br />em órbita ✦</span>
            </div>
          </div>
        </section>

        <section className="content-section experience-section" id="experiencia" aria-labelledby="experience-title">
          <div className="section-inner experience-inner">
            <div className="section-heading">
              <p className="section-kicker">02 / trajetória profissional</p>
              <h2 id="experience-title">Primeiros passos,<br /><em>novas camadas.</em></h2>
            </div>
            <article className="experience-window">
              <div className="experience-bar"><span>✿ experiência.txt</span><span>JUNHO 2026 — ATUAL</span></div>
              <div className="experience-body">
                <span className="experience-index">01</span>
                <div><h3>Software Engineer Intern</h3><p className="experience-company">Instituto Evereste</p></div>
                <span className="experience-date">Desde junho de 2026</span>
              </div>
              <div className="experience-note"><span>✳</span><p>Estágio em andamento. As responsabilidades e tecnologias específicas serão acrescentadas quando estiverem confirmadas.</p></div>
            </article>
            <div className="experience-orbit" aria-hidden="true">✧</div>
          </div>
        </section>

        <section className="content-section projects-section" id="projetos" aria-labelledby="projects-title">
          <div className="section-inner">
            <div className="projects-heading-row">
              <div className="section-heading">
                <p className="section-kicker">03 / diretório de projetos</p>
                <h2 id="projects-title">Pastas que estou<br /><em>explorando.</em></h2>
              </div>
              <div className="project-window-meta"><span>MEU COMPUTADOR</span><span>3 pastas</span><span>↗</span></div>
            </div>
            <div className="project-grid">
              <article className="project-card project-feature">
                <div className="project-art flower-art" role="img" aria-label="Ilustração abstrata de flores e pontos de dados">
                  <span className="art-coordinate">DATA GARDEN / 001</span><span className="art-flower flower-a" /><span className="art-flower flower-b" /><span className="art-flower flower-c" /><span className="art-stem stem-a" /><span className="art-stem stem-b" /><span className="art-dot dot-a" /><span className="art-dot dot-b" /><span className="art-dot dot-c" /><span className="art-label">iris.exe</span>
                </div>
                <div className="project-info"><div className="project-number">01 <span>— EXPERIMENTO</span></div><h3>Classificador de Flores</h3><p>Experimento de classificação de flores com Python, análise de dados e aprendizado de máquina.</p><div className="tag-list"><span>Python</span><span>Pandas</span><span>Scikit-learn</span></div><p className="project-link-note">Link do projeto não informado</p></div>
              </article>
              <article className="project-card project-offset">
                <div className="project-art space-art" role="img" aria-label="Composição geométrica inspirada em uma interface espacial">
                  <span className="space-orb" /><span className="space-grid" /><span className="space-block block-a" /><span className="space-block block-b" /><span className="space-block block-c" /><span className="space-label">SP / SPACES</span>
                </div>
                <div className="project-info"><div className="project-number">02 <span>— APLICAÇÃO</span></div><h3>SP Spaces</h3><p>Projeto desenvolvido com Java e Spring Boot, com persistência em PostgreSQL.</p><div className="tag-list"><span>Java</span><span>Spring Boot</span><span>PostgreSQL</span></div><p className="project-link-note">Link do projeto não informado</p></div>
              </article>
              <article className="project-card project-wide">
                <div className="project-art port-art" role="img" aria-label="Ilustração abstrata de mar, guindaste e contêineres portuários">
                  <span className="port-sun" /><span className="port-crane"><i /><i /><i /></span><span className="port-container container-a" /><span className="port-container container-b" /><span className="port-wave wave-a" /><span className="port-wave wave-b" /><span className="port-label">PORT 03 — 2026</span>
                </div>
                <div className="project-info"><div className="project-number">03 <span>— PLATAFORMA</span></div><h3>Plataforma de Gestão Portuária</h3><p>Plataforma construída com Next.js e TypeScript na interface, e Spring Boot no back-end.</p><div className="tag-list"><span>Next.js</span><span>TypeScript</span><span>Spring Boot</span></div><p className="project-link-note">Link do projeto não informado</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="content-section tech-section" id="tecnologias" aria-labelledby="tech-title">
          <div className="section-inner tech-inner">
            <div className="section-heading">
              <p className="section-kicker">04 / ferramentas de exploração</p>
              <h2 id="tech-title">Minha <em>caixa</em><br />de ferramentas.</h2>
            </div>
            <div className="tech-grid">
              <article className="tech-note"><span className="tech-index">A / 01</span><h3>Linguagens</h3><p>Python · Java · TypeScript</p><span className="tech-doodle" aria-hidden="true">⌘</span></article>
              <article className="tech-note tech-note-pink"><span className="tech-index">B / 02</span><h3>IA & dados</h3><p>Pandas · Scikit-learn · Machine Learning · agentes inteligentes · Engenharia de IA</p><span className="tech-doodle" aria-hidden="true">✳</span></article>
              <article className="tech-note tech-note-green"><span className="tech-index">C / 03</span><h3>Back-end</h3><p>Spring Boot · PostgreSQL · desenvolvimento back-end</p><span className="tech-doodle" aria-hidden="true">⌁</span></article>
              <article className="tech-note tech-note-lilac"><span className="tech-index">D / 04</span><h3>Ferramentas</h3><p>Next.js</p><span className="tech-doodle" aria-hidden="true">✧</span></article>
            </div>
          </div>
        </section>

        <section className="content-section contact-section" id="contato" aria-labelledby="contact-title">
          <div className="section-inner contact-inner">
            <div className="contact-copy">
              <p className="section-kicker">05 / sinal aberto</p>
              <h2 id="contact-title">Vamos trocar<br /><em>ideias?</em></h2>
              <p>Este universo está sempre em expansão. Os perfis e o contato profissional entram aqui quando você fornecer os links.</p>
            </div>
            <div className="contact-window">
              <div className="experience-bar"><span>✉ conexões.link</span><span>3 PERFIS</span></div>
              <div className="contact-links">
                <div><span className="contact-symbol">GH</span><span>GitHub</span><span className="contact-missing">URL pendente</span></div>
                <div><span className="contact-symbol">in</span><span>LinkedIn</span><span className="contact-missing">URL pendente</span></div>
                <div><span className="contact-symbol">HF</span><span>Hugging Face</span><span className="contact-missing">URL pendente</span></div>
              </div>
              <p className="contact-email">Contato profissional <span>e-mail pendente</span></p>
            </div>
            <span className="contact-star" aria-hidden="true">✳</span>
          </div>
        </section>
      </div>

      <footer className="desktop-dock" aria-label="Rodapé">
        <div className="dock-item"><span className="dock-glyph">⌂</span><span>início</span></div>
        <div className="dock-divider" />
        <div className="dock-item"><span className="dock-glyph dock-folder">▰</span><span>portfólio</span></div>
        <div className="dock-divider" />
        <p>um pixel de cada vez <span>♡</span></p>
        <span className="dock-clock">V. 01</span>
      </footer>
    </main>
  );
}
