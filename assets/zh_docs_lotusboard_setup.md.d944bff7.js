import{_ as s,o as a,c as n,V as l}from"./chunks/framework.b1ba171e.js";const y=JSON.parse('{"title":"使用docker進行部署","description":"","frontmatter":{},"headers":[],"relativePath":"zh/docs/lotusboard_setup.md","filePath":"zh/docs/lotusboard_setup.md"}'),p={name:"zh/docs/lotusboard_setup.md"},o=l(`<h1 id="使用docker進行部署" tabindex="-1">使用docker進行部署 <a class="header-anchor" href="#使用docker進行部署" aria-label="Permalink to &quot;使用docker進行部署&quot;">​</a></h1><p>你的環境需要安裝 <code>git, nano, docker(with compose plugin)</code></p><p><strong>dc 等同於 docker compose</strong></p><h2 id="準備" tabindex="-1">準備 <a class="header-anchor" href="#準備" aria-label="Permalink to &quot;準備&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git clone https://github.com/lotusnetwork/lotusboard-docker.git</span></span>
<span class="line"><span style="color:#A6ACCD;">cd lotusboard-docker</span></span></code></pre></div><h2 id="按需要修改compose配置檔" tabindex="-1">按需要修改compose配置檔 <a class="header-anchor" href="#按需要修改compose配置檔" aria-label="Permalink to &quot;按需要修改compose配置檔&quot;">​</a></h2><p><strong>ARM 用戶請注意標有 &quot;arm用戶看這裡&quot; 的行</strong></p><p>arm用戶請將標註行的上一行刪去並使用標註行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">version: &#39;3&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">services:</span></span>
<span class="line"><span style="color:#A6ACCD;">  www:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: ghcr.io/lotusnetwork/sakuraneko</span></span>
<span class="line"><span style="color:#A6ACCD;">    # build: https://github.com/lotusnetwork/sakuraneko.git arm用戶看這裡</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./www:/www&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./wwwlogs:/wwwlogs&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./caddy.conf:/run/caddy/caddy.conf&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./supervisord.conf:/run/supervisor/supervisord.conf&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./crontabs.conf:/etc/crontabs/root&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./.caddy:/root/.caddy&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;80:80&#39; &lt;--- 如果您想配置反向代理請修改這裡(443tls -&gt; caddy -&gt; 8080), 格式是 主機:容器內</span></span>
<span class="line"><span style="color:#A6ACCD;">    restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">    links:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">  mysql:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: mysql:5.7.29</span></span>
<span class="line"><span style="color:#A6ACCD;">    # image: arm64v8/mysql:latest  &lt;- arm用戶看這裡</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./mysql:/var/lib/mysql&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">    environment:</span></span>
<span class="line"><span style="color:#A6ACCD;">      MYSQL_ROOT_PASSWORD: &#39;DataBase_password&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      MYSQL_DATABASE: DB_Name</span></span></code></pre></div><p><strong>記得修改mysql資料庫的密碼和資料庫名字</strong></p><p><strong>如果您不想將資料庫設置於本地, 請刪去mysql區塊來節省性能</strong></p><h2 id="配置lotusboard" tabindex="-1">配置lotusboard <a class="header-anchor" href="#配置lotusboard" aria-label="Permalink to &quot;配置lotusboard&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">- 在docker容器內 -</span></span>
<span class="line"><span style="color:#A6ACCD;">docker compose up -d</span></span>
<span class="line"><span style="color:#A6ACCD;">docker compose exec www bash</span></span>
<span class="line"><span style="color:#A6ACCD;">- 在宿主機 -</span></span>
<span class="line"><span style="color:#A6ACCD;">bash init.sh</span></span></code></pre></div><p>執行完上一條之後你應該能看到如下內容</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">__     ______  ____                      _</span></span>
<span class="line"><span style="color:#A6ACCD;">\\ \\   / /___ \\| __ )  ___   __ _ _ __ __| |</span></span>
<span class="line"><span style="color:#A6ACCD;"> \\ \\ / /  __) |  _ \\ / _ \\ / _\` | &#39;__/ _\` |</span></span>
<span class="line"><span style="color:#A6ACCD;">  \\ V /  / __/| |_) | (_) | (_| | | | (_| |</span></span>
<span class="line"><span style="color:#A6ACCD;">   \\_/  |_____|____/ \\___/ \\__,_|_|  \\__,_|</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库地址（默认:localhost） [localhost]:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; mysql &lt;--- 請勿修改(如果你部署mysql在本地)</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库名:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; DB_Name &lt;--- 你在compose配置中所配置的 DB_Name </span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库用户名:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; root &lt;--- 請勿修改</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库密码:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; DataBase_password &lt;--- 你在compose配置中所配置的 DB_password</span></span>
<span class="line"><span style="color:#A6ACCD;">正在导入数据库请稍等...</span></span>
<span class="line"><span style="color:#A6ACCD;">数据库导入完成</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入管理员邮箱?:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; test@test.com &lt;--- 用於登入管理面板的郵箱</span></span>
<span class="line"><span style="color:#A6ACCD;">一切就绪</span></span>
<span class="line"><span style="color:#A6ACCD;">管理员邮箱：test@test.com</span></span>
<span class="line"><span style="color:#A6ACCD;">管理员密码：3ecd18745d64fb2420b69eaacf340a87 &lt;--- 生成的密碼</span></span>
<span class="line"><span style="color:#A6ACCD;">访问 http(s)://你的站点/e1bf6d26 进入管理面板，你可以在用户中心修改你的密码</span></span></code></pre></div><p><strong>現在lotusboard應該在 <a href="http://127.0.0.1" target="_blank" rel="noreferrer">http://127.0.0.1</a>:port提供服務了 (port是你在compose配置中所配置的)</strong></p><p><strong>如果提示隊列任務工作異常請執行</strong><code>dc restart</code> 來重啓面板</p>`,17),e=[o];function t(c,r,i,C,A,_){return a(),n("div",null,e)}const D=s(p,[["render",t]]);export{y as __pageData,D as default};
