import type { DecisionTree } from "./types";

export async function getDecisionTreeFromURL(url: URL): Promise<DecisionTree | null> {
    const tree = url.searchParams.get("tree");
    if (tree == null) {
        return null;
    }
    if (tree.startsWith("http")) {
        const r = await fetch(tree);
        return r.json();
    } else {
        return JSON.parse(atob(tree));
    }
}

export function resolveNode(tree: DecisionTree | null, route: string[]): DecisionTree | null {
    if (!tree) {
        return null;
    }
    if (route.length === 0) {
        return tree;
    }
    if (!tree?.alternatives && route.length > 0) {
        return null;
    }
    const node = tree?.alternatives?.[route[0]] || null;
    return resolveNode(node, route.slice(1));
}
