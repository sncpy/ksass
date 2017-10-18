/**
 * @class
 * Controller que implementa el formulario de alta y modificación de lotes.
 *
 * @name gfd.controller#LoteFormCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py"> Maximiliano Báez </a>
 */
app.controller('BaseFormCtrl', ['$scope', '$routeParams', '$timeout', '$location',
    function ($scope, $routeParams, $timeout, $location) {

        $scope.path = "";//"/" +$location.$$path.split("/")[1] + "/";

        /**
         * Variable que se utiliza para desabilitar botones
         */
        $scope.disabledButtonSave = false;

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
            $scope.disabledButtonSave = true;
            this.service.crear($scope.recurso)
                .then(this.guardarSuccess
                , function (data, code) {
                    $scope.disabledButtonSave = false;
                    Message.error("No se pudo realizar la operación");
                });
        };

        /**
         * Se encarga de actualizar los datos del recurso.
         */
        $scope.editarRecurso = function () {
            $scope.disabledButtonSave = true;
            return this.service.actualizar($scope.recurso)
                .then(this.guardarSuccess
                , function (data, code) {
                    $scope.disabledButtonSave = false;
                    Message.error("No se pudo realizar la operación");
                });
        };

        /**
         * Se encarga de manejar el success de las peticiones
         * @param {object} data la respuesta de la petición
         */
        $scope.guardarSuccess = function (response) {
            $scope.disabledButtonSave = false;
            Message.ok("El registro se ha registrado exitosamente.");
            $location.url($scope.uri);
        };

        /**
         * Se encarga de obtener los datos del recurso siempre y cuando la pantalla esté en modo
         * de edición.
         */
        $scope.getRecurso = function () {
            this.service.obtener($routeParams.id)
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
            var index = $scope.isCrear()? tokens.length -1 :tokens.length-2;
            for(var i=0;i<index;i++){
                $scope.path += tokens[i] +"/";
            }
        }

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            if (!$scope.isCrear()) {
                $scope.getRecurso();
            }
            initPath();
        })();
    }
]);
