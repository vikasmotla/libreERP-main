var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'flash', 'ngSanitize', 'mwl.confirm', 'ui.bootstrap.datetimepicker', 'rzModule', 'ngMeta', 'angular-owl-carousel-2']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $provide, $locationProvider) {

  $urlRouterProvider.otherwise('/');
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.withCredentials = true;
  $locationProvider.html5Mode(true);
  // $cookies.set("time" : new Date())
});

app.run(['$rootScope', '$state', '$stateParams', '$users', '$http', function($rootScope, $state, $stateParams, $users, $http, $timeout) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.previousState;
  $rootScope.currentState;
  var startTime = new Date();
  $rootScope.$on("$stateChangeError", console.log.bind(console));
  $rootScope.$on("$stateChangeSuccess", function(params, to, toParams, from, fromParams) {
    $rootScope.previousState = from.name;
    $rootScope.currentState = to.name;
    // $timeout(function() {
    //   window.scrollTo(0, 0);
    // }, 1000)
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1000);

    var me = $users.get('mySelf');

    var now = new Date();
    var timeSpent = (now.getTime() - startTime.getTime()) / 1000;
    startTime = new Date();
    // console.log('time spent', timeSpent, 'on', $rootScope.previousState);


    function getCookie(cname) {
      // console.log(cname, '##################################');
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      // console.log(decodedCookie, 'hhhhhhhhhhhhhhhhhhhhhh');
      var ca = decodedCookie.split(';');
      // console.log(ca);
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }


    function setCookie(cname, cvalue, exdays) {
      // console.log('set cookie');
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    if (me != null) {
      if ($rootScope.previousState == '') {
        // console.log('logged in ');
        dataToSend = {
          user: me.pk,
          typ: 'loggedIn'
        }

      }

      if ($rootScope.previousState == 'details') {
        var data = {
          timeSpent: timeSpent,
          product: fromParams.id
        }
        data = JSON.stringify(data)
        dataToSend = {
          user: me.pk,
          typ: 'productView',
          product: fromParams.id,
          data: data
        }
        $http({
          method: 'POST',
          url: '/api/ecommerce/activities/',
          data: dataToSend
        }).
        then(function(response) {
          console.log(response.data);
        })
      }

      if ($rootScope.previousState == 'categories') {
        var data = {
          timeSpent: timeSpent,
          category: fromParams.name
        }
        data = JSON.stringify(data)
        dataToSend = {
          user: me.pk,
          typ: 'categoryView',
          data: data
        }
        $http({
          method: 'POST',
          url: '/api/ecommerce/activities/',
          data: dataToSend
        }).
        then(function(response) {
          console.log(response.data);
        })
      }
    } else {
      // console.log('cookieeee', $rootScope.previousState);
      if ($rootScope.previousState == 'details') {
        // console.log(fromParams);
        var data = {
          timeSpent: timeSpent,
          product: fromParams.id
        }
        data = JSON.stringify(data)
        dataToSend = {
          typ: 'productView',
          product: fromParams.id,
          data: data
        }
        detail = getCookie("unknownUserRecentViewed");
        if (detail != "") {
          // console.log('already there');
          document.cookie = encodeURIComponent("unknownUserRecentViewed") + "=deleted; expires=" + new Date(0).toUTCString()
        }
        setCookie("unknownUserRecentViewed", JSON.stringify(dataToSend), 365);
      }

    }


  });
}]);

app.config(function($stateProvider) {

  $stateProvider
    .state('ecommerce', {
      url: "/",
      templateUrl: '/static/ngTemplates/app.ecommerce.list.html',
      controller: 'controller.ecommerce.list'
    })

  $stateProvider
    .state('details', {
      url: "/details/:id/:name/:sku",
      templateUrl: '/static/ngTemplates/app.ecommerce.details.html',
      controller: 'controller.ecommerce.details'
    })

  $stateProvider
    .state('blog', {
      url: "/blog",
      templateUrl: '/static/ngTemplates/app.ecommerce.blog.html',
      controller: 'controller.ecommerce.blog'
    })

  $stateProvider
    .state('pages', {
      url: "/:title",
      templateUrl: '/static/ngTemplates/app.ecommerce.PagesDetails.html',
      controller: 'controller.ecommerce.PagesDetails'
    })

  $stateProvider
    .state('categories', {
      url: "/categories/:name",
      templateUrl: '/static/ngTemplates/app.ecommerce.categories.html',
      controller: 'controller.ecommerce.categories'
    })

  $stateProvider
    .state('checkout', {
      url: "/checkout/:pk",
      templateUrl: '/static/ngTemplates/app.ecommerce.checkout.html',
      controller: 'controller.ecommerce.checkout'
    })

  $stateProvider
    .state('account', {
      url: "/user/account",
      views: {
        "": {
          templateUrl: '/static/ngTemplates/app.ecommerce.account.html',
        },
        "menu@account": {
          templateUrl: '/static/ngTemplates/app.ecommerce.account.menu.html',
        },
        "topMenu@account": { //this is for top menu for mobile view
          templateUrl: '/static/ngTemplates/app.ecommerce.account.topMenu.html',
        },
        "@account": {
          templateUrl: '/static/ngTemplates/app.ecommerce.account.default.html',
        }
      }
    })

    .state('account.cart', {
      url: "/cart",
      templateUrl: '/static/ngTemplates/app.ecommerce.account.cart.html',
      controller: 'controller.ecommerce.account.cart'
    })
    .state('account.orders', {
      url: "/orders",
      templateUrl: '/static/ngTemplates/app.ecommerce.account.orders.html',
      controller: 'controller.ecommerce.account.orders'
    })
    .state('account.settings', {
      url: "/settings",
      templateUrl: '/static/ngTemplates/app.ecommerce.account.settings.html',
      controller: 'controller.ecommerce.account.settings'
    })
    .state('account.support', {
      url: "/support",
      templateUrl: '/static/ngTemplates/app.ecommerce.account.support.html',
      controller: 'controller.ecommerce.account.support'
    })
    .state('account.saved', {
      url: "/saved",
      templateUrl: '/static/ngTemplates/app.ecommerce.account.saved.html',
      controller: 'controller.ecommerce.account.saved'
    })


});





app.controller('controller.ecommerce.blog', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $window) {
  // console.log('bloggggggggggggggggggggggggggggggggggg', BRAND_TITLE);
  $window.scrollTo(0, 0)
  document.title = BRAND_TITLE + ' |  Blog'
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping Blogs')

  $scope.showNext = false
  $scope.showPrev = false
  $scope.start = 0
  $scope.rangeNo = 3
  $scope.end = $scope.start + $scope.rangeNo
  $scope.bData = function(start, end) {
    if (start > 0) {
      $scope.showPrev = true
    } else {
      $scope.showPrev = false
    }
    if (end >= $scope.blogFullLength) {
      $scope.showNext = false
    } else {
      $scope.showNext = true
    }
    $scope.blogData = $scope.blogFullData.slice(start, end)
  }
  $scope.change = function(a) {
    if (a == 'nxt') {
      $scope.start = $scope.end
      $scope.end = $scope.start + $scope.rangeNo
      $scope.bData($scope.start, $scope.end)
    } else if (a == 'prev') {
      $scope.end = $scope.start
      $scope.start = $scope.end - $scope.rangeNo
      $scope.bData($scope.start, $scope.end)
    }
    window.scrollTo(0, 0);
  }
  $http({
    method: 'GET',
    url: '/api/ecommerce/genericImage/'
  }).
  then(function(response) {
    console.log(response.data, 'imagesssssssss');
    if (response.data.length > 0) {
      $scope.genericImage = response.data[0]
    } else {
      $scope.genericImage = {}
    }
  })
  $http({
    method: 'GET',
    url: '/api/PIM/blog/?homeBlog'
  }).
  then(function(response) {
    console.log(response.data);
    $scope.blogFullData = response.data
    $scope.blogFullLength = response.data.length
    $scope.bData($scope.start, $scope.end)
  })

})


app.controller('ecommerce.search.typeheadResult', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $window) {
  $scope.genericSearchImage = $rootScope.genericImage
  $scope.me = $users.get('mySelf');
  // if($scope.me!=null){
  $scope.$watch('match', function(newValue, oldValue) {
    // console.log($scope.match);
    $scope.match.model.added = 0
    if ($scope.me) {
      if ($rootScope.inCart != undefined) {
        for (var i = 0; i < $rootScope.inCart.length; i++) {
          if ($scope.match.model.serialNo) {
            if ($scope.match.model.serialNo == $rootScope.inCart[i].prodSku) {
              $scope.match.model.added = $rootScope.inCart[i].qty
              break;
            }
          }
        }
      }
    }
    if (!$scope.me) {
      if ($rootScope.addToCart != undefined) {
        for (var i = 0; i < $rootScope.addToCart.length; i++) {
          if ($scope.match.model.serialNo) {
            if ($scope.match.model.serialNo == $rootScope.addToCart[i].prodSku) {
              $scope.match.model.added = $rootScope.addToCart[i].qty
              break;
            }
          }
        }
      }
    }
  })

  $scope.searchImage = false


  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=searchImage').
  // then(function(response) {
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.searchImage = true
  //     }
  //   }
  // });
  $scope.searchImage = settings_searchImage


  $scope.addToCart = function(model) {

    // for (var i = 0; i < $rootScope.inCart.length; i++) {
    //   if ($rootScope.inCart[i].product.pk == model.pk) {
    //     if ($rootScope.inCart[i].prodSku!=model.serialNo) {
    //       Flash.create('warning' , 'You cant buy product and combo together')
    //       return
    //     }
    //   }
    // }



    // console.log('coming here', model);
    var dataToSend = {
      product: model.pk,
      qty: 1,
      typ: 'cart',
      user: $users.get('mySelf').pk,
      prodSku: model.serialNo,
    }
    // console.log(dataToSend);
    $http({
      method: 'POST',
      url: '/api/ecommerce/cart/',
      data: dataToSend
    }).
    then(function(response) {
      $scope.match.model.added = 1;

      var prod_variants = response.data.product.product_variants
      for (var i = 0; i < prod_variants.length; i++) {
        if (prod_variants[i].sku == response.data.prodSku) {
          response.data.prod_var = prod_variants[i]
        }
      }

      $rootScope.inCart.push(response.data);
    });
  }

  $scope.incrementCart = function(modal) {
    // console.log(modal, 'aaaaaaaaaaaaaaaaaaaaaaa');
    $scope.match.model.added++
      for (var i = 0; i < $rootScope.inCart.length; i++) {
        if ($rootScope.inCart[i].product.pk == modal.pk) {
          if ($rootScope.inCart[i].typ == 'cart') {
            $rootScope.inCart[i].qty = $rootScope.inCart[i].qty + 1;
            $http({
              method: 'PATCH',
              url: '/api/ecommerce/cart/' + $rootScope.inCart[i].pk + '/',
              data: {
                qty: $rootScope.inCart[i].qty
              }
            }).
            then(function(response) {})
          }
        }
      }
  }
  $scope.decrementCart = function(modal) {
    $scope.match.model.added--
      for (var i = 0; i < $rootScope.inCart.length; i++) {
        if ($rootScope.inCart[i].product.pk == modal.pk) {
          if ($rootScope.inCart[i].typ == 'cart') {
            if ($scope.match.model.added == 0) {
              $rootScope.inCart[i].qty = $rootScope.inCart[i].qty - 1;
              $http({
                method: 'DELETE',
                url: '/api/ecommerce/cart/' + $rootScope.inCart[i].pk + '/',
              }).
              then(function(response) {
                Flash.create('success', 'Removed From Cart');

              })
              $rootScope.inCart.splice(i, 1)
            } else if ($scope.match.model.added != 0) {
              $rootScope.inCart[i].qty = $rootScope.inCart[i].qty - 1;
              $http({
                method: 'PATCH',
                url: '/api/ecommerce/cart/' + $rootScope.inCart[i].pk + '/',
                data: {
                  qty: $rootScope.inCart[i].qty
                }
              }).
              then(function(response) {})

            }
          }
        }
      }
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    // console.log(decodedCookie, 'hhhhhhhhhhhhhhhhhhhhhh');
    var ca = decodedCookie.split(';');
    // console.log(ca);
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    // console.log('set cookie');
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  $scope.addToCartCookie = function(model) {
    $http({
      method: 'GET',
      url: '/api/ecommerce/listing/' + model.pk + '/'
    }).
    then(function(response) {
      // console.log(response.data, 'aaaaaaaaaaaaaaa');
      // console.log(model.serialNo);
      // console.log(response.data.product.howMuch);
      if (response.data.product.howMuch == null) {
        return
      }
      for (var i = 0; i < response.data.product_variants.length; i++) {
        if (response.data.product_variants[i].sku == model.serialNo) {
          // console.log('hereeeee');
          $scope.item = {
            'productName': response.data.product.name,
            'qty': 1,
            'prodSku': response.data.product_variants[i].sku,
            'prod_howMuch': response.data.product_variants[i].unitPerpack * response.data.product.howMuch,
            'price': response.data.product_variants[i].discountedPrice,
            'unit': response.data.product.unit,
            'prodPk': response.data.pk
          }
          break;
        } else {
          $scope.item = {
            'productName': response.data.product.name,
            'qty': 1,
            'prodSku': response.data.product.serialNo,
            'prod_howMuch': response.data.product.howMuch,
            'price': response.data.product.discountedPrice,
            'unit': response.data.product.unit,
            'prodPk': response.data.pk
          }
        }
      }

      if (response.data.product_variants.length == 0) {
        $scope.item = {
          'productName': response.data.product.name,
          'qty': 1,
          'prodSku': response.data.product.serialNo,
          'prod_howMuch': response.data.product.howMuch,
          'price': response.data.product.discountedPrice,
          'unit': response.data.product.unit,
          'prodPk': response.data.pk
        }
      }

      // $scope.item = {'productName':response.data.product.name,'qty':1 , 'prodSku': $scope.match.model.serialNo , 'prod_howMuch':$scope.match.model.howMuch , 'price':$scope.selectedProdVar.amnt ,'unit':$scope.match.model.unit , 'prodPk': $scope.list.pk}
      //
      // $scope.item = {
      //   'product': response.data,
      //   'qty': 1
      // }
      detail = getCookie("addToCart");
      if (detail != "") {
        // console.log('already there');
        $rootScope.addToCart = JSON.parse(detail)
        document.cookie = encodeURIComponent("addToCart") + "=deleted; expires=" + new Date(0).toUTCString()
      }
      // console.log($scope.item);
      $rootScope.addToCart.push($scope.item)
      $scope.match.model.added = 1;
      setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
      // console.log($rootScope.addToCart);
    })
  }
  $scope.incrementCookie = function(details) {
    $scope.match.model.added++
      for (var i = 0; i < $rootScope.addToCart.length; i++) {
        // console.log(details.pk, 'aaaaaaaaaaaaa');
        if ($rootScope.addToCart[i].prodSku == details.serialNo) {
          $rootScope.addToCart[i].qty = $rootScope.addToCart[i].qty + 1
          setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
        }
      }
  }

  $scope.decrementCookie = function(details) {
    $scope.match.model.added--
      for (var i = 0; i < $rootScope.addToCart.length; i++) {
        if ($rootScope.addToCart[i].prodSku == details.serialNo) {
          // $rootScope.addToCart[i].qty = $rootScope.addToCart[i].qty-1
          // setCookie("addToCart", JSON.stringify($rootScope.addToCart) , 365);
          if ($scope.match.model.added == 0) {
            setCookie("addToCart", "", -1, '/');
            $rootScope.addToCart.splice(i, 1);
            setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
            return
          } else {
            $rootScope.addToCart[i].qty = $rootScope.addToCart[i].qty - 1
            setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
            return
          }
        }
      }
  }
})

app.controller('ecommerce.body', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $window) {


  // console.log($rootScope.addToCart, 'aaaaaaaaaaaaaaaaaaaagggggggggggggggggggggggg');

  $scope.var1 = "hello";

  // $scope.cart = $rootScope.inCart;
  $scope.data = {
    total: 0
  };

  $scope.$watch('inCart', function(newValue, oldValue) {
    $scope.data.total = 0;
    var price = 0;
    for (var i = 0; i < $rootScope.inCart.length; i++) {
      console.log($rootScope.inCart[i].prodSku, $rootScope.inCart[i].product.product.serialNo);
      if ($rootScope.inCart[i].prodSku == $rootScope.inCart[i].product.product.serialNo) {
        price = $rootScope.inCart[i].product.product.discountedPrice
      } else {
        price = $rootScope.inCart[i].prodVarPrice
      }
      $scope.data.total += price * $rootScope.inCart[i].qty
      console.log($scope.data.total);
    }
  }, true)

  $scope.checkout = function() {
    $state.go('checkout', {
      pk: 'cart'
    });
    $timeout(function() {
      window.scrollTo(0, 0);
    }, 1000)
  }






  $scope.changeQty = function(value, data) {
    // for (var i = 0; i < $rootScope.inCart.length; i++) {
    // if ($rootScope.inCart[i].product.pk == value) {
    if ($rootScope.inCart[value].typ == 'cart') {
      if (data == 'increase') {
        $rootScope.inCart[value].qty = $rootScope.inCart[value].qty + 1;
      }
      if (data == 'decrease') {
        $rootScope.inCart[value].qty = $rootScope.inCart[value].qty - 1;
      }
      if ($rootScope.inCart[value].qty > 0) {
        $http({
          method: 'PATCH',
          url: '/api/ecommerce/cart/' + $rootScope.inCart[value].pk + '/',
          data: {
            qty: $rootScope.inCart[value].qty
          }
        }).
        then(function(response) {

        })
      } else if ($rootScope.inCart[value].qty == 0) {
        $http({
          method: 'DELETE',
          url: '/api/ecommerce/cart/' + $rootScope.inCart[value].pk + '/',
        }).
        then(function(response) {
          Flash.create('success', 'Removed From Cart');

        })
        $rootScope.inCart.splice(value, 1)
        return
      }

    }
    // }

    // }
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie, 'hhhhhhhhhhhhhhhhhhhhhh');
    var ca = decodedCookie.split(';');
    console.log(ca);
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    console.log('set cookie');
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


  $scope.updateCookieDetail = function(indx, value) {
    console.log(indx, value)
    if (value == "increase") {
      $rootScope.addToCart[indx].qty++
        setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
      return
    }
    if (value == "decrease") {
      $rootScope.addToCart[indx].qty--
        if ($rootScope.addToCart[indx].qty == 0) {
          setCookie("addToCart", "", -1, '/');
          $rootScope.addToCart.splice(indx, 1);
          setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
          return
        } else {
          setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
          return
        }

    }

  }





  // $http({
  //   method: 'GET',
  //   url: '/api/ecommerce/listingLite/'
  // }).
  // then(function(response) {
  //   for (var i = 0; i < response.data.length; i++) {
  //     for (var j = 0; j < $rootScope.addToCart.length; j++) {
  //       console.log(response.data[i] , 'hhhhhhhhhhhhhh');
  //       if (response.data[i].pk == $rootScope.addToCart[j].product.pk) {
  //         $rootScope.addToCart[j].in_stock = response.data[i].in_stock
  //
  //       }
  //     }
  //   }
  //
  // })








  $scope.$watch('addToCart', function(newValue, oldValue) {
    $scope.data.totalVal = 0;
    if ($rootScope.addToCart != undefined) {
      for (var i = 0; i < $rootScope.addToCart.length; i++) {
        $scope.data.totalVal += $rootScope.addToCart[i].price * $rootScope.addToCart[i].qty
      }
    }
  }, true)


  $scope.mainPage = function() {
    window.location = '/login';
  }
  $rootScope.genericImage = {}
  $http({
    method: 'GET',
    url: '/api/ecommerce/genericImage/'
  }).
  then(function(response) {
    console.log(response.data);
    if (response.data.length > 0) {
      $rootScope.genericImage = response.data[0]
    }
  })
});


app.controller('controller.ecommerce.PagesDetails', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $window) {

  // $scope.data = $scope.$parent.data; // contains the pickUpTime , location and dropInTime
  $window.scrollTo(0, 0)
  console.log('paramsssssssssssss', $state.params.title);

  document.title = BRAND_TITLE + ' |  ' + $state.params.title.split('-').join(' ')
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping')

  $scope.title = $state.params.title

  if ($scope.title == undefined || $scope.title == '') {
    $state.go('ecommerce', {})
  } else if ($scope.title == 'faq' || $scope.title == 'contact-us') {
    $state.go('account.support', {})
  } else {
    $http({
      method: 'GET',
      url: '/api/ecommerce/pages/?pageurl__icontains=' + $scope.title
    }).
    then(function(response) {
      console.log('pageeeeeeeeeeeeeeeee', response.data);
      if (response.data.length > 0) {
        $scope.pageData = response.data[0];
        $scope.typ = 'page'
      } else {
        $http({
          method: 'GET',
          url: '/api/PIM/blog/?shortUrl__icontains=' + $scope.title + '&homeBlog'
        }).
        then(function(response) {
          console.log('bloggggggggggggg', response.data);
          if (response.data.length > 0) {
            $scope.blogData = response.data[0]
            $scope.typ = 'blog'
          } else {
            $scope.typ = 'nothing'
            $state.go('ecommerce', {})
          }
        }, function(err) {
          $scope.typ = 'nothing'
          $state.go('ecommerce', {})
        })
      }
    })
  }


});

app.controller('controller.ecommerce.details', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $window, ngMeta, $filter, Flash) {

  $scope.call = function() {
    var fd = new FormData()
    fd.append('secretKey', 1234);
    fd.append('username', 'vikas');
    fd.append('email', 'vikas.m@cioc.in');
    fd.append('password', 123);
    $http({
      method: 'POST',
      url: '/socialMobileLogin',
      data: fd,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    }).
    then(function(response) {
      location.reload();
    })
  }

  $scope.me = $users.get('mySelf');
  $scope.showRatings = false
  $scope.priceDisplay = false
  $scope.priceDisplay = settings_isPrice;
  $scope.showPrice = false
  if (!$scope.me && !$scope.priceDisplay) {
    $scope.showPrice = false
  } else {
    $scope.showPrice = true
  }

  $scope.currency = settings_currencySymbol;
  console.log('paramssssssss', $scope.me, $state.params);
  document.title = $state.params.name + ' Online At Best Price Only On ' + BRAND_TITLE
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=rating').
  // then(function(response) {
  //   console.log('ratingggggggggggggggggggg', response.data);
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.showRatings = true
  //     }
  //   }
  // })
  $scope.showRatings = settings_rating
  $scope.isCod = false
  $scope.isCod = settings_isCOD

  $scope.showDescription = false
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=description').
  // then(function(response) {
  //   console.log('ratingggggggggggggggggggg', response.data);
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.showDescription = true
  //     }
  //   }
  //   console.log($scope.showDescription);
  // })
  $scope.showDescription = settings_description
  $scope.next = ''
  $scope.data = $scope.$parent.data; // contains the pickUpTime , location and dropInTime'
  console.log($scope.data);
  $scope.breadcrumbList = [];
  $scope.details = {};
  $window.scrollTo(0, 0)
  $scope.offset = 0
  $scope.reviews = []
  $scope.showOptions = true
  console.log($scope.showOptions, 'aaaaaaaaaaaaaaaaaaaaa');
  $scope.prodVariant = ''
  $scope.getRatings = function(offset) {
    $http({
      method: 'GET',
      url: '/api/ecommerce/rating/?productDetail=' + $scope.details.pk + '&limit=4&offset=' + offset
    }).
    then(function(response) {
      $scope.reviews = response.data.results
      $scope.next = response.data.next
    });
  }
  $http({
    method: 'GET',
    url: '/api/ecommerce/listingLite/' + $state.params.id + '/'
  }).
  then(function(response) {
    $scope.details = response.data
    if ($scope.details.product_variants.length > 0) {
      $scope.prodVariant = $scope.details.product_variants
    }

    // for (var i = 0; i < $scope.details.product_variants.length; i++) {
    //   console.log($state.params.sku,'#######################################');
    //   if ($scope.details.product_variants[i].sku == $state.params.sku) {
    //     console.log($scope.details.product_variants[i] , '###################################');
    //     $scope.prodVariant = $scope.details.product_variants[i]
    //   }
    // }

    // if (!$scope.me) {
    //   if ($rootScope.addToCart != undefined) {
    //     for (var i = 0; i < $rootScope.addToCart.length; i++) {
    //       if ($rootScope.addToCart[i].prodSku == $scope.details.prodSku) {
    //         $scope.details.added_cart = $rootScope.addToCart[i].qty
    //       }
    //     }
    //   }
    // }
    if ($rootScope.multiStore) {
      for (var i = 0; i < $scope.details.product.storeQty.length; i++) {
        if ($scope.details.product.storeQty[i].store.pincode == $rootScope.pin) {
          if ($scope.details.product.storeQty[i].quantity <= 0 && INVENTORY_ENABLED == 'True') {
            $scope.showOptions = false;
          } else {
            $scope.showOptions = true;
          }
        }
      }
    } else {

      if (INVENTORY_ENABLED != 'True') {
        $scope.details.product.inStock = 1000;
      }

      // if ($scope.details.product.inStock <= 0) {
      //   $scope.showOptions = false
      // }
    }
    console.log(response.data);
    console.log(response.data.product.description);
    document.querySelector('meta[name="description"]').setAttribute("content", response.data.product.description)
    $scope.details.specifications = JSON.parse($scope.details.specifications);
    var parent = response.data.parentType
    while (parent) {
      $scope.breadcrumbList.push(parent.name)
      parent = parent.parent
    }
    $scope.getRatings($scope.offset)
    if ($rootScope.multiStore) {
      lurl = '/api/ecommerce/listingLite/?parentValue=' + $scope.details.parentType.pk + '&detailValue=' + $scope.details.pk + '&pin=' + $rootScope.pin + '&multipleStore'
    } else {
      lurl = '/api/ecommerce/listingLite/?parentValue=' + $scope.details.parentType.pk + '&detailValue=' + $scope.details.pk
    }
    $http({
      method: 'GET',
      url: lurl
    }).
    then(function(response) {
      console.log("ghhhghfhfhffgfgfdfg");
      $scope.suggest = response.data
    });
  });

  $timeout(function() {
    $scope.breadcrumbList = $scope.breadcrumbList.slice().reverse();
  }, 1000);


  $scope.ratings = {
    meta: [5, 4, 3, 2, 1],
    counts: [15, 10, 1, 1, 1],
    averageRating: 4.5
  };
  $scope.form = {
    rating: '',
    reviewText: '',
    reviewHeading: '',
    reviewEditor: false,
    ratable: true
  }

  $scope.pictureInView = 0;

  $scope.changePicture = function(pic) {
    $scope.pictureInView = pic;
  }



  $scope.addToCart = function(inputPk) {
    // $http({
    //   method: 'GET',
    //   url: '/api/ecommerce/cart/?user=' + $scope.me.pk
    // }).
    // then(function(response) {
    //   for (var i = 0; i < response.data.length; i++) {
    //     if (response.data[i].product.pk == dataToSend.product) {
    //       if (response.data[i].typ == 'cart') {
    //         Flash.create('warning', 'This Product is already in cart');
    //         return
    //       } else if (response.data[i].typ == 'favourite') {
    //         console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    //         $http({
    //           method: 'PATCH',
    //           url: '/api/ecommerce/cart/' + response.data[i].pk + '/',
    //           data: {
    //             qty: 1,
    //             typ: 'cart'
    //           }
    //         }).
    //         then(function(response) {
    //           Flash.create('success', 'Product added to cart');
    //           $rootScope.inCart.push(response.data);
    //         })
    //         response.data[i].typ = 'cart'
    //         return
    //       }
    //     }
    //   }

    console.log($scope.selectedObj);

    dataToSend = {
      product: inputPk,
      user: getPK($scope.me.url),
      qty: 1,
      typ: 'cart',
    }

    if ($scope.selectedObj.prodDesc) {
      dataToSend.desc = $scope.selectedObj.prodDesc
    }

    console.log($scope.prodVariant);

    console.log($scope.selectedObj);

    if ($scope.prodVariant.length > 0) {
      dataToSend.prodSku = $scope.selectedObj.sku
    } else {
      dataToSend.prodSku = $scope.details.product.serialNo
    }

    console.log(dataToSend);

    $http({
      method: 'POST',
      url: '/api/ecommerce/cart/',
      data: dataToSend
    }).
    then(function(response) {
      Flash.create('success', 'Product added in cart');
      $scope.details.added_cart = 1

      var prod_variants = response.data.product.product_variants
      for (var i = 0; i < prod_variants.length; i++) {
        if (prod_variants[i].sku == response.data.prodSku) {
          response.data.prod_var = prod_variants[i]
        }
      }

      $rootScope.inCart.push(response.data);
    })

  }

  $scope.increment = function(inputPk) {

    for (var i = 0; i < $rootScope.inCart.length; i++) {
      if ($rootScope.inCart[i].prodSku == $scope.selectedObj.sku) {
        if ($rootScope.inCart[i].typ == 'cart') {
          // if ($rootScope.inCart[i].prodSku!=$scope.selectedObj.sku) {
          //   Flash.create('warning' , 'You cant buy product and combo together')
          //   return
          // }

          $rootScope.inCart[i].qty = $rootScope.inCart[i].qty + 1;
          $http({
            method: 'PATCH',
            url: '/api/ecommerce/cart/' + $rootScope.inCart[i].pk + '/',
            data: {
              qty: $rootScope.inCart[i].qty
            }
          }).
          then(function(response) {})


        }
      }
    }
    $scope.details.added_cart++
  }
  $scope.decrement = function(inputPk) {
    $scope.details.added_cart--
      for (var i = 0; i < $rootScope.inCart.length; i++) {
        if ($rootScope.inCart[i].prodSku == $scope.selectedObj.sku) {
          if ($rootScope.inCart[i].typ == 'cart') {
            if ($scope.details.added_cart == 0) {
              $rootScope.inCart[i].qty = $rootScope.inCart[i].qty - 1;
              $http({
                method: 'DELETE',
                url: '/api/ecommerce/cart/' + $rootScope.inCart[i].pk + '/',
              }).
              then(function(response) {
                Flash.create('success', 'Removed From Cart');

              })
              $rootScope.inCart.splice(i, 1)
              $scope.details.added_saved = 0
            } else if ($scope.details.added_cart != 0) {
              $rootScope.inCart[i].qty = $rootScope.inCart[i].qty - 1;
              $http({
                method: 'PATCH',
                url: '/api/ecommerce/cart/' + $rootScope.inCart[i].pk + '/',
                data: {
                  qty: $rootScope.inCart[i].qty
                }
              }).
              then(function(response) {})

            }
          }
        }
      }
  }


  $scope.buy = function(input) {
    console.log(input);
    $state.go('checkout', {
      pk: input.pk
    })
  }



  $scope.sendReview = function() {

    // if (mode == 'rating') {
    if ($scope.form.rating == '') {
      Flash.create('danger', 'Please provide rating')
    }
    // } else {
    if ($scope.form.reviewText == '') {
      Flash.create('danger', 'No review heading to post')
      return;
    }
    if ($scope.form.reviewHeading == '') {
      Flash.create('danger', 'No review to post')
      return;
    }
    //post request
    var toSend = {
      rating: $scope.form.rating,
      textVal: $scope.form.reviewText,
      headingVal: $scope.form.reviewHeading,
      // user:$scope.me.pk,
      productDetail: $scope.details.pk
    }
    $http({
      method: 'POST',
      url: '/api/ecommerce/rating/',
      data: toSend
    }).
    then(function(response) {
      if ($scope.reviews.length < 4) {
        $scope.reviews.push(response.data)
      } else {
        $scope.offset += 4
        $scope.getRatings($scope.offset)
      }
      Flash.create('success', 'Your review is added')
      $scope.form.rating = 0
      $scope.form.reviewText = ''
      $scope.form.reviewHeading = ''

    })

  }

  $scope.nextReviews = function() {
    $scope.offset = $scope.offset + 4
    $scope.getRatings($scope.offset)

  }
  $scope.prevReviews = function() {
    $scope.offset = $scope.offset - 4
    $scope.getRatings($scope.offset)

  }


  // $scope.getSuggestion = function() {
  //
  // }




  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie, 'hhhhhhhhhhhhhhhhhhhhhh');
    var ca = decodedCookie.split(';');
    console.log(ca);
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  function setCookie(cname, cvalue, exdays) {
    console.log('set cookie');
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


  $scope.incrementCookie = function(details) {
    $scope.details.added_cart++
      for (var i = 0; i < $rootScope.addToCart.length; i++) {
        console.log(details.pk, 'aaaaaaaaaaaaa');
        if ($rootScope.addToCart[i].prodSku == $scope.selectedObj.sku) {
          $rootScope.addToCart[i].qty = $rootScope.addToCart[i].qty + 1
          setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
        }
      }
  }

  $scope.decrementCookie = function(details) {
    console.log("aaaaaaaaaaaaaaaaaaa");
    $scope.details.added_cart--
      for (var i = 0; i < $rootScope.addToCart.length; i++) {
        if ($rootScope.addToCart[i].prodSku == $scope.selectedObj.sku) {
          // $rootScope.addToCart[i].qty = $rootScope.addToCart[i].qty-1
          // setCookie("addToCart", JSON.stringify($rootScope.addToCart) , 365);
          if ($scope.details.added_cart == 0) {
            setCookie("addToCart", "", -1, '/');
            $rootScope.addToCart.splice(i, 1);
            setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
            return
          } else {
            $rootScope.addToCart[i].qty = $rootScope.addToCart[i].qty - 1
            setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
            return
          }
        }
      }
  }


  $scope.recentlyViewed = {}
  if ($scope.me != null) {
    if ($rootScope.multiStore) {
      rurl = '/api/ecommerce/activities/?user=' + $scope.me.pk + '&typ=productView&limit=2' + '&pin=' + $rootScope.pin + '&multipleStore'
    } else {
      rurl = '/api/ecommerce/activities/?user=' + $scope.me.pk + '&typ=productView&limit=2'
    }
    $http({
      method: 'GET',
      url: rurl
    }).
    then(function(response) {
      console.log(response.data.results);
      if (response.data.results.length > 0) {
        if (response.data.results[0].product.pk == $scope.details.pk) {
          if (response.data.results.length > 1) {
            $scope.recentlyViewed = response.data.results[1]
            console.log($scope.recentlyViewed.product.files, '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');

          }
        } else {
          $scope.recentlyViewed = response.data.results[0]
          console.log($scope.recentlyViewed, 'kkkkkkkkkkkkkkkkkkkkkkk');

        }
      }

    })
  } else {
    detail = getCookie("unknownUserRecentViewed");
    if (detail != "") {
      console.log('already there');
      $scope.recentlyViewed = JSON.parse(detail)
      $http({
        method: 'GET',
        url: '/api/ecommerce/listing/' + $scope.recentlyViewed.product + '/'
      }).
      then(function(response) {
        $scope.recentlyViewed.product = response.data
        console.log("hhhhhhhhhhhhhhhhhhh", $scope.recentlyViewed.product);

      })
    }
  }
  setTimeout(function() {
    console.log($scope.recentlyViewed);
  }, 1000);



  $scope.createCookieDetail = function(product) {
    console.log(product, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    if ($rootScope.addToCart != undefined) {
      for (var i = 0; i < $rootScope.addToCart.length; i++) {
        if ($rootScope.addToCart[i].prodSku == $scope.selectedObj.sku) {
          Flash.create("warning", "Product Already in Cart")
          return
        }
      }
    }

    $scope.details.added_cart++
      $scope.item = {
        'productName': $scope.details.product.name,
        'qty': 1,
        'prodSku': $scope.selectedObj.sku,
        'prod_howMuch': $scope.selectedObj.qty,
        'price': $scope.selectedObj.amnt,
        'unit': $scope.selectedObj.unit,
        'prodPk': $scope.details.pk
      }

    if ($scope.selectedColor) {
      $scope.item.desc = $scope.selectedColor
    } else {
      $scope.item.desc = ""
    }

    // $scope.item = {
    //   'product': product,
    //   'qty': 1
    // }
    detail = getCookie("addToCart");
    $rootScope.addToCart = []
    if (detail != "") {
      console.log('already there');
      $rootScope.addToCart = JSON.parse(detail)
      document.cookie = encodeURIComponent("addToCart") + "=deleted; expires=" + new Date(0).toUTCString()
    }
    $rootScope.addToCart.push($scope.item)
    setCookie("addToCart", JSON.stringify($rootScope.addToCart), 365);
  }



  $scope.getProdVar = function() {
    $scope.selectedProdVar = {}
    $scope.prod_var = $scope.details.product_variants;
    $scope.prodVarList = []
    $scope.details.product.unit = $filter('getUnit')($scope.details.product.unit);
    if (!$scope.showPrice) {
      var str = $filter('convertUnit')($scope.details.product.howMuch, $scope.details.product.unit)
    } else {
      var str = $filter('convertUnit')($scope.details.product.howMuch, $scope.details.product.unit) + ' -  ' + $scope.details.product.discountedPrice
    }
    $scope.prodVarList = [{
      str: str,
      qty: $scope.details.product.howMuch,
      amnt: $scope.details.product.discountedPrice,
      unit: $scope.details.product.unit,
      sku: $scope.details.product.serialNo
    }];

    if ($scope.prod_var) {
      for (var i = 0; i < $scope.prod_var.length; i++) {
        if (!$scope.showPrice) {
          str = $filter('convertUnit')($scope.prod_var[i].unitPerpack * $scope.details.product.howMuch, $scope.details.product.unit)
        } else {
          str = $filter('convertUnit')($scope.prod_var[i].unitPerpack * $scope.details.product.howMuch, $scope.details.product.unit) + ' -  ' + $scope.prod_var[i].price
        }

        $scope.prodVarList.push({
          pk: $scope.prod_var[i].id,
          str: str,
          qty: $scope.prod_var[i].unitPerpack * $scope.details.product.howMuch,
          amnt: $scope.prod_var[i].price,
          unit: $scope.details.product.unit,
          sku: $scope.prod_var[i].sku,
          disc: $scope.prod_var[i].discountedPrice
        })
      }
    }

    for (var i = 0; i < $scope.prodVarList.length; i++) {
      if ($scope.prodVarList[i].sku == $state.params.sku) {
        $scope.selectedProdVar.toWatch = $scope.prodVarList[i];
      } else {
        $scope.selectedProdVar.toWatch = $scope.prodVarList[0];
      }
    }


    $scope.$watch('selectedProdVar.toWatch', function(newValue, oldValue) {


      $scope.selectedObj = newValue;


      if ($scope.selectedObj.qty != null) {
        $scope.extendedName = $filter('convertUnit')($scope.selectedObj.qty, $scope.selectedObj.unit);
      }

      if (newValue.sku != undefined) {
        if ($scope.me) {
          for (var i = 0; i < $rootScope.inCart.length; i++) {
            if (newValue.sku == $rootScope.inCart[i].prodSku) {
              $scope.details.added_cart = $rootScope.inCart[i].qty
              break;
            } else {
              $scope.details.added_cart = 0
            }
          }
        } else {
          for (var i = 0; i < $rootScope.addToCart.length; i++) {
            if (newValue.sku == $rootScope.addToCart[i].prodSku) {
              $scope.details.added_cart = $rootScope.addToCart[i].qty
              break;
            } else {
              $scope.details.added_cart = 0
            }
          }
        }

        if (INVENTORY_ENABLED == 'False') {
          $scope.selectedObj.inStock = 1000;
          return;
        }


        if ($scope.details.product.serialNo == newValue.sku) {

          // $scope.list.price = $scope.list.product.discountedPrice
          for (var i = 0; i < $scope.details.variantsInStoreQty.length; i++) {
            if ($scope.details.variantsInStoreQty[i].productVariant == null && $scope.details.variantsInStoreQty[i].store == $scope.storePK) {
              $scope.selectedObj.inStock = $scope.details.variantsInStoreQty[i].quantity;
              break;
            } else {
              $scope.selectedObj.inStock = 0
            }
          }
        } else {
          // $scope.list.product.price = newValue.amnt
          console.log('child');

          for (var i = 0; i < $scope.details.variantsInStoreQty.length; i++) {
            console.log($scope.details.variantsInStoreQty[i].productVariant, $scope.selectedObj);
            if ($scope.details.variantsInStoreQty[i].productVariant == $scope.selectedObj.pk && $scope.details.variantsInStoreQty[i].store == $scope.storePK) {
              $scope.selectedObj.inStock = $scope.details.variantsInStoreQty[i].quantity
              break;
            } else {
              $scope.selectedObj.inStock = 0;
            }
          }

          $scope.details.price = newValue.amnt
        }
        console.log($scope.selectedObj.inStock, 'ffffffffff');
      }
    }, true);

  }
  $scope.selectedObj;

  $scope.getProdVarSize = function() {


    $scope.selectedProdVar = {
      toWatch: []
    }

    $scope.selectedColor = {
      toWatch: ''
    }


    $scope.prod_var = $scope.details.product_variants;
    $scope.prodVarList = []
    $scope.prodVarListColors = []

    if ($scope.prod_var) {
      for (var i = 0; i < $scope.prod_var.length; i++) {
        str = $filter('convertSize')($scope.prod_var[i].unitPerpack, $scope.details.product.unit)
        console.log($scope.prod_var[i].unitPerpack);
        toPush = {
          pk: $scope.prod_var[i].id,
          str: str,
          size: $scope.prod_var[i].unitPerpack,
          amnt: $scope.prod_var[i].price,
          unit: $scope.details.product.unit,
          sku: $scope.prod_var[i].sku,
          disc: $scope.prod_var[i].discountedPrice,
        }

        index = $scope.prodVarList.findIndex(x => x.str == str);
        if (index >= 0) {
          console.log('already there');
        } else {
          $scope.prodVarList.push(toPush)
        }
      }
      $scope.selectedProdVar.toWatch = $scope.prodVarList[0]
    }


    $scope.$watch('selectedProdVar.toWatch', function(newValue, oldValue) {
      $scope.prodVarListColors = [];
      if (newValue != undefined) {
        for (var i = 0; i < $scope.prod_var.length; i++) {
          if ($scope.prod_var[i].sku.split('&')[0] == $scope.selectedProdVar.toWatch.sku.split('&')[0]) {
            $scope.prodVarListColors.push($scope.prod_var[i])
          }
        }
        if ($scope.prodVarListColors.length >= 0) {
          console.log('herer');
          $scope.selectedColor.toWatch = $scope.prodVarListColors[0];
        }
      }
    });


    $scope.$watch('selectedColor.toWatch', function(newValue, oldValue) {
      if (newValue != undefined) {

        $scope.selectedObj = {
          pk: newValue.id,
          size: newValue.unitPerpack,
          amnt: newValue.price,
          unit: $scope.details.product.unit,
          sku: newValue.sku,
          disc: newValue.discountedPrice
        }

        if (newValue.prodDesc != '' && newValue.prodDesc != null) {
          $scope.selectedObj.prodDesc = newValue.prodDesc
        }

        console.log($scope.selectedObj);

        if ($scope.me) {
          for (var i = 0; i < $rootScope.inCart.length; i++) {
            if ($scope.selectedObj.sku == $rootScope.inCart[i].prodSku) {
              $scope.details.added_cart = $rootScope.inCart[i].qty
              break;
            } else {
              $scope.details.added_cart = 0
            }
          }
        } else {
          for (var i = 0; i < $rootScope.addToCart.length; i++) {
            if ($scope.selectedObj.sku == $rootScope.addToCart[i].prodSku) {
              $scope.details.added_cart = $rootScope.addToCart[i].qty
              break;
            } else {
              $scope.details.added_cart = 0
            }
          }
        }

        if (INVENTORY_ENABLED == 'False') {
          $scope.selectedObj.inStock = 1000;
          return
        } else {
          for (var i = 0; i < $scope.details.variantsInStoreQty.length; i++) {
            if ($scope.details.variantsInStoreQty[i].productVariant == $scope.selectedObj.pk && $scope.details.variantsInStoreQty[i].store == $scope.storePK) {
              $scope.selectedObj.inStock = $scope.details.variantsInStoreQty[i].quantity
              break;
            } else {
              $scope.selectedObj.inStock = 0;
            }
          }
        }

      }

    });

  }

  $scope.dataFetched = false;


  $timeout(function() {
    $scope.dataFetched = true;
    if ($scope.details.product.unit == 'Size and Color' || $scope.details.product.unit == 'Size') {
      $scope.getProdVarSize()
    } else {
      $scope.getProdVar()
    }
  }, 3000);

});


app.controller('controller.ecommerce.categories', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $window) {
  $scope.showFilter = false
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=filter').
  // then(function(response) {
  //   console.log('ratingggggggggggggggggggg', response.data);
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.showFilter = true
  //     }
  //   }
  // })
  $scope.showFilter = settings_filter
  $scope.data = $scope.$parent.data; // contains the pickUpTime , location and dropInTime
  $window.scrollTo(0, 0)
  $scope.minValue;
  $scope.maxValue
  console.log($state.params);
  document.title = $state.params.name.split('_').join(' ') + ' | Buy ' + $state.params.name.split('_').join(' ') + ' At Best Price In India | ' + BRAND_TITLE
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping')


  $scope.slider = {
    minValue: 200,
    maxValue: 600,
    options: {
      floor: 0,
      ceil: 1000,
      step: 10,
      noSwitching: true,
      translate: function(value) {
        return '₹' + value;
      }
    }
  };


  $scope.breadcrumbList = [];
  $scope.category = {}
  $scope.fields;


  $http({
    method: 'GET',
    url: '/api/ecommerce/genericProduct/?name__iexact=' + $state.params.name.split('_').join(' ')
  }).
  then(function(response) {
    $scope.category = response.data[0];
    $scope.fields = $scope.category.fields;
    $scope.category.fields = [];
    var parent = response.data[0].parent
    while (parent) {
      $scope.breadcrumbList.push(parent.name)
      parent = parent.parent
    }
    if ($rootScope.multiStore) {
      gurl = '/api/ecommerce/genericProduct/?genericValue=' + response.data[0].pk + '&pin=' + $rootScope.pin + '&multipleStore'
    } else {
      gurl = '/api/ecommerce/genericProduct/?genericValue=' + response.data[0].pk
    }
    $http({
      method: 'GET',
      url: gurl,
    }).
    then(function(response) {
      console.log(response.data);
      $scope.categories = response.data;

    })

  });

  $scope.choices = {};

  $timeout(function() {
    $scope.category.fields = $scope.fields;
    for (var i = 0; i < $scope.category.fields.length; i++) {
      if ($scope.category.fields[i].data) {
        $scope.category.fields[i].data = JSON.parse($scope.category.fields[i].data)
      }
      if ($scope.category.fields[i].fieldType == 'choice') {
        for (var j = 0; j < $scope.category.fields[i].data.length; j++) {
          // console.log($scope.category.fields[i].data[j]);
          $scope.category.fields[i].data[j] = {
            name: $scope.category.fields[i].data[j],
            selected: false
          }
          // $scope.category.fields[i].choices.push()
        }
      }
      $scope.category.fields[i].val = '';
    }

    if ($rootScope.multiStore) {
      lurl = '/api/ecommerce/listing/?parent=' + $scope.category.pk + '&recursive=1' + '&pin=' + $rootScope.pin + '&multipleStore'
    } else {
      lurl = '/api/ecommerce/listing/?parent=' + $scope.category.pk + '&recursive=1'
    }

    $http({
      method: 'GET',
      url: lurl
    }).
    then(function(response) {
      $scope.listingSearch = response.data;

      if ($rootScope.addToCart.length > 0) {
        console.log("gggggggggggggggggggggggggggggggggggggg");
        for (var i = 0; i < $rootScope.addToCart.length; i++) {
          for (var j = 0; j < $scope.listingSearch.length; j++) {
            if ($scope.listingSearch[j].pk == $rootScope.addToCart[i].product.pk) {
              $scope.listingSearch[j].added_cart = $rootScope.addToCart[i].qty
            }
          }
        }
      }
    })
    $scope.breadcrumbList = $scope.breadcrumbList.slice().reverse();
  }, 3000);






  $scope.filter = function() {

    params = {
      minPrice: $scope.slider.minValue,
      maxPrice: $scope.slider.maxValue,
      fields: {},
      sort: $scope.data.sort
    }

    for (var i = 0; i < $scope.category.fields.length; i++) {
      if ($scope.category.fields[i].fieldType == 'choice') {
        var arr = []
        for (var j = 0; j < $scope.category.fields[i].data.length; j++) {
          if ($scope.category.fields[i].data[j].selected) {
            arr.push($scope.category.fields[i].data[j].name)
          }
        }
        if (arr.length > 0) {
          var a = $scope.category.fields[i].name
          // params.fields.push({a : arr})
          params.fields[a] = arr
        }
      } else {
        if ($scope.category.fields[i].val) {
          var a = $scope.category.fields[i].name
          // params.fields.push({a : $scope.category.fields[i].val})
          params.fields[a] = $scope.category.fields[i].val
        }
      }
    }

    console.log("gggggggggggggggggggggggggggg");
    console.log($scope.category.pk, 'aaaaaaaaaaaaaaaaaaaaaaa');
    if ($rootScope.multiStore) {
      lurl = '/api/ecommerce/listing/?parent=' + $scope.category.pk + '&recursive=1' + '&pin=' + $rootScope.pin + '&multipleStore'
    } else {
      lurl = '/api/ecommerce/listing/?parent=' + $scope.category.pk + '&recursive=1'
    }
    $http({
      method: 'GET',
      url: lurl,
      params: params
    }).
    then(function(response) {
      $scope.listingSearch = response.data;

      if ($rootScope.addToCart.length > 0) {
        console.log("gggggggggggggggggggggggggggggggggggggg");
        for (var i = 0; i < $rootScope.addToCart.length; i++) {
          for (var j = 0; j < $scope.listingSearch.length; j++) {
            if ($scope.listingSearch[j].pk == $rootScope.addToCart[i].product.pk) {
              $scope.listingSearch[j].added_cart = $rootScope.addToCart[i].qty
            }
          }
        }
      }
    })
  }

});



app.controller('controller.ecommerce.account.default', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash) {
  // for the dashboard of the account tab
  // alert('hello')
  $http({
    methof: 'GET',
    url: '/api/ecommerce/userProfileSetting/?user=' + $scope.me.pk
  }).then(function(response) {
    console.log(response.data);

    $scope.detailsForm = {
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      mobile: response.data.mobile,
      oldPassword: '',
      newPassword: ''
    }

    if (response.data.isGST) {
      $scope.isGst = true
      $scope.detailsForm.gst = response.data.gst
    } else {
      $scope.isGst = false
    }

  })
  $scope.editMode = false

  $scope.edit = function() {
    $scope.editMode = true
    setTimeout(function() {
      document.getElementById('firstName').focus()
    }, 500);
  }

  $scope.save = function() {

    $scope.detailsForm.user = $scope.me.pk

    if ($scope.detailsForm.oldPassword.length == 0 && $scope.detailsForm.newPassword.length > 0) {
      Flash.create('warning', 'Enter old password')
      return
    }

    if ($scope.detailsForm.newPassword.length == 0 && $scope.detailsForm.oldPassword.length > 0) {
      Flash.create('warning', 'Enter new password')
      return
    }

    if ($scope.detailsForm.oldPassword.length == 0 || $scope.detailsForm.newPassword.length == 0) {
      delete $scope.detailsForm.oldPassword
      delete $scope.detailsForm.newPassword
    }

    $http({
      method: 'POST',
      url: '/api/ecommerce/userProfileSetting/',
      data: $scope.detailsForm
    }).then(function(response) {
      $scope.detailsForm = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        mobile: response.data.mobile,
        oldPassword: '',
        newPassword: ''
      }

      if ($scope.isGst) {
        
        $scope.detailsForm.gst = response.data.gst
      }

      if (response.data.passwordChanged) {
        alert("password has been changed, login again")
        window.location.href = "/";
      }


      $scope.editMode = false
      Flash.create('success', 'Saved Successfully')
    }, function(error) {
      Flash.create('danger', 'Permission Denied')
    })
    // $http({
    //   method:'PATCH',
    //   url:''
    //   data:{}
    // }).then(function (response) {
    //   console.log(response);
    // })
  }

  console.log($scope.me);




});



app.controller('controller.ecommerce.account.cart', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $rootScope, $filter) {


  $scope.data = {
    tableData: [],
  };
  views = [{
    name: 'list',
    icon: 'fa-th-large',
    template: '/static/ngTemplates/genericTable/genericSearchList.html',
    itemTemplate: '/static/ngTemplates/app.ecommerce.account.cart.item.html',
  }, ];


  $scope.config = {
    views: views,
    url: '/api/ecommerce/cart/',
    // searchField: 'product__product__name',
    getParams: [{
      key: 'user',
      value: $scope.me.pk
    }, {
      key: 'typ',
      value: 'cart'
    }],
    deletable: true,
    itemsNumPerView: [8, 16, 32],
  }

  console.log('in cartttttttttt', $rootScope.inCart);
  document.title = BRAND_TITLE + ' | Shopping Cart'
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping')

  // $timeout(function () {
  //   for (var i = 0; i < $scope.data.tableData.length; i++) {
  //     var prod_variants = $scope.data.tableData[i].product.product_variants
  //     for (var j = 0; j < prod_variants.length; j++) {
  //       if (prod_variants[j].sku == $scope.data.tableData[i].prodSku) {
  //         $scope.data.tableData[i].prod_var = prod_variants[j]
  //         console.log($scope.data.tableData[i].prod_var);
  //       }
  //     }
  //   }
  // }, 1000);

  $scope.tableAction = function(target, action, mode) {
    for (var i = 0; i < $scope.data.tableData.length; i++) {
      if ($scope.data.tableData[i].pk == parseInt(target)) {
        if (action == 'deleteItem') {
          console.log("kkkkkkkkkkkkkkkkkk", $scope.data.tableData[i].pk);
          $http({
            method: 'DELETE',
            url: '/api/ecommerce/cart/' + $scope.data.tableData[i].pk + '/'
          }).
          then(function(response) {
            Flash.create('success', 'Item removed from cart');
          })
          $scope.data.tableData.splice(i, 1)
          $rootScope.inCart.splice(i, 1)
          // $scope.calcTotal();
        } else if (action == 'addQty') {
          $scope.data.tableData[i].qty = $scope.data.tableData[i].qty + 1;
          $http({
            method: 'PATCH',
            url: '/api/ecommerce/cart/' + $scope.data.tableData[i].pk + '/',
            data: {
              qty: $scope.data.tableData[i].qty
            }
          }).
          then(function(response) {})
          // $scope.calcTotal();
        } else if (action == 'substractQty') {
          $scope.data.tableData[i].qty = $scope.data.tableData[i].qty - 1;
          $http({
            method: 'PATCH',
            url: '/api/ecommerce/cart/' + $scope.data.tableData[i].pk + '/',
            data: {
              qty: $scope.data.tableData[i].qty
            }
          }).
          then(function(response) {})
          // $scope.calcTotal();
        } else if (action == 'favourite') {
          console.log("aaaaaaaaaaaaaaaaaa");
          $http({
            method: 'PATCH',
            url: '/api/ecommerce/cart/' + $scope.data.tableData[i].pk + '/',
            data: {
              typ: 'favourite'
            }
          }).
          then(function(response) {
            $rootScope.inFavourite.push(response.data)
          })
          $scope.data.tableData[i].typ = 'favourite';
          $scope.data.tableData.splice(i, 1)
          $rootScope.inCart.splice(i, 1)

        } else if (action == 'unfavourite') {
          console.log("aaaaaaaaaaaaaaaaaa");
          $http({
            method: 'PATCH',
            url: '/api/ecommerce/cart/' + $scope.data.tableData[i].pk + '/',
            data: {
              typ: 'cart'
            }
          }).
          then(function(response) {})
          $scope.data.tableData[i].typ = 'cart';
        }
      }
    }
  }


  console.log($scope.data.tableData.length, 'kkkkkkkkkkggggggggkkkkkkkkkkk');




  $scope.currency = settings_currencySymbol
  $scope.calcTotal = function() {
    $scope.total = 0;
    var price = 0;
    for (var i = 0; i < $scope.data.tableData.length; i++) {
      if ($scope.data.tableData[i].prodSku != $scope.data.tableData[i].product.product.serialNo) {
        price = $scope.data.tableData[i].prodVarPrice
      } else {
        price = $scope.data.tableData[i].product.product.discountedPrice
      }
      $scope.total = $scope.total + (price * $scope.data.tableData[i].qty)
    }
    return $scope.total
  }



  $scope.checkout = function() {
    $state.go('checkout', {
      pk: 'cart'
    })
  }

});

app.controller('ecommerce.account.cart.item', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash) {
  // for the dashboard of the account tab


  $scope.currency = settings_currencySymbol;
});

app.controller('controller.ecommerce.account.saved', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $filter) {

  console.log('coming in save controller..');

  $scope.data = {
    tableData: [],
  };
  views = [{
    name: 'list',
    icon: 'fa-th-large',
    template: '/static/ngTemplates/genericTable/genericSearchList.html',
    itemTemplate: '/static/ngTemplates/app.ecommerce.account.saved.item.html',
  }, ];


  $scope.config = {
    views: views,
    url: '/api/ecommerce/cart/',
    searchField: 'Name',
    getParams: [{
      key: 'user',
      value: $scope.me.pk
    }, {
      key: 'typ',
      value: 'favourite'
    }],
    deletable: true,
    itemsNumPerView: [8, 16, 32],
  }
  console.log($scope.data.tableData);
  document.title = BRAND_TITLE + ' | Saved Products'
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping')
  $scope.tableAction = function(target, action, mode) {
    for (var i = 0; i < $scope.data.tableData.length; i++) {
      if ($scope.data.tableData[i].pk == parseInt(target)) {
        if (action == 'unfavourite') {
          $http({
            method: 'PATCH',
            url: '/api/ecommerce/cart/' + $scope.data.tableData[i].pk + '/',
            data: {
              typ: 'cart',
              qty: 1
            }
          }).
          then(function(response) {
            console.log(response.data, 'kkkkkkkkkkkkkkkkkk');
            $rootScope.inCart.push(response.data)
          })
          $scope.data.tableData.splice(i, 1)
          $rootScope.inFavourite.splice(i, 1)
        } else if (action == 'deleteItem') {
          console.log("jjjjjjjjjjjjjjjjjjjj");
          $http({
            method: 'DELETE',
            url: '/api/ecommerce/cart/' + $scope.data.tableData[i].pk + '/'
          }).
          then(function(response) {
            Flash.create('success', 'Item removed from favourite');
          })
          $scope.data.tableData.splice(i, 1)
          $rootScope.inFavourite.splice(i, 1)
          // $rootScope.inCart.splice(i, 1)
          // $scope.calcTotal();
        }
      }
    }

  }



});

app.controller('controller.ecommerce.account.saved.item', function($scope, $rootScope, $http, $state) {
  $scope.currency = settings_currencySymbol;

})



app.controller('controller.ecommerce.account.orders.item', function($scope, $rootScope, $http, $state, $uibModal) {
  $scope.showDetails = function(val) {
    $scope.trackItem = val
    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.ecommerce.orders.trackModal.html',
      size: 'lg',
      backdrop: true,
      resolve: {
        items: function() {
          return $scope.trackItem;
        }
      },
      controller: function($scope, items, $state, $http, $timeout, $uibModal, $users, Flash, $uibModalInstance) {

        console.log(items, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

        $scope.trackItems = items



      }

    })
  }

  $scope.isStoreGlobal = settings_isStoreGlobal;

  $scope.currency = settings_currencySymbol;

})

app.controller('controller.ecommerce.account.orders', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash) {



  $scope.data = {
    tableData: [],
  };
  views = [{
    name: 'list',
    icon: 'fa-th-large',
    template: '/static/ngTemplates/genericTable/genericSearchList.html',
    itemTemplate: '/static/ngTemplates/app.ecommerce.account.orders.item.html',
  }, ];


  $scope.config = {
    views: views,
    url: '/api/ecommerce/order/',
    searchField: 'id',
    getParams: [{
      key: 'user',
      value: $scope.me.pk
    }],
    deletable: true,
    itemsNumPerView: [4, 16, 32],
  }



  $timeout(function() {
    for (var i = 0; i < $scope.data.tableData.length; i++) {
      $scope.data.tableData[i].showInfo = false;
      $scope.data.tableData[i].hideCancelBtn = false
      $scope.data.tableData[i].hideReturnBtn = false
      $scope.data.tableData[i].cancelCount = 0;
      $scope.data.tableData[i].returnCount = 0;

      for (var j = 0; j < $scope.data.tableData[i].orderQtyMap.length; j++) {
        $scope.data.tableData[i].orderQtyMap[j].selected = false;
        if ($scope.data.tableData[i].orderQtyMap[j].status == 'cancelled') {
          $scope.data.tableData[i].cancelCount++
        }
        if ($scope.data.tableData[i].orderQtyMap[j].status == 'returned') {
          $scope.data.tableData[i].returnCount++;
        }
      }
      if ($scope.data.tableData[i].cancelCount == $scope.data.tableData[i].orderQtyMap.length) {
        $scope.data.tableData[i].hideCancelBtn = true
      }
      if ($scope.data.tableData[i].returnCount == $scope.data.tableData[i].orderQtyMap.length) {
        $scope.data.tableData[i].hideReturnBtn = true
      }


    }

  }, 2000);


  document.title = BRAND_TITLE + ' | My Orders'
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping')

  $scope.tableAction = function(target, action, mode) {
    for (var i = 0; i < $scope.data.tableData.length; i++) {
      if ($scope.data.tableData[i].pk == parseInt(target)) {

        if (action == 'toggleInfo') {
          $scope.data.tableData[i].showInfo = !$scope.data.tableData[i].showInfo;
        } else if (action == 'cancel') {

          $scope.itemsToBeDeleted = [];


          for (var j = 0; j < $scope.data.tableData[i].orderQtyMap.length; j++) {
            if ($scope.data.tableData[i].orderQtyMap[j].selected == true) {
              if ($scope.data.tableData[i].orderQtyMap[j].status == 'created' || $scope.data.tableData[i].orderQtyMap[j].status == 'packed') {
                $scope.itemsToBeDeleted.push($scope.data.tableData[i].orderQtyMap[j])
              } else {
                // $scope.data.tableData[i].orderQtyMap[j].selected = false;
                Flash.create('warning', 'selected items cant be cancelled')
                return
              }
            }
          }



          if ($scope.itemsToBeDeleted.length > 0) {
            $scope.indexofthis = i
            $uibModal.open({
              templateUrl: '/static/ngTemplates/app.ecommerce.orders.cancelModalWindow.html',
              size: 'md',
              backdrop: true,
              resolve: {
                items: function() {
                  return $scope.itemsToBeDeleted;
                }
              },
              controller: function($scope, items, $state, $http, $timeout, $uibModal, $users, Flash, $uibModalInstance) {
                console.log('in modal windddddddd', items);
                $scope.state = 'cancel';
                $scope.items = items;
                $scope.amtToBeRefunded = 0;
                $scope.currency = settings_currencySymbol

                for (var i = 0; i < $scope.items.length; i++) {
                  $scope.amtToBeRefunded = $scope.amtToBeRefunded + $scope.items[i].paidAmount
                }

                $scope.cancel = function() {
                  for (var i = 0; i < $scope.items.length; i++) {
                    var pk = $scope.items[i].pk
                    $http({
                      method: 'PATCH',
                      url: '/api/ecommerce/orderQtyMap/' + pk + '/',
                      data: {
                        status: 'cancelled'
                      }
                    }).
                    then(function(response) {
                      var toSend = {
                        value: response.data.pk
                      };
                      $http({
                        method: 'POST',
                        url: '/api/ecommerce/sendStatus/',
                        data: toSend
                      }).
                      then(function(response) {})
                      $rootScope.$broadcast('forceRefetch', {});
                      Flash.create('success', 'selected items cancelled')
                      $uibModalInstance.dismiss();
                    })
                  }
                }

              },
            }).result.then(function() {

            }, function(res) {

              $timeout(function() {
                console.log('coming herer', $scope.data.tableData, $scope.indexofthis);
                $scope.data.tableData[$scope.indexofthis].cancelCount = 0
                $scope.data.tableData[$scope.indexofthis].returnCount = 0
                for (var j = 0; j < $scope.data.tableData[$scope.indexofthis].orderQtyMap.length; j++) {
                  $scope.data.tableData[$scope.indexofthis].orderQtyMap[j].selected = false;
                  if ($scope.data.tableData[$scope.indexofthis].orderQtyMap[j].status == 'cancelled') {
                    $scope.data.tableData[$scope.indexofthis].cancelCount++
                  }
                  if ($scope.data.tableData[$scope.indexofthis].orderQtyMap[j].status == 'returned') {
                    $scope.data.tableData[$scope.indexofthis].returnCount++;
                  }
                }
                console.log($scope.data.tableData[$scope.indexofthis].cancelCount, $scope.data.tableData[$scope.indexofthis].orderQtyMap.length);
                console.log($scope.data.tableData[$scope.indexofthis].returnCount, $scope.data.tableData[$scope.indexofthis].orderQtyMap.length);

                if ($scope.data.tableData[$scope.indexofthis].cancelCount == $scope.data.tableData[$scope.indexofthis].orderQtyMap.length) {
                  $scope.data.tableData[$scope.indexofthis].hideCancelBtn = true
                }
                if ($scope.data.tableData[$scope.indexofthis].returnCount == $scope.data.tableData[$scope.indexofthis].orderQtyMap.length) {
                  $scope.data.tableData[$scope.indexofthis].hideReturnBtn = true
                }
              }, 2000);

            });
          } else {
            Flash.create('warning', 'Please select items to cancel')
          }


        } else if (action == 'return') {

          $scope.itemsToBeReturned = [];

          for (var j = 0; j < $scope.data.tableData[i].orderQtyMap.length; j++) {
            if ($scope.data.tableData[i].orderQtyMap[j].selected == true) {
              if ($scope.data.tableData[i].orderQtyMap[j].status == 'delivered') {
                $scope.itemsToBeReturned.push($scope.data.tableData[i].orderQtyMap[j])
              } else {
                // $scope.data.tableData[i].orderQtyMap[j].selected = false;
                Flash.create('warning', 'selected items cant be returned')
                return
              }
            }
          }

          if ($scope.itemsToBeReturned.length > 0) {
            console.log($scope.itemsToBeReturned);
            $uibModal.open({
              templateUrl: '/static/ngTemplates/app.ecommerce.orders.cancelModalWindow.html',
              size: 'md',
              backdrop: true,
              resolve: {
                items: function() {
                  return $scope.itemsToBeReturned;
                }
              },
              controller: function($scope, items, $state, $http, $timeout, $uibModal, $users, Flash, $uibModalInstance) {
                $scope.state = 'return';
                $scope.items = items;
                $scope.amtToBeRefunded = 0;
                $scope.currency = settings_currencySymbol

                for (var i = 0; i < $scope.items.length; i++) {
                  $scope.amtToBeRefunded = $scope.amtToBeRefunded + $scope.items[i].paidAmount
                }

                $scope.return = function() {
                  for (var i = 0; i < $scope.items.length; i++) {
                    var pk = $scope.items[i].pk
                    $http({
                      method: 'PATCH',
                      url: '/api/ecommerce/orderQtyMap/' + pk + '/',
                      data: {
                        status: 'returned'
                      }
                    }).
                    then(function(response) {
                      console.log(response.data);
                      var toSend = {
                        value: response.data.pk
                      };
                      $http({
                        method: 'POST',
                        url: '/api/ecommerce/sendStatus/',
                        data: toSend
                      }).
                      then(function(response) {})
                      $rootScope.$broadcast('forceRefetch', {});
                      Flash.create('success', 'selected items returned')
                      $uibModalInstance.dismiss();
                    })
                  }

                }

              },
            }).result.then(function() {

            }, function() {

              $timeout(function() {
                $scope.data.tableData[$scope.indexofthis].cancelCount = 0
                $scope.data.tableData[$scope.indexofthis].returnCount = 0
                for (var j = 0; j < $scope.data.tableData[$scope.indexofthis].orderQtyMap.length; j++) {
                  $scope.data.tableData[$scope.indexofthis].orderQtyMap[j].selected = false;
                  if ($scope.data.tableData[$scope.indexofthis].orderQtyMap[j].status == 'cancelled') {
                    $scope.data.tableData[$scope.indexofthis].cancelCount++
                  }
                  if ($scope.data.tableData[$scope.indexofthis].orderQtyMap[j].status == 'returned') {
                    $scope.data.tableData[$scope.indexofthis].returnCount++;
                  }
                }
                if ($scope.data.tableData[$scope.indexofthis].cancelCount == $scope.data.tableData[$scope.indexofthis].orderQtyMap.length) {
                  $scope.data.tableData[$scope.indexofthis].hideCancelBtn = true
                }
                if ($scope.data.tableData[$scope.indexofthis].returnCount == $scope.data.tableData[$scope.indexofthis].orderQtyMap.length) {
                  $scope.data.tableData[$scope.indexofthis].hideReturnBtn = true
                }
              }, 2000);

            });
          } else {
            Flash.create('warning', 'Please select item to return')
          }


        }

      }
    }
  }

});

app.controller('controller.ecommerce.account.settings', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash) {
  $scope.me = $users.get('mySelf');
  document.title = BRAND_TITLE + ' | My Settings'
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping')

  if (settings_isStoreGlobal) {
    $scope.isStoreGlobal = true
  } else {
    $scope.isStoreGlobal = false
  }

  $scope.refresh = function() {
    $scope.form = {
      title: '',
      landMark: '',
      street: '',
      city: '',
      state: '',
      pincode: null,
      country: 'India',
      primary: false,
      mobileNo: ''
    }
    if (settings_isStoreGlobal) {
      $scope.form.country = ''
    }
  }

  $scope.refresh()
  $scope.update = function(idx) {
    $scope.form = $scope.savedAddress[idx]
    if ($scope.savedAddress[idx].pk == $scope.pa) {
      $scope.form.primary = true
    } else {
      $scope.form.primary = false
    }
    // $scope.savedAddress.splice(idx, 1)
  }

  $scope.delete = function(idx) {
    console.log($scope.savedAddress[idx]);
    $http({
      method: 'DELETE',
      url: '/api/ecommerce/address/' + $scope.savedAddress[idx].pk + '/'
    }).
    then(function(response) {
      $scope.savedAddress.splice(idx, 1)
      Flash.create('success', "Address Deleted");
    })
  }

  if (settings_isStoreGlobal) {
    $scope.countrySearch = function(query) {
      return $http.get('/api/ecommerce/searchCountry/?query=' + query).
      then(function(response) {
        $scope.countrList = response.data
        return response.data;
      })
    }

    $scope.stateSearch = function(query) {
      if ($scope.selectedCountryObj != undefined) {
        if ($scope.selectedCountryObj.id != undefined) {
          return $http.get('/api/ecommerce/searchCountry/?query=' + query + '&country=' + $scope.selectedCountryObj.id).
          then(function(response) {
            $scope.stateList = response.data
            return response.data;
          })
        }
      }
    }

    $scope.citySearch = function(query) {
      if ($scope.selectedStateObj != undefined) {
        if ($scope.selectedStateObj.id != undefined) {
          return $http.get('/api/ecommerce/searchCountry/?query=' + query + '&state=' + $scope.selectedStateObj.id).
          then(function(response) {
            return response.data;
          })
        }
      }
    }

    $scope.showAddressForm = {
      state: false,
      city: false
    }

    $scope.showBillingAddressForm = {
      state: false,
      city: false
    }

    $scope.$watch('form.country', function(newValue, oldValue) {
      if (newValue != null && newValue != undefined) {

        if (newValue == '') {
          $scope.form.state = ''
        }

        if ($scope.countrList) {
          for (var i = 0; i < $scope.countrList.length; i++) {
            if ($scope.countrList[i].name == newValue) {
              $scope.selectedCountryObj = $scope.countrList[i]
              break;
            } else {
              $scope.selectedCountryObj = ''
            }
          }
          console.log($scope.selectedCountryObj);
        }
        // if (typeof $scope.selectedCountryObj == 'object') {
        //   $scope.showAddressForm.state = true
        // } else {
        //   $scope.showAddressForm.state = false
        // }
        console.log($scope.selectedCountryObj);
        // if ($scope.selectedCountryObj.length) {
        //   $scope.showAddressForm.state = true
        // }else {
        //   $scope.showAddressForm.state = false
        // }
      }
    });

    $scope.$watch('form.state', function(newValue, oldValue) {
      if (newValue != null && newValue != undefined) {

        if (newValue == '') {
          $scope.form.city = ''
        }

        if ($scope.stateList) {
          for (var i = 0; i < $scope.stateList.length; i++) {
            if ($scope.stateList[i].name == newValue) {
              $scope.selectedStateObj = $scope.stateList[i]
              break;
            } else {
              $scope.selectedStateObj = ''
            }
          }
          console.log($scope.selectedStateObj);
        }
        // if (typeof $scope.selectedStateObj == 'object') {
        //   $scope.showAddressForm.city = true
        // } else {
        //   $scope.showAddressForm.city = false
        // }
      }
    });
  } else {
    $scope.showAddressForm = {
      state: true,
      city: true
    }

    $scope.showBillingAddressForm = {
      state: true,
      city: true
    }
    $scope.showMessage = false
    $scope.$watch('form.pincode', function(newValue, oldValue) {
      if (newValue != null) {
        if (newValue.length == 6) {
          $http({
            method: 'GET',
            url: '/api/ecommerce/genericPincode/?pincode__iexact=' + newValue
          }).
          then(function(response) {
            if (response.data.length > 0) {
              $scope.showMessage = false
              $scope.form.city = response.data[0].city
              $scope.form.state = response.data[0].state
            } else {
              if (settings_isServiceArea) {
                $scope.showMessage = true
              }
            }
            if (settings_isServiceArea) {
              $http({
                method: 'GET',
                url: '/api/ecommerce/addPincode/?pincodes__iexact=' + newValue
              }).
              then(function(response) {
                if (response.data.length == 0) {
                  $scope.showMessage = true
                }
              })
            } else {
              $scope.showMessage = false
            }

          })
        } else if (newValue.length < 6) {
          $scope.showMessage = false
          // $scope.form.city = ''
          // $scope.form.state = ''
        }
      }
    })
  }








  $scope.fetchaddress = function() {
    $http({
      method: 'GET',
      url: '/api/ecommerce/address/?user=' + $scope.me.pk
    }).
    then(function(response) {
      $scope.savedAddress = response.data
      $scope.pa = 0
      for (var i = 0; i < $scope.savedAddress.length; i++) {
        if ($scope.me.profile.primaryAddress == $scope.savedAddress[i].pk) {
          $scope.pa = $scope.savedAddress[i].pk
        }
      }
    })
  }
  $scope.fetchaddress()


  $scope.saveAddress = function() {
    console.log($scope.form);

    if ($scope.form.title.length == 0 || $scope.form.country.length == 0 || $scope.form.city.length == 0 || $scope.form.state.length == 0 || $scope.form.pincode.length == 0 || $scope.form.mobileNo.length == 0) {
      Flash.create('warning', 'Fill the required Data')
      return
    }

    dataToSend = $scope.form;
    // if ($scope.form.pincode == null) {
    //   delete dataToSend.pincode
    // }
    var method = 'POST'
    var url = '/api/ecommerce/address/'
    if ($scope.form.pk != undefined) {
      method = 'PATCH'
      url = url + $scope.form.pk + '/'
    }
    $http({
      method: method,
      url: url,
      data: dataToSend
    }).
    then(function(response) {
      Flash.create('success', 'Added');
      $scope.refresh()
      $scope.fetchaddress()
    }, function(response) {
      Flash.create('danger', response.status + ' : ' + response.statusText);
    })
  }
});

