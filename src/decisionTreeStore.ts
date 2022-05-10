import { writable } from "svelte/store";
import type DecisionTree from "./DecisionTreeModel";

let urlParams = new URLSearchParams(window.location.search)
const store = writable(new Promise<DecisionTree>(async (res, rej) => {
    const tree = urlParams.get("tree")
    if (tree == null) {
        return res(null)
    }
    if (tree.startsWith("http")) {
        const r = await fetch(tree)
        return res(r.json())
    } else {
        // console.log(atob(tree))
        return res(JSON.parse(atob(tree)))
    }
}))
const decisionTreeStore = store

export default decisionTreeStore