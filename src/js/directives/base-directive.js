/**
 * @mail     <a href="mailto:juan.benitez@konecta.com.py"/>
 * @author   <a juan benitez</>
 */

/**
 * directiva Base para las grillas con filtrado
 */
app.directive('listaDirective', function () {
    return {
        restrict: 'E',
        transclude: {
            'filtros': '?filtros',
            'titulo': '?titulo',
            'descripcion': '?descripcion',
            'tabla': '?tabla',
            'footerTabla':'?footerTabla'
        },
        replace: true,
        templateUrl: '../partials/templates/list-template.html'
    };
});

/**
 * Directiva Base para los formularios de carga y edición
 */
app.directive('formDirective', function () {
    return {
        restrict: 'E',
        transclude: {
            'titulo': '?titulo',
            'descripcion': '?descripcion',
            'form': '?form'
        },
        replace: true,
        templateUrl: '../partials/templates/form-template.html'
    };
});

/**
 * Directiva Base para los pantallas de visualizacion
 */
app.directive('viewDirective', function () {
    return {
        restrict: 'E',
        transclude: {
            'titulo': '?titulo',
            'descripcion': '?descripcion',
            'view': '?view'
        },
        replace: true,
        templateUrl: '../partials/templates/view-template.html'
    };
});