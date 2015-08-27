/**
 * Created by lizhelin on 15/7/11.
 */
var module = angular.module('myApp',['infinite-scroll','ngRoute']);

module.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/list', {
                    templateUrl: 'list.html',
                    controller: 'listController'
                }).
                when('/info',{
                    templateUrl:'info.html',
                    controller:'infoController'
                }).
                when('/delete',{
                    templateUrl:'delete.html',
                    controller:'deleteController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]
);

module.controller("indexCtrl", function($scope,productList,$http){
    $scope.products = [] ;
    $scope.product = [] ;
    $http.get("./products.json").success(function(response){
        productList.listP(response.data) ;
        $scope.products = productList.getP();
        $scope.product = $scope.products ;
        //console.log($scope.products) ;
    })


    $scope.fullName = '';
    $scope.shortName = '';
    $scope.url = '' ;
    $scope.price = '' ;
    $scope.incomplete = true;


    $scope.$watch('fullName', function () {
        $scope.test();
    });
    $scope.$watch('shortName', function () {
        $scope.test();
    });
    $scope.$watch('imageUrl', function () {
        $scope.test();
    });
    $scope.$watch('price', function () {
        $scope.test();
    });

    $scope.test = function () {
        $scope.incomplete = false;
        if (!$scope.fullName.length || !$scope.shortName.length || !$scope.url.length || !$scope.price.length) {
            $scope.incomplete = true;
        }
    };

    $scope.save = function () {
        var newpro = {
            fullName: $scope.fullName,
            shortName: $scope.shortName,
            imageUrl:$scope.url,
            price:$scope.price
        };
        //$scope.products.push(newpro);
        //$scope.product.push(newpro);
        productList.createP(newpro) ;
        productList.listP($scope.products) ;
        console.log($scope.products) ;
    }
});

module.controller("infoController", function($scope,productList,$http){
    $scope.products = [] ;
    $scope.products = productList.getP() ;

    $scope.fullName = '';
    $scope.shortName = '';
    $scope.url = '' ;
    $scope.price = '' ;
    $scope.incomplete = true;
    $scope.index = -1 ;

    $scope.product=[] ;
    for(var i = 0 ; i < 4 ; i++){
        $scope.product.push($scope.products[i]) ;
    }


    $scope.myPagingFunction = function() {
        var last = $scope.product.length - 1;
        //console.log(last) ;
        for(var i = 1; i <= 2; i++) {
            //console.log(response.data[last + i]) ;
            $scope.product.push($scope.products[last + i]);
        }
        //console.log($scope.product) ;
    }

    $scope.$watch('fullName', function () {
        $scope.test();
    });
    $scope.$watch('shortName', function () {
        $scope.test();
    });
    $scope.$watch('imageUrl', function () {
        $scope.test();
    });
    $scope.$watch('price', function () {
        $scope.test();
    });

    $scope.test = function () {
        $scope.incomplete = false;
        if (!$scope.fullName.length || !$scope.shortName.length || !$scope.url.length || !$scope.price.length) {
            $scope.incomplete = true;
        }
    };

    $scope.edit = function (pro) {
        $scope.index = $scope.products.indexOf(pro) ;

        $scope.fullName = $scope.products[$scope.index].fullName;
        $scope.shortName = $scope.products[$scope.index].shortName;
        $scope.url = $scope.products[$scope.index].imageUrl;
        $scope.price = $scope.products[$scope.index].price ;

    }

    $scope.save = function () {
        var newpro = {
            fullName: $scope.fullName,
            shortName: $scope.shortName,
            imageUrl:$scope.url,
            price:$scope.price
        };

        $scope.products[$scope.index]= newpro ;
        $scope.product[$scope.index] = newpro ;

        productList.edit($scope.index,newpro) ;
        console.log($scope.index);
        productList.listP($scope.products) ;
        //console.log($scope.products) ;
    }
});

module.controller("listController", function($scope,productList,$http){
    $scope.products = [] ;
    $scope.product = [] ;

    $scope.fullName = '';
    $scope.shortName = '';
    $scope.url = '' ;
    $scope.price = '' ;
    $scope.incomplete = true;
    $scope.index = -1 ;


    $scope.products = productList.getP() ;
    for(var i = 0 ; i < 15 ; i++){
        $scope.product.push($scope.products[i]) ;
    }

    $scope.myPagingFunction = function() {
        var last = $scope.product.length - 1;
        //console.log(last) ;
        for(var i = 1; i <= 3; i++) {
            //console.log(response.data[last + i]) ;
            $scope.product.push($scope.products[last + i]);
        }
        //console.log($scope.product) ;
    }

    $scope.$watch('fullName', function () {
        $scope.test();
    });
    $scope.$watch('shortName', function () {
        $scope.test();
    });
    $scope.$watch('imageUrl', function () {
        $scope.test();
    });
    $scope.$watch('price', function () {
        $scope.test();
    });

    $scope.test = function () {
        $scope.incomplete = false;
        if (!$scope.fullName.length || !$scope.shortName.length || !$scope.url.length || !$scope.price.length) {
            $scope.incomplete = true;
        }
    };

    $scope.edit = function (pro) {
        $scope.index = $scope.products.indexOf(pro) ;

        $scope.fullName = $scope.products[$scope.index].fullName;
        $scope.shortName = $scope.products[$scope.index].shortName;
        $scope.url = $scope.products[$scope.index].imageUrl;
        $scope.price = $scope.products[$scope.index].price ;

    }

    $scope.save = function () {
        var newpro = {
            fullName: $scope.fullName,
            shortName: $scope.shortName,
            imageUrl:$scope.url,
            price:$scope.price
        };

        $scope.products[$scope.index]= newpro ;
        $scope.product[$scope.index] = newpro ;

        productList.edit($scope.index,newpro) ;
        console.log($scope.index);
        productList.listP($scope.products) ;
        //console.log($scope.products) ;
    }
});

module.controller("deleteController", function($scope,productList,$http){
    $scope.products = [] ;
    $scope.product = [] ;

    $scope.products = productList.getP() ;
    for(var i = 0 ; i < 4 ; i++){
        $scope.product.push($scope.products[i]) ;
    }

    $scope.myPagingFunction = function() {
        var last = $scope.product.length - 1;
        //console.log(last) ;
        for(var i = 1; i <= 3; i++) {
            //console.log(response.data[last + i]) ;
            $scope.product.push($scope.products[last + i]);
        }
        //console.log($scope.product) ;
    }

    $scope.clickDelete = true ;

    $scope.delete = function(pro){
        $scope.products.splice($scope.products.indexOf(pro), 1);
        $scope.product.splice($scope.product.indexOf(pro), 1);
        productList.delete(pro) ;
        productList.listP($scope.products) ;
    }
});

module.service('productList', function(){
    products = [] ;
    click = false ;
    return {
        listP: function (data) {
            products = data ;
        },

        getP: function () {
            return products ;
        },

        add :function(pro){
            products.push(pro) ;
        },

        delete: function (pro) {
            products.splice(products.indexOf(pro), 1);
        },

        edit: function(index, pro) {
            products[index] = pro ;
        },

        createP: function(pro) {
            products.push(pro) ;
        },

        ifClick: function(data){
            click = data ;
        },

        getClick:function() {
            return click ;
        }
    }
});