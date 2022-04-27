/* SCRIPT PARA ALMACENAR LAS ESTADÍSTICAS QUE SE MOSTRARÁN TRAS EL FIN DE LA PARTIDA, DESARROLLADO POR JAVIER LÓPEZ SÁNCHEZ */
/* -------------------------------------------------------------------------------------------------------------------- */

/* CLASE */
class Stats extends Harry{

    /* CONSTRUCTOR */
    constructor (hunger, rest, time, reason){

        // LLAMADA AL CONSTRUCTOR DE HARRY
        super(hunger, rest);

        // INICIALIZACIÓN DE VALORES PROPIOS
        this.time = time;  // Tiempo que dura la partida
        this.reason_of_losing = reason  // Causa del fin de la partida

    }

/* -------------------------------------------------------------------------------------------------------------------- */

    /* GETTERS Y SETTERS */

    // TIEMPO
    getTime() { return this.time; }
    setTime(new_time){ this.time = new_time; }

    // CAUSA DEL FIN DE LA PARTIDA
    getReason() { return this.reason; }
    setReason(new_reason){ this.reason = new_reason; }

}
/* -------------------------------------------------------------------------------------------------------------------- */
