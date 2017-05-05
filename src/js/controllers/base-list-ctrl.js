/**
 * @class
 * Controller que implementa la busqueda y listado de lotes.
 *
 * @name gfd.controller#LoteListCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py"> Maximiliano Báez </a>
 */
app.controller('BaseListCtrl', ['$scope',
    function ($scope, service) {

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
         * Se encarga de recuperar la lista paginada de los datos.
         * @function
         */
        $scope.getResource = function (params, paramsObj) {
            paramsObj.sortOrder = paramsObj.sortOrder == 'dsc' ? "DESC" : "ASC";
            return this.service.listar(paramsObj)
                .then(function (response) {
                    $scope.config.rows = response.data.rows;
                    $scope.config.pagination.size = response.data.count;
                    $scope.config.pagination.pages = Math.ceil(response.data.total / $scope.config.pagination.count);
                    return $scope.config;
                });
        };


        /**
         * Constructor / Entrypoint
         * @constructor
         */

    }
]);
