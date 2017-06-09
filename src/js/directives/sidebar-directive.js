/*
 * @class
 * Directiva que se encarga de dar vida al sidebar de lateral de la aplicación
 */
app.directive('sideNav', [function () {

        /**
         * Se encarga de seleccionar el enlace que corresponde a la página por que se esta
         * viendo actualmente
         * @param {DOM} el elemento donde se renderiza la directiva.
         */
        function selectLink(el) {
            var path = window.location.pathname;
            var hash = window.location.hash;
            /**
             * Se encarga de seleccionar el elemento del sidebar que se
             * esta viendo.
             */
            function select(el, target) {
                $(el).find('li a[href="' + target + '"]').parent()
                .each(function(){
                    $(el).find('li.active').removeClass("active");
                    $(this).addClass("active");
                });
            }

            select(el, path);
            select(el, hash);
        }

        /*
         * Por cada elemento del sidebar seleccionado, se le añade
         * el class active para denotar su selección
         */
        function bindEvents(element){
            $(element).find('li').click(function (e) {
                $(element).find("li.active").removeClass("active");
                $(this).addClass("active");
            });
        }

        return {
            restrict: 'C',
            scope: {
                model: '='
            },
            link: function (scope, element) {
                var $page = $(".page-wrapper");
                var clazz = "compress";



                /*
                 * Si se clickea el boton del sidebar, se colapsa o comprime
                 * los elementos para mostar una versión reducida o extendida del
                 * sidebar.
                 */
                $(element).find(".btn").click(function (e) {
                    if (!$page.hasClass(clazz)) {
                        $page.addClass(clazz);
                        $(element).addClass(clazz);
                        $(this).addClass(clazz);
                    } else {
                        $page.removeClass(clazz);
                        $(element).removeClass(clazz);
                        $(this).removeClass(clazz);
                    }
                });

                /**
                 * Si el usuario realizó colapsó o comprimió el sidebar se recupera
                 * la configuración del storage del browser, para recordar su seleccion.
                 */
                var state = "compress";
                if (state) {
                    $page.addClass(state);
                    $(element).addClass(state);
                    $(element).find(".btn").addClass(state);
                } else {
                    $page.removeClass(clazz);
                    $(element).removeClass(clazz);
                    $(element).find(".btn").removeClass(clazz);
                }


                scope.$watch('model', function () {
                    bindEvents(element)
                    selectLink(element);
                });
            }
        }
    }
]);
