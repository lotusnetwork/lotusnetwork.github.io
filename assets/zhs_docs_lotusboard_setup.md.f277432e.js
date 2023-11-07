import{_ as s,o as a,c as n,V as l}from"./chunks/framework.b1ba171e.js";const y=JSON.parse('{"title":"使用docker进行部署","description":"","frontmatter":{},"headers":[],"relativePath":"zhs/docs/lotusboard_setup.md","filePath":"zhs/docs/lotusboard_setup.md"}'),p={name:"zhs/docs/lotusboard_setup.md"},o=l(`<h1 id="使用docker进行部署" tabindex="-1">使用docker进行部署 <a class="header-anchor" href="#使用docker进行部署" aria-label="Permalink to &quot;使用docker进行部署&quot;">​</a></h1><p>你的环境需要安装 <code>git, nano, docker(with compose plugin)</code></p><p><strong>dc 等同于 docker compose</strong></p><h2 id="准备" tabindex="-1">准备 <a class="header-anchor" href="#准备" aria-label="Permalink to &quot;准备&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git clone https://github.com/lotusnetwork/lotusboard-docker.git</span></span>
<span class="line"><span style="color:#A6ACCD;">cd lotusboard-docker</span></span>
<span class="line"><span style="color:#A6ACCD;">git submodule update --init</span></span>
<span class="line"><span style="color:#A6ACCD;">git submodule update --remote</span></span></code></pre></div><h2 id="按需要修改compose配置档" tabindex="-1">按需要修改compose配置档 <a class="header-anchor" href="#按需要修改compose配置档" aria-label="Permalink to &quot;按需要修改compose配置档&quot;">​</a></h2><p><strong>ARM 用户请注意标有 &quot;arm用户看这里&quot; 的行</strong></p><p>arm用户请将标注行的上一行删去并使用标注行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">version: &#39;3&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">services:</span></span>
<span class="line"><span style="color:#A6ACCD;">  www:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: ghcr.io/lotusnetwork/sakuraneko</span></span>
<span class="line"><span style="color:#A6ACCD;">    # build: https://github.com/lotusnetwork/sakuraneko.git arm用户看这里</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./lotusboard:/www&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./wwwlogs:/wwwlogs&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./caddy.conf:/run/caddy/caddy.conf&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./supervisord.conf:/run/supervisor/supervisord.conf&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./crontabs.conf:/etc/crontabs/root&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./.caddy:/root/.caddy&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;80:80&#39; &lt;--- 如果您想配置反向代理请修改这里(443tls -&gt; caddy -&gt; 8080), 格式是 主机:容器内</span></span>
<span class="line"><span style="color:#A6ACCD;">    restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">    links:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - mysql</span></span>
<span class="line"><span style="color:#A6ACCD;">  mysql:</span></span>
<span class="line"><span style="color:#A6ACCD;">    image: mysql:5.7.29</span></span>
<span class="line"><span style="color:#A6ACCD;">    # image: arm64v8/mysql:latest  &lt;- arm用户看这里</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">      - &#39;./mysql:/var/lib/mysql&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">    environment:</span></span>
<span class="line"><span style="color:#A6ACCD;">      MYSQL_ROOT_PASSWORD: &#39;DataBase_password&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      MYSQL_DATABASE: DB_Name</span></span></code></pre></div><p><strong>记得修改mysql资料库的密码和资料库名字</strong></p><p><strong>如果您不想将资料库设置于本地, 请删去mysql区块来节省性能</strong></p><h2 id="配置lotusboard" tabindex="-1">配置lotusboard <a class="header-anchor" href="#配置lotusboard" aria-label="Permalink to &quot;配置lotusboard&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">- 在宿主机 -</span></span>
<span class="line"><span style="color:#A6ACCD;">docker compose up -d</span></span>
<span class="line"><span style="color:#A6ACCD;">docker compose exec www bash</span></span>
<span class="line"><span style="color:#A6ACCD;">- 在docker容器内 -</span></span>
<span class="line"><span style="color:#A6ACCD;">bash init.sh</span></span></code></pre></div><p>执行完上一条之后你应该能看到如下内容</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">__     ______  ____                      _</span></span>
<span class="line"><span style="color:#A6ACCD;">\\ \\   / /___ \\| __ )  ___   __ _ _ __ __| |</span></span>
<span class="line"><span style="color:#A6ACCD;"> \\ \\ / /  __) |  _ \\ / _ \\ / _\` | &#39;__/ _\` |</span></span>
<span class="line"><span style="color:#A6ACCD;">  \\ V /  / __/| |_) | (_) | (_| | | | (_| |</span></span>
<span class="line"><span style="color:#A6ACCD;">   \\_/  |_____|____/ \\___/ \\__,_|_|  \\__,_|</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库地址（默认:localhost） [localhost]:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; mysql &lt;--- 请勿修改(如果你部署mysql在本地)</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库名:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; DB_Name &lt;--- 你在compose配置中所配置的 DB_Name </span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库用户名:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; root &lt;--- 请勿修改</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入数据库密码:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; DataBase_password &lt;--- 你在compose配置中所配置的 DB_password</span></span>
<span class="line"><span style="color:#A6ACCD;">正在导入数据库请稍等...</span></span>
<span class="line"><span style="color:#A6ACCD;">数据库导入完成</span></span>
<span class="line"><span style="color:#A6ACCD;"> 请输入管理员邮箱?:</span></span>
<span class="line"><span style="color:#A6ACCD;"> &gt; test@test.com &lt;--- 用于登入管理面板的邮箱</span></span>
<span class="line"><span style="color:#A6ACCD;">一切就绪</span></span>
<span class="line"><span style="color:#A6ACCD;">管理员邮箱：test@test.com</span></span>
<span class="line"><span style="color:#A6ACCD;">管理员密码：3ecd18745d64fb2420b69eaacf340a87 &lt;--- 生成的密码</span></span>
<span class="line"><span style="color:#A6ACCD;">访问 http(s)://你的站点/e1bf6d26 进入管理面板，你可以在用户中心修改你的密码</span></span></code></pre></div><p><strong>现在lotusboard应该在 <a href="http://127.0.0.1" target="_blank" rel="noreferrer">http://127.0.0.1</a>:port提供服务了 (port是你在compose配置中所配置的)</strong></p><p><strong>如果提示队列任务工作异常请执行</strong><code>dc restart</code> 来重启面板</p>`,17),e=[o];function t(c,r,i,C,A,d){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{y as __pageData,u as default};
