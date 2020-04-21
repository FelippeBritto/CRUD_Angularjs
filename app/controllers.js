(function () {

   'use strict';
   var unidescApp = angular.module("unidescApp");

   unidescApp.controller('produtoController', produtoController);

   produtoController.$inject = ['$scope'];

   function produtoController($scope) {
      var index;
      var vm = this;
      vm.produto = {};
      vm.produtos = [];

      vm.adicionarProduto = function () {

         vm.produtos.push(angular.copy(vm.produto));

         // alert("Produto cadastrado com sucesso!");
         vm.limparCampos();

      };
      vm.limparCampos = function () {
         vm.produto = {};
      };
      vm.delProdTab = function () {
         vm.produtos.splice(vm.produtos.indexOf(vm.produtod));
      };
      vm.updateProdTab = function (item, i) {
         $scope.update = angular.copy(item);
         index = i;

      };
      vm.saveUpdate = function () {
         $scope.vm.produtos[index] = $scope.update;
         $scope.update = "";
      };
   }

}());