/**
 * @mail     <a href="mailto:juan.benitez@konecta.com.py"/>
 * @author   <a juan benitez</>
 */

/**
 * Se encarga de extraer la url base del spa
 * @param   {angular.service} $location angular location
 * @returns {String} la url de path base del spa.
 */
function getSPABasePath($location) {
    var fullPath = window.location.pathname;
    var appPath = $location.path();
    return fullPath.replace(appPath, "")
};

/**
 * directiva Base para las grillas con filtrado
 */
app.directive('listaDirective', ['$location', function ($location) {
    return {
        restrict: 'E',
        transclude: {
            'filtros': '?filtros',
            'titulo': '?titulo',
            'descripcion': '?descripcion',
            'tabla': '?tabla',
            'footerTabla': '?footerTabla'
        },
        replace: true,
        templateUrl: getSPABasePath($location) + 'partials/templates/list-template.html'
    };
}]);

/**
 * Directiva Base para los formularios de carga y edición
 */
app.directive('formDirective', ['$location', function ($location) {
    return {
        restrict: 'E',
        transclude: {
            'titulo': '?titulo',
            'descripcion': '?descripcion',
            'form': '?form',
            'buttonSubmit': '?buttonSubmit',
            'footerForm': '?footerForm'
        },
        replace: true,
        templateUrl: getSPABasePath($location) + 'partials/templates/form-template.html'
    };
}]);

/**
 * Directiva Base para los pantallas de visualizacion
 */
app.directive('viewDirective', ['$location', function ($location) {
    return {
        restrict: 'E',
        transclude: {
            'titulo': '?titulo',
            'descripcion': '?descripcion',
            'view': '?view'
        },
        replace: true,
        templateUrl: getSPABasePath($location) + 'partials/templates/view-template.html'
    };
}]);
