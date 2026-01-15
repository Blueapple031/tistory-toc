# Tistory Auto TOC (Hybrid Mode)

티스토리 블로그를 위한 **반응형 자동 목차 생성기**입니다.

복잡한 CSS 설정이나 파일 업로드 없이, 스크립트 한 줄만 추가하면 바로 적용됩니다.

[Tocbot](https://tscanlin.github.io/tocbot/) 라이브러리를 기반으로 제작되었으며, 사용자 경험(UX)을 고려한 **하이브리드 디자인**이 적용되어 있습니다.

## 주요 특징 (Features)

* **⚡ 초간편 설치:** CSS와 JS가 통합된 Loader 방식이라 스크립트 한 줄로 끝납니다.
* **🔄 하이브리드 디자인 (Hybrid UI):**
* **기본 상태:** 본문 상단에 깔끔한 박스 형태로 위치합니다.
* **스크롤 시:** 화면을 내리면 **왼쪽 사이드바(Sticky)**로 변신하여 따라다닙니다. (PC 화면 1300px 이상)


* **📱 완벽한 반응형:** 모바일이나 작은 화면에서는 자동으로 박스 형태로 고정됩니다.
* **🎨 모던 스타일:** 깔끔한 Pretendard/Noto Sans 폰트와 미니멀한 디자인이 적용되어 있습니다.
* **🚀 부드러운 이동:** 목차 클릭 시 해당 위치로 부드럽게 스크롤됩니다 (Smooth Scroll).

## 📦 설치 방법 (Installation)

### 1. 스크립트 추가

티스토리 관리자 페이지에서 `[꾸미기] > [스킨 편집] > [html 편집]`으로 이동합니다.

**HTML** 탭의 맨 아래 `</body>` 태그 바로 위에 아래 코드를 붙여넣으세요.

```html
<script src="https://cdn.jsdelivr.net/gh/Blueapple031/tistory-toc@latest/tistory-toc.js"></script>

```

### 2. 서식 만들기 (최초 1회)

글을 쓸 때마다 코드를 치지 않기 위해 서식을 만들어둡니다.

1. `[서식 관리] > [서식 쓰기]` 클릭
2. 에디터 모드를 **HTML**로 변경
3. 아래 코드를 입력하고 저장 (제목 예: '자동 목차')

```html
<div class="toc"></div>

```

## 📝 사용 방법 (Usage)

1. 글을 작성할 때 목차를 넣고 싶은 위치에 **[서식] > [자동 목차]**를 삽입합니다.
2. 본문의 소제목을 작성할 때 반드시 **'제목1', '제목2', '제목3'** 기능을 사용합니다. (단순 볼드체 X)
3. 글을 발행하면 자동으로 목차가 생성됩니다.

## 🛠️ 커스터마이징 (Customization)

이 프로젝트를 수정해서 사용하고 싶다면, 이 저장소를 **Fork** 하거나 파일을 다운로드하여 `index.js` 내부의 CSS 값을 수정하시면 됩니다.

## 📄 License

This project is licensed under the MIT License.

Powered by [Tocbot](https://tscanlin.github.io/tocbot/).

---
