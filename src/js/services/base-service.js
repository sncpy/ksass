/*
 * @Class
 * Definición base de las operacioens CRUD de los services
 *
 * @name gfd.service#BaseService
 * @author <a href="mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.service('BaseService', ['$http', function ($http) {
    return {
        recurso: '',
        /**
         * Realiza un get para obtener la lista de paginada de lotes
         * @function
         */
        listar: function (params) {
            return $http.get(App.REST_BASE + this.recurso, {
                params: params
            });
        },

        /**
         * Realiza un post para guardar el nuevo lote
         * @function
         */
        crear: function (params) {
            return $http.post(App.REST_BASE + this.recurso, params);
        },

        /**
         * Realiza un post para actualizar la plantilla
         * @function
         */
        actualizar: function (params) {
            return $http.put(App.REST_BASE + this.recurso, params);
        },

        /**
         * Realiza un get para obtener una plantilla específica por su id.
         * @function
         */
        obtener: function (params) {
            return $http.get(App.REST_BASE + this.recurso + params.id, {
                params: params
            });
        },

        /**
         * Realiza un delete para borrar un registro específico por su id.
         * @function
         */
        eliminar: function (params) {
            return $http.delete(App.REST_BASE + this.recurso + params.id);
        }
    }
}]);
