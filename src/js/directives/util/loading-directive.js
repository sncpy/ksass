/*
 * @class
 * Directiva que se encarga de mostrar un mensaje cuando no hay 
 * datos para las visualizaciones.
 */
app.directive('loading', [function () {
        return {
            restrict: 'E',
            template: ' <br/><br/><br/><br/><div class="loading"><img src="/images/cargando.gif"><br/><p>Cargando...</p></div>',
            scope: {},
            link: function (scope, element) {
                return;
            }
        }
    }
]);
