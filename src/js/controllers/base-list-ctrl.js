/**
 * @class
 * Controller que implementa la busqueda y listado de lotes.
 *
 * @name gfd.controller#LoteListCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py"> Maximiliano Báez </a>
 */
app.controller('BaseListCtrl', ['$scope','$location',
    function ($scope, $location, service) {

        /**
         *
         */
        $scope.path = $location.$$path;
        /**
        * Maneja el estado de loading de la grilla
        */
        $scope.loading = true;
        /**
        * Determina si se va mostrar no no el footer de la lista.
        */
        $scope.footer = true;

        /**
         * Inicializacion de objeto
         */
        $scope.filterBy = {};

        /**
         * @field
         * Parametros de configuración de la grilla
         */
        $scope.init = {
            'count': 20,
            'page': 1,
            'sortBy': "id",
            'sortOrder': 'DESC',
            'filterBase': 1
        };

        /**
         * Se encarga de limpiar los criterios del filtrado.
         * @function
         */
        $scope.limpiar = function () {
            $scope.filterBy = {};
        }

        /**
         * Array que contiene los datos de configuración de la grilla
         * @type Array
         * @field
         */
        $scope.config = {
            "rows": [],
            "pagination": {
                "count": $scope.init.count,
                "page": $scope.init.page,
                "pages": 0,
                "size": 0
            },
            "ssortBy": $scope.init.sortBy,
            "sortOrder": $scope.init.sortOrder
        };

        /**
        * Elimina los elementos del objeto que son nulos
        * @function
        */
        $scope.deleteUndefinedValues = function (object) {
            for (var key in object){
                if (!object[key]) {
                    delete object[key];
                }
            }
        };

        /*
         * Se encarga de eliminar el recurso
         * @function
         */
        $scope.eliminar = function (recurso) {
            if (window.confirm("¿Está seguro de eliminar el recurso?"))
                service.eliminar(recurso)
                .then(function (data) {
                    $scope.limpiar();
                }).catch(function (data, code) {
                    Message.error("No se pudo realizar la operación");
                });
        };

        /**
         * Se encarga de recuperar la lista paginada de los datos.
         * @function
         */
        $scope.getResource = function (params, paramsObj) {
            paramsObj.sortOrder = paramsObj.sortOrder == 'dsc' ? "DESC" : "ASC";
            $scope.loading = true;
            if (paramsObj.filters){
                $scope.deleteUndefinedValues(paramsObj.filters);
            }
            return this.service.listar(paramsObj)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.config.rows = response.data.rows;
                    $scope.config.pagination.size = response.data.count;
                    $scope.config.pagination.pages = Math.ceil(response.data.total / $scope.config.pagination.count);
                    return $scope.config;
                }).catch(function(response){
                    $scope.loading = null;
                    $scope.config.rows = [];
                    $scope.config.pagination.size =0;
                    $scope.config.pagination.pages=0;
                    return $scope.config;
                });
        };


        /**
         * Constructor / Entrypoint
         * @constructor
         */

    }
]);
