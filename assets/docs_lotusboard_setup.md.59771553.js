import{_ as s,o as a,c as n,V as e}from"./chunks/framework.b1ba171e.js";const y=JSON.parse('{"title":"Setup by using docker","description":"","frontmatter":{},"headers":[],"relativePath":"docs/lotusboard_setup.md","filePath":"docs/lotusboard_setup.md"}'),l={name:"docs/lotusboard_setup.md"},o=e(`<h1 id="setup-by-using-docker" tabindex="-1">Setup by using docker <a class="header-anchor" href="#setup-by-using-docker" aria-label="Permalink to &quot;Setup by using docker&quot;">​</a></h1><p>You&#39;ll need <code>git, nano, docker(with compose plugin)</code> and a stable internet connection</p><p><strong>dc = docker compose</strong></p><h2 id="prepare-files" tabindex="-1">Prepare files <a class="header-anchor" href="#prepare-files" aria-label="Permalink to &quot;Prepare files&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git clone https://github.com/lotusnetwork/lotusboard-docker.git</span></span>
<span class="line"><span style="color:#A6ACCD;">cd lotusboard-docker</span></span></code></pre></div><p>And pull from remote</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git submodule update --init</span></span>
<span class="line"><span style="color:#A6ACCD;">git submodule update --remote</span></span></code></pre></div><p><strong>Then modify the docker-compose conf</strong></p><p><strong>ARM user please pay attention to &quot;if you&#39;re ARM user please replace image line with this&quot;</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">version: &#39;3&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">services:</span></span>
<span class="line"><span style="color:#A6ACCD;">  www:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: ghcr.io/lotusnetwork/sakuraneko</span></span>
<span class="line"><span style="color:#A6ACCD;">    # build: https://github.com/lotusnetwork/sakuraneko.git &lt;- if you&#39;re ARM user please replace image line with this</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./lotusboard:/www&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./wwwlogs:/wwwlogs&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./caddy.conf:/run/caddy/caddy.conf&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./supervisord.conf:/run/supervisor/supervisord.conf&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./crontabs.conf:/etc/crontabs/root&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./.caddy:/root/.caddy&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;80:80&#39; &lt;--- Modify if you want to reverse proxy, Eg (443tls -&gt; caddy -&gt; 8080), format is host:container</span></span>
<span class="line"><span style="color:#A6ACCD;">    restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">    links:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">  mysql:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: mysql:5.7.29</span></span>
<span class="line"><span style="color:#A6ACCD;">    # image: arm64v8/mysql:latest  &lt;- if you&#39;re ARM user please replace image line with this</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./mysql:/var/lib/mysql&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">    environment:</span></span>
<span class="line"><span style="color:#A6ACCD;">      MYSQL_ROOT_PASSWORD: &#39;DataBase_password&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      MYSQL_DATABASE: DB_Name</span></span></code></pre></div><p><strong>Remember to change the password and database of mysql</strong></p><p><strong>If your database is not deployed locally, remove the &quot;mysql&quot; block to save resource&quot;</strong></p><h2 id="setup-and-configure" tabindex="-1">Setup and configure <a class="header-anchor" href="#setup-and-configure" aria-label="Permalink to &quot;Setup and configure&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">- Out Docker Container -</span></span>
<span class="line"><span style="color:#A6ACCD;">docker compose up -d</span></span>
<span class="line"><span style="color:#A6ACCD;">docker compose exec www bash</span></span>
<span class="line"><span style="color:#A6ACCD;">- In Docker Container -</span></span>
<span class="line"><span style="color:#A6ACCD;">bash init.sh</span></span></code></pre></div><p>Now, you should see something like this</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">__     ______  ____                      _</span></span>
<span class="line"><span style="color:#A6ACCD;">\\ \\   / /___ \\| __ )  ___   __ _ _ __ __| |</span></span>
<span class="line"><span style="color:#A6ACCD;"> \\ \\ / /  __) |  _ \\ / _ \\ / _\` | &#39;__/ _\` |</span></span>
<span class="line"><span style="color:#A6ACCD;">  \\ V /  / __/| |_) | (_) | (_| | | | (_| |</span></span>
<span class="line"><span style="color:#A6ACCD;">   \\_/  |_____|____/ \\___/ \\__,_|_|  \\__,_|</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库地址（默认:localhost） [localhost]:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; mysql &lt;--- Don&#39;t modify</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库名:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; DB_Name &lt;--- Your DB_Name configured in docker-compose.yml</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库用户名:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; root &lt;--- Don&#39;t modify</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库密码:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; DataBase_password &lt;--- Your DB_Name configured in docker-compose.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">正在导入数据库请稍等...</span></span>
<span class="line"><span style="color:#A6ACCD;">数据库导入完成</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入管理员邮箱?:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; test@test.com &lt;--- Admin Account(Used for login the admin dashboard)</span></span>
<span class="line"><span style="color:#A6ACCD;">一切就绪</span></span>
<span class="line"><span style="color:#A6ACCD;">管理员邮箱：test@test.com</span></span>
<span class="line"><span style="color:#A6ACCD;">管理员密码：3ecd18745d64fb2420b69eaacf340a87 &lt;--- Your password(Generated)</span></span>
<span class="line"><span style="color:#A6ACCD;">访问 http(s)://你的站点/e1bf6d26 进入管理面板，你可以在用户中心修改你的密码 &lt;--- Open admin dashboard with http://127.0.0.1:your_port/e1bf6d26</span></span></code></pre></div><p><strong>Now v2board should be available at <a href="http://127.0.0.1" target="_blank" rel="noreferrer">http://127.0.0.1</a>:port (port you configured in docker-compose.yml)</strong></p><p>If you need just reverse proxy it</p><p><strong>After the setup, if the tasker(horizon) is not working please do</strong><code>dc restart</code> to restart the panel</p>`,19),p=[o];function t(c,r,i,d,A,C){return a(),n("div",null,p)}const _=s(l,[["render",t]]);export{y as __pageData,_ as default};
