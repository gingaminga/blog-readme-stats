# blog-readme-stats

> 블로그 RSS 피드를 활용해 GitHub README를 멋지게 꾸며보세요!

## 📖 소개

`blog-readme-stats`는 블로그의 최신 포스트 정보를 SVG 카드로 생성하여 GitHub README에 표시할 수 있는 서비스입니다.

RSS 피드를 지원하는 모든 블로그(Tistory, Medium, Naver GitHub 등)에서 사용할 수 있습니다.

## 🚀 사용 방법

### 최신 글 카드

블로그의 최신 포스트를 카드 형태로 표시할 수 있습니다.

> `?url=` 파라미터에 블로그의 RSS 피드 URL을 입력하세요.

#### 기본 사용법

**카드만 표시:**

```markdown
![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss)
```

![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss)

**링크와 함께 사용 (카드 클릭 시 링크로 이동):**

```markdown
[![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss)](https://dev-gingaminga.tistory.com)
```

[![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss)](https://dev-gingaminga.tistory.com)

**최신 글 링크와 함께 사용 (카드 클릭 시 최신 글로 이동):**

`https://blog-readme-stats-one.vercel.app/api/blog/redirect?url=YOUR_RSS_FEED_URL`는 가장 최신 글의 URL을 반환합니다.

```markdown
[![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss)](https://blog-readme-stats-one.vercel.app/api/blog/redirect?url=https://dev-gingaminga.tistory.com/rss)
```

[![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss)](https://blog-readme-stats-one.vercel.app/api/blog/redirect?url=https://dev-gingaminga.tistory.com/rss)

#### 다크/라이트 테마 지정

> 옵션: `&theme=dark` 또는 `&theme=light`

테마를 지정하지 않으면 시스템 설정에 따라 자동으로 테마가 적용됩니다.
테마를 지정하고 싶다면 아래처럼 사용하세요.

**다크 테마:**

```markdown
[![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss&theme=dark)](https://dev-gingaminga.tistory.com)
```

![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss&theme=dark)

**라이트 테마:**

```markdown
[![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss&theme=light)](https://dev-gingaminga.tistory.com)
```

![Blog Card](https://blog-readme-stats-one.vercel.app/api/blog/card?url=https://dev-gingaminga.tistory.com/rss&theme=light)

## 🎨 카드 정보

생성되는 SVG 카드에는 다음 정보가 표시됩니다:

- 📝 포스트 제목
- 📄 포스트 설명 (최대 2줄)
- 🏷️ 태그 (최대 3개)
- 📅 작성일
- 🌐 블로그 이름
- 🎨 블로그 파비콘 (없으면 미노출)

## 💡 RSS 주소

블로그 플랫폼마다 RSS 피드 URL 형식이 다릅니다.  
아래 형식을 참고하여 본인의 블로그 RSS 주소를 사용하세요.

**Tistory**

```
https://[블로그주소]/rss
```

**Medium**

```
https://medium.com/feed/[유저명]
```

**Naver 블로그**

```
https://rss.blog.naver.com/[블로그ID].xml
```

**Velog**

```
https://v2.velog.io/rss/[유저명]
```

**기타 블로그**

대부분의 블로그는 `/rss`, `/feed`, `/atom` 등의 경로로 RSS를 제공합니다.  
블로그 설정 또는 문서에서 RSS 피드 URL을 확인하세요.

## 🤝 기여

이슈와 PR은 언제나 환영합니다!
