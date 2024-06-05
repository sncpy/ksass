/*
 * @class
 * Directiva que se encarga de mostrar un mensaje cuando no hay
 * datos para las visualizaciones.
 */
app.directive('noData', [
  function () {
    return {
      restrict: 'E',
      template: '<div class="no-data"><i class="fa fa-low-vision"></i><br/>No hay datos disponibles</div>',
      scope: {},
      link: function (scope, element) {
        return;
      }
    };
  }
]);
