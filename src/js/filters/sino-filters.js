/**
 * @class
 * Filter que implementa la traducción de los caracters boleanos.
 *
 * @name ksass.filters#sino
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py"> Maximiliano Báez </a>
 */
app.filter('sino', function() {
  return function(input) {
    return input ? 'Sí': 'No';
  };
})