app.controller('controller.ecommerce.account.support', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash) {

  document.title = BRAND_TITLE + ' | HelpCenter -  FAQ About Contextual Advertising , Online Advertising , Online Ads'
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping')

  $http({
    method: 'GET',
    url: '/api/ecommerce/frequentlyQuestions/'
  }).
  then(function(response) {
    $scope.fAQ = response.data
  })

  $scope.message = {
    invoiceNo: '',
    subject: '',
    body: ''
  };
  $scope.sendMessage = function() {
    if ($scope.me == undefined || $scope.me == '' || $scope.message.invoiceNo == '' || $scope.message.body == '') {
      Flash.create("warning", "Please add all details")
    } else {
      dataToSend = {
        email: $scope.message.email,
        mobile: $scope.me.profile.mobile,
        invoiceNo: $scope.message.invoiceNo,
        subject: $scope.message.subject,
        message: $scope.message.body
      }
    }
    $http({
      method: 'POST',
      url: '/api/ecommerce/supportFeed/',
      data: dataToSend
    }).
    then(function(response) {
      $scope.message = {
        invoiceNo: '',
        subject: '',
        body: ''
      };
      Flash.create('success', response.status + ' : ' + response.statusText);
    }, function(response) {
      Flash.create('danger', response.status + ' : ' + response.statusText);
    })
  }


});



app.controller('controller.ecommerce.account', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash) {

});


app.controller('controller.ecommerce.checkout', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $filter) {
  // $rootScope.totalLimit = false
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=orderLimit').
  // then(function(response) {
  //   if (response.data[0] != null) {
  //     console.log(response.data[0].value, 'aaaaaaaaaaaaaaaaaa');
  //     $rootScope.limitValue = parseInt(response.data[0].value)
  //     console.log(response.data[0].value, 'aaaaaaaaaaaaaaaaaa');
  //     // if (response.data[0].value > 0) {
  //     //   if ($scope.totalAfterPromo > $rootScope.limitValue || $scope.totalAfterDiscount > $rootScope.limitValue) {
  //     //     $rootScope.totalLimit = true
  //     //   } else {
  //     //     $rootScope.totalLimit = false
  //     //   }
  //     // }
  //   }
  // })

  $rootScope.limitValue = settings_orderLimit

  // if($state.params){
  //   $scope.action ='retry'
  // }



  $scope.currency = settings_currencySymbol;
  $scope.isCod = false
  $scope.isCod = settings_isCOD;

  // if ($scope.dataToSend.modeOfPayment == 'COD') {
  //   if ($scope.totalLimit = true) {
  //     if ($scope.totalAfterPromo > 5000 || $scope.totalAfterDiscount > 5000) {
  //       $scope.warningMessage = true
  //     }
  //     else {
  //       $scope.warningMessage = false
  //       $scope.dataToSend.paidAmount = 0
  //     }
  //   } else {
  //     $scope.warningMessage = false
  //     $scope.dataToSend.paidAmount = 0
  //   }
  // } else {
  //     $scope.warningMessage = false
  //   $scope.dataToSend.paidAmount = 0
  // }
  $scope.me = $users.get('mySelf');
  $scope.data = {
    quantity: 1,
    shipping: 'express',
    stage: '',
    promoCode: '',
    modeOfPayment: 'Card',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      mobileNo: $scope.me.profile.mobile,
      landMark: ''
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      mobileNo: $scope.me.profile.mobile,
      billingLandMark: ''
    }
  };
  if (settings_isStoreGlobal) {
    $scope.data.address.country = ''
    $scope.data.billingAddress.country = ''
  }



  var url = new URL(window.location.href)
  var action = url.searchParams.get("action")
  if (action == 'retry') {
    $scope.data.stage = 'payment';
  } else if (action == 'success') {
    $http({
      method: 'GET',
      url: '/api/ecommerce/order/' + url.searchParams.get('orderid') + '/'
    }).
    then(function(response) {
      $scope.data.stage = 'confirmation';
      $scope.order = {
        odnumber: response.data.pk,
        dt: new Date(),
        paymentMode: 'Online'
      }
    })
  } else {
    $scope.data.stage = 'review'
  }



  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    // console.log(decodedCookie,'hhhhhhhhhhhhhhhhhhhhhh');
    var ca = decodedCookie.split(';');
    // console.log(ca);
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    // console.log('set cookie');
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


  $scope.getAddr = getCookie('address')



  $scope.cartProducts = [];
  $scope.itemProduct = [];

  document.title = BRAND_TITLE + ' | Review Order > Select Shipping Address > Place Order'
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping')

  if (settings_isStoreGlobal) {
    $scope.isStoreGlobal = true
  } else {
    $scope.isStoreGlobal = false
  }

  $scope.fetchaddress = function() {
    $http({
      method: 'GET',
      url: '/api/ecommerce/address/?user=' + $scope.me.pk
    }).
    then(function(response) {
      $scope.savedAddress = response.data
      console.log($scope.savedAddress);
      $scope.pa = 0
      console.log($scope.data.address);
      for (var i = 0; i < $scope.savedAddress.length; i++) {
        if ($scope.me.profile.primaryAddress == $scope.savedAddress[i].pk) {
          $scope.pa = $scope.savedAddress[i].pk
          $scope.data.address = $scope.savedAddress[i]
          if ($scope.getAddr != undefined) {
            if ($scope.getAddr == $scope.savedAddress[i].pk) {
              // $scope.saved = true
              $scope.idx = i
            }
          }
          if ($scope.data.address.mobileNo == null || $scope.data.address.mobileNo.length == 0) {
            $scope.data.address.mobileNo = $scope.me.profile.mobile
          }
          // $scope.data.address.landMark = ''
        }
      }
    })
  }
  $scope.fetchaddress()
  $scope.saved = false



  $scope.ChangeAdd = function(idx, value) {
    console.log(value);
    if (value == "use") {
      $scope.addressview = false
      $scope.idx = null
      $scope.show(idx)
      // $scope.saved = true
      // Flash.create('success', 'Address Added');

    } else if (value == "edit") {
      $scope.idx = null
      $scope.idxVal = idx
      $scope.addressview = true
    }
    // mob = $scope.data.address.mobileNo
    $scope.data.address = $scope.savedAddress[idx]
    console.log($scope.data.address);
    if ($scope.data.address.mobileNo == null || $scope.data.address.mobileNo.length == 0) {
      $scope.data.address.mobileNo = $scope.me.profile.mobile
    }
    // $scope.data.address.mobileNo = mob
    // $scope.data.address.landMark = ''
  }


  $scope.countrySearch = function(query) {
    return $http.get('/api/ecommerce/searchCountry/?query=' + query).
    then(function(response) {
      $scope.countrList = response.data
      return response.data;
    })
  }

  $scope.stateSearch = function(query) {
    if ($scope.selectedCountryObj != undefined) {

      if ($scope.selectedCountryObj.id) {
        return $http.get('/api/ecommerce/searchCountry/?query=' + query + '&country=' + $scope.selectedCountryObj.id).
        then(function(response) {
          $scope.stateList = response.data
          return response.data;
        })
      }
    }

  }

  $scope.citySearch = function(query) {
    if ($scope.selectedStateObj != undefined) {
      if ($scope.selectedStateObj.id) {
        return $http.get('/api/ecommerce/searchCountry/?query=' + query + '&state=' + $scope.selectedStateObj.id).
        then(function(response) {
          return response.data;
        })
      }
    }
  }


  if (settings_isStoreGlobal) {
    $scope.showAddressForm = {
      state: false,
      city: false
    }

    $scope.showBillingAddressForm = {
      state: false,
      city: false
    }

    $scope.$watch('data.address.country', function(newValue, oldValue) {
      if (newValue != null && newValue != undefined) {

        if (newValue == '') {
          $scope.data.address.state = ''
        }

        if ($scope.countrList) {
          for (var i = 0; i < $scope.countrList.length; i++) {
            if ($scope.countrList[i].name == newValue) {
              $scope.selectedCountryObj = $scope.countrList[i]
              break;
            } else {
              $scope.selectedCountryObj = ''
            }
          }
          console.log($scope.selectedCountryObj);
        }
        if (typeof $scope.selectedCountryObj == 'object') {
          $scope.showAddressForm.state = true
        } else {
          $scope.showAddressForm.state = false
        }
      }
    });

    $scope.$watch('data.address.state', function(newValue, oldValue) {
      if (newValue != null && newValue != undefined) {

        if (newValue == '') {
          $scope.data.address.city = ''
        }

        if ($scope.stateList) {
          for (var i = 0; i < $scope.stateList.length; i++) {
            if ($scope.stateList[i].name == newValue) {
              $scope.selectedStateObj = $scope.stateList[i]
              break;
            } else {
              $scope.selectedStateObj = ''
            }
          }
          console.log($scope.selectedStateObj);
        }
        if (typeof $scope.selectedStateObj == 'object') {
          $scope.showAddressForm.city = true
        } else {
          $scope.showAddressForm.city = false
        }
      }
    });


    $scope.$watch('data.billingAddress.country', function(newValue, oldValue) {
      if (newValue != null && newValue != undefined) {

        if (newValue == '') {
          $scope.data.billingAddress.state = ''
        }

        if (typeof newValue == 'object') {
          $scope.showBillingAddressForm.state = true
        } else {
          $scope.showBillingAddressForm.state = false
        }
      }
    });

    $scope.$watch('data.billingAddress.state', function(newValue, oldValue) {
      if (newValue != null && newValue != undefined) {

        if (newValue == '') {
          $scope.data.billingAddress.city = ''
        }

        if (typeof newValue == 'object') {
          $scope.showBillingAddressForm.city = true
        } else {
          $scope.showBillingAddressForm.city = false
        }
      }
    });
  } else {
    $scope.showAddressForm = {
      state: true,
      city: true
    }

    $scope.showBillingAddressForm = {
      state: true,
      city: true
    }

    $scope.showMessage = false

    $scope.$watch('data.address.pincode', function(newValue, oldValue) {
      if (newValue != null) {
        if (newValue.length == 6) {
          $http({
            method: 'GET',
            url: '/api/ecommerce/genericPincode/?pincode__iexact=' + newValue
          }).
          then(function(response) {
            console.log(response.data);
            if (response.data.length > 0) {
              $scope.showMessage = false
              $scope.data.address.city = response.data[0].city
              $scope.data.address.state = response.data[0].state
            } else {
              if (settings_isServiceArea) {
                $scope.showMessage = true
              }
            }
            if (settings_isServiceArea) {
              $http({
                method: 'GET',
                url: '/api/ecommerce/addPincode/?pincodes__iexact=' + newValue
              }).
              then(function(response) {
                if (response.data.length == 0) {
                  $scope.showMessage = true
                }
              })
            } else {
              $scope.showMessage = false
            }
          })
        } else if (newValue.length < 6) {
          $scope.showMessage = false
          // $scope.data.address.city = ''
          // $scope.data.address.state = ''
        }
      }
    })

    $scope.$watch('data.billingAddress.pincode', function(newValue, oldValue) {
      if (newValue != null) {
        if (newValue.length == 6) {
          $http({
            method: 'GET',
            url: '/api/ecommerce/genericPincode/?pincode__iexact=' + newValue
          }).
          then(function(response) {
            if (response.data.length > 0) {
              $scope.data.billingAddress.city = response.data[0].city
              $scope.data.billingAddress.state = response.data[0].state
            }
          })
        } else if (newValue.length < 6) {
          $scope.data.billingAddress.city = ''
          $scope.data.billingAddress.state = ''
        }
      }
    })
  }




  $scope.change = function() {
    $scope.saved = false
    $scope.data.address = {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      mobileNo: $scope.me.profile.mobile,
      landMark: ''
    }
    if (settings_isStoreGlobal) {
      $scope.data.address.country = ''
    }
  }
  $scope.cancel = function() {
    $scope.newAdr = false
    $scope.addressview = false
  }

  $scope.resetAdd = function() {
    $scope.newAdr = true
    $scope.idx = null
    $scope.addressview = false
    $scope.data.address = {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      mobileNo: $scope.me.profile.mobile,
      landMark: ''
    }
    console.log($scope.data.address.pk);
    if (settings_isStoreGlobal) {
      $scope.data.address.country = ''
    }
  }
  $scope.show = function(idx) {
    $scope.addressview = false
    $scope.idx = idx
    $scope.newAdr = false
  }


  $scope.saveAdd = function() {
    console.log('here', $scope.data.address);
    if ($scope.data.address.pincode.length == 0 || $scope.data.address.city.length == 0 || $scope.data.address.state.length == 0 || $scope.data.address.country.length == 0 || $scope.data.address.mobileNo == null || $scope.data.address.mobileNo.length == 0) {
      Flash.create('danger', 'Please Fill Address Details');
      return;
    }
    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.ecommerce.checkout.addressmodel.html',
      size: 'md',
      backdrop: true,
      resolve: {
        add: function() {
          return $scope.data.address;
        }
      },
      controller: function($scope, $state, $http, $timeout, $uibModal, $users, Flash, $uibModalInstance, add) {
        $scope.adrForm = add;
        console.log($scope.adrForm);
        if ($scope.adrForm.title == undefined) {
          $scope.adrForm.title = ''
        }
        $scope.adrForm.primary = false
        $scope.saveAdrForm = function() {
          if ($scope.adrForm.title.length == 0) {
            Flash.create('danger', 'Please Mention Some Title');
            return;
          }
          if ($scope.adrForm.pincode.length == 0) {
            delete $scope.adrForm.pincode
          }
          var method = 'POST'
          var url = '/api/ecommerce/address/'
          if ($scope.adrForm.pk) {
            method = 'PATCH'
            url += $scope.adrForm.pk + '/'
          }
          console.log(method, url);
          $http({
            method: method,
            url: url,
            data: $scope.adrForm
          }).
          then(function(response) {
            Flash.create('success', 'Added');
            $scope.adrForm = response.data
            $uibModalInstance.dismiss($scope.adrForm);
          }, function(response) {
            Flash.create('danger', response.status + ' : ' + response.statusText);
          })

        }
      },
    }).result.then(function() {

    }, function(f) {
      if (typeof(f) != 'string') {
        if ($scope.data.address.pk) {

        } else {
          $scope.data.address.pk = f.pk
          $scope.savedAddress.push($scope.data.address)
        }

      }

    });
  }


  $scope.calcTotal = function() {
    $scope.total = 0;
    $scope.totalAfterDiscount = 0;
    var price = 0;
    var discountedPrice = 0;
    if ($state.params.pk == 'cart') {
      for (var i = 0; i < $scope.cartItems.length; i++) {
        if ($scope.cartItems[i].prodSku == $scope.cartItems[i].product.product.serialNo) {
          price = $scope.cartItems[i].product.product.price
          discountedPrice = $scope.cartItems[i].product.product.discountedPrice
        } else {
          price = $scope.cartItems[i].prodVarPrice
          discountedPrice = $scope.cartItems[i].prod_var.discountedPrice
        }
        $scope.gstTotal = ($scope.cartItems[i].gst * discountedPrice) / 100 * $scope.cartItems[i].qty
        $scope.total = $scope.total + (price * $scope.cartItems[i].qty) + ($scope.cartItems[i].gst * price) / 100 * $scope.cartItems[i].qty
        $scope.totalAfterDiscount = $scope.totalAfterDiscount + (discountedPrice * $scope.cartItems[i].qty) + ($scope.cartItems[i].gst * discountedPrice) / 100 * $scope.cartItems[i].qty
      }
    } else {
      $scope.total = $scope.item.product.price * $scope.item.qty
      $scope.totalAfterDiscount = $scope.item.product.discountedPrice * $scope.item.qty
    }
  }

  $scope.stock = []

  if ($state.params.pk == 'cart') {
    $http({
      method: 'GET',
      url: '  /api/ecommerce/cart/?user=' + $scope.me.pk + '&typ=cart'
    }).
    then(function(response) {
      $scope.cartItems = response.data;
      for (var i = 0; i < $scope.cartItems.length; i++) {
        var prod_variants = $scope.cartItems[i].product.product_variants
        $scope.product_var = undefined
        for (var j = 0; j < prod_variants.length; j++) {
          if (prod_variants[j].sku == $scope.cartItems[i].prodSku) {
            $scope.cartItems[i].prod_var = prod_variants[j]
          }
        }
        if ($rootScope.pin != undefined) {
          $scope.store = $rootScope.pin.pk
        }

        if (response.data[i].prod_var !== undefined) {
          console.log($scope.cartItems[i].prod_var.id, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
          $scope.product_var = $scope.cartItems[i].prod_var.id
        }

        if (INVENTORY_ENABLED == 'False') {
          $scope.cartItems[i].stock = 1000;
          $scope.showReview = true;
        } else {
          $http({
            method: 'GET',
            url: '/api/ecommerce/getinStock/?product_id=' + $scope.cartItems[i].product.product.pk + '&product_var=' + $scope.product_var + '&store=' + $scope.store,
          }).
          then(function(response) {
            $scope.stock.push(response.data)
          })
        }


      }

      $scope.calcTotal();
    })
  } else {
    $http({
      method: 'GET',
      url: '/api/ecommerce/listing/' + $state.params.pk + '/'
    }).
    then(function(response) {
      $scope.item = response.data;
      $scope.item.qty = 1;
      //  $scope.itemProduct.push({pk:$scope.item.pk, qty : $scope.item.qty })
      $scope.calcTotal();
    })
  }
  $scope.getinStock = function() {
    for (var i = 0; i < $scope.cartItems.length; i++) {
      for (var j = 0; j < $scope.stock.length; j++) {
        if ($rootScope.pin.pk == undefined) {
          $scope.code = "undefined"
        } else {
          $scope.code = $rootScope.pin.pk
        }
        if ($rootScope.inCart[i].prod_var == undefined) {
          $scope.prod_var = 'undefined'
        } else {
          $scope.prod_var = $scope.cartItems[i].prod_var.id
        }
        if (INVENTORY_ENABLED == 'False') {
          $scope.cartItems[i].stock = 1000;
        } else {
          if ($scope.stock[j].store == $scope.code) {
            if ($scope.stock[j].product == $scope.cartItems[i].product.product.pk) {
              if ($scope.stock[j].product_var == $scope.prod_var) {
                $scope.cartItems[i].stock = $scope.stock[j].stock
              }
            }
          }
        }
      }
    }
  }



  if (INVENTORY_ENABLED == 'True') {
    $timeout(function() {
      $scope.showReview = true;
      $scope.getinStock()
    }, 4000);
  }

  $scope.showReview = false;



  $scope.changeQty = function() {
    $scope.calcTotal();
  }
  $scope.promoDiscount = 0
  $scope.applyPromo = function() {
    if ($scope.msg == '') {
      return
    }
    $http({
      method: 'GET',
      url: '  /api/ecommerce/promoCheck/?name=' + $scope.data.promoCode
    }).
    then(function(response) {
      $scope.msg = response.data.msg
      if (response.data.msg == 'Success') {
        $scope.promoDiscount = response.data.val;
        $scope.totalAfterPromo = $scope.totalAfterDiscount - ($scope.promoDiscount / 100) * $scope.totalAfterDiscount
      } else {
        $scope.data.promoCode = ''
      }
    })
  }






  $scope.dataToSend = {
    sameAsShipping: true
  }

  $scope.$watch('dataToSend.sameAsShipping', function(newValue, oldValue) {
    console.log(newValue);
    if (newValue == false) {
      $scope.showFields = true;

    } else {
      $scope.showFields = false;
      $scope.dataToSend.billingAddress = ''
    }
  })
  $scope.totalLimit = false
  $scope.next = function() {

    console.log($scope.totalAfterPromo, $scope.totalAfterDiscount, '**************************8');
    if ($rootScope.limitValue) {
      if ($scope.totalAfterPromo > $rootScope.limitValue || $scope.totalAfterDiscount > $rootScope.limitValue) {
        $scope.totalLimit = true
      } else {
        $scope.totalLimit = false
      }
    }
    window.scrollTo(0, 0);
    if ($scope.data.stage == 'review') {
      $scope.dataToSend.promoCode = $scope.data.promoCode;
      $scope.dataToSend.promoCodeDiscount = $scope.promoDiscount;
      console.log($scope.cartItems, $scope.cartProducts, '$$$$$$$$$$$$$$$$$$$');
      if ($scope.cartItems != undefined) {
        for (var i = 0; i < $scope.cartItems.length; i++) {
          for (var j = 0; j < $scope.cartProducts.length; j++) {
            if ($scope.cartProducts[j].prodSku == $scope.cartItems[i].prodSku) {

              $scope.cartProducts.splice(j, 1)
            }
          }
          if ($scope.cartItems[i].stock < 0 || !$scope.cartItems[i].stock) {
            Flash.create('danger', 'Please Select Valid Products')
            return
          } else if ($scope.cartItems[i].qty <= 0 || $scope.cartItems[i].qty == undefined) {
            Flash.create('danger', 'Please Select Valid quantity')
            return
          } else {
            // var prodSku
            // if ($scope.cartItems[i].prodSku==$scope.cartItems[i].product.product.serialNo) {
            //   prodSku = $scope.cartItems[i].product.product.serialNo
            // }else {
            //     prodSku = $scope.cartItems[i].prodSku
            // }
            var weight = $scope.cartItems[i].product.product.grossWeight
            if (weight == undefined || weight == null) {
              weight = 0
            }
            console.log($scope.cartItems[i].product.product.grossWeight, 'hereee');
            $scope.cartProducts.push({
              pk: $scope.cartItems[i].product.pk,
              qty: $scope.cartItems[i].qty,
              prodSku: $scope.cartItems[i].prodSku,
              desc: $scope.cartItems[i].desc,
              grossWeight: weight
            })
          }
        }

        // }
        $scope.dataToSend.products = $scope.cartProducts
      } else {
        console.log('direct buyyyyyyyyyyyyyyyyyyyyy');
        for (var i = 0; i < $scope.itemProduct.length; i++) {
          if ($scope.itemProduct[i].pk == $scope.item.pk) {
            console.log('updatinggggggggggggggggg');
            $scope.itemProduct.splice(i, 1)
          }
        }
        $scope.itemProduct.push({
          pk: $scope.item.pk,
          qty: $scope.item.qty,
          prodSku: $scope.item.product.serialNo
        })
        $scope.dataToSend.products = $scope.itemProduct
      }
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa', $scope.dataToSend.products);
      if ($scope.dataToSend.products.length > 0) {
        if ($scope.dataToSend.products[0].pk == undefined) {
          Flash.create('danger', 'Please Select Valid Product')
          return
        }
      } else {
        Flash.create('danger', 'Please Select The Product')
        return
      }
      $scope.data.stage = 'shippingDetails';
    } else if ($scope.data.stage == 'shippingDetails') {
      console.log($scope.isStoreGlobal);
      if (!$scope.isStoreGlobal) {
        if ($scope.data.address.street == '' || $scope.data.address.landMark == '') {
          Flash.create('warning', 'Please Fill All Details')
          return
        }
      }

      if ($scope.data.address.mobileNo == '' || $scope.data.address.mobileNo == null || $scope.data.address.city == '' || $scope.data.address.pincode == '' || $scope.data.address.country == '' || $scope.data.address.state == '') {
        Flash.create('warning', 'Please Fill All Details')
        return
      } else {
        $scope.dataToSend.mobile = $scope.me.profile.mobile
        $scope.dataToSend.address = $scope.data.address
        if ($scope.data.billingAddress.state == '' && $scope.dataToSend.sameAsShipping == false) {
          Flash.create('warning', 'Please Add Billing Address')
          return
        } else if ($scope.dataToSend.sameAsShipping == true) {
          $scope.dataToSend.billingAddress = $scope.data.address
        } else {
          $scope.dataToSend.billingAddress = $scope.data.billingAddress
        }
      }
      $scope.data.stage = 'payment';
      $scope.getShippingCharges = false
      // grossWeight
      $scope.totalWeight = 0;
      console.log($scope.cartProducts);
      for (var i = 0; i < $scope.cartProducts.length; i++) {
        $scope.totalWeight += parseFloat($scope.cartProducts[i].grossWeight) * $scope.cartProducts[i].qty
      }
      $scope.totalWeight = 2.204 * $scope.totalWeight

      console.log($scope.totalWeight, 'hello');
      if (settings_isShipmentPrice) {
        $http({
          method: 'GET',
          url: '/api/ecommerce/searchCountry/?getCountryCode=' + $scope.data.address.country
        }).then(function(response) {
          console.log(response.data);
          if (response.data) {
            $scope.country = response.data[0]
          } else {
            $scope.country = 'US'
          }
          $http({
            method: 'GET',
            url: '/api/ecommerce/shipmentCharge/?country=' + $scope.country + '&pincode=' + $scope.data.address.pincode + '&weight=' + $scope.totalWeight
          }).then(function(response) {
            $scope.shippingCharges = response.data
            $scope.getShippingCharges = true
          }).catch(function(err) {
            console.log(err);
            $scope.shippingCharges = 0
            $scope.errorInshipping = true
            $scope.getShippingCharges = true
          })
        })
      } else {
        $scope.getShippingCharges = true
        $scope.shippingCharges = 0
      }

    }
  }
  $scope.idx = 0
  $scope.prev = function() {
    if ($scope.data.stage == 'shippingDetails') {
      $scope.data.stage = 'review';
    } else if ($scope.data.stage == 'payment') {
      $scope.data.stage = 'shippingDetails';
    }
  }

  $scope.username = $scope.me.username

  $scope.pay = function() {
    $scope.dataToSend.modeOfPayment = $scope.data.modeOfPayment
    $scope.dataToSend.modeOfShopping = 'online'
    $scope.dataToSend.paidAmount = 0
    $scope.dataToSend.approved = false
    $scope.data.stage = 'processing'
    if ($scope.shippingCharges > 0) {
      $scope.dataToSend.shippingCharges = $scope.shippingCharges
    }
    // if ($rootScope.multiStore) {
    //   console.log('multiiiiiiiiiiiiii');
    //   $scope.dataToSend.storepk = $rootScope.storepk
    // }
    console.log($scope.dataToSend);
    $http({
      method: 'POST',
      url: '  /api/ecommerce/createOrder/',
      data: $scope.dataToSend
    }).
    then(function(response) {
      window.location = '/makeOnlinePayment/?orderid=' + response.data.odnumber;
    })
  }

  $scope.order = function() {
    console.log("aaaaaaaaaaaaaaaaaaaa");
    $scope.dataToSend.modeOfPayment = $scope.data.modeOfPayment
    $scope.dataToSend.modeOfShopping = 'online'
    if ($scope.dataToSend.modeOfPayment == 'COD') {
      $scope.dataToSend.paidAmount = 0
    } else {
      $scope.dataToSend.paidAmount = 0
    }

    if ($scope.shippingCharges > 0) {
      $scope.dataToSend.shippingCharges = $scope.shippingCharges
    }

    $scope.data.stage = 'processing';
    if ($rootScope.multiStore) {
      console.log('multiiiiiiiiiiiiii');
      $scope.dataToSend.storepk = $rootScope.storepk
    }
    console.log($scope.dataToSend);




    $http({
      method: 'POST',
      url: '  /api/ecommerce/createOrder/',
      data: $scope.dataToSend
    }).
    then(function(response) {
      $scope.order = response.data
      $scope.data.stage = 'confirmation';
      $rootScope.inCart = [];
      $rootScope.inFavourite = [];
      $scope.item = [];
      console.log('in cart', $rootScope.inCart);
    })

  }


  $scope.addWishList = function(i, value) {
    $http({
      method: 'PATCH',
      url: '/api/ecommerce/cart/' + value + '/',
      data: {
        typ: 'favourite',
        qty: null
      }
    }).
    then(function(response) {
      $scope.cartItems.splice(i, 1)
      $rootScope.inCart.splice(i, 1)
      $scope.calcTotal()
    })

  }



  $scope.$watch('data.address', function(newValue, oldValue) {
    $scope.address = newValue.pk
    setCookie("address", JSON.stringify($scope.address), 365);

  })


})


