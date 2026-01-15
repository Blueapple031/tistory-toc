/**
 * BLUEAPPLE TOC Helper v1.0.0
 * Powered by Tocbot (MIT License)
 * Author: BLUEAPPLE
 */
(function() {
    // 1. CSS 스타일 정의
    const cssStyles = `
        /* 여기에 아까 완성한 CSS 코드를 전부 한 줄로 넣거나, 줄바꿈해서 넣으세요 */
        .toc { background-color: #FAFAFA; padding: 25px; border-radius: 12px; margin: 40px 0; border: 1px solid #eee; font-family: 'Pretendard', sans-serif; transition: all 0.3s; z-index: 100; }
        .toc.float-toc { position: fixed; top: 150px; left: 50px; width: 220px; background: transparent; border: none; padding: 0; margin: 0; }
        @media screen and (max-width: 1300px) { .toc.float-toc { position: relative !important; top: auto !important; left: auto !important; width: auto !important; background-color: #FAFAFA !important; border: 1px solid #eee !important; padding: 25px !important; margin: 40px 0 !important; } }
        .toc-list { list-style: none !important; margin: 0 !important; padding: 0 !important; }
        .toc-link { text-decoration: none !important; color: #999; font-size: 14px; display: block; padding: 5px 10px; border-left: 2px solid #ddd; transition: all 0.2s; }
        .is-active-link { color: #222 !important; font-weight: 700; border-left: 3px solid #222; transform: translateX(2px); }
    `;

    // 2. CSS 헤드에 주입
    const style = document.createElement('style');
    style.innerHTML = cssStyles;
    document.head.appendChild(style);

    // 3. 외부 라이브러리(Tocbot) 로드 함수
    function loadScript(src, callback) {
        if (window.tocbot) { callback(); return; } // 이미 있으면 바로 실행
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // 4. 실행 로직
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.11.1/tocbot.min.js', function() {
        const contentSelectors = '.entry-content, .tt_article_useless_p_margin, .article-view, .area_view';
        const content = document.querySelector(contentSelectors);

        if (content) {
            const headings = content.querySelectorAll('h1, h2, h3');
            headings.forEach((heading, index) => {
                if (!heading.id) heading.id = 'toc-heading-' + index;
            });

            tocbot.init({
                tocSelector: '.toc',
                contentSelector: contentSelectors,
                headingSelector: 'h1, h2, h3',
                hasInnerContainers: true,
                scrollSmooth: true,
                scrollSmoothDuration: 400,
                scrollSmoothOffset: -100,
                headingsOffset: 100,
            });

            const tocElement = document.querySelector('.toc');
            let tocOriginalTop = tocElement ? tocElement.offsetTop : 0;

            window.addEventListener('scroll', function() {
                if (!tocElement) return;
                if (window.innerWidth > 1300 && window.scrollY > tocOriginalTop + 100) {
                    tocElement.classList.add('float-toc');
                } else {
                    tocElement.classList.remove('float-toc');
                }
            });
            
            window.addEventListener('resize', function() {
                 if(tocElement && !tocElement.classList.contains('float-toc')) tocOriginalTop = tocElement.offsetTop;
            });
        }
    });
})();
