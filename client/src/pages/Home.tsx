/**
 * Blueprint Terminal design reminder: this page behaves like a readable engineering
 * blueprint—off-axis layout, numbered route nodes, warm paper space and precise blue accents.
 */
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clipboard,
  Code2,
  FileCheck2,
  GitBranch,
  Menu,
  Network,
  PackageCheck,
  PanelTopClose,
  Route,
  ServerCog,
  X,
} from "lucide-react";

const logoUrl = "/manus-storage/static-edge-symbol_899b448a.png";
const heroUrl = "/manus-storage/static-edge-hero_4fe7c691.png";
const artifactUrl = "/manus-storage/build-artifact-plate_80544e90.png";
const routingUrl = "/manus-storage/edge-route-plate_47c24daa.png";

const wranglerConfig = `name = "your-worker"
main = "src/worker.ts"
compatibility_date = "2026-08-17"

[assets]
directory = "./dist"
binding = "ASSETS"`;

const workerConfig = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return Response.json({ ok: true });
    }

    return env.ASSETS.fetch(request);
  },
};`;

function AnchorLink({
  target,
  children,
  onNavigate,
}: {
  target: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const navigate = () => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    onNavigate?.();
  };

  return (
    <button type="button" className="nav-link" onClick={navigate}>
      {children}
    </button>
  );
}

function CodePanel({ title, language, code }: { title: string; language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="code-panel" aria-label={title}>
        <div className="code-panel__topline">
          <div>
            <span className="code-panel__eyebrow">{language}</span>
            <h3>{title}</h3>
          </div>
          <span className="evidence-id">READOUT / {language === "WRANGLER.TOML" ? "01" : "02"}</span>
          <button className="copy-button" type="button" onClick={copy} aria-label={`复制 ${title}`}>
          {copied ? <Check size={15} strokeWidth={2.2} /> : <Clipboard size={15} strokeWidth={2.2} />}
          <span>{copied ? "已复制" : "复制"}</span>
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </section>
  );
}

function SectionMark({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-mark">
      <span className="section-mark__point" />
      <span className="section-mark__number">{number}</span>
      <span className="section-mark__label">{label}</span>
      <span className="section-mark__state">STATION / VERIFIED PATH</span>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Static Edge Notes 首页">
          <img src={logoUrl} alt="Static Edge Notes 图形标志" className="brand__symbol" />
          <span className="brand__name">
            <b>STATIC</b>
            <i>/</i>
            <b>EDGE</b>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="页面导航">
          <AnchorLink target="audit">01 审计</AnchorLink>
          <AnchorLink target="mapping">02 映射</AnchorLink>
          <AnchorLink target="configure">03 配置</AnchorLink>
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "关闭导航" : "打开导航"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}>
          <AnchorLink target="audit" onNavigate={() => setMenuOpen(false)}>01 审计当前结构</AnchorLink>
          <AnchorLink target="mapping" onNavigate={() => setMenuOpen(false)}>02 绑定构建产物</AnchorLink>
          <AnchorLink target="configure" onNavigate={() => setMenuOpen(false)}>03 设置请求路径</AnchorLink>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="kicker"><span>WORKERS STATIC ASSETS</span><em>— 工程化改造笔记</em></p>
            <h1 id="hero-title">先确认产物<br />再定义<strong>边缘。</strong></h1>
            <p className="hero-intro">
              将现有项目从“能构建”梳理到“能在边缘正确服务”。先识别真实的构建目录，
              再将静态请求交给资产层，只把必须计算的路径留给 Worker。
            </p>
            <div className="hero-actions">
              <AnchorLink target="audit"><span>开始结构审计</span><ArrowDownRight size={18} /></AnchorLink>
              <a className="text-action" href="https://developers.cloudflare.com/workers/static-assets/" target="_blank" rel="noreferrer">
                阅读官方资产文档 <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <span className="measure measure--top">0.01 / EDGE AUDIT</span>
            <img src={heroUrl} alt="静态资产从构建产物分发至边缘网络的工程示意" />
            <div className="visual-chip visual-chip--one"><span>✓</span> 产物定位</div>
            <div className="visual-chip visual-chip--two"><span>→</span> 边缘分发</div>
            <div className="hero-circuit" aria-hidden="true"><span>BUILD</span><i /><span>ASSETS</span><i /><span>EDGE</span></div>
            <span className="measure measure--bottom">BUILD OUTPUT → ASSETS</span>
          </div>
        </section>

        <section className="statement-strip" aria-label="改造原则">
          <p><strong>目标：</strong> 不猜构建目录，不让动态路由吞掉静态请求。</p>
          <span className="statement-strip__line" />
          <p><strong>方法：</strong> 审计、绑定、分流、验证。</p>
        </section>

        <div className="content-frame">
          <aside className="route-rail" aria-label="部署流程">
            <span className="route-rail__title">ROUTE</span>
            <div className="route-rail__line" />
            <a href="#audit" aria-label="前往审计阶段">01</a>
            <a href="#mapping" aria-label="前往映射阶段">02</a>
            <a href="#configure" aria-label="前往配置阶段">03</a>
            <a href="#verify" aria-label="前往验证阶段">04</a>
          </aside>

          <div className="content-stream">
            <section id="audit" className="guide-section guide-section--audit" aria-labelledby="audit-title">
              <SectionMark number="01" label="INSPECT THE ACTUAL OUTPUT" />
              <div className="section-heading split-heading">
                <div>
                  <p className="eyebrow">审计当前结构</p>
                  <h2 id="audit-title">构建命令成功，<br /><em>不等于</em>资产路径正确。</h2>
                </div>
                <p>
                  从项目脚本和构建产物开始确认，而不是先改 Worker。你需要找到真正被构建工具写出的目录，
                  并确保它包含入口 HTML、哈希资源与需要回退的路径。
                </p>
              </div>

              <div className="audit-board">
                <div className="audit-board__head">
                  <span>PROJECT OBSERVATION BOARD</span>
                  <span>READ ONLY / BEFORE CHANGE</span>
                </div>
                <div className="audit-grid">
                  <article className="audit-item">
                    <PackageCheck size={23} />
                    <h3>构建脚本</h3>
                    <p>核对 package script 最终执行的命令与输出参数。</p>
                    <code>pnpm build</code>
                  </article>
                  <article className="audit-item">
                    <PanelTopClose size={23} />
                    <h3>目录落点</h3>
                    <p>确认 <code>dist</code>、<code>build</code> 或自定义目录的实际内容。</p>
                    <code>find ./dist -maxdepth 2</code>
                  </article>
                  <article className="audit-item">
                    <FileCheck2 size={23} />
                    <h3>入口与资源</h3>
                    <p>检查 <code>index.html</code> 以及 JS、CSS、字体等静态引用是否完整。</p>
                    <code>index.html + assets/</code>
                  </article>
                </div>
                <div className="audit-board__note">
                  <span className="status-dot" />
                  <p><b>通过标准：</b> 你能用一个确定的相对路径指向最终可部署的静态目录。</p>
                </div>
              </div>
            </section>

            <section id="mapping" className="guide-section guide-section--mapping" aria-labelledby="mapping-title">
              <SectionMark number="02" label="BIND WHAT THE BUILD PRODUCES" />
              <div className="mapping-layout">
                <div className="mapping-image-wrap">
                  <div className="image-corner image-corner--tl" />
                  <img src={artifactUrl} alt="构建产物目录被绑定为静态资产的抽象工程图" />
                  <span className="inspection-tag inspection-tag--top">[A] OUTPUT TREE</span>
                  <span className="inspection-tag inspection-tag--side">DIST / BOUND</span>
                  <span className="figure-label">ARTIFACT / DIRECTORY</span>
                </div>
                <div className="mapping-copy">
                  <p className="eyebrow">绑定构建产物</p>
                  <h2 id="mapping-title">让目录成为<br />资产源，而不是<br /><em>另一个猜测。</em></h2>
                  <p>
                    在 <code>wrangler.toml</code> 中，使用资产目录显式描述构建产物。目录值应当与上一步验证的输出一致；
                    这使得静态文件能够按资产规则被提供，而非经过一层不必要的自定义转发。
                  </p>
                  <ul className="check-list">
                    <li><Check size={15} /> 路径相对于配置文件可解析。</li>
                    <li><Check size={15} /> 构建步骤在部署前已完成。</li>
                    <li><Check size={15} /> 不把源代码目录误作为部署目录。</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="configure" className="guide-section guide-section--config" aria-labelledby="configure-title">
              <SectionMark number="03" label="SEPARATE STATIC FROM DYNAMIC" />
              <div className="section-heading config-heading">
                <div>
                  <p className="eyebrow">配置与分流</p>
                  <h2 id="configure-title">静态资源就近服务，<br />动态路径才进入逻辑。</h2>
                </div>
                <p>下方配置用于说明目录绑定与请求分流的基本关系。请将名称、日期、目录和 API 路径替换为你项目的实际值。</p>
              </div>

              <div className="config-grid">
                <CodePanel title="声明静态资产目录" language="WRANGLER.TOML" code={wranglerConfig} />
                <CodePanel title="把未命中 API 的请求交给资产" language="SRC/WORKER.TS" code={workerConfig} />
              </div>
              <div className="config-footnote">
                <Code2 size={18} />
                <p>这里展示的是最小的分层思路：<b>/api/</b> 继续由 Worker 响应；其余请求使用资产绑定取得静态内容。</p>
              </div>
            </section>

            <section id="verify" className="guide-section guide-section--verify" aria-labelledby="verify-title">
              <SectionMark number="04" label="VERIFY THE REQUEST PATH" />
              <div className="verify-layout">
                <div className="verify-copy">
                  <p className="eyebrow">上线前验证</p>
                  <h2 id="verify-title">验证的对象，<br />是<strong>请求路径。</strong></h2>
                  <p>部署后分别访问首页、一个带哈希的静态资源、一个 API 路径以及一个不存在的前端路由。这样能确认每一类请求都被正确处理。</p>
                  <div className="path-tests" role="list" aria-label="请求验证清单">
                    <div role="listitem"><span>GET</span><b>/</b><i>入口文档</i><Check size={17} /></div>
                    <div role="listitem"><span>GET</span><b>/assets/app.[hash].js</b><i>静态资源</i><Check size={17} /></div>
                    <div role="listitem"><span>GET</span><b>/api/health</b><i>Worker 逻辑</i><Check size={17} /></div>
                    <div role="listitem"><span>GET</span><b>/settings</b><i>前端路由策略</i><ChevronRight size={17} /></div>
                  </div>
                </div>
                <div className="routing-figure">
                  <img src={routingUrl} alt="Worker 与静态资产之间按请求路径分流的工程示意" />
                  <span className="inspection-tag inspection-tag--route">[B] REQUEST SPLIT</span>
                  <div className="route-tag route-tag--api"><ServerCog size={15} /> API → Worker</div>
                  <div className="route-tag route-tag--asset"><Network size={15} /> / → Assets</div>
                </div>
              </div>
            </section>

            <section className="closing-section" aria-label="下一步">
              <p className="closing-section__index">END / BEGIN</p>
              <h2>不是把目录<br />“放进去”，而是让<br /><em>正确的请求</em>抵达它。</h2>
              <a href="#audit" className="restart-link"><GitBranch size={17} /> 回到结构审计 <ArrowDownRight size={17} /></a>
              <p className="closing-section__note">Static Edge Notes · 一页部署改造参考 · 适用于从既有前端项目梳理静态资产服务路径。</p>
            </section>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <img src={logoUrl} alt="" />
          <span>STATIC / EDGE</span>
        </div>
        <p>以构建产物为证据，以请求路径为边界。</p>
        <a href="#top">TOP <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  );
}