app.controller('ecommerce.main', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, $interval, Flash) {


  $rootScope.device;

  function smDevice(x) {
    if (x.matches) {
      $rootScope.device = 'small'
    }
  }

  function lgDevice(x) {
    if (x.matches) {
      $rootScope.device = 'large'
    }
  }

  var sm = window.matchMedia("(max-width:767px)")
  smDevice(sm)
  sm.addListener(smDevice)

  var lg = window.matchMedia("(min-width:767px)")
  lgDevice(lg)
  lg.addListener(lgDevice)


  $scope.$watch('slide.active', function(newValue, oldValue) {
    if (newValue == undefined) {
      return;
    }

    $(".owl-carousel").trigger("to.owl.carousel", [newValue, 1])





  })





  var owlAPi;

  $scope.properties = {
    // autoHeight:true,
    // animateIn: 'fadeIn',
    lazyLoad: true,
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: false
  };



  $scope.MODE = MODE;
  console.log('logooooooooooooooooooooo', ICON_LOGO, BRAND_TITLE);
  $rootScope.ICON_LOGO = ICON_LOGO
  $rootScope.BRAND_TITLE = BRAND_TITLE
  $scope.me = $users.get('mySelf')
  $rootScope.companyPhone = ''
  $rootScope.companyEmail = ''
  $rootScope.currency = ''
  $scope.showCartImage = false;
  $http.get('/api/ERP/appSettings/?app=25&name__iexact=phone').
  then(function(response) {
    $rootScope.companyPhone = response.data[0].value
  })
  $http.get('/api/ERP/appSettings/?app=25&name__iexact=email').
  then(function(response) {
    $rootScope.companyEmail = response.data[0].value
  })

  $scope.currency = settings_currencySymbol;
  $scope.showCartImage = false
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=isCartImage').
  // then(function(response) {
  //   console.log('ratingggggggggggggggggggg', response.data);
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.showCartImage = true
  //     }
  //   }
  // })

  $scope.showCartImage = settings_isCartImage
  $scope.isCartView = false
  $scope.isCartView = settings_isCart
  $scope.maxCategories = false
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=maxCategories').
  // then(function(response) {
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.maxCategories = true
  //     }
  //   }
  // })

  $scope.maxCategories = settings_maxCategories



  $rootScope.addToCart = []
  $scope.addTCart = getCookie('addToCart')
  if ($scope.addTCart != '') {
    $rootScope.addToCart = JSON.parse($scope.addTCart)
  }

  $scope.mainPage = function() {
    window.location = '/login';
  }



  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  console.log(getCookie('userPincode'));

  console.log('firstttttttttttttttttttttttttttttttttttttttttttttt');
  $rootScope.multiStore = false
  $rootScope.pin = 0
  // $rootScope.storepk = 0
  $scope.openPinPopup = function() {
    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.ecommerce.pincodeEnquiry.form.html',
      size: 'md',
      backdrop: false,
      // resolve: {
      //   product: function() {
      //
      //   }
      // },
      controller: 'controller.ecommerce.pincodeEnquiry.modal',
    }).result.then(function() {

    }, function() {

    });
  }
  $http.get('/api/ERP/appSettings/?app=25&name__iexact=multipleStore').
  then(function(response) {
    console.log('ratingggggggggggggggggggg', response.data);
    if (response.data[0] != null) {
      if (response.data[0].flag) {
        $rootScope.multiStore = true
        var pincode = getCookie('userPincode')
        console.log('pinnnnnnnnnnnnnnnn', pincode);
        $rootScope.pin = pincode
        if (pincode == "") {
          $scope.openPinPopup()
        } else {
          $http.get('/api/POS/store/?pincode=' + pincode).
          then(function(response) {
            console.log(response.data);
            if (response.data.length > 0) {
              $rootScope.pin = response.data[0].pincode
              $rootScope.storepk = response.data[0].pk
              $rootScope.$broadcast('filterForStore', {
                pin: response.data[0].pincode
              });
              $rootScope.$broadcast('filterForCategoryStore', {
                pin: response.data[0].pincode
              });
            }
          })
        }
      }
    }
  })
  $scope.onBtnEnter = false
  $scope.onDropdownEnter = false
  $scope.onChildEnter = false
  $scope.SortByCategory = false
  $scope.topLevelMenu = false
  $scope.selectedOne = function(data) {
    // console.log('dataaaaaaaaaaaaaaaa',data);
    $scope.childData = data
  }
  $scope.resetAll = function() {
    // console.log('resettinggggggggg');
    $scope.childData = {}
  }


  $scope.bannerImage = false


  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=bannerImage').
  // then(function(response) {
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.bannerImage = true
  //     }
  //     if ($scope.bannerImage) {
  //       $scope.paddingTop = '9.5vh';
  //     }else {
  //       $scope.paddingTop = '0px;';
  //     }
  //   }
  // });

  $scope.bannerImage = settings_bannerImage
  if ($scope.bannerImage) {
    $scope.paddingTop = '9.5vh';
  } else {
    $scope.paddingTop = '0px;';
  }


  // $scope.closedropDowns = function(event){
  //   console.log(event);
  //   event.x = 0
  //   event.offsetX = 0
  //   // $scope.onBtnEnter = false
  //   // $scope.onDropdownEnter = false
  //   // $scope.onChildEnter = false
  // }

  $scope.me = $users.get('mySelf')
  $rootScope.inCart = [];
  $rootScope.inFavourite = [];
  $scope.data = {
    location: null
  }
  $scope.params = {
    location: null
  } // to be used to store different parameter by the users on which the search result will be filtered out

  $scope.loginPage = function() {
    window.location = '/login';
  }
  $scope.logoutPage = function() {
    window.location = '/logout';
  }

  $scope.goToAdmin = function() {
    window.location = '/ERP/';
  }

  $scope.registerPage = function() {
    window.location = '/register';
  }

  // $http.get('/api/ERP/appSettingsAdminMode/?name=SortByCategory').
  // then(function(response) {
  //   console.log('SortByCategory',response.data);
  //   if (response.data.length>0) {
  //     $scope.SortByCategory = response.data[0].flag
  //   }
  // })
  $scope.SortByCategory = settings_SortByCategory

  // $http.get('/api/ERP/appSettingsAdminMode/?name=topLevelMenu').
  // then(function(response) {
  //   console.log('topLevelMenu',response.data);
  //   if (response.data.length>0) {
  //     $scope.topLevelMenu = response.data[0].flag
  //   }
  // })

  $scope.topLevelMenu = settings_topLevelMenu

  $http.get('/api/ecommerce/pages/?topLevelMenu=1').
  then(function(response) {
    $scope.toplevelPages = response.data;
  })

  $scope.bottomMenuPagesCopy = []


  $scope.isFeedback = settings_isFeedback;
  $scope.isContactUs = settings_isContactUs;
  $scope.isFaq = settings_isFaq;

  console.log(settings_isFeedback, 'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')
  console.log(settings_isContactUs)
  console.log(settings_isFaq)



  $http.get('/api/ecommerce/pages/?bottomMenu=1').
  then(function(response) {
    $scope.bottomMenuPages = response.data;

    for (var i = 0; i < $scope.bottomMenuPages.length; i++) {
      if ($scope.bottomMenuPages[i].bottomMenu) {
        $scope.bottomMenuPagesCopy.push($scope.bottomMenuPages[i])
      }
    }

    $scope.copyArr = [...$scope.bottomMenuPagesCopy];

    $scope.bottomMenuPages1 = $scope.copyArr.slice(0, $scope.copyArr.length / 2)
    $scope.bottomMenuPages2 = $scope.copyArr.slice($scope.copyArr.length / 2, $scope.copyArr.length)

  })



  $http.get('/api/ecommerce/categorySortList/').
  then(function(response) {
    console.log('categories Listtttttttttt', response.data);
    $scope.categoriesList = response.data
  })

  $scope.topIcon = false
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=topIcon').
  // then(function(response) {
  //   console.log('ratingggggggggggggggggggg', response.data);
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.topIcon = true
  //     }
  //   }
  // })

  $scope.topIcon = settings_topIcon
  // $scope.topIcon = false

  $rootScope.genericImage = {}
  $http({
    method: 'GET',
    url: '/api/ecommerce/genericImage/'
  }).
  then(function(response) {
    console.log(response.data);
    if (response.data.length > 0) {
      $rootScope.genericImage = response.data[0]
    }
  })


  $scope.genericProductSearch = function(query) {
    if ($rootScope.multiStore) {
      surl = '/api/ecommerce/searchProduct/?search=' + query + '&pin=' + $rootScope.pin + '&multipleStore&limit=6'
    } else {
      surl = '/api/ecommerce/searchProduct/?search=' + query + '&limit=6'
    }
    return $http.get(surl).
    then(function(response) {
      console.log(response.data, 'lllllllllllllllll');
      return response.data;
    })
  };

  $scope.searchProduct = {
    product: ''
  };

  $scope.bannerText = false
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=bannerText').
  // then(function(response) {
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.bannerText = true
  //     }
  //   }
  // })



  $scope.bannerText = settings_bannerText

  $scope.topStaticBanner = false
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=topStaticBanner').
  // then(function(response) {
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.topStaticBanner = true
  //     }
  //   }
  // })
  $scope.topStaticBanner = settings_topStaticBanner


  $scope.search = function() {
    if (typeof $scope.searchProduct.product == 'object') {
      if ($scope.searchProduct.product.typ == 'list') {
        console.log($scope.searchProduct);
        $state.go('details', {
          id: $scope.searchProduct.product.pk,
          name: $scope.searchProduct.product.name.split(' ').join('-')
        })
      } else {
        $state.go('categories', {
          name: $scope.searchProduct.product.name
        })
      }
      $scope.searchProduct.product = '';
    }
  }

  $scope.$watch('searchProduct.product', function(newValue, oldValue) {
    if (newValue != null && typeof newValue == 'object') {
      if (newValue.typ == 'list') {
        console.log(newValue);
        $state.go('details', {
          id: newValue.pk,
          name: newValue.name.split(' ').join('-'),
          sku: newValue.serialNo
        })
      } else {
        $state.go('categories', {
          name: newValue.name
        })
      }
      $scope.searchProduct.product = '';
    }
  }, true);

  $scope.slide = {
    banners: [],
    active: 0
  };
  $scope.slideMobile = {
    banners: [],
    active: 0
  };

  $http({
    method: 'GET',
    url: '/api/ecommerce/offerBanner/?level=1'
  }).
  then(function(response) {
    // for (var i = 0; i < response.data.length; i++) {
    //   s = response.data[i].params;
    //   s = s.split(':')[1];
    //   s = s.split('}')[0];
    //   response.data[i].params = {id : parseInt(s)}
    // }
    $scope.slide.banners = response.data;
    if ($scope.slide.banners.length > 5) {
      $scope.slide.banners = $scope.slide.banners.slice(0, 5)
    }
    $scope.slide.active = 0
    if ($scope.slide.banners.length > 1) {
      $scope.slide.lastbanner = $scope.slide.banners.length - 1
    } else {
      $scope.slide.lastbanner = 0
    }

    console.log(response.data, 'fffff');

    $scope.slideMobile.banners = response.data;
    if ($scope.slideMobile.banners.length > 3) {
      $scope.slideMobile.banners = response.data.slice(0, 3);
    }
    $scope.slideMobile.active = 0
    if ($scope.slideMobile.banners.length > 1) {
      $scope.slideMobile.lastbanner = $scope.slideMobile.banners.length - 1
    } else {
      $scope.slideMobile.lastbanner = 0
    }
    console.log($scope.slide.banners);
    console.log($scope.slideMobile.banners);
  })
  $scope.changeSlide = function(index) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaa', index);
    $scope.slide.active = index;
  }

  $scope.change = function(value) {
    if (value == "next") {
      if ($scope.slide.active == undefined) {
        $scope.slide.active = 0
      }
      if ($scope.slide.active == $scope.slide.lastbanner) {
        $scope.slide.active = 0;
      } else {
        $scope.slide.active += 1;
      }
    } else if (value == "previous") {
      console.log($scope.slide.active);
      console.log($scope.slide.active, $scope.slide.lastbanner);
      if ($scope.slide.active == undefined) {
        $scope.slide.active = 0;
      } else {
        $scope.slide.active -= 1;
      }

      if ($scope.slide.active < 0) {
        console.log("kkkkkkkkkkkkkkkkk");
        $scope.slide.active = $scope.slide.lastbanner
      }
    }
  }


  // $interval(function() {
  //   if ($scope.slide.active == undefined) {
  //     $scope.slide.active = 0
  //   }
  //   if ($scope.slide.active == $scope.slide.lastbanner) {
  //     $scope.slide.active = 0;
  //   } else {
  //     $scope.slide.active += 1;
  //   }
  // }, 1000);


  $scope.changeSlideMobile = function(index) {
    $scope.slideMobile.active = index;
  }

  $interval(function() {
    if ($scope.slideMobile.active == undefined) {
      $scope.slideMobile.active = 0
    }
    if ($scope.slideMobile.active == $scope.slideMobile.lastbanner) {
      $scope.slideMobile.active = 0;
    } else {
      $scope.slideMobile.active += 1;
    }
  }, 3000);

  // $interval(function() {
  //   $scope.slideMobile.active += 1;
  //   if ($scope.slideMobile.active == 3) {
  //     $scope.slideMobile.active = 0;
  //   }
  // }, 3000);


  // $scope.increaseSlide = function(index) {
  //   console.log(index,'aaaaaaaaa');
  //   $scope.banners= index+1;
  // }
  //
  // $scope.decreaseSlide = function(index) {
  //   $scope.slide.active = index-1;
  // }

  $scope.feedback = {
    email: '',
    mobile: null,
    message: ''
  };

  // $scope.feddbackPannel = false
  $scope.feedbackstatus = function() {

    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.ecommerce.feedBack.html',
      size: 'md',
      backdrop: false,
      controller: 'controller.ecommerce.feedBack.modal',
    }).result.then(function() {

    }, function() {

    });
  }

  $scope.faq = function() {

    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.ecommerce.FAQ.html',
      size: 'md',
      backdrop: false,
      controller: 'controller.ecommerce.FAQ.modal',
    }).result.then(function() {

    }, function() {

    });
  }


  $scope.contactUs = function() {
    $scope.me = $users.get('mySelf')
    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.ecommerce.contact.html',
      size: 'md',
      backdrop: false,
      controller: 'controller.ecommerce.contact.modal',
    }).result.then(function() {

    }, function() {

    });
  }
  // $scope.close = function() {
  //   $scope.feddbackPannel = false
  // }


  $rootScope.inCart = []
  $scope.settings = {};
  $http({
    method: 'GET',
    url: '/api/ERP/appSettings/?app=25'
  }).
  then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      $scope.settings[response.data[i].name] = response.data[i].value;
    }
    console.log($scope.settings);
  })

  $scope.data.pickUpTime = null;
  $scope.data.dropInTime = null;
  $scope.prodData = []
  $scope.stock = []
  if ($scope.me != null) {
    $http({
      method: 'GET',
      url: '/api/ecommerce/cart/?user=' + $scope.me.pk
    }).
    then(function(response) {
      for (var i = 0; i < response.data.length; i++) {

        if (response.data[i].typ == 'cart') {
          $scope.product_var = undefined

          var prod_variants = response.data[i].product.product_variants

          for (var j = 0; j < prod_variants.length; j++) {
            if (prod_variants[j].sku == response.data[i].prodSku) {
              response.data[i].prod_var = prod_variants[j]
            }
          }
          if ($rootScope.pin != undefined) {
            $scope.store = $rootScope.pin.pk
          }
          if (response.data[i].prod_var != undefined) {
            $scope.product_var = response.data[i].prod_var.id
          }
          // $http({
          //   method: 'GET',
          //   url: '/api/ecommerce/getinStock/?product_id=' + response.data[i].product.product.pk + '&product_var=' + $scope.product_var + '&store=' + $scope.store,
          // }).
          // then(function(response) {
          //   console.log(response, 'sttttttckkkkkkkkk');
          //   $scope.stock.push(response.data)
          // })
          $rootScope.inCart.push(response.data[i])
        }
        if (response.data[i].typ == 'favourite') {
          $rootScope.inFavourite.push(response.data[i])
        }
      }

      // for (var i = 0; i < $rootScope.inCart.length; i++) {
      //   console.log($rootScope.inCart[i].product.variantsInStoreQty,'%%%%%%%%%%%%%%%%%%%%');
      //   for (var j = 0; j <$rootScope.inCart[i].product.variantsInStoreQty.length; j++) {
      //     if($rootScope.inCart.product_variants!=null){
      //       if($rootScope.inCart[i].product_variants.pk==$rootScope.inCart[i].product.variantsInStoreQty[j].productVariant){
      //         console.log($rootscope.inCart[i].product.variantsInStoreQty[j].pk,'%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      //       }
      //     }
      //
      //   }
      //
      // }

    })

    // $scope.getinStock = function() {
    //   console.log("kkkkkkkkkkdddddddddddddddddddddd");
    //   for (var i = 0; i < $rootScope.inCart.length; i++) {
    //     for (var j = 0; j < $scope.stock.length; j++) {
    //       if ($rootScope.pin.pk == undefined) {
    //         $scope.code = "undefined"
    //       } else {
    //         $scope.code = $rootScope.pin.pk
    //       }
    //       if ($rootScope.inCart[i].prod_var == undefined) {
    //         $scope.prod_var = "undefined"
    //       } else {
    //         $scope.prod_var = $rootScope.inCart[i].prod_var.id
    //       }
    //       if ($scope.stock[j].store == $scope.code) {
    //         if ($scope.stock[j].product == $rootScope.inCart[i].product.product.pk) {
    //           if($scope.stock[j].product_var == $scope.prod_var){
    //             $rootScope.inCart[i].stock = $scope.stock[j].stock
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // $timeout(function() {
    //   $scope.getinStock()
    // }, 5000);
  }

  if ($scope.me != null) {
    $http({
      method: 'GET',
      url: '/api/ecommerce/order/?user=' + $scope.me.pk
    }).
    then(function(response) {
      $rootScope.inInvoice = response.data
    })
  }




  if ($scope.me) {
    if ($rootScope.addToCart.length > 0) {
      if ($rootScope.inCart.length > 0) {
        console.log("comeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        for (var i = 0; i < $rootScope.addToCart.length; i++) {
          for (var j = 0; j < $rootScope.inCart.length; j++) {
            if ($rootScope.addToCart[i].prodSku == $rootScope.inCart[j].prodSku) {
              if ($rootScope.inCart[j].typ == 'cart') {
                $http({
                  method: 'PATCH',
                  url: '/api/ecommerce/cart/' + $rootScope.inCart[j].pk + '/',
                  data: {
                    qty: $rootScope.addToCart[i].qty
                  }
                }).
                then(function(response) {})
                $rootScope.inCart[i].qty = $rootScope.addToCart[i].qty

              }
              //  else if ($rootScope.inCart[j].typ == 'favourite') {
              //   $http({
              //     method: 'PATCH',
              //     url: '/api/ecommerce/cart/' + $rootScope.inCart[j].pk + '/',
              //     data: {
              //       typ: 'cart',
              //       qty: $rootScope.addToCart[i].qty
              //     }
              //   }).
              //   then(function(response) {})
              //   $rootScope.inCart[i].typ = 'cart'
              //   $rootScope.inCart[i].qty = $rootScope.addToCart[i].qty
              //   return
              // }
            }
          }

          for (var j = 0; j < $rootScope.inFavourite.length; j++) {
            if ($rootScope.addToCart[i].prodSku == $rootScope.inFavourite[j].prodSku) {
              if ($rootScope.inFavourite[j].typ == 'favourite') {
                $http({
                  method: 'PATCH',
                  url: '/api/ecommerce/cart/' + $rootScope.inFavourite[j].pk + '/',
                  data: {
                    typ: 'cart',
                    qty: $rootScope.addToCart[i].qty
                  }
                }).
                then(function(response) {
                  $rootScope.inCart.push(response.data)
                  $rootScope.inFavourite.splice(i, 1)
                })

              }
            }
          }
          $http({
            method: 'POST',
            url: '/api/ecommerce/cart/',
            data: {
              typ: 'cart',
              qty: $rootScope.addToCart[i].qty,
              product: $rootScope.addToCart[i].prodPk,
              user: getPK($scope.me.url),
              prodSku: $rootScope.addToCart[i].prodSku,
              desc: $rootScope.addToCart[i].desc
            }
          }).
          then(function(response) {
            if (response.data.length > 0) {
              for (var i = 0; i < response.data.length; i++) {
                $rootScope.inCart.push(response.data[0])
              }
            }

          })
        }
      } else {
        console.log('posdtttttttttttttttttttttttttttt');
        for (var i = 0; i < $rootScope.addToCart.length; i++) {
          $http({
            method: 'POST',
            url: '/api/ecommerce/cart/',
            data: {
              typ: 'cart',
              qty: $rootScope.addToCart[i].qty,
              product: $rootScope.addToCart[i].prodPk,
              user: getPK($scope.me.url),
              prodSku: $rootScope.addToCart[i].prodSku
            }
          }).
          then(function(response) {
            if (response.data.length > 0) {
              for (var i = 0; i < response.data.length; i++) {
                $rootScope.inCart.push(response.data[0])
              }
            }

          })
        }

      }

      function setCookie(cname, cvalue, exdays) {
        console.log('set cookie');
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }


      detail = getCookie("addToCart");
      if (detail != "") {
        console.log('already there');
        setCookie("addToCart", "", -1);
        // document.cookie = encodeURIComponent("addToCart") + "=deleted; expires=" + new Date(0).toUTCString()
      }
      window.location = '/checkout/cart';
      $scope.cart = $rootScope.inCart;
      $rootScope.addToCart = []
    }



  }


  $scope.headerUrl = '/static/ngTemplates/app.ecommerce.header.html';
  $scope.footerUrl = '/static/ngTemplates/app.ecommerce.footer.html';


  $scope.$watch('data.location', function(newValue, oldValue) {
    if (newValue != null && typeof newValue == 'object') {
      $http({
        method: 'GET',
        url: '/api/ecommerce/locationDetails/?id=' + newValue.place_id
      }).
      then(function(response) {
        $scope.params.location = response.data.result;
        console.log($scope.params.location.geometry.location);
        // lat lon is available in location.geometry.location.lat or lng
      })
    }
  }, true);

  $scope.getLocationSuggeations = function(query) {
    return $http.get('/api/ecommerce/suggestLocations/?query=' + query).
    then(function(response) {
      return response.data.predictions;
    })
  }

  $scope.refreshResults = function() {
    $state.go('ecommerce', {}, {
      reload: true
    })
    // if (angular.isDefined($scope.$$childHead.fetchListings)) {
    //   $scope.$$childHead.fetchListings()
    // }else {
    //   $scope.$$childTail.fetchListings()
    // }
  }






});
app.controller('controller.ecommerce.pincodeEnquiry.modal', function($scope, $rootScope, $state, $http, $users, $interval, $uibModal, $uibModalInstance, Flash) {
  $scope.close = function() {
    $uibModalInstance.close();
  }
  $scope.form = {
    pincode: ''
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie);
    var ca = decodedCookie.split(';');
    console.log(ca);
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {

        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    console.log('set cookie');
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function createCookieDetail(pincode) {
    console.log('create cookieeeeeeeee', pincode);
    detail = getCookie("userPincode");
    if (detail != "") {
      console.log('already there');
      document.cookie = encodeURIComponent("userPincode") + "=deleted; expires=" + new Date(0).toUTCString()
    }
    setCookie("userPincode", pincode, 365);
  }

  $scope.checkPincode = function() {
    console.log($scope.form.pincode.toString().length);
    if ($scope.form.pincode.toString().length != 6) {
      Flash.create('danger', "Please enter a correct Pincode");
      return
    }

    // createCookieDetail($scope.form.pincode)

    $scope.showSpinner = false

    $http.get('/api/POS/store/?pincode=' + $scope.form.pincode).
    then(function(response) {
      console.log(response.data);
      $scope.stores = response.data
      if (response.data.length > 0) {
        $rootScope.pin = response.data[0].pincode
        createCookieDetail(response.data[0].pincode)
        $scope.showSpinner = true
        $rootScope.$broadcast('filterForStore', {
          pin: response.data[0].pincode
        });
        $rootScope.$broadcast('filterForCategoryStore', {
          pin: response.data[0].pincode
        });
        setTimeout(function() {
          $scope.showSpinner = false
          $uibModalInstance.close();
        }, 2000);
      } else {
        $scope.form.pincode = ''
      }
    })
  }
  console.log($scope.stores, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkk');
});

app.controller('controller.ecommerce.FAQ.modal', function($scope, $rootScope, $state, $http, $timeout, $uibModal, $users, Flash, $uibModalInstance) {
  $scope.me = $users.get('mySelf')

  $scope.close = function() {
    $uibModalInstance.close();
  }


  $http({
    method: 'GET',
    url: '/api/ecommerce/frequentlyQuestions/'
  }).
  then(function(response) {
    $scope.fAQ = response.data
  })
  $scope.ind = -1
  $scope.collapsed = function(indx) {
    console.log(indx);
    $scope.ind = indx
  }

  $scope.message = {
    email: '',
    mobile: '',
    invoiceNo: '',
    subject: '',
    body: ''
  };
  $scope.sendMessage = function() {
    if ($scope.me == null || $scope.me == undefined) {
      if ($scope.message.invoiceNo == '' || $scope.message.body == '' || $scope.message.mobile == '' || $scope.message.email == '') {
        Flash.create("warning", "Please Add Email and Mobile")
      } else {
        var dataToSend = {
          email: $scope.message.email,
          mobile: $scope.message.mobile,
          invoiceNo: $scope.message.invoiceNo,
          subject: $scope.message.subject,
          message: $scope.message.body
        }
      }
    } else {
      if ($scope.message.invoiceNo == '' || $scope.message.body == '' || $scope.message.email == '') {
        Flash.create("warning", "Please Add Email and Mobile")
      } else {
        var dataToSend = {
          email: $scope.message.email,
          mobile: $scope.me.profile.mobile,
          invoiceNo: $scope.message.invoiceNo,
          subject: $scope.message.subject,
          message: $scope.message.body
        }
      }

    }

    console.log(dataToSend);
    $http({
      method: 'POST',
      url: '/api/ecommerce/supportFeed/',
      data: dataToSend
    }).
    then(function(response) {
      $scope.message = {
        email: '',
        mobile: '',
        invoiceNo: '',
        subject: '',
        body: ''
      };
      Flash.create('success', response.status + ' : ' + response.statusText);
    }, function(response) {
      Flash.create('danger', response.status + ' : ' + response.statusText);
    })
  }


});
app.controller('controller.ecommerce.feedBack.modal', function($scope, $rootScope, $state, $http, $users, $interval, $uibModal, $uibModalInstance, Flash) {
  $scope.me = $users.get('mySelf')
  $scope.close = function() {
    $uibModalInstance.close();
  }

  $scope.feedback = {
    email: '',
    subject: '',
    mobile: null,
    message: ''
  };
  $scope.sendFeedback = function() {
    console.log($scope.me, 'aaaaaaaaa')
    if ($scope.me == null || $scope.me == undefined) {
      console.log('kkkkkkkkkkkkkkk')
      if ($scope.feedback.email == '' || $scope.feedback.mobile == 5 || $scope.feedback.message == '') {
        Flash.create("warning", "Please Add Email and Mobile")
      } else {
        var toSend = {
          email: $scope.feedback.email,
          mobile: $scope.feedback.mobile,
          subject: $scope.feedback.subject,
          message: $scope.feedback.message,
        }
      }
    } else {
      if ($scope.feedback.email == '' || $scope.feedback.message == '') {
        Flash.create("warning", "Please Add Email and Mobile")
      } else {
        var toSend = {
          email: $scope.feedback.email,
          mobile: $scope.me.profile.mobile,
          subject: $scope.feedback.subject,
          message: $scope.feedback.message,
        }
      }

    }
    $http({
      method: 'POST',
      url: '/api/ecommerce/supportFeed/',
      data: toSend
    }).
    then(function(response) {
      Flash.create('success', 'Thank you!');
      $scope.feedback = {
        email: '',
        subject: '',
        mobile: null,
        message: ''
      };
    }, function(response) {
      Flash.create('danger', response.status + ' : ' + response.statusText);
    });
  }
});

app.controller('controller.ecommerce.contact.modal', function($scope, $rootScope, $state, $http, $users, $interval, $uibModal, $uibModalInstance, Flash) {
  //   $http({
  //   method: 'GET',
  //   url: '/api/ecommerce/frequentlyQuestions/'
  // }).
  // then(function(response) {
  //   $scope.fAQ = response.data
  // })

  // $scope.message = {
  //   subject: '',
  //   body: ''
  // };
  // $scope.sendMessage = function() {
  //   $http({
  //     method: 'POST',
  //     url: '/api/ecommerce/support/',
  //     data: $scope.message
  //   }).
  //   then(function(response) {
  //     $scope.message = {
  //       subject: '',
  //       body: ''
  //     };
  //     Flash.create('success', response.status + ' : ' + response.statusText);
  //   }, function(response) {
  //     Flash.create('danger', response.status + ' : ' + response.statusText);
  //   })
  // }

  $scope.close = function() {
    $uibModalInstance.close();
  }


  $scope.sendFeedback = function() {
    // if ($scope.me==null){
    //   console.log("aaaaaaaa");
    //   if ($scope.feedback.email == '') {
    //     Flash.create('danger', 'Please provide details')
    //   }
    //   else{
    //     var toSend = {
    //       email: $scope.feedback.email,
    //       mobile: $scope.feedback.mobile,
    //       message: $scope.feedback.message,
    //     }
    //   }
    // }
    // else{
    //   var toSend = {
    //     email: $scope.feedback.email,
    //     mobile: $scope.feedback.mobile,
    //     message: $scope.feedback.message,
    //   }
    // }


    console.log("aaaaaaaa");
    if ($scope.feedback.email == '') {
      Flash.create('danger', 'Please provide details')
    } else {
      console.log($scope.feedback.email, 'aaaaa');
      var toSend = {
        email: $scope.feedback.email,
        mobile: $scope.feedback.mobile,
        message: $scope.feedback.message,
      }
    }


    $http({
      method: 'POST',
      url: '/api/ecommerce/supportFeed/',
      data: toSend
    }).
    then(function(response) {
      Flash.create('success', 'Thank you!');
      $scope.feedback = {
        email: '',
        mobile: null,
        message: ''
      };
    }, function(response) {
      Flash.create('danger', response.status + ' : ' + response.statusText);
    });
  }
});


app.controller('controller.ecommerce.list', function($scope, $rootScope, $state, $http, Flash, $users, $interval, $filter, $timeout) {

  document.title = 'Buy Products Online At Best Price In India | ' + BRAND_TITLE
  document.querySelector('meta[name="description"]').setAttribute("content", BRAND_TITLE + ' Online Shopping')

  $scope.me = $users.get('mySelf');
  console.log('multiiiiiiiiiiiiiiiiiiiii', $rootScope.multiStore, $rootScope.pin);

  $scope.secondBanner = false

  $scope.listProdLimit = 24;
  $scope.listProdOffset = 0;

  $scope.categoryScroll = false
  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=categoryScroll').
  // then(function(response) {
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.categoryScroll = true
  //     }
  //   }
  // });

  $scope.categoryScroll = settings_categoryScroll




  // $http.get('/api/ERP/appSettings/?app=25&name__iexact=secondBanner').
  // then(function(response) {
  //   if (response.data[0] != null) {
  //     if (response.data[0].flag) {
  //       $scope.secondBanner = true
  //     }
  //   }
  // });
  $scope.secondBanner = settings_secondBanner

  $scope.inCart = $rootScope.inCart;

  $timeout(function() {
    console.log($rootScope.pin);
    if ($rootScope.multiStore) {
      $rootScope.$broadcast('filterForStore', {
        pin: $rootScope.pin
      });
      $rootScope.$broadcast('filterForCategoryStore', {
        pin: $rootScope.pin
      });
    } else {
      $http({
        method: 'GET',
        url: '/api/ecommerce/listingLite/?limit=' + $scope.listProdLimit
      }).
      then(function(response) {
        $scope.listingProductsData1 = response.data.results.slice(0, 12);
        $scope.listingProductsData2 = response.data.results.slice(12, 24);

        // for (var i = 0; i < $rootScope.addToCart.length; i++) {
        //   if ($rootScope.addToCart.length > 0) {
        //     for (var j = 0; j < $scope.listingProducts.length; j++) {
        //       if ($scope.listingProducts[j].pk == $rootScope.addToCart[i].product.pk) {
        //         $scope.listingProducts[j].added_cart = $rootScope.addToCart[i].qty
        //         console.log($scope.listingProducts[j].added_cart, 'aaaaaaaaaaaaaaaaaaaaaaaa');
        //       }
        //     }
        //     for (var j = 0; j < $scope.listingRemainingProducts.length; j++) {
        //       if ($scope.listingRemainingProducts[j].pk == $rootScope.addToCart[i].product.pk) {
        //         $scope.listingRemainingProducts[j].added_cart = $rootScope.addToCart[i].qty
        //         console.log($scope.listingRemainingProducts[j].added_cart, 'aaaaaaaaaaaaaaaaaaaaaaaa');
        //       }
        //     }
        //
        //   }
        // }
      })

      $http({
        method: 'GET',
        url: '/api/ecommerce/genericProduct/'
      }).
      then(function(response) {
        $scope.genericProducts = response.data;
      })
    }

    // $interval(function() {
    //   if($scope.maxCategories==true&&$scope.genericProducts.length>5){
    //     $scope.tmpCategory=$scope.genericProducts.slice(0,1)
    //     $scope.genericProducts.splice(0,1)
    //     $scope.genericProducts.push($scope.tmpCategory[0])
    //   }
    // }, 3000)
  }, 1000);


  $scope.categoryProperties = {
    // autoHeight:true,
    // animateIn: 'fadeIn',
    lazyLoad: true,
    items: 5,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false
  };


  $scope.showMore = function() {
    $scope.listProdLimit = 12
    $scope.listProdOffset = $scope.listProdOffset + 24;
    if ($rootScope.multiStore) {
      $rootScope.$broadcast('filterForStore', {
        pin: $rootScope.pin
      });
      $rootScope.$broadcast('filterForCategoryStore', {
        pin: $rootScope.pin
      });
    } else {
      $http({
        method: 'GET',
        url: '/api/ecommerce/listingLite/?limit=' + $scope.listProdLimit + '&offset=' + $scope.listProdOffset
      }).
      then(function(response) {
        console.log(response.data.results);
        $scope.listingProductsData2 = $scope.listingProductsData2.concat(response.data.results)
        console.log($scope.listingProductsData1);
        console.log($scope.listingProductsData2);

        // $scope.listingProductsData2 = response.data.results.slice(0, 12);
      });
    }
  }

  $scope.recentlyViewed = [];
  // $scope.recentViewsArr = [];
  //
  if ($scope.me != null) {
    if ($rootScope.multiStore) {
      rurl = '/api/ecommerce/activities/?user=' + $scope.me.pk + '&typ=productView&limit=4' + '&pin=' + $rootScope.pin + '&multipleStore'
    } else {
      rurl = '/api/ecommerce/activities/?user=' + $scope.me.pk + '&typ=productView&limit=4'
    }
    $http({
      method: 'GET',
      url: rurl
    }).
    then(function(response) {
      for (var i = 0; i < response.data.results.length; i++) {
        $scope.recentlyViewed.push(response.data.results[i].product)
      }

    })
  }

  $http({
    method: 'GET',
    url: '/api/ecommerce/suggestedItem/'
  }).
  then(function(response) {
    console.log('%%%%%%%%', response.data.results);
    $scope.suggestedProducts = response.data.results

  })


  $scope.subSlide = {
    banners: [],
    active: 0
  };
  $scope.subSlideMobile = {
    banners: [],
    active: 0
  };

  $http({
    method: 'GET',
    url: '/api/ecommerce/offerBanner/?level=2'
  }).
  then(function(response) {
    $scope.subSlide.banners = response.data;
    if ($scope.subSlide.banners.length > 5) {
      $scope.subSlide.banners = $scope.slide.banners.slice(0, 5)
    }
    if ($scope.subSlide.banners.length > 1) {
      $scope.subSlide.lastbanner = $scope.subSlide.banners.length - 1
      $scope.subSlide.img = $scope.subSlide.banners[0].image
      $scope.subSlide.title = $scope.subSlide.banners[0].title
    } else {
      $scope.subSlide.lastbanner = 0
    }


    console.log(response.data, 'fffff');

    $scope.subSlideMobile.banners = response.data;
    if ($scope.subSlideMobile.banners.length > 3) {
      $scope.subSlideMobile.banners = response.data.slice(0, 3);
    }
    if ($scope.subSlideMobile.banners.length > 1) {
      $scope.subSlideMobile.lastbanner = $scope.subSlideMobile.banners.length - 1
      $scope.subSlideMobile.img = $scope.subSlideMobile.banners[0].imagePortrait
      $scope.subSlideMobile.title = $scope.subSlideMobile.banners[0].title

    } else {
      $scope.subSlideMobile.lastbanner = 0
    }

  })
  // $scope.changesubSlide = function(index) {
  //   $scope.subSlide.active = index;
  // }


  $interval(function() {
    if ($scope.subSlide.active == undefined) {
      $scope.subSlide.active = 0
    }
    if ($scope.subSlide.active == $scope.subSlide.lastbanner) {
      $scope.subSlide.active = 0;
    } else {
      $scope.subSlide.active += 1;
    }
    if ($scope.subSlideMobile.banners[$scope.subSlideMobile.active] != undefined) {
      $scope.subSlide.img = $scope.subSlide.banners[$scope.subSlide.active].image
      $scope.subSlide.title = $scope.subSlide.banners[$scope.subSlide.active].title
    }
  }, 3000);

  // $scope.changeSlideMobile = function(index) {
  //   $scope.subSlideMobile.active = index;
  // }

  // $interval(function() {
  //   if ($scope.subSlideMobile.active == undefined) {
  //     $scope.subSlideMobile.active = 0
  //   }
  //   if ($scope.subSlideMobile.active == $scope.subSlideMobile.lastbanner) {
  //     $scope.subSlideMobile.active = 0;
  //   } else {
  //     $scope.subSlideMobile.active += 1;
  //   }
  //   if ($scope.subSlideMobile.banners[$scope.subSlideMobile.active] != undefined) {
  //     $scope.subSlideMobile.img = $scope.subSlideMobile.banners[$scope.subSlideMobile.active].imagePortrait
  //     // console.log($scope.subSlideMobile.img, 'aaaaaaaaaaaaaaaaaaaaaaaaaa');
  //     $scope.subSlideMobile.title = $scope.subSlideMobile.banners[$scope.subSlideMobile.active].title
  //   }
  // }, 3000);


  $scope.addToCart = function(inputPk) {
    console.log('coming in addddddddddddddd');
    dataToSend = {
      product: inputPk,
      user: getPK($scope.me.url),
      qty: 1,
      typ: 'cart',
    }
    console.log(dataToSend);
    console.log('in cart', $rootScope.inCart);


    for (var i = 0; i < $rootScope.inCart.length; i++) {
      if ($rootScope.inCart[i].product.pk == dataToSend.product) {
        if ($rootScope.inCart[i].typ == 'cart') {
          Flash.create('warning', 'This Product is already in cart');
          return
        } else {
          $http({
            method: 'PATCH',
            url: '/api/ecommerce/cart/' + $rootScope.inCart[i].pk + '/',
            data: {
              typ: 'cart'
            }
          }).
          then(function(response) {
            console.log(response.data, 'aaaaaaaaaaaaaaaaaaaaaa');
            Flash.create('success', 'Product added to cart');
          })
          $rootScope.inCart[i].typ = 'cart'
          return
        }

      }
    }
    $http({
      method: 'POST',
      url: '/api/ecommerce/cart/',
      data: dataToSend
    }).
    then(function(response) {
      console.log(response.data, 'bbbbbbbbbbbbbbbbbbbbbbbbb');
      Flash.create('success', 'Product added in cart');
      $rootScope.inCart.push(response.data);
    })
  }


  $scope.$on('filterForStore', function(event, input) {
    console.log("recieved");
    console.log(input);
    $http({
      method: 'GET',
      url: '/api/ecommerce/listingLite/?pin=' + input.pin + '&multipleStore&limit=24'
    }).
    then(function(response) {
      $scope.listingProductsData1 = response.data.results.slice(0, 12);
      $scope.listingProductsData2 = response.data.results.slice(12, 24);

      if ($rootScope.addToCart.length > 0) {
        for (var i = 0; i < $rootScope.addToCart.length; i++) {
          for (var j = 0; j < $scope.listingProductsData1.length; j++) {
            if ($scope.listingProductsData1[j].pk == $rootScope.addToCart[i].product.pk) {
              $scope.listingProductsData1[j].added_cart = $rootScope.addToCart[i].qty
            }
          }
          for (var j = 0; j < $scope.listingProductsData2.length; j++) {
            if ($scope.listingProductsData2[j].pk == $rootScope.addToCart[i].product.pk) {
              $scope.listingProductsData2[j].added_cart = $rootScope.addToCart[i].qty
            }
          }
        }
      }

      // setTimeout(function () {
      // }, 1000);
    })
  });

  $scope.$on('filterForCategoryStore', function(event, input) {
    console.log("recieved category");
    console.log(input);
    $http({
      method: 'GET',
      url: '/api/ecommerce/genericProduct/?pin=' + input.pin + '&multipleStore'
    }).
    then(function(response) {
      console.log('categoryyyyyyyyy dataaaaaaaaaaaaaaaa', response.data);
      $scope.genericProducts = response.data;


      $interval(function() {
        if ($scope.maxCategories == true && $scope.genericProducts.length > 5) {
          $scope.tmpCategory = $scope.genericProducts.slice(0, 1)
          $scope.genericProducts.splice(0, 1)
          $scope.genericProducts.push($scope.tmpCategory[0])
        }
      }, 3000)
      // setTimeout(function () {
      // }, 1000);

    })
  });



});
