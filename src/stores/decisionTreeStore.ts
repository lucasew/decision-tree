import { derived } from "svelte/store";
import type {DecisionTree} from "../Model"
import locationStore from "./location";

export async function getDecisionTreeFromHref(href: URL): Promise<DecisionTree> {
    const tree = href.searchParams.get("tree")
    if (tree == null) {
        return null
    }
    if (tree.startsWith("http")) {
        const r = await fetch(tree)
        return r.json()
    } else {
        return JSON.parse(atob(tree))
    }
}

const decisionTreeStore = derived(locationStore, getDecisionTreeFromHref)
export default decisionTreeStore