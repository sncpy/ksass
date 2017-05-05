/**
 * @namespace 
 * Agrupa los posibles tipos de cuadros de dialogos.
 */
var Message = {
    /**
     * Genera cuadros de dialogo
     * 
     * @param {Object} options Parámetros de message box.
     * @param {Object} options.title Titulo del cuadro de dialog.
     * @param {Object} options.type El tipo de dialogo que construirá.
     * @param {Object} options.body Parámetros de message box.
     */
    box: function (options) {
        var mId = "message-box";
        mId += (new Date()).getTime();
        //se construye el contenedor principal
        var $modal = $("<div class='modal' tabindex='-1' role='dialog'></div>");
        $modal.attr("id", mId);
        //se construye el contendor del dialog
        var $dialog = $("<div class='modal-dialog' role='document'></div>");
        var $content = $("<div class='alert alert-dismissible fade in' role='alert'></div>");
        $content.addClass("alert-" + options.type);

        var $header = $("<h4></h4>");
        $header.text(options.title);
        $header.append($("<button type='button' class='close' data-dismiss='modal'><span>&times;</span></button>"));

        var $body = $("<p></p>");
        $body.text(options.body);

        //se añade el dialog al body .
        $modal.append($dialog);
        $dialog.append($content);
        $content.append($header);
        $content.append($body);
        $("body").append($modal);

        /*
         * Se instancia el modal.
         */
        var $messageBox = $("#" + mId).modal();

        //cuando se cierr el dialogo se elimina el dom asociado.
        $messageBox.on("hidden.bs.modal", function (e) {
            e.currentTarget.remove();
        });

    },

    /**
     * Genera un cuadro de dialogo de éxito.
     * @function 
     * @param {object|string} options En caso de ser un string es el mensaje del dialogo. 
     *                                En caso contrario se presume que el json de 
     *                                configuraciones del messagebox.
     */
    ok: function (options) {
        options = typeof options == "string" ? {
            body: options
        } : options;

        options.type = "success";
        options.title = !options.title ? "Éxito!" : options.title;
        this.box(options);
    },

    /**
     * Genera un cuadro de dialogo de error.
     * @function 
     * @param {object|string} options En caso de ser un string es el mensaje del dialogo. 
     *                                En caso contrario se presume que el json de 
     *                                configuraciones del messagebox.
     */
    error: function (options) {
        options = typeof options == "string" ? {
            body: options
        } : options;
        options.type = "danger";
        options.title = !options.title ? "Error!" : options.title;
        this.box(options);
    },

    /**
     * Genera un cuadro de dialogo de aviso.
     * @function 
     * @param {object|string} options En caso de ser un string es el mensaje del dialogo. 
     *                                En caso contrario se presume que el json de 
     *                                configuraciones del messagebox.
     */
    info: function (options) {
        options = typeof options == "string" ? {
            body: options
        } : options;
        options.type = "info";
        options.title = !options.title ? "Aviso!" : options.title;
        this.box(options);
    },

    /**
     * Genera un cuadro de dialogo de atención.
     * @function 
     * @param {object|string} options En caso de ser un string es el mensaje del dialogo. 
     *                                En caso contrario se presume que el json de 
     *                                configuraciones del messagebox.
     */
    warning: function (options) {
        options = typeof options == "string" ? {
            body: options
        } : options;
        options.type = "warning";
        options.title = !options.title ? "Atención!" : options.title;
        this.box(options);
    }
}
