/**
 * @class
 * Controller que implementa el formulario de alta y modificación de lotes.
 *
 * @name gfd.controller#LoteFormCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py"> Maximiliano Báez </a>
 */
app.controller('BaseFormCtrl', ['$scope', '$routeParams', '$timeout',
    function ($scope, $routeParams, $timeout) {

        /**
         * Url base del formulario
         * @field
         * @type {Object}
         */
        //$scope.uri = "";

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
         * Determina el modo de la pantalla
         * @returns {Boolean} True si está en modo creación, False en caso contrario.
         */
        $scope.isCrear = function () {
            return typeof $routeParams.id == "undefined";
        };

        /**
         * Se encarga de persistir los datos del modelo.
         */
        $scope.guardar = function () {
            if (this.isCrear()) {
                this.crearRecurso();
            } else {
                this.editarRecurso();
            }
        };

        /**
         * Se encarga de registrar un nuevo recurso.
         * de edición.
         */
        $scope.crearRecurso = function () {
            this.service.crear($scope.recurso)
                .success(this.guardarSuccess)
                .error(function (data, code) {
                    Message.error("No se pudo realizar la operación");
                });
        };

        /**
         * Se encarga de actualizar los datos del recurso.
         */
        $scope.editarRecurso = function () {
            return this.service.actualizar($scope.recurso)
                .success(this.guardarSuccess)
                .error(function (data, code) {
                    Message.error("No se pudo realizar la operación");
                });
        };

        /**
         * Se encarga de manejar el success de las peticiones
         * @param {object} data la respuesta de la petición
         */
        $scope.guardarSuccess = function (data) {
            Message.ok("El registro se ha registrado exitosamente.");
            window.location = "#" + $scope.uri + data.id + "/ver";
        };

        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición.
         */
        $scope.getRecurso = function () {
            this.service.obtener($routeParams)
                .success(function (data) {
                    $scope.recurso = data;
                }).error(function (data, code) {
                    Message.error("No se pudo realizar la operación");
                });
        };

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            if (!$scope.isCrear()) {
                $scope.getRecurso();
            }
        })();
    }
]);
