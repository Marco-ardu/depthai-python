window.onload = function(){
  // !function(){
  //   if(!document.getElementById("gzfy")){
  //     var zfyan=document.createElement("span");
  //     zfyan.id="gzfy";
  //     zfyan.innerHTML="翻译";
  //     zfyan.style.cssText="display:flex;text-align:center !important;font-size:20px;width:28px;height:56px;line-height:28px;text-align:center;float:right;position:fixed;right:52px;top:60%;color:#000;opacity:0.8;background:#e3edcd;cursor:pointer;position:fixed !important;z-index:9999999999 !important;box-shadow:0px 1px 1px #000;border-radius:50%";
  //     zfyan.addEventListener("click",function(){zfy()});
  //     document.body.appendChild(zfyan);
  //   }
  //   var zfyhdy1,zfyhdy2;
  //   document.addEventListener("touchstart",function(e){zfyhdy1=e.changedTouches[0].clientY});
  //   document.addEventListener("touchmove",function(e){zfyhdy2=e.changedTouches[0].clientY;
  //   document.getElementById("gzfy").style.display=zfyhdy2-zfyhdy1>0?"block":"none"});
  //   function zfy(){
  //     var zfyfy=document.getElementById("gzfy");
  //     zfyfy.parentNode.removeChild(zfyfy);
  //     var cyfy=document.createElement("script");
  //     cyfy.type="text/javascript";
  //     cyfy.charset="UTF-8";
  //     cyfy.src="_static/js/trs.js";
  //     document.body.appendChild(cyfy); 
  //   }}();
    const head = document.head
    // 获取body
    const body = document.body
    const navbar = document.getElementsByClassName('lux-navbar')[0];
    // 创建网页元素方法
    function createElement(html, nodeText, attr, parent) {
        const element = document.createElement(nodeText)
        if (attr) {
            element[attr] = html
        } else {
            element.innerHTML = html
        }
        parent.appendChild(element)
    }
    createElement('google_translate_element', 'div', 'id', navbar)

    // 初始化
    createElement(
      `function googleTranslateElementInit() {
        let google_translate_element = document.getElementById('google_translate_element')
        let timer = setInterval(function () {
          google_translate_element = document.getElementById('google_translate_element')
          if (google_translate_element) {
            clearInterval(timer)
            new google.translate.TranslateElement(
              {
                pageLanguage: 'auto',
                //包括的语言，中文简体，中文繁体，英语，日语，俄语
                includedLanguages: 'zh-CN,zh-TW,en,ja,ru',
                /*0，原生select，并且谷歌logo显示在按钮下方。
                 1，原生select，并且谷歌logo显示在右侧。
                 2，完全展开语言列表，适合pc。
               */
                layout: /mobile/i.test(navigator.userAgent) ? 0 : 2,
              },
              'google_translate_element'
            )
            // 清除图片的请求，加快访问速度
            let img = [].slice.call(document.querySelectorAll('#goog-gt-tt img,#google_translate_element img'));
            img.forEach(function(v) {
              const a = v
              a.src = ''
              let b = a.outerHTML.replace(/<img(.*?)>/, () => {
                return '<span id="lb"' + RegExp.$1 +'></span>'
              })
              const c = document.createElement('div')
              c.innerHTML = b
              a.parentNode.insertBefore(c.children[0], a.parentNode.children[0])
              a.remove()
            });
            const recoverPage = document.createElement('div')
            recoverPage.setAttribute('class', 'notranslate recoverPage')
            recoverPage.innerText = '英文原版'
            document.getElementsByClassName('lux-navbar')[0].appendChild(recoverPage)
            // 点击恢复原网页
            recoverPage.onclick = () => {
              const phoneRecoverIframe = document.getElementById(':1.container') // 移动端
              const PCRecoverIframe = document.getElementById(':2.container') // PC端
              if (phoneRecoverIframe) {
                const recoverDocument = phoneRecoverIframe.contentWindow.document
                recoverDocument.getElementById(':1.restore').click()
              } else if (PCRecoverIframe) {
                const recoverDocument = PCRecoverIframe.contentWindow.document
                recoverDocument.getElementById(':2.restore').click()
              }
            }
          }
        }, 300)
      }`,
      'script',
      '',
      navbar
    )
    // googleTranslateElementInit()
    // 导入翻译接口
    createElement(
    '/projects/api/_static/js/element.js',
    'script',
    'src',
    head
    )
     // 排除一些代码的翻译
     const noTranslateArray = [
      '.bbCodeCode',
      'tt',
      'pre[translate="no"]',
      'pre',
      '.post_spoiler_show',
      '.c-article-section__content sub',
      '.c-article-section__content sup',
      '.c-article-equation',
      '.mathjax-tex',
      '.lux-navbar-container',
      '.navbar'
    ]
    noTranslateArray.forEach(selectorName => {
      ;[...document.querySelectorAll(selectorName)].forEach(node => {
        if (node.className.indexOf('notranslate') === -1) {
          node.classList.add('notranslate')
        }
      })
    })
    // 解决一些网站开启脚本之后不能滚动
    function CanIScroll() {
      const noScrollSite = ['curseforge.com']
      noScrollSite.forEach(site => {
        if (~document.domain.indexOf(site)) {
          GM_addStyle(`
            html {
              height: auto!important;
            }
          `)
        }
      })
    }
    CanIScroll()
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
        mutationRecord['target'].style.position = 'static';
      });    
    });
    var target = document.body
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });
}
