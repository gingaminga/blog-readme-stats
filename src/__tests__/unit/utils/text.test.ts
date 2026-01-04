import { escapeXml, stripHtmlTags, truncateText } from "@utils/text";

describe("[Utils] text.ts test :)", () => {
  describe("escapeXml", () => {
    it("should escape XML special characters", () => {
      // given
      const text = "<hello> & \"world\" 'test'";

      // when
      const result = escapeXml(text);

      // then
      expect(result).toBe("&lt;hello&gt; &amp; &quot;world&quot; &apos;test&apos;");
    });

    it("should return same text if no special characters", () => {
      // given
      const text = "hello world";

      // when
      const result = escapeXml(text);

      // then
      expect(result).toBe("hello world");
    });

    it("should escape & first to avoid double escaping", () => {
      // given
      const text = "&<>";

      // when
      const result = escapeXml(text);

      // then
      expect(result).toBe("&amp;&lt;&gt;");
    });

    it("should handle empty string", () => {
      // given
      const text = "";

      // when
      const result = escapeXml(text);

      // then
      expect(result).toBe("");
    });
  });

  describe("truncateText", () => {
    it("should truncate text longer than maxLength", () => {
      // given
      const text = "This is a very long text that needs to be truncated";
      const maxLength = 20;

      // when
      const result = truncateText(text, maxLength);

      // then
      expect(result).toBe("This is a very lo...");
      expect(result.length).toBe(maxLength);
    });

    it("should return original text if shorter than maxLength", () => {
      // given
      const text = "Short text";
      const maxLength = 20;

      // when
      const result = truncateText(text, maxLength);

      // then
      expect(result).toBe("Short text");
    });

    it("should return original text if exactly maxLength", () => {
      // given
      const text = "12345678901234567890";
      const maxLength = 20;

      // when
      const result = truncateText(text, maxLength);

      // then
      expect(result).toBe("12345678901234567890");
    });

    it("should handle empty string", () => {
      // given
      const text = "";
      const maxLength = 10;

      // when
      const result = truncateText(text, maxLength);

      // then
      expect(result).toBe("");
    });

    it("should handle very short maxLength", () => {
      // given
      const text = "Hello World";
      const maxLength = 5;

      // when
      const result = truncateText(text, maxLength);

      // then
      expect(result).toBe("He...");
      expect(result.length).toBe(maxLength);
    });
  });

  describe("stripHtmlTags", () => {
    it("should remove HTML tags", () => {
      // given
      const html = "<p>Hello <strong>world</strong></p>";

      // when
      const result = stripHtmlTags(html);

      // then
      expect(result).toBe("Hello world");
    });

    it("should decode HTML entities", () => {
      // given
      const html = "&lt;hello&gt;&nbsp;&amp;&nbsp;&quot;test&quot;";

      // when
      const result = stripHtmlTags(html);

      // then
      expect(result).toBe('<hello> & "test"');
    });

    it("should replace multiple spaces with single space", () => {
      // given
      const html = "Hello    world    test";

      // when
      const result = stripHtmlTags(html);

      // then
      expect(result).toBe("Hello world test");
    });

    it("should trim leading and trailing spaces", () => {
      // given
      const html = "   Hello world   ";

      // when
      const result = stripHtmlTags(html);

      // then
      expect(result).toBe("Hello world");
    });

    it("should handle complex HTML with multiple tags and entities", () => {
      // given
      const html = "<div><p>Hello&nbsp;<strong>world</strong>&nbsp;&amp;&nbsp;<em>test</em></p></div>";

      // when
      const result = stripHtmlTags(html);

      // then
      expect(result).toBe("Hello world & test");
    });

    it("should handle empty string", () => {
      // given
      const html = "";

      // when
      const result = stripHtmlTags(html);

      // then
      expect(result).toBe("");
    });

    it("should handle text without HTML", () => {
      // given
      const html = "Plain text";

      // when
      const result = stripHtmlTags(html);

      // then
      expect(result).toBe("Plain text");
    });
  });
});
