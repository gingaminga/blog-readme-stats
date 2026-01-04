import GetRecentBlogCardParamDTO from "@dto/blog/get-recent-blog-card.param.dto";
import { Theme } from "@my-types/params/blog.param.type";
import { BlogService } from "@services/blog.service";
import Parser from "rss-parser";

jest.mock("rss-parser");

describe("[Blog service] createRecentBlogCard method test :)", () => {
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

  it("should generate SVG card with light theme", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [
        {
          categories: ["TypeScript", "Programming"],
          creator: "Test Author",
          pubDate: "2024-01-01T00:00:00Z",
          summary: "This is a test blog post description",
          title: "Test Blog Post",
        },
      ],
      title: "Test Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.createRecentBlogCard(paramDTO);

    // then
    expect(mockParseURL).toHaveBeenCalledWith("https://example.com/feed");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("Test Blog Post");
    expect(result.svg).toContain("This is a test blog post description");
    expect(result.svg).toContain("TypeScript");
    expect(result.svg).toContain("Programming");
    expect(result.svg).toContain("#ffffff"); // light theme background
  });

  it("should generate SVG card with dark theme", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.DARK,
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [
        {
          categories: ["JavaScript"],
          creator: "Dark Theme Author",
          pubDate: "2024-01-01T00:00:00Z",
          summary: "Dark theme test",
          title: "Dark Theme Post",
        },
      ],
      title: "Dark Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.createRecentBlogCard(paramDTO);

    // then
    expect(mockParseURL).toHaveBeenCalledWith("https://example.com/feed");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("Dark Theme Post");
    expect(result.svg).toContain("#202830"); // dark theme background
  });

  it("should handle RSS feed with contentSnippet", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [
        {
          categories: ["Web"],
          contentSnippet: "Content snippet text",
          creator: "Author",
          pubDate: "2024-01-01T00:00:00Z",
          title: "Test",
        },
      ],
      title: "Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.createRecentBlogCard(paramDTO);

    // then
    expect(result.svg).toContain("Content snippet text");
  });

  it("should strip HTML tags from description", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [
        {
          categories: [],
          creator: "Author",
          pubDate: "2024-01-01T00:00:00Z",
          summary: "<p>HTML <strong>bold</strong> text</p>",
          title: "Test",
        },
      ],
      title: "Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.createRecentBlogCard(paramDTO);

    // then
    expect(result.svg).toContain("HTML bold text");
    expect(result.svg).not.toContain("<p>");
    expect(result.svg).not.toContain("<strong>");
  });

  it("should include favicon URL with correct domain", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://example.com/feed/rss",
    });

    const mockFeed = {
      items: [
        {
          categories: [],
          creator: "Author",
          pubDate: "2024-01-01T00:00:00Z",
          summary: "Test",
          title: "Test",
        },
      ],
      title: "Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.createRecentBlogCard(paramDTO);

    // then
    expect(result.svg).toContain("https://www.google.com/s2/favicons?domain=https://example.com");
  });

  it("should throw 400 error when RSS feed has no items", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [],
      title: "Empty Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when & then
    const promise = blogService.createRecentBlogCard(paramDTO);
    await expect(promise).rejects.toThrow("No posts found in the RSS feed");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should throw 400 error when RSS parsing fails", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://example.com/not-rss",
    });

    mockParseURL.mockRejectedValue(new Error("Invalid RSS feed"));

    // when & then
    const promise = blogService.createRecentBlogCard(paramDTO);
    await expect(promise).rejects.toThrow("Not a valid RSS feed URL");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should throw 400 error when URL returns HTML instead of RSS", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://www.google.com",
    });

    mockParseURL.mockRejectedValue(new Error("Non-feed content"));

    // when & then
    const promise = blogService.createRecentBlogCard(paramDTO);
    await expect(promise).rejects.toThrow("Not a valid RSS feed URL");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should throw 400 error when RSS feed URL is unreachable", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://unreachable-domain-12345.com/feed",
    });

    mockParseURL.mockRejectedValue(new Error("ENOTFOUND"));

    // when & then
    const promise = blogService.createRecentBlogCard(paramDTO);
    await expect(promise).rejects.toThrow("Not a valid RSS feed URL");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should throw 400 error when RSS feed has network error", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://example.com/timeout",
    });

    mockParseURL.mockRejectedValue(new Error("ETIMEDOUT"));

    // when & then
    const promise = blogService.createRecentBlogCard(paramDTO);
    await expect(promise).rejects.toThrow("Not a valid RSS feed URL");
    await expect(promise).rejects.toMatchObject({
      code: 400,
    });
  });

  it("should handle RSS feed without categories", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [
        {
          creator: "Author",
          pubDate: "2024-01-01T00:00:00Z",
          summary: "No tags post",
          title: "No Tags",
        },
      ],
      title: "Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.createRecentBlogCard(paramDTO);

    // then
    expect(result.svg).toContain("No Tags");
    expect(result.svg).toContain("<svg");
  });

  it("should format date correctly", async () => {
    // given
    const paramDTO = new GetRecentBlogCardParamDTO({
      theme: Theme.LIGHT,
      url: "https://example.com/feed",
    });

    const mockFeed = {
      items: [
        {
          creator: "Author",
          pubDate: "2024-01-15T12:00:00Z",
          summary: "Date test",
          title: "Date Test",
        },
      ],
      title: "Blog",
    };

    mockParseURL.mockResolvedValue(mockFeed);

    // when
    const result = await blogService.createRecentBlogCard(paramDTO);

    // then
    // 날짜 형식이 포함되어 있는지 확인 (2024. 1. 15 형식)
    expect(result.svg).toMatch(/\d{4}\.\s\d{1,2}\.\s\d{1,2}/);
  });
});
