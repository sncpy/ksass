/**
 * Esta clase se encarga de gestionar el breadcrumb
 *
 * @class
 * @name breadcrumb-directive
 * @author <a href="mailto:juan.benitez@konecta.com.py">Juan Benitez</a>
 */

app.directive('breadcrumbDirective', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: '../partials/templates/breadcrumb.html',
        controller: function ($scope, $location, $route) {
            var pathElements = $location.path().split('/'),
                result = [],
                i;
            pathElements[0] = '/';
            /*
             * Carga las rutas para que pueda ser leidas por el ng-repeat
             */
            var path = "";
            pathId = false;
            for (var i = 0; i < pathElements.length; i++) {
                pathElements[i] = pathElements[i].trim();
                var last = pathElements.indexOf(pathElements[i]) == (pathElements.length - 1);
                if (pathElements[i] == "" || (path[path.length - 1] != '/')) {
                    path += '/';
                }
                // Esto comprueba ID es entero o float y anexa ": id" a la ruta  
                if ((parseFloat(pathElements[i]) == parseInt(pathElements[i])) && !isNaN(pathElements[i])) {
                    path += ":id";
                    pathId = true;
                } else if (path != "/" && pathElements[i] != "agregar" && i == 3 &&
                    (pathElements[i + 1] == "editar" || pathElements[i + 1] == "ver")) {
                    path += ":id";
                    pathId = true;
                } else {
                    if (pathElements[i] != '/') {
                        path += pathElements[i];
                    }
                }
                if ($route.routes.hasOwnProperty(path)) {
                    var titulo = $route.routes[path].titulo;
                    if (titulo) {
                        (last) ? badge = (pathId)? i-1:i: badge = null
                        result.push({
                            name: $route.routes[path].titulo,
                            path: '#!' + path,
                            badge: badge
                        });
                    }
                }
            }
            $scope.breadcrumbs = result;
        }
    }
});