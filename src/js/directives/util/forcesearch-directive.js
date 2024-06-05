/*
 * @class
 * Directiva que se encarga de mostrar un mensaje cuando no hay
 * datos para las visualizaciones.
 */
app.directive('forceSearch', [
  function () {
    return {
      restrict: 'E',
      template:
        '<div class="no-data"><i class="fa fa-search"></i><br/>Para cargar la tabla debe aplicar un filtro y seleccionar la opción de buscar. </div>',
      scope: {},
      link: function (scope, element) {
        return;
      }
    };
  }
]);
