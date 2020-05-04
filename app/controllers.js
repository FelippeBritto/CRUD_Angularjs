(function () {

   'use strict';
   var unidescApp = angular.module("unidescApp");

   unidescApp.controller('produtoController', produtoController);

   produtoController.$inject = ['$scope', '$http'];

   function produtoController($scope, $http) {
      var index;
      var vm = this;

      var HOST_HTTP = 'http://localhost:3333';

      vm.produto = {};
      vm.produtos = [];

      vm.init = function () {
         vm.listarProdutos();
      };

      vm.listarProdutos = function () {
         $http.get(HOST_HTTP + '/produtos').then(
            function (response) {
               vm.produtos = response.data;
            },
            function (err) {
               console.log(err)
            }
         );
      };

      vm.adicionarProduto = function () {

         vm.produtos.push(angular.copy(vm.produto));

         // alert("Produto cadastrado com sucesso!");
         vm.limparCampos();

      };
      vm.salvaProdutoBaseDados = function () {
         $http.post(HOST_HTTP + 'produtos', vm.produto).then(
            function (response) {
               vm.produtos.push(vm.produto);
               vm.limparCampos();
               console.log(response);
            },
            function (err) {
               console.log(err);
            }
         )
      };

      vm.limparCampos = function () {
         vm.produto = {};
      };
      vm.delProdTab = function () {
         vm.produtos.splice(vm.produtos.indexOf(vm.produtod));
         vm.deletarProdutoBaseDeDados();
      };

      vm.deletarProdutoBaseDeDados = function () {
         $http.delete(HOST_HTTP + '/produtos', vm.produto.id).then(
            function (response) {
               console.log(response);
               vm.produtos.splice(item, 1);
            },
            function (err) {
               console.log(err);
            }
         );
      };

      vm.updateProdTab = function (item, i) {
         $scope.update = angular.copy(item);
         index = i;
         vm.atualizarProdutoBaseDeDados();
      };
      vm.saveUpdate = function () {
         $scope.vm.produtos[index] = $scope.update;
         $scope.update = "";
      };
      vm.atualizarProdutoBaseDeDados = function () {
         $http.put(HOST_HTTP + '/produtos', vm.produto.id, vm.produto).then(
            function (response) {
               console.log(response)
            },
            function (err) {
               console.log(err);
            }
         )
      };
   }

}());