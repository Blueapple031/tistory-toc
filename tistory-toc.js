/**
 * BLUEAPPLE TOC Helper v1.0.5 (Hierarchy Design)
 * Powered by Tocbot (MIT License)
 * Author: BLUEAPPLE
 */
(function() {
    // 1. CSS 스타일 정의
    const cssStyles = `
        /* --- 목차(TOC) 스타일 시작 --- */
        
        /* 1. [기본 상태] 본문 안에 있을 때 */
        .toc {
          position: relative;
          background-color: #FAFAFA; /* 연한 회색 박스 */
          padding: 25px;
          border-radius: 12px;
          margin: 40px 0;
          border: 1px solid #eee;
          font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* 부드러운 애니메이션 필수 */
          z-index: 100;
          opacity: 1;
        }
        
        /* 2. [변신 상태] 스크롤 내렸을 때 왼쪽으로 이동 */
        /* 'float-toc'라는 클래스가 붙으면 이 모양으로 변합니다 */
        .toc.float-toc {
          position: fixed;   /* 화면 고정 */
          top: 150px;        /* 상단 여백 */
          left: 50px;        /* 왼쪽 벽에서 거리 */
          width: 200px;      /* 너비 */
          
          /* 디자인 변경: 박스를 없애고 투명하게 */
          background-color: transparent; 
          border: none;
          box-shadow: none;
          margin: 0;
          padding: 0;
        }
        
        /* 3. 목차 리스트 & 폰트 */
        .toc-list { list-style: none !important; margin: 0 !important; padding: 0 !important; }
        
        .toc-link {
            text-decoration: none !important;
            color: #aaa !important;       /* [변경] 기존 #999 -> #aaa (더 연하게) */
            font-size: 16px !important;   /* [변경] 기존 14px -> 16px (더 크게) */
            display: block;
            padding: 5px 10px;
            border-left: 2px solid #eee;
            transition: all 0.2s;
            font-weight: 400;             /* [추가] 평소엔 얇게 */
        }
        
        .toc > .toc-list > li > .toc-link {
            color: #888 !important;       /* 살짝 진한 회색 */
            font-size: 16px !important;   /* 폰트 크게 */
            font-weight: 600 !important;  /* 굵게 */
            padding: 8px 10px !important; /* 간격 넓게 */
            margin-top: 10px !important;  /* 대제목끼리는 띄우기 */
        }

        .toc-list .toc-list .toc-link {
            color: #aaa !important;       /* 연한 회색 */
            font-size: 13px !important;   /* 폰트 작게 */
            font-weight: 400 !important;  /* 얇게 */
            padding: 3px 10px 3px 20px !important; /* 들여쓰기(왼쪽 패딩) 더 줌 */
        }
        
        /* 마우스 올렸을 때 (Hover) */
        .toc a:hover, .toc .toc-link:hover {
            color: #333 !important;       /* 진한 회색 */
            font-weight: 700 !important;  /* 굵게 */
            background-color: rgba(0,0,0,0.03); /* 살짝 배경 깔기 */
            border-left: 2px solid #333;  /* 왼쪽 선 진하게 */
        }
        
        /* 4. 활성화된(보고 있는) 목차 */
        .is-active-link {
          color: #222 !important;      /* 진한 검정 */
          font-weight: 700;
          border-left: 3px solid #222; /* 검정 라인 강조 */
          transform: translateX(2px);  /* 살짝 튀어나옴 */
        }
        
        /* 5. 숨김 처리 (모바일이나 작은 화면에서 변신 방지용) */
        @media screen and (max-width: 1300px) {
          /* 화면이 작으면 강제로 본문 박스 형태 유지 */
          .toc.float-toc {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: auto !important;
            background-color: #FAFAFA !important;
            border: 1px solid #eee !important;
            padding: 25px !important;
            margin: 40px 0 !important;
          }
        }
        /* --- 목차 스타일 끝 --- */
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
