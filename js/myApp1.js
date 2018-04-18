angular.module('myApp', ['treeControl']).controller('treeDemo', ['$scope', function ($scope) {
    $scope.expandArr = [];
    $scope.treeOptions = {
        multiSelection: false,
        nodeChildren: 'CHILDREN',
        dirSelectable: true,
        isLeaf: function (node) {
            if (node.HASCHILDREN) {
                return node.HASCHILDREN == 'false';
            } else {
                return node.CHILDREN.length == 0;
            }
        }
    };
    (function () {
        $.ajax({
            url: 'data/tree-data.json',
            type: 'get',
            async: false,
            success: function (data) {
                $scope.dataForTheTree = data.DATA.DATA;
            }
        });
    })();
    $scope.queryChildren = function (node) { //查询对应channelid的子节点
        if (node.CHILDREN) return;
        $.ajax({
            url: 'data/chlid-' + node.CHANNELID + '.json',
            type: 'get',
            async: false,
            success: function (data) {
                node.CHILDREN = data.DATA.DATA;
            }
        });
    };
    $scope.expandedNode = function (node) {
        if (node.HASCHILDREN == 'false') return;
        if (!node.CHILDREN) {
            $scope.queryChildren(node);
        }
        var i = $scope.expandArr.indexOf(node);
        if (i > -1) {
            $scope.expandArr.splice(i, 1);
        } else {
            $scope.expandArr.push(node);
        }
    }
}]);