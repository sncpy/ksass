/**
 * @class
 * Controller que implementa el formulario de alta y modificación de lotes.
 *
 * @name gfd.controller#LoteFormCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py"> Maximiliano Báez </a>
 */
app.controller('BaseViewCtrl', ['$scope', '$routeParams', '$timeout', '$location',
    function ($scope, $routeParams, $timeout, $location) {

        $scope.path = "";//"/" +$location.$$path.split("/")[1] + "/";

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        //$scope.service = null;

        /**
         * Objeto que corresponde al recurso sobre se el cual se realizan las operaciones.
         * @field
         * @type {Object}
         */
        $scope.recurso = {};

        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición.
         */
        $scope.getRecurso = function () {
            console.log($routeParams);
            $scope.service.obtener($routeParams.id)
            .then(function (response) {
                    $scope.recurso = response.data;
                },function (data, code) {
                    Message.error("No se pudo realizar la operación");
                });
        };
        /**
         * @private
         * ESta función se encarga de calcular el path del recurso para urls
         * compuestas
         */
        function initPath(){
            var tokens = $location.$$path.split("/");
            for(var i=0;i<tokens.length-2;i++){
                $scope.path += tokens[i] +"/";
            }
            //se elimina la última /
            $scope.path = $scope.path.substr(0,$scope.path.length -1);
        }

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            $scope.getRecurso();
            initPath();
        })();
    }
]);
