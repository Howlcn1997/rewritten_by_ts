//////////////////第一题///////////////////
const arr = ["1231", "12234234", "123444"];

/**
 * @desc 找出数组元素间，最大公共头部
 * @param {Array<string>} targetArr 公共头部源数组
 * 
 * @return {string} 公共头部
 */
function findCommon(targetArr: Array<string>): string {
    let common: string = '';
    for (let j = 0; j < arr[0].length; j++) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i][j] != arr[0][j]) {
                return common
            }
        }
        common = common + arr[0][j];
    }
    return common;
};
console.log("-----第一题答案-----\n", findCommon(arr))



//////////////////第二题///////////////////
const data = [
    { id: 2, parentId: 1, label: "2" },
    { id: 3, parentId: 1, label: "2" },
    { id: 4, parentId: 2, label: "2" },
    { id: 1, parentId: null, label: "1" },
    { id: 5, parentId: 4, label: "2" },
];

interface sourceItem {
    id: number,
    parentId: number | null,
    children?: Array<sourceItem>
}
/**
 * @desc 将扁平数组处理成树形结构
 * @param {Array(object)} sourceData 源数组
 * 
 * @return {Object | null} 树形结构数据
 */
function convert2Tree(sourceData: Array<sourceItem>): (null | sourceItem) {
    // 期望：这里使用loadsh cloneDeep 深拷贝 sourceData，以避免污染源数据
    // const __sourceData =  cloneDeep(sourceData);

    // 方便寻找父节点
    const parentIdMap: Map<number, sourceItem> = new Map();
    // 记录根节点id
    let rootId: number | undefined;
    // 赋值到parentIdMap 和 rootId
    sourceData.forEach(it => {
        parentIdMap.set(it.id, it);
        if (it.parentId === null) { rootId = it.id }
    })
    // 遍历目标数据 对parentIdMap进行children的添加
    sourceData.forEach(item => {
        const parent: undefined | sourceItem = parentIdMap.get(<number>item.parentId)
        if (parent) {
            parent.children = !parent.children ? [] : parent.children
            parent.children.push(item);
        }
    });

    return rootId === undefined ? null : parentIdMap.get(rootId) || null;

}
console.log("-----第二题答案-----\n", JSON.stringify(convert2Tree(data), null, 2))