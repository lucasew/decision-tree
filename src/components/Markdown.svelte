<script lang="ts">
    /**
     * @module Markdown
     * Component responsible for safely rendering Markdown strings as HTML.
     *
     * Applies GitHub Flavored Markdown (gfm) and soft breaks.
     * Prevents XSS vulnerabilities by sanitizing the resulting HTML using `isomorphic-dompurify`
     * before Svelte renders it directly into the DOM via `{@html}`.
     *
     * Use this whenever external or potentially untrusted content (like decision tree descriptions)
     * needs to be formatted for display.
     */

    import { marked } from 'marked';
    import DOMPurify from 'isomorphic-dompurify';

    interface Props {
        source: string;
    }

    let { source }: Props = $props();

    // Configure marked options
    marked.setOptions({
        breaks: true,
        gfm: true,
    });

    // Convert markdown to HTML and sanitize it
    let html = $derived(DOMPurify.sanitize(marked.parse(source) as string));
</script>

{@html html}
