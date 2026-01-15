/**
 * BLUEAPPLE TOC Helper v1.0.10 (Clean & Hierarchy)
 * Powered by Tocbot (MIT License)
 * Author: BLUEAPPLE
 */
(function() {
    // 1. CSS 스타일 정의
    const cssStyles = `
        /* --- 기본 컨테이너 (투명/초기화) --- */
        .toc {
            position: relative;
            margin: 30px 0;
            padding: 0;
            background: transparent !important;
            border: none !important;
            z-index: 100;
        }

        /* --- 왼쪽 사이드바 모드 (PC) --- */
        .toc.float-toc {
            position: fixed;
            top: 150px;
            left: 50px;
            width: 250px;
            background: transparent;
            margin: 0;
            padding: 0;
        }

        /* --- 링크 공통 초기화 (파란색 제거) --- */
        .toc-list { list-style: none !important; margin: 0 !important; padding: 0 !important; }
        .toc a, .toc .toc-link {
            text-decoration: none !important;
            display: block;
            border-left: 2px solid #eee;
            transition: all 0.2s;
            line-height: 1.5 !important;
            box-shadow: none !important;
        }

        /* --- 계층형 디자인 (H2 vs H3) --- */
        /* 대제목 (H2) */
        .toc > .toc-list > li > .toc-link {
            color: #888 !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            padding: 8px 10px !important;
            margin-top: 10px !important;
        }
        /* 소제목 (H3) */
        .toc-list .toc-list .toc-link {
            color: #bbb !important;
            font-size: 13px !important;
            font-weight: 400 !important;
            padding: 3px 10px 3px 20px !important;
        }

        /* --- 반응형 (Hover & Active) --- */
        .toc a:hover, .toc .toc-link:hover {
            color: #333 !important;
            font-weight: 700 !important;
            background: transparent !important;
            border-left: 2px solid #333;
            cursor: pointer !important;
        }
        .is-active-link {
            color: #000 !important;
            font-weight: 800 !important;
            border-left: 3px solid #000 !important;
            transform: translateX(3px);
        }

        /* --- 모바일 대응 (고정 해제) --- */
        @media screen and (max-width: 1300px) {
            .toc.float-toc {
                position: relative !important;
                top: auto !important; left: auto !important; width: auto !important;
                padding: 0 !important; margin: 30px 0 !important;
            }
        }
    `;

    // 2. CSS 주입
    const style = document.createElement('style');
    style.innerHTML = cssStyles;
    document.head.appendChild(style);

    // 3. 라이브러리 로드
    function loadScript(src, callback) {
        if (window.tocbot) { callback(); return; }
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // 4. 실행 로직
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.11.1/tocbot.min.js', function() {
        const initTOC = () => {
            const contentSelectors = '.entry-content, .tt_article_useless_p_margin, .article-view, .area_view';
            const content = document.querySelector(contentSelectors);

            if (content) {
                // 서식 박스 내용 비우기 (필수)
                document.querySelectorAll('.toc').forEach(el => { el.innerHTML = ''; });

                // ID 생성
                content.querySelectorAll('h1, h2, h3').forEach((heading, index) => {
                    if (!heading.id) heading.id = 'toc-heading-' + index;
                });

                // Tocbot 초기화
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

                // 스크롤 감지 (PC/Mobile)
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
        };

        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTOC);
        else initTOC();
    });
})();
