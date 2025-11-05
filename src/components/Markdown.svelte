<script lang="ts">
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
