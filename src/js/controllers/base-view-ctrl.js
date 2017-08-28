/**
 * @class
 * Controller que implementa el formulario de alta y modificación de lotes.
 *
 * @name gfd.controller#LoteFormCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py"> Maximiliano Báez </a>
 */
app.controller('BaseViewCtrl', ['$scope', '$routeParams', '$timeout', '$location',
    function ($scope, $routeParams, $timeout, $location) {

        $scope.path = "/" +$location.$$path.split("/")[1] + "/";    

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
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            $scope.getRecurso();
        })();
    }
]);
