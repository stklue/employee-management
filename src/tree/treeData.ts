
export function TreeData (data: any, select: any) {
    const main = document.querySelector(select);
    const treecanvas = document.createElement('div');
        treecanvas.className = 'tree';

    const treeCode = buildTree(data, Object.keys(data)[0]);
    treecanvas.innerHTML = treeCode;
    main.appendChild(treecanvas);
}

export function buildTree (obj: any, node: any) {
    let treeString = "<li><a href='#'>" + obj[node].value + "</a>";
    const sons = [];
    for (const i in obj) {
        if (obj[i].parent == node)
          sons.push(i);
    }
    if (sons.length > 0) {
        treeString += "<ul>";
        for (const j in sons) {
          treeString += buildTree(obj, sons[j]);
        }
        treeString += "</ul>";
    }
    return treeString;
}
