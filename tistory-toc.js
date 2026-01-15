/**
 * BLUEAPPLE TOC Helper v1.0.4 (Final Fix: Remove Box Style)
 * Powered by Tocbot (MIT License)
 * Author: BLUEAPPLE
 */
(function() {
    // [긴급] 박스 청소 함수 (발견 즉시 실행)
    const cleanTOC = () => {
        const tocs = document.querySelectorAll('.toc');
        tocs.forEach(el => {
            // 1. 안에 있는 "목차 영역" 글씨 비우기
            if (el.innerText.includes('목차') || el.innerText.includes('발행')) {
                el.innerHTML = ''; 
            }
            // 2. 점선 박스 스타일(style="...") 강제 초기화
            if (el.getAttribute('style')) {
                el.removeAttribute('style');
                el.style.cssText = ""; // 한번 더 초기화
            }
        });
    };

    // 스크립트 시작하자마자 일단 청소부터 실행
    cleanTOC();
    // DOM이 생성되는 중간에 한번 더 실행
    
    document.addEventListener('DOMContentLoaded', cleanTOC);
    // 1. CSS 스타일 정의
    const cssStyles = `
        /* --- 목차(TOC) 스타일 시작 --- */
        
        /* 1. [기본 상태] 본문 안에 있을 때 -> 박스 디자인 제거! */
        .toc {
          position: relative !important;
          background-color: transparent !important; /* 배경 투명 */
          border: none !important;                  /* 테두리 없음 */
          padding: 0 !important;                    /* 여백 제거 */
          margin: 30px 0 !important;
          font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
          z-index: 100;
        }
        
        /* 2. [변신 상태] 스크롤 내렸을 때 왼쪽으로 이동 */
        .toc.float-toc {
          position: fixed !important;
          top: 150px !important;
          left: 50px !important;
          width: 200px !important;
          background-color: transparent !important; 
          border: none !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* 3. 목차 리스트 & 폰트 */
        .toc-list { list-style: none !important; margin: 0 !important; padding: 0 !important; }
        
        .toc-link {
          text-decoration: none !important;
          color: #999 !important;
          font-size: 14px !important;
          display: block;
          padding: 5px 10px !important;
          border-left: 2px solid #ddd !important;
          transition: all 0.2s;
        }
        
        /* 4. 활성화된(보고 있는) 목차 */
        .is-active-link {
          color: #222 !important;
          font-weight: 700 !important;
          border-left: 3px solid #222 !important;
          transform: translateX(2px);
        }
        
        /* 5. 숨김 처리 (모바일) */
        @media screen and (max-width: 1300px) {
          .toc.float-toc {
            position: relative !important;
            top: auto !important; left: auto !important; width: auto !important;
            background-color: transparent !important; border: none !important;
            padding: 0 !important; margin: 30px 0 !important;
          }
        }
    `;

    // 2. CSS 헤드에 주입
    const style = document.createElement('style');
    style.innerHTML = cssStyles;
    document.head.appendChild(style);

    // 3. 외부 라이브러리 로드
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
                const headings = content.querySelectorAll('h1, h2, h3');
                headings.forEach((heading, index) => {
                    if (!heading.id) heading.id = 'toc-heading-' + index;
                });
                
                // ▼▼▼ [수정됨] 강력한 스타일 청소기 ▼▼▼
                const tocContainers = document.querySelectorAll('.toc');
                tocContainers.forEach(function(el) {
                    el.innerHTML = '';             // 1. "목차 영역" 글씨 비우기
                    el.removeAttribute('style');   // 2. style="..." 속성 자체를 삭제 (점선 제거)
                });
                // ▲▲▲ [수정 끝] ▲▲▲

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
        };

        // DOM 로드 대기 후 실행 (타이밍 이슈 방지)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initTOC);
        } else {
            initTOC();
        }
    });
})();
