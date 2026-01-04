import GetRecentBlogUrlParamDTO from "@dto/blog/get-recent-blog-url.param.dto";
import { BlogService } from "@services/blog.service";
import Parser from "rss-parser";

jest.mock("rss-parser");

describe("[Blog service] getRecentBlogUrl method test :)", () => {
  let blogService: BlogService;
  const mockParseURL = jest.fn();

  beforeEach(() => {
    (Parser as jest.MockedClass<typeof Parser>).mockImplementation(
      () =>
        ({
          parseURL: mockParseURL,
        }) as any,
    );
    blogService = new BlogService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return latest blog post URL", async () => {
    // given
    const paramDTO = new GetRecentBlogUrlParamDTO({
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [
        {
          categories: ["TypeScript"],
          creator: "Test Author",
          link: "https://example.com/post-1",
          pubDate: "2024-01-01T00:00:00Z",
          summary: "Latest post",
          title: "Latest Post",
        },
        {
          categories: ["JavaScript"],
          creator: "Test Author",
          link: "https://example.com/post-2",
          pubDate: "2023-12-01T00:00:00Z",
          summary: "Older post",
          title: "Older Post",
        },
      ],
      title: "Test Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.getRecentBlogUrl(paramDTO);

    // then
    expect(mockParseURL).toHaveBeenCalledWith("https://example.com/feed");
    expect(result.url).toBe("https://example.com/post-1");
  });

  it("should handle RSS feed with single post", async () => {
    // given
    const paramDTO = new GetRecentBlogUrlParamDTO({
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [
        {
          link: "https://example.com/only-post",
          pubDate: "2024-01-01T00:00:00Z",
          title: "Only Post",
        },
      ],
      title: "Test Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.getRecentBlogUrl(paramDTO);

    // then
    expect(result.url).toBe("https://example.com/only-post");
  });

  it("should throw 400 error when RSS feed has no items", async () => {
    // given
    const paramDTO = new GetRecentBlogUrlParamDTO({
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [],
      title: "Empty Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when & then
    const promise = blogService.getRecentBlogUrl(paramDTO);
    await expect(promise).rejects.toThrow("No posts found in the RSS feed");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should throw 400 error when post has no link", async () => {
    // given
    const paramDTO = new GetRecentBlogUrlParamDTO({
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [
        {
          pubDate: "2024-01-01T00:00:00Z",
          title: "Post without link",
        },
      ],
      title: "Test Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when & then
    const promise = blogService.getRecentBlogUrl(paramDTO);
    await expect(promise).rejects.toThrow("Post URL not found in the RSS feed");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should throw 400 error when RSS parsing fails", async () => {
    // given
    const paramDTO = new GetRecentBlogUrlParamDTO({
      url: "https://example.com/not-rss",
    });

    mockParseURL.mockRejectedValue(new Error("Invalid RSS feed"));

    // when & then
    const promise = blogService.getRecentBlogUrl(paramDTO);
    await expect(promise).rejects.toThrow("Not a valid RSS feed URL");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should throw 400 error when URL returns HTML instead of RSS", async () => {
    // given
    const paramDTO = new GetRecentBlogUrlParamDTO({
      url: "https://www.google.com",
    });

    mockParseURL.mockRejectedValue(new Error("Non-feed content"));

    // when & then
    const promise = blogService.getRecentBlogUrl(paramDTO);
    await expect(promise).rejects.toThrow("Not a valid RSS feed URL");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should throw 400 error when RSS feed URL is unreachable", async () => {
    // given
    const paramDTO = new GetRecentBlogUrlParamDTO({
      url: "https://unreachable-domain-12345.com/feed",
    });

    mockParseURL.mockRejectedValue(new Error("ENOTFOUND"));

    // when & then
    const promise = blogService.getRecentBlogUrl(paramDTO);
    await expect(promise).rejects.toThrow("Not a valid RSS feed URL");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should throw 400 error when RSS feed has network error", async () => {
    // given
    const paramDTO = new GetRecentBlogUrlParamDTO({
      url: "https://example.com/timeout",
    });

    mockParseURL.mockRejectedValue(new Error("ETIMEDOUT"));

    // when & then
    const promise = blogService.getRecentBlogUrl(paramDTO);
    await expect(promise).rejects.toThrow("Not a valid RSS feed URL");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should handle RSS feed", async () => {
    // given
    const paramDTO = new GetRecentBlogUrlParamDTO({
      url: "https://dev-gingaminga.tistory.com/rss",
    });

    const mockFeed = {
      items: [
        {
          link: "https://dev-gingaminga.tistory.com/123",
          pubDate: "2024-01-01T00:00:00Z",
          title: "Tistory Post",
        },
      ],
      title: "Tistory Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.getRecentBlogUrl(paramDTO);

    // then
    expect(result.url).toBe("https://dev-gingaminga.tistory.com/123");
  });
});
