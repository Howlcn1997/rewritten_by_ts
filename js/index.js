"use strict";
//////////////////第一题///////////////////
var arr = ["1231", "12234234", "123444"];
/**
 * @desc 找出数组元素间，最大公共头部
 * @param {Array<string>} targetArr 公共头部源数组
 *
 * @return {string} 公共头部
 */
function findCommon(targetArr) {
    var common = '';
    for (var j = 0; j < targetArr[0].length; j++) {
        for (var i = 1; i < targetArr.length; i++) {
            if (targetArr[i][j] != targetArr[0][j]) {
                return common;
            }
        }
        common = common + targetArr[0][j];
    }
    return common;
}
;
console.log("-----第一题答案-----\n", findCommon(arr));
//////////////////第二题///////////////////
var data = [
    { id: 2, parentId: 1, label: "2" },
    { id: 3, parentId: 1, label: "2" },
    { id: 4, parentId: 2, label: "2" },
    { id: 1, parentId: null, label: "1" },
    { id: 5, parentId: 4, label: "2" },
];
/**
 * @desc 将扁平数组处理成树形结构
 * @param {Array(object)} sourceData 源数组
 *
 * @return {Object | undefined} 树形结构数据
 */
function convert2Tree(sourceData) {
    // 期望：这里使用loadsh cloneDeep 深拷贝 sourceData，以避免污染源数据
    // const __sourceData =  cloneDeep(sourceData);
    // 方便寻找父节点
    var parentIdMap = new Map();
    // 记录根节点id
    var rootId;
    // 赋值到parentIdMap 和 rootId
    sourceData.forEach(function (it) {
        parentIdMap.set(it.id, it);
        if (it.parentId === null) {
            rootId = it.id;
        }
    });
    // 遍历目标数据 对parentIdMap进行children的添加
    sourceData.forEach(function (item) {
        var parent = parentIdMap.get(item.parentId);
        if (parent) {
            parent.children = !parent.children ? [] : parent.children;
            parent.children.push(item);
        }
    });
    return rootId === undefined ? undefined : parentIdMap.get(rootId);
}
// function check<T>(data: T): void { }
// check<Item>({ id: 1, parentId: 1, children: [{ id: 1, parentId: 1, children: [] }] })
console.log("-----第二题答案-----\n", JSON.stringify(convert2Tree(data), null, 2));
