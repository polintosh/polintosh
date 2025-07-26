---
title: "[TITLE] - Write a compelling, specific title that clearly indicates the value readers will get"
description: "[DESCRIPTION] - A concise summary (150-160 chars) that explains what the reader will learn or achieve. Include key benefits and target audience."
publishedAt: "[YYYY-MM-DD] - Use ISO date format"
updatedAt: "[YYYY-MM-DD] - Optional, use when making significant updates"
featured: [true/false] - Set to true for high-impact, showcase-worthy content
draft: [true/false] - Set to true while writing, false when ready to publish
coverImage: "[/blog/image-name.jpg] - Optional, use for visual appeal and social sharing"
tags: ["tag1", "tag2", "tag3"] # 3-7 relevant tags for discoverability
category: "[CATEGORY]" # Choose from: engineering, design, tutorials, thoughts, career, technology, productivity, open-source
language: "[LANGUAGE]" # Usually "en", or "javascript", "typescript", "python", "react", "nextjs" for code-focused content
author:
  name: "Pol Hernández"
  avatar: "/avatar.png"
  bio: "Engineered for creativity"
seo:
  metaTitle: "[SEO_TITLE] - Optimized for search engines (50-60 chars)"
  metaDescription: "[SEO_DESCRIPTION] - Search-friendly description (150-160 chars)"
  keywords: ["keyword1", "keyword2", "keyword3"] # 3-8 SEO keywords
  canonicalUrl: "[OPTIONAL] - Use when content exists elsewhere"
---

# [ARTICLE_TITLE]

[HOOK] - Start with a compelling opening that captures attention. This could be:
- A surprising statistic or fact
- A relatable problem or frustration
- A personal anecdote or experience
- A thought-provoking question
- A bold statement or prediction

## Introduction

[CONTEXT] - Set the stage for your article. Explain:
- Why this topic matters now
- Who should read this (target audience)
- What they'll learn or achieve
- Your credibility/experience with this topic

## [MAIN_SECTION_1] - Use descriptive headers that hint at the value

[CONTENT] - Provide valuable, actionable content. Include:
- Specific examples and code snippets
- Real-world applications
- Common pitfalls to avoid
- Best practices and recommendations

### Subsection (if needed)

```typescript
// Always include relevant code examples
interface ExampleInterface {
  property: string;
  method(): void;
}

class ExampleClass implements ExampleInterface {
  constructor(public property: string) {}

  method(): void {
    console.log(`Example with ${this.property}`);
  }
}
```

## [MAIN_SECTION_2] - Continue with logical flow

[CONTENT] - Build upon previous sections. Consider including:
- Step-by-step tutorials
- Comparison tables or lists
- Visual diagrams or screenshots
- Performance benchmarks
- Tool recommendations

### Pro Tips

- **Tip 1**: Specific, actionable advice
- **Tip 2**: Lesser-known insights
- **Tip 3**: Common mistakes to avoid

## [MAIN_SECTION_3] - Advanced concepts or real-world applications

[CONTENT] - Dive deeper into complex topics:

```typescript
// Example of advanced implementation
class AdvancedExample {
  private readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async processData<T>(
    data: T[],
    processor: (item: T) => Promise<ProcessedItem>
  ): Promise<ProcessedItem[]> {
    // Implementation details
    return Promise.all(data.map(processor));
  }
}
```

## Lessons Learned / Key Takeaways

Summarize the most important points:

1. **Key insight #1**: Brief explanation of why it matters
2. **Key insight #2**: Practical application advice
3. **Key insight #3**: Future considerations or trends

## Tools and Resources

List helpful tools, libraries, or resources mentioned:

- **[Tool Name](https://example.com)**: Brief description of what it does
- **[Resource](https://example.com)**: Why it's valuable
- **[Documentation](https://example.com)**: Official docs or guides

## Common Pitfalls to Avoid

- **Pitfall #1**: Specific mistake and how to avoid it
- **Pitfall #2**: Why this happens and prevention strategies
- **Pitfall #3**: Red flags to watch for

## Looking Forward / Future Considerations

Discuss:
- Emerging trends related to the topic
- Potential future developments
- Areas for further exploration
- Next steps for readers

## Conclusion

[WRAP_UP] - Provide a strong conclusion that:
- Reinforces the main value proposition
- Summarizes key actionable insights
- Motivates the reader to apply what they've learned
- Sets expectations for their journey ahead

[CALL_TO_ACTION] - End with engagement:
- Encourage sharing experiences or questions
- Invite discussion on social media
- Suggest related articles or next steps
- Ask for feedback or suggestions

---

*[AUTHOR_NOTE] - Personal touch that encourages engagement. Examples:*
- *What's your experience with [topic]? I'd love to hear about your challenges and successes.*
- *Have questions about [specific aspect]? Feel free to reach out on [platform] – I'm always happy to help!*
- *Want to dive deeper into [related topic]? Check out my other posts on [topic] or connect with me on [platform].*

---

## Content Guidelines for AI-Assisted Writing

### Article Types and Focus Areas

1. **Tutorials** (`category: tutorials`)
   - Step-by-step guides with code examples
   - Include prerequisites and expected outcomes
   - Test all code examples before publishing
   - Focus tags: specific technologies, frameworks, tools

2. **Engineering Deep Dives** (`category: engineering`)
   - Technical analysis of systems, patterns, or architectures
   - Include performance considerations and trade-offs
   - Real-world examples and case studies
   - Focus tags: architecture, performance, scalability, patterns

3. **Design & UX** (`category: design`)
   - Design systems, user experience, interface design
   - Include visual examples and design principles
   - Tools and workflow recommendations
   - Focus tags: design-systems, ui-ux, user-experience, tools

4. **Career & Growth** (`category: career`)
   - Professional development and career advice
   - Include personal experiences and lessons learned
   - Actionable advice for different career stages
   - Focus tags: career, leadership, growth, mentorship

5. **Thoughts & Opinions** (`category: thoughts`)
   - Industry trends, predictions, and commentary
   - Personal perspectives on technology and development
   - Future-looking content and analysis
   - Focus tags: industry, trends, future, opinion

6. **Productivity & Tools** (`category: productivity`)
   - Development workflows and tool recommendations
   - Productivity techniques and methodologies
   - Tool comparisons and setup guides
   - Focus tags: productivity, tools, workflow, automation

### Content Quality Standards

- **Reading Time**: Aim for 8-15 minute reads (1,600-3,000 words)
- **Code Examples**: Always test and validate code snippets
- **Practical Value**: Every article should provide actionable insights
- **SEO Optimization**: Include relevant keywords naturally
- **Accessibility**: Use proper heading structure and alt text
- **Engagement**: End with questions or calls to action

### Publishing Checklist

- [ ] Title is compelling and specific (50-60 characters)
- [ ] Description is concise and valuable (150-160 characters)
- [ ] Tags are relevant and searchable (3-7 tags)
- [ ] Category accurately reflects content type
- [ ] Code examples are tested and working
- [ ] Grammar and spelling are correct
- [ ] Links are working and relevant
- [ ] SEO metadata is complete
- [ ] Social sharing is optimized
- [ ] Content provides clear value to readers
