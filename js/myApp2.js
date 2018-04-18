angular.module('myApp2', ['treeControl']).controller('treeDemo2', ['$scope', function ($scope) {
    $scope.selectedArr = [];
    $scope.ischeckedArr = [];
    $scope.treeOptions = {
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

    $scope.selectedItem = function (node) {
        var i = $scope.selectedArr.indexOf(node);
        if (i > -1) {
            $scope.selectedArr.splice(i, 1);
        } else {
            $scope.selectedArr.push(node);
        }
    };
    $scope.isDisabled = function (node) {
        return false;
    };

    $scope.ischecked =function(node){
        return $scope.selectedArr.indexOf(node) > -1;
    };
}]);