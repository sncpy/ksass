/*
 * @class
 * Directiva que se encarga de dar vida al sidebar de lateral de la aplicación
 */
app.directive('sideNav', [function () {
        return {
            restrict: 'C',
            scope: {},
            link: function (scope, element) {
                var $page = $(".page-wrapper");
                var clazz = "compress";
                /*
                 * Por cada elemento del sidebar seleccionado, se le añade
                 * el class active para denotar su selección
                 */
                $(element).find('li').click(function (e) {
                    $(element).find("li.active").removeClass("active");
                    $(this).addClass("active")
                });

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
                        localStorage.setItem("sidebar", clazz);
                    } else {
                        $page.removeClass(clazz);
                        $(element).removeClass(clazz);
                        $(this).removeClass(clazz);
                        localStorage.removeItem("sidebar");
                    }
                });

                /**
                 * Si el usuario realizó colapsó o comprimió el sidebar se recupera
                 * la configuración del storage del browser, para recordar su seleccion.
                 */
                var state = localStorage.getItem("sidebar");
                if (state) {
                    $page.addClass(state);
                    $(element).addClass(state);
                    $(element).find(".btn").addClass(state);
                } else {
                    $page.removeClass(clazz);
                    $(element).removeClass(clazz);
                    $(element).find(".btn").removeClass(clazz);
                }
            }
        }
    }
]);
