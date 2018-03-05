/**
 * @class
 * Controller que implementa la busqueda y listado de lotes.
 *
 * @name gfd.controller#LoteListCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py"> Maximiliano Báez </a>
 */
app.controller('BaseListCtrl', ['$scope', '$location',
    function ($scope, $location) {

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
         * Inicializacion de objeto que almacena los criterios de filtrado
         */
        $scope.filterBy = {};
        /**
         * Se inicializa la variable que aplica los filtros en la grilla.
         */
        $scope.filterByModel = {};

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
            $scope.filterByModel = {};
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
            for (var key in object) {
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
                this.service.eliminar(this.getPrimaryKey(recurso))
                .then(eliminarRecursoSuccess, eliminarRecursoError);
        };

        function eliminarRecursoSuccess(response) {
            Message.ok("El registro se ha eliminado exitosamente.");
            $location.url($scope.path);
        }

        function eliminarRecursoError(data) {
            Message.error("No se pudo realizar la operación");
        };

        /**
         * Retorna el primary key del recurso
         * Por defecto el atributo id
         * Puede ser sobreescrito en el controlador del recurso
         * @function
         */
        $scope.getPrimaryKey = function (recurso) {
            return recurso.id;
        };

        /**
         * se ecnarga de reinicializar los parametros de la grilla.
         */
        $scope.noData = function () {
            $scope.loading = null;
            $scope.config.pagination.size = 0;
            $scope.config.pagination.pages = 0;
            $scope.config.pagination.count = $scope.init.count;
            $scope.config.pagination.page = $scope.init.page;
        };

        /**
         * Se encarga de recuperar la lista paginada de los datos.
         * @function
         */
        $scope.getResource = function (params, paramsObj) {
            paramsObj.sortOrder = paramsObj.sortOrder == 'dsc' ? "DESC" : "ASC";
            $scope.loading = true;
            $scope.config.pagination.page = paramsObj.page == 0 ? $scope.init.page : paramsObj.page;
            $scope.config.pagination.count = paramsObj.count == 0 ? $scope.init.count : paramsObj.count;
            if (paramsObj.filters) {
                $scope.deleteUndefinedValues(paramsObj.filters);
            }
            return this.service.listar(paramsObj)
                .then(function (response) {
                    $scope.loading = false;
                    $scope.config.rows = response.data.rows;
                    $scope.config.pagination.size = response.data.count;
                    $scope.config.pagination.pages = Math.ceil(response.data.count / $scope.config.pagination.count);
                    if (response.data.count == 0) {
                        $scope.noData();
                        $scope.config.rows = [{}];
                    }
                    return $scope.config;
                }, function (response) {
                    $scope.noData();
                    $scope.config.rows = [];
                    return $scope.config;
                });
        };

        /**
         * Se encarga de aplicar los criterios de busqueda.
         */
        $scope.buscar = function () {
            $scope.filterByModel = $scope.filterBy;
        };


        /**
         * Se ecncarga de inicializar los filtros.
         * @param {[[Type]]} filters [[Description]]
         */
        $scope.initFilters = function (filters) {
            for (var key in filters) {
                $scope.filterBy[key] = filters[key];
            }
            $scope.buscar();
        }


        /**
         * Constructor / Entrypoint
         * @constructor
         */

    }
]);
