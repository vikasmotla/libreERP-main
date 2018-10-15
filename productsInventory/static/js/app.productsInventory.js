// you need to first configure the states for this app

app.config(function($stateProvider) {

  $stateProvider
    .state('businessManagement.productsInventory', {
      url: "/productsInventory",
      views: {
        "": {
          templateUrl: '/static/ngTemplates/genericAppBase.html',

        },
        "menu@businessManagement.productsInventory": {
          templateUrl: '/static/ngTemplates/genericMenu.html',
          controller: 'controller.generic.menu',
        },
        "@businessManagement.productsInventory": {
          templateUrl: '/static/ngTemplates/app.productsInventory.default.html',
          controller: 'businessManagement.productsInventory.default',
          // controller : 'projectManagement.LMS.default',
        }
      }
    })
});


app.controller("businessManagement.productsInventory.edit", function($scope, $http, Flash, $rootScope ,productData) {
  $scope.data = productData
  // $scope.activepk = 0
  // $scope.selectedStore = function(store, idx) {
  //   $scope.activepk = store.pk
  //   $scope.storeindex = idx
  //   $scope.storeSelected = store
  //   document.getElementById("updatequantity").focus();
  // }

  $scope.quantity = 1

  $scope.save = function(increase) {
      if (increase) {
        var final = $scope.data.quantity + $scope.quantity;
      } else {
        var final = $scope.data.quantity - $scope.quantity;
      }
      $http({
        method: 'PATCH',
        url: '/api/POS/storeQty/' + $scope.data.pk + '/',
        data: {
          quantity: final
        }
      }).then(function(response) {
        $scope.data.quantity = response.data.quantity;
        $scope.quantity = 1;
        Flash.create('success', 'Saved');
        // $rootScope.$broadcast('closeEditModalWindow' , {})
      })
  }


});

app.controller("businessManagement.productsInventory.default", function($scope, $timeout, $http, Flash, $uibModal, $rootScope, $state) {

  // $http({method : 'GET' , url : '/api/POS/product/'})
  $scope.currentStore = '';
  $rootScope.multiStores = false
  $http.get('/api/ERP/appSettings/?app=25&name__iexact=multipleStore').
  then(function(response) {
    console.log('ratingggggggggggggggggggg', response.data);
    if (response.data[0] != null) {
      if (response.data[0].flag) {
        $rootScope.multiStores = true
        $scope.selectStore()
      }
    }
  })

  $scope.refreshDashboard = function(input) {
    console.log(input);
    if (input.action == 'updated' && input.type == 'productsInventory') {
      for (var i = 0; i < $scope.data.tableData.length; i++) {
        if ($scope.data.tableData[i].pk == input.pk) {
          $scope.data.tableData[i].inStock = input.inStock;
        }
      }
    }

  }


  $scope.fetchProdInventory = function () {
    $scope.fetchInventory = true
    $scope.data = {
      tableData: [],
    };

    views = [{
      name: 'list',
      icon: 'fa-th-large',
      template: '/static/ngTemplates/genericTable/genericSearchList.html',
      itemTemplate: '/static/ngTemplates/app.productsInventory.item.html',
    }, ];

    var multiselectOptions = [{
        icon: 'fa fa-plus',
        text: 'New'
      }, {
        icon: 'fa fa-shopping-cart',
        text: 'Reorder'
      }, {
        icon: 'fa fa-file',
        text: 'stockReport'
      },
      {
        icon: 'fa fa-file',
        text: 'reorderingReport'
      }

    ];


    $scope.config = {
      views: views,
      url: '/api/POS/storeQty/',
      searchField: 'name',
      itemsNumPerView: [10, 20, 40],
      multiselectOptions: multiselectOptions,
      getParams : [{key : 'prodInventory' , value : 1}]
    }

    // var views = [{
    //   name: 'list',
    //   icon: 'fa-th-large',
    //   template: '/static/ngTemplates/genericTable/tableDefault.html',
    //   // itemTemplate: '/static/ngTemplates/app.POS.product.item.html',
    // }, ];
    //
    // var options = {
    //   main: {
    //     icon: 'fa-info',
    //     text: 'Info'
    //   },
    //   others: [{
    //     icon: '',
    //     text: 'editMaster'
    //   }, ]
    // };
    //
    //
    // var multiselectOptions = [{
    //     icon: 'fa fa-plus',
    //     text: 'New'
    //   }, {
    //     icon: 'fa fa-shopping-cart',
    //     text: 'Reorder'
    //   }, {
    //     icon: 'fa fa-file',
    //     text: 'stockReport'
    //   },
    //   {
    //     icon: 'fa fa-file',
    //     text: 'reorderingReport'
    //   }
    //
    // ];
    //
    // $scope.config = {
    //   views: views,
    //   url: '/api/POS/storeQty/',
    //   searchField: 'Name',
    //   itemsNumPerView: [20, 40, 80],
    //   options: options,
    //   fields: ['product', 'quantity', 'productVariant'],
    //   filterSearch: true,
    //   multiSelect: false,
    //   multiselectOptions: multiselectOptions,
    //   editorTemplate: '/static/ngTemplates/app.productsInventory.product.modal.html',
    // }

    if ($rootScope.multiStores) {
      $scope.config.getParams = [{
        key: 'store',
        value: $scope.currentStore.pk
      }]
    }

  }

  if (!$rootScope.multiStores) {
    $scope.fetchInventory = false
    $scope.fetchProdInventory()
  }


  $scope.tableAction = function(target, action, mode) {
    console.log(target, action, mode);

    if (action == 'reorderingReport') {

      window.open("/api/POS/reorderingReport/", "_blank")
      // $scope.openProductForm();
    } else if (action == 'stockReport') {
      window.open("/api/POS/stockReport/", "_blank")
    } else if (action == 'Reorder') {
      $state.go('businessManagement.productsInventory.purchaseOrder')
    } else if (action == 'New') {
      console.log('open uib modal ');
      $scope.productInventoryModal()
    } else {
      for (var i = 0; i < $scope.data.tableData.length; i++) {
        if ($scope.data.tableData[i].pk == parseInt(target)) {
          if (action == 'editMaster') {
            $scope.openProductForm(i);
            console.log('editing');
          } else if(action=='edit') {
            $scope.editQuantity(i);
          }else {
            $scope.openProductInfo(i);
            console.log('info');
          }
        }
      }
    }
  }


  $scope.editQuantity = function(idx) {
    $scope.productData = $scope.data.tableData[idx]
    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.productsInventory.product.modal.html',
      size: 'lg',
      backdrop: true,
      resolve:{
        productData:function () {
          return $scope.productData
        }
      },
      controller:'businessManagement.productsInventory.edit'
    }).result.then(function() {}, function() {

    });
  }




  $scope.selectStore = function(pk) {
    //this fn will be called if multistore
    console.log(pk);
    $scope.fetchInventory = false
    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.productsInventory.selectStoreModal.html',
      size: 'lg',
      backdrop: true,
      controller: function($scope, $timeout, $http, Flash, $uibModal, $rootScope, $state, $uibModalInstance) {

        $http({
          method: 'GET',
          url: '/api/POS/store/'
        }).then(function(response) {
          $scope.stores = response.data
          if (pk) {
            for (var i = 0; i < $scope.stores.length; i++) {
              if ($scope.stores[i].pk == pk) {
                $scope.selectedStore = $scope.stores[i];
                break;
              }
            }
          } else {
            $scope.selectedStore = $scope.stores[0];
          }

        })

        $scope.storeSelected = function(indx) {
          $scope.selectedStore = $scope.stores[indx]
        }

        $scope.go = function() {
          $uibModalInstance.dismiss($scope.selectedStore)
        }

      },
    }).result.then(function() {}, function(store) {
      // if ($scope.currentStore) {
      //   if ($scope.currentStore.pk != store.pk) {
      //     $scope.currentStore = store
      //   }
      // } else {
      //   $scope.currentStore = store
      // }
      $scope.currentStore = store
      $scope.fetchProdInventory()
    });
  }



  $scope.productInventoryModal = function() {
    if ($rootScope.multiStores && $scope.currentStore.pk==undefined) {
      Flash.create('warning','please select store first')
      return
    }

    if ($scope.currentStore=='') {
      var storePk = ''
    }else {
      var storePk = $scope.currentStore.pk
    }
    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.productsInventory.createProductInventoryModal.html',
      size: 'lg',
      backdrop: true,
      resolve:{
        storePk:  function () {
          return storePk
        }
      },
      controller:'businessManagement.productsInventory.inventoryForm',
    }).result.then(function() {}, function() {

    });
  }


  $scope.openProductInfo = function(idx) {
    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.POS.productinfo.form.html',
      size: 'lg',
      backdrop: true,
      resolve: {
        product: function() {
          if (idx == undefined || idx == null) {
            return {};
          } else {
            return $scope.data.tableData[idx];
          }
        }
      },
      controller: "controller.POS.productinfo.form",
    }).result.then(function() {

    }, function() {
      $rootScope.$broadcast('forceRefetch', {});
    });

  }

  $scope.openProductForm = function(idx) {

    $uibModal.open({
      templateUrl: '/static/ngTemplates/app.POS.product.form.html',
      size: 'xl',
      backdrop: true,
      resolve: {
        product: function() {

          console.log($scope.data.tableData[idx]);
          if (idx == undefined || idx == null) {
            return {};
          } else {
            return $scope.data.tableData[idx];
          }
        }
      },
      controller: 'controller.POS.productForm.modal',
    }).result.then(function() {

    }, function() {

    });


  }

});


app.controller("businessManagement.productsInventory.inventoryForm", function($scope, $timeout, $http, Flash, $uibModal, $rootScope, $state, $uibModalInstance, $filter , storePk) {

  $scope.inventoryForm = {
    product:'',
    prodVariant:'',
    qty:1
  }

  $scope.productSearch = function (query) {
    return $http.get('/api/POS/product/?name__icontains=' + query).
    then(function(response) {
      return response.data;
    })
  }
  $scope.prodVarList = []

  $scope.$watch('inventoryForm.product',function (newValue,oldValue) {
    $scope.prodVarList = []
    console.log(newValue);
    if (typeof newValue == 'object') {
      console.log(newValue.pk);
      $http({
        method:'GET',
        url:'/api/POS/productVerient/?parent='+newValue.pk
      }).then(function (response) {
        console.log(response.data);
        $scope.prodVarList[0] = {str:'Select Product Variant'}
        for (var i = 0; i < response.data.length; i++) {
          str = $filter('convertUnit')(response.data[i].unitPerpack * newValue.howMuch , newValue.unit) + ' - Rs ' +response.data[i].discountedPrice + ' ('+response.data[i].sku + ')'
          $scope.prodVarList.push( {str:str, pk:response.data[i].pk } )
        }
        if ($scope.prodVarList.length>0) {
          $scope.inventoryForm.prodVariant = $scope.prodVarList[0]
        }
      })
    }
  })

  $scope.saveProdInventory = function () {
    console.log($scope.inventoryForm);
    var dataToSend = {}
    if ($rootScope.multiStores) {
      dataToSend.store = storePk
    }else {
      dataToSend.master = true;
    }
    dataToSend.quantity = $scope.inventoryForm.qty
    if (typeof $scope.inventoryForm.product != 'object') {
      Flash.create('success','Please select product')
      return
    }
    dataToSend.product = $scope.inventoryForm.product.pk

    if ($scope.inventoryForm.prodVariant.pk) {
      dataToSend.productVariant = $scope.inventoryForm.prodVariant.pk
    }

    $http({
      method:'POST',
      url:'/api/POS/storeQty/',
      data:dataToSend
    }).then(function(response) {
      console.log(response.data);
      Flash.create('success','created successfully')
      $uibModalInstance.dismiss()
    }, function(err) {
      Flash.create('danger' , 'Error occured')
    })

  }


});
