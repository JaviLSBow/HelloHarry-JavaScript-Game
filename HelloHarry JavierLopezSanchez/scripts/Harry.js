/* SCRIPT PARA ALMACENAR LA INFORMACIÓN SOBRE HARRY DURANTE LA PARTIDA, DESARROLLADO POR JAVIER LÓPEZ SÁNCHEZ */
/* -------------------------------------------------------------------------------------------------------------------- */

/* CLASE */
class Harry{

    /* CONSTRUCTOR */
    constructor (hunger, rest){

        this.hunger = hunger;  // Hambre de Harry expresado en porcentaje (Valores posibles: 0 - 100)
        this.rest = rest;  // Descanso de Harry expresado en porcentaje (Valores posibles: 0 - 100)

    }

/* -------------------------------------------------------------------------------------------------------------------- */

    /* GETTERS Y SETTERS */

    // HAMBRE
    getHunger() { return this.hunger; }
    setHunger(new_hunger) { this.hunger = new_hunger; }

    // DESCANSO
    getRest(){ return this.rest; }
    setRest(new_rest) { this.rest = new_rest; }

}

/* -------------------------------------------------------------------------------------------------------------------- */