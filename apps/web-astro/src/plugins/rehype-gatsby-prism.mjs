// Mirrors the markup of gatsby-remark-prismjs so the shared styles keep working:
// code blocks are wrapped in `div.gatsby-highlight` and inline code gets `language-text`.
export default function rehypeGatsbyPrism() {
  const visit = (node) => {
    if (!node.children) {
      return;
    }
    node.children = node.children.map((child) => {
      if (child.type !== 'element') {
        return child;
      }
      if (child.tagName === 'pre') {
        const language = String(child.properties?.className ?? '').match(/language-(\S+)/)?.[1];
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['gatsby-highlight'], dataLanguage: language ?? 'text' },
          children: [child],
        };
      }
      if (child.tagName === 'code') {
        const className = [].concat(child.properties?.className ?? []);
        if (!className.some((name) => String(name).startsWith('language-'))) {
          child.properties = { ...child.properties, className: [...className, 'language-text'] };
        }
        return child;
      }
      visit(child);
      return child;
    });
  };
  return visit;
}
