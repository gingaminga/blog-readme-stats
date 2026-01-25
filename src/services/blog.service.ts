import logger from "@config/logger.config";
import GetListBlogCardParamDTO from "@dto/blog/get-list-blog-card.param.dto";
import GetListBlogCardResponseDTO from "@dto/blog/get-list-blog-card.response.dto";
import GetPickBlogCardParamDTO from "@dto/blog/get-pick-blog-card.param.dto";
import GetPickBlogCardResponseDTO from "@dto/blog/get-pick-blog-card.response.dto";
import GetRecentBlogCardParamDTO from "@dto/blog/get-recent-blog-card.param.dto";
import GetRecentBlogCardResponseDTO from "@dto/blog/get-recent-blog-card.response.dto";
import GetRecentBlogUrlParamDTO from "@dto/blog/get-recent-blog-url.param.dto";
import GetRecentBlogUrlResponseDTO from "@dto/blog/get-recent-blog-url.response.dto";
import { BlogCardData, generateBlogCardSVG } from "@templates/blog-card.template";
import { BlogListCardData, generateBlogListCardSVG } from "@templates/list-blog-card.template";
import { HTTP_STATUS_CODE } from "@utils/constants";
import CError from "@utils/error";
import { stripHtmlTags } from "@utils/text";
import { injectable } from "inversify";
import Parser from "rss-parser";

export interface IBlogService {
  createListBlogCard(params: GetListBlogCardParamDTO): Promise<GetListBlogCardResponseDTO>;
  createPickBlogCard(params: GetPickBlogCardParamDTO): Promise<GetPickBlogCardResponseDTO>;
  createRecentBlogCard(params: GetRecentBlogCardParamDTO): Promise<GetRecentBlogCardResponseDTO>;
  getRecentBlogUrl(params: GetRecentBlogUrlParamDTO): Promise<GetRecentBlogUrlResponseDTO>;
}

@injectable()
export class BlogService implements IBlogService {
  private readonly parser: Parser;

  constructor() {
    this.parser = new Parser({
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      timeout: 10_000, // 10초 타임아웃
    });
  }

  /**
   * @description RSS에서 최신 블로그 글 목록으로 리스트 카드 생성
   */
  async createListBlogCard(params: GetListBlogCardParamDTO): Promise<GetListBlogCardResponseDTO> {
    const { rss, theme } = params;

    const feed = await this.parseRssFeed(rss);

    if (!feed.items || feed.items.length === 0) {
      throw new CError("No posts found in the RSS feed", HTTP_STATUS_CODE.BAD_REQUEST);
    }

    // 최대 5개
    const posts = feed.items.slice(0, 5).map((item) => {
      const postTitle = item.title || "";
      const tags = item.categories || [];
      const date = this.formatDate(item.pubDate || item.isoDate);

      return {
        date,
        postTitle,
        tags,
      };
    });

    const blogName = this.getBlogName(feed);
    const faviconBuffer = await this.getFaviconBuffer(feed.link);

    const listData: BlogListCardData = {
      blogName,
      faviconBuffer,
      posts,
    };

    const svg = generateBlogListCardSVG(listData, theme);

    return new GetListBlogCardResponseDTO(svg);
  }

  /**
   * @description RSS에서 특정 URL의 블로그 글을 찾아 카드 생성
   */
  async createPickBlogCard(params: GetPickBlogCardParamDTO): Promise<GetPickBlogCardResponseDTO> {
    const { postUrl, rss, theme } = params;

    const feed = await this.parseRssFeed(rss);

    const targetPost = feed.items.find((item) => item.link === postUrl);
    if (!targetPost) {
      throw new CError("Post not found in the RSS feed", HTTP_STATUS_CODE.NOT_FOUND);
    }

    const postData = await this.extractPostData(targetPost, feed);
    const svg = generateBlogCardSVG(postData, theme);

    return new GetPickBlogCardResponseDTO(svg);
  }

  /**
   * @description 최신 블로그 글의 정보로 카드 생성
   */
  async createRecentBlogCard(params: GetRecentBlogCardParamDTO): Promise<GetRecentBlogCardResponseDTO> {
    const { theme, url } = params;

    const feed = await this.parseRssFeed(url);

    const latestPost = feed.items[0];
    if (!latestPost) {
      throw new CError("No posts found in the RSS feed", HTTP_STATUS_CODE.BAD_REQUEST);
    }

    const postData = await this.extractPostData(latestPost, feed);
    const svg = generateBlogCardSVG(postData, theme);

    return new GetRecentBlogCardResponseDTO(svg);
  }

  /**
   * @description 최신 블로그 글의 URL 반환
   */
  async getRecentBlogUrl(params: GetRecentBlogUrlParamDTO): Promise<GetRecentBlogUrlResponseDTO> {
    const { url } = params;

    const feed = await this.parseRssFeed(url);

    const latestPost = feed.items[0];
    if (!latestPost) {
      throw new CError("No posts found in the RSS feed", HTTP_STATUS_CODE.BAD_REQUEST);
    }
    if (!latestPost.link) {
      throw new CError("Post URL not found in the RSS feed", HTTP_STATUS_CODE.BAD_REQUEST);
    }

    return new GetRecentBlogUrlResponseDTO(latestPost.link);
  }

  /**
   * @description 블로그 카드 데이터로 변환
   */
  private async extractPostData(post: Parser.Item, feed: Parser.Output<Parser.Item>): Promise<BlogCardData> {
    const postTitle = post.title || "";
    const blogName = this.getBlogName(feed);
    const tags = post.categories || [];

    let description = "";
    if (post.summary && post.summary.trim()) {
      description = stripHtmlTags(post.summary);
    } else if (post.contentSnippet && post.contentSnippet.trim()) {
      description = post.contentSnippet.trim();
    } else if (post.content && post.content.trim()) {
      description = stripHtmlTags(post.content);
    }

    const date = this.formatDate(post.pubDate || post.isoDate);
    const faviconBuffer = await this.getFaviconBuffer(feed.link);

    return {
      blogName,
      date,
      description,
      faviconBuffer,
      postTitle,
      tags,
    };
  }

  /**
   * @description 날짜 포맷팅
   */
  private formatDate(dateString?: string) {
    return dateString
      ? new Date(dateString).toLocaleDateString("ko-KR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";
  }

  /**
   * @description 블로그 이름 추출
   */
  private getBlogName(feed: Parser.Output<Parser.Item>): string {
    if ("subtitle" in feed && typeof feed.subtitle === "string") return feed.subtitle;

    return feed.title || "";
  }

  /**
   * @description 파비콘 버퍼 가져오기
   */
  private async getFaviconBuffer(url?: string): Promise<ArrayBuffer> {
    try {
      if (!url) {
        return new ArrayBuffer(0);
      }

      const faviconUrl = `https://www.google.com/s2/favicons?domain=${url}`;
      const faviconRes = await fetch(faviconUrl);
      const buffer = await faviconRes.arrayBuffer();

      return buffer;
    } catch (error) {
      logger.error(error);
      return new ArrayBuffer(0);
    }
  }

  /**
   * @description RSS 피드 파싱
   */
  private async parseRssFeed(url: string): Promise<Parser.Output<Parser.Item>> {
    try {
      return await this.parser.parseURL(url);
    } catch {
      throw new CError("Not a valid RSS feed URL", HTTP_STATUS_CODE.BAD_REQUEST);
    }
  }
}
