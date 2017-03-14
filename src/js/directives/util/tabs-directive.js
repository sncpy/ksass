/*
 * @class
 * Directiva que se encarga de habilitar los tabs.
 * @see http://getbootstrap.com/javascript/#tabs
 */
app.directive('navTabs', [function () {
        return {
            restrict: 'C',
            scope: {},
            link: function (scope, element) {
                $(element).find('a').click(function (e) {
                    e.preventDefault();
                    $(this).tab('show');
                })
            }
        }
    }
]);
