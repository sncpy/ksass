/**
 * @class
 * Controller que implementa la busqueda y listado de lotes.
 *
 * @name gfd.controller#LoteListCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py"> Maximiliano Báez </a>
 */
app.controller('BaseListCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    /**
     *
     */
    $scope.path = $location.$$path;

    /**
     * Maneja el estado de la grilla, si es true no se caga por defecto
     */
    $scope.lazy = false;

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
      count: 20,
      page: 1,
      sortBy: 'id',
      sortOrder: 'DESC',
      filterBase: 1
    };

    /**
     * Se encarga de limpiar los criterios del filtrado.
     * @function
     */
    $scope.limpiar = function () {
      $scope.filterBy = {};
      $scope.filterByModel = {};
    };

    /**
     * Array que contiene los datos de configuración de la grilla
     * @type Array
     * @field
     */
    $scope.config = {
      rows: [],
      pagination: {
        count: $scope.init.count,
        page: $scope.init.page,
        pages: 0,
        size: 0
      },
      ssortBy: $scope.init.sortBy,
      sortOrder: $scope.init.sortOrder
    };

    /**
     * Elimina los elementos del objeto que son nulos
     * @function
     */
    $scope.deleteUndefinedValues = function (object) {
      for (var key in object) {
        if (typeof object[key] == 'undefined' || object[key].length == 0) {
          delete object[key];
        }
      }
    };

    /*
     * Se encarga de eliminar el recurso
     * @function
     */
    $scope.eliminar = function (recurso) {
      if (window.confirm('¿Está seguro de eliminar el recurso?'))
        this.service.eliminar(this.getPrimaryKey(recurso)).then(eliminarRecursoSuccess, eliminarRecursoError);
    };

    function eliminarRecursoSuccess(response) {
      Message.ok('El registro se ha eliminado exitosamente.');
      $location.url($scope.path + '/');
    }

    function eliminarRecursoError(data) {
      Message.error('No se pudo realizar la operación');
    }

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
     * Encapsula la invocación al service.
     */
    $scope.listar = function (paramsObjs) {
      return this.service.listar(paramsObjs);
    };

    $scope.emptyResponse = function () {
      $scope.noData();
      $scope.config.rows = [{}];
      var p = new Promise();
      p.resolve($scope.config);
      return p;
    };
    /**
     * Se encarga de recuperar la lista paginada de los datos.
     * @function
     */
    $scope.getResource = function (params, paramsObj) {
      $scope.initHeader($scope.config.header);
      paramsObj.sortOrder = paramsObj.sortOrder == 'dsc' ? 'DESC' : 'ASC';
      $scope.loading = true;
      $scope.config.pagination.page = paramsObj.page == 0 ? $scope.init.page : paramsObj.page;
      $scope.config.pagination.count = paramsObj.count == 0 ? $scope.init.count : paramsObj.count;
      if (paramsObj.filters) {
        $scope.deleteUndefinedValues(paramsObj.filters);
      }
      if ($scope.lazy) {
        $scope.emptyResponse();
      }
      return $scope.listar(paramsObj).then(
        function (response) {
          $scope.loading = false;
          $scope.config.rows = response.data.rows;
          $scope.config.pagination.size = response.data.count;
          $scope.config.pagination.pages = Math.ceil(response.data.count / $scope.config.pagination.count);
          if (response.data.count == 0) {
            $scope.noData();
            $scope.config.rows = [{}];
          }
          return $scope.config;
        },
        function (response) {
          $scope.noData();
          $scope.config.rows = [];
          return $scope.config;
        }
      );
    };

    /**
     * Se encarga de aplicar los criterios de busqueda.
     */
    $scope.buscar = function () {
      $scope.lazy = false;
      $scope.filterByModel = angular.copy($scope.filterBy);
    };

    /**
     * Se ecncarga de inicializar los filtros.
     * @param {[[Type]]} filters [[Description]]
     */
    $scope.initFilters = function (filters) {
      $scope.filterBy = angular.copy(filters);
      $scope.setQueryParamsFilters();
      $scope.buscar();
    };

    /**
     * Este metodo se encarga de setear los filtros que son enviados vía
     * query params.
     */
    $scope.setQueryParamsFilters = function () {
      var queryParams = $location.search();
      for (var key in queryParams) {
        $scope.filterBy[key] = queryParams[key];
      }
    };
    /**
     * Se encarga de inicializar las columnas
     * @param {*} header
     */
    $scope.initHeader = function (header) {
      for (var idx in header) {
        var key = header[idx].key;
        header[idx].class = [];
        header[idx].class.push(key);
        header[idx].visible = typeof header[idx].visible == 'undefined' ? true : header[idx].visible;
        if (header[idx].visible == false) {
          header[idx].class.push('tasty-head-invisible');
        }
      }
      return header;
    };

    /**
     * Se encarga de verificar si un elemento es visible o no
     * @param {*} key
     */
    $scope.hasHeader = function (key) {
      for (var idx in $scope.config.header) {
        if ($scope.config.header[idx].key == key && $scope.config.header[idx].visible) {
          return true;
        }
      }
      return false;
    };

    /**
     * Se encarga de marcar una columna como visible o no
     * @param {*} key
     */
    $scope.setVisible = function (key, flag) {
      $scope.config.header.find(function (item) {
        if (item.key == key) {
          item.visible = flag;
        }
      });
      if (flag) {
        $('.' + key).removeClass('tasty-head-invisible');
      } else {
        $('.' + key).addClass('tasty-head-invisible');
      }
    };

    /**
     * Constructor / Entrypoint
     * @constructor
     */
    (function initilize() {
      $scope.setQueryParamsFilters();
    })();
  }
]);
