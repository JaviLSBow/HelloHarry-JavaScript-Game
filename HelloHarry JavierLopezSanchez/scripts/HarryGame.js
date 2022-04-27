/* SCRIPT PRINCIPAL DEL JUEGO "HELLO HARRY" DESARROLLADO POR JAVIER LÓPEZ SÁNCHEZ */
/* -------------------------------------------------------------------------------------------------------------------- */

/* DESCRIPCIÓN (README)

HelloHarry es un juego desarrollado por Javier López Sánchez para la asignatura Introducción a la Programación y Desarrollo
de Videojuegos I del máster en Diseño y Desarrollo de Videojuegos de la Universidad Internacional de la Rioja.

INSTRUCCIONES
-----------------------------------------------------------------------------------------
Para empezar a jugar el jugador debe pulsar "Start". El botón "Restart" nos permite recargar la página.
Tras una breve introducción, el jugar debe alimentar a Harry con el botón "Alimentar" para que el indicador de hambre no llegue al 100%.
Con pulsar una vez el botón Harry empezará a comer hasta que indiquemos lo contrario.
Mientras come no descansa así que cuando el jugador lo crea prudente debe quitarle la comida con el botón diseñado para tal fin.
Si el medidor de hambre llega al 100% 3 veces o el medidor de descanso llega a 0% 3 veces el jugador pierde.

Al perder el juego podemos ver las estadísticas de la partida (hambre y descanso final, tiempo que hemos aguantado y causa de la derrota).
¡Siempre se puede intentar mejorar nuestra marca!

NOTA: La dificultad se modifica desde el script si se quiere aunque lo normal es jugar en difícil (valor por defecto).
NOTA 2: El juego tiene música y voz así que requiere tener el audio activado. Si está algo desincronizado la primera vez que se abre,
se soluciona recargando la página.
NOTA 3: Se ha comprobado el funcionamiento del juego en Edge y especialmente en Chrome a un tamaño de página del 100% para que se
puedan ver los botones en la parte inferior

Créditos
-------------
Sprites y Voz: Javier López Sánchez (usando Paint y Audacity)
Música: https://www.fesliyanstudios.com/music-search.php?q=trailer&device=desktop
Ayuda: W3SCHOOLS y STACKOVERFLOW

VÍDEO DEMOSTRATIVO DEL JUEGO: https://youtu.be/RTOq23lZlAE

*/

/* CLASE */
class HarryGame{

    /* CONSTRUCTOR */

    constructor(){

        this.harry = new Harry(50, 50); // Instanciación de Harry (se pueden modificar los valores que se pasan)
        this.statistics = new Stats();  // Instanciación de las estadísticas (se usará al final de la partida)

        this.difficulty = 1000;  // Dificultad inicial (1000 para que empiece despacio y vaya ascendiendo progresivamente)

        this.is_feeding = false;  // Flag para comprobar si estamos alimentando a Harry

        // VALORES PARA CONTROLAR LA DERROTA
        this.is_hungry = 0;  // Variable para contar cuantas veces Harry ha llegado al 100% de hambre (3 = derrota)
        this.is_sleepy = 0;  // Variable para contar cuantas veces Harry ha llegado al 0% de descanso (3 = derrota)
        this.has_lost = false;  // Flag para controlar si se cumple alguna de las dos condiciones previas

    }

/* -------------------------------------------------------------------------------------------------------------------- */

    /* MÉTODOS PARA COMPROBAR SI EL JUEGO DEBE ACABAR */

    // MÉTODO PARA COMPROBAR SI HARRY NECESITA COMIDA
    needs_food(){

        if (this.harry.hunger > 75){  // Revisar si Harry tiene hambre (> 75%)

            document.querySelector("#hungry_audio").play();  // Poner aviso de Harry (Aviso de hambre)

            document.querySelector("#hunger_value").style.color = "#FF0000";  // Cambiar a rojo la etiqueta del html

            // SI HARRY TIENE EL MEDIDOR AL 100% TENEMOS NUESTRO PRIMER AVISO Y SE BAJA UN POCO EL MEDIDOR DE HAMBRE PARA QUE PODAMOS RECUPERARNOS
            if(this.harry.hunger == 100){
                this.is_hungry++;
                this.harry.hunger -= 50;
            }

            return true;  // Devolvemos que tiene hambre

        }

        else{

            document.querySelector("#hunger_value").style.color = "#000000";    // Cambiar a negro la etiqueta del html
            
            return false;  // Devolvemos que no tiene hambre

        }

    }

    // MÉTODO PARA COMPROBAR SI HARRY NECESITA DESCANSO
    needs_rest(){

        if (this.harry.rest < 25){  // Revisar si Harry necesita descanso (< 25%)

            document.querySelector("#sleepy_audio").play();  // // Poner aviso de Harry (Aviso de sueño)

            document.querySelector("#rest_value").style.color = "#FF0000";  // Cambiar a rojo la etiqueta del html

            // SI HARRY TIENE EL MEDIDOR AL 0% TENEMOS NUESTRO PRIMER AVISO Y SE SUBE UN POCO EL MEDIDOR DE DESCANSO PARA QUE PODAMOS RECUPERARNOS
            if(this.harry.rest == 0){
                this.is_sleepy++;
                this.harry.rest += 50;
            }

            return true;  // Devolvemos que tiene sueño

        }

        else{

            document.querySelector("#rest_value").style.color = "#000000";    // Cambiar a negro la etiqueta del html

            return false;  // Devolvemos que no tiene sueño

        }

    }

    // MÉTODO PARA MANEJAR LA DERROTA
    do_losing = async () => {

        // SE RECOGE EL HAMBRE Y EL DESCANSO Y SE ALMACENA EN NUESTRO OBJETO DE ESTADÍSTICAS
        this.statistics.hunger = this.harry.hunger;
        this.statistics.rest = this.harry.rest;

        // OBTENEMOS EL TIEMPO QUE HA SOBREVIVIDO EL JUGADOR A PARTIR DEL TIEMPO REGISTRADO EN EL QUE INICIO LA PARTIDA
        this.statistics.time = Math.round((new Date().getTime() - this.initial_time) / 1000);

        // ESTABLECEMOS LA RAZÓN DE LA DERROTA (HAMBRE, SUEÑO O AMBOS)
        if(this.is_hungry >= 3 && this.is_sleepy >= 3) this.statistics.reason = "HARRY TIENE HAMBRE Y CANSANCIO";
        else if(this.is_hungry >= 3) this.statistics.reason = "HARRY TIENE HAMBRE";
        else if(this.is_sleepy >= 3) this.statistics.reason = "HARRY TIENE CANSANCIO";

        // MOSTRAMOS LAS ESTADÍSTICAS POR PANTALLA (REEMPLAZANDO LA INFORMACIÓN MOSTRADA DURANTE EL JUEGO)
        document.querySelector("#hunger_value").innerHTML = "HAMBRE: " + this.statistics.hunger + "%";
        document.querySelector("#rest_value").innerHTML = "DESCANSO: " + this.statistics.rest + "%";
        document.querySelector("#time_value").innerHTML = "TIEMPO: " + this.statistics.time + " SEGUNDOS";
        document.querySelector("#reason_value").innerHTML = "CAUSA: " + this.statistics.reason;
        document.querySelector("#help_info").innerHTML = "";

        // ANIMACIÓN DE DERROTA
        
        document.querySelector("#losing_audio").play();  // Se inicia el audio de la derrota

        // TERCER DIÁLOGO TENEBROSO
        current_image.src = harry_images_urls[11];
        await sleep (100);
        current_image.src = harry_images_urls[12];
        await sleep (400);
        current_image.src = harry_images_urls[11];
        await sleep (250);
        current_image.src = harry_images_urls[12];
        await sleep (500);
        current_image.src = harry_images_urls[11];
        await sleep (250);
        current_image.src = harry_images_urls[12];
        await sleep (250);
        current_image.src = harry_images_urls[11];
        await sleep (250);
        current_image.src = harry_images_urls[12];
        await sleep (1500);
        current_image.src = harry_images_urls[11];
        
    }

/* -------------------------------------------------------------------------------------------------------------------- */

    /* MÉTODOS PARA ASEGURAR EL BIENESTAR DE HARRY */

    // MÉTODO PARA ALIMENTAR A HARRY AL PULSAR DICHO BOTÓN
    feeding = async () => {

        document.querySelector("#feed_button").disabled = true;  // Desactivamos el botón para que no se active esta rutina cada vez que lo pulsamos

        if(!this.has_lost){  // Si aún no hemos perdido

            document.querySelector("#feeding_audio").play();  // Harry se pone contento de recibir comida (audio)

            this.is_feeding = true;  // Indicamos que estamos alimentando a Harry

            while(this.harry.hunger > 0 && this.is_feeding){  // Si Harry tiene hambre y le estamos alimentando

                if(this.harry.hunger > 0){  // Reducimos el hambre siempre que sea mayor que 0
                    // SI EL VALOR ES MENOR QUE 0 LO PONEMOS COMO 0 SI NO, PONEMOS EL VALOR
                    if(this.harry.hunger -1.5 > 0) this.harry.hunger -= 1.5;  // El hambre se reduce de 1,5 en 1,5
                    else this.harry.hunger = 0;
                }

                if(this.harry.rest > 0){  // Reducimos el descanso siempre que sea mayor que 0
                    // SI EL VALOR ES MENOR QUE 0 LO PONEMOS COMO 0 SI NO, PONEMOS EL VALOR
                    if(this.harry.rest - 1 > 0) this.harry.rest--;  // El descanso se reduce de 1 en 1
                    else this.harry.rest = 0;

                }

                current_image.src = harry_images_urls[4];  // Se pone la primera imagen de la animación de comer

                await sleep (this.difficulty / 2);  // Se espera la mitad del tiempo

                current_image.src = harry_images_urls[5];  // Se pone la segunda imagen de la animación de comer

                await sleep (this.difficulty / 2);  // Se espera la mitad del tiempo

            }

            current_image.src = harry_images_urls[2];  // Volvemos a poner la imagen por defecto de Harry

            this.is_feeding = false;  // Indicamos que ya no estamos alimentando a Harry
            
        }

        document.querySelector("#feed_button").disabled = false;  // Reactivamos el botón

    }

    // MÉTODO PARA DEJAR DE ALIMENTAR A HARRY
    stop_feeding() {

        document.querySelector("#rest_button").disabled = true;  // Desactivamos el botón para que no se active esta rutina cada vez que lo pulsamos
        
        if(!this.has_lost){  // Si aún no hemos perdido

            document.querySelector("#stop_feeding_audio").play();  // Harry se pone triste de no recibir comida (audio)

            this.is_feeding = false;  // Indicamos que ya no estamos alimentando a Harry

        }

        document.querySelector("#rest_button").disabled = false;  // Reactivamos el botón

    }

/* -------------------------------------------------------------------------------------------------------------------- */

    /* MÉTODOS QUE REGULAN LA LÓGICA PRINCIPAL DEL JUEGO */

    // MÉTODO PARA INCREMENTAR EL HAMBRE Y REDUCIR EL DESCANSO AUTOMÁTICAMENTE
    increaseHungerAndReduceRest = async () => {

        if(!this.has_lost){  // Si aún no hemos perdido

            if(this.harry.hunger < 100 && !this.is_feeding){  // Si Harry tiene hambre y no le estamos alimentando
                // SI EL VALOR ES MAYOR QUE 100 LO PONEMOS COMO 1000 SI NO, PONEMOS EL VALOR
                if(this.harry.hunger + 2 < 100) this.harry.hunger += 2;  // El hambre se incrementa de 2 en 2 (para asegurar la dificultad y desafío del juego)
                else this.harry.hunger = 100;
            }

            if(this.harry.rest < 100 && !this.is_feeding){  // Si Harry tiene sueño y no le estamos alimentando
                // SI EL VALOR ES MAYOR QUE 100 LO PONEMOS COMO 1000 SI NO, PONEMOS EL VALOR
                if(this.harry.rest + 1 < 100) this.harry.rest++;  // El descanso se incrementa de 1 en 1
                else this.harry.rest = 100;
            }

            // ACTUALIZAR LOS VALORES POR PANTALLA
            document.querySelector("#hunger_value").innerHTML = "HAMBRE: " + this.harry.hunger + "%";
            document.querySelector("#rest_value").innerHTML = "DESCANSO: " + this.harry.rest + "%";

            // LLAMAMOS A LAS FUNCIONES DE CHEQUEO, CONTROLAMOS LA IMAGEN DE LA PANTALLA y TRAS ESO COMPROBAMOS SI HEMOS PERDIDO
            if(this.needs_food() && !this.is_feeding) current_image.src = harry_images_urls[9];
            else if(this.needs_rest() && !this.is_feeding) current_image.src = harry_images_urls[8];
            else if(!this.is_feeding) current_image.src = harry_images_urls[2];
            if(this.is_hungry >= 3 || this.is_sleepy >= 3) this.has_lost = true;

            // TRAS UN TIEMPO QUE VARÍA EN FUNCIÓN DE LA DIFICULTAD REINICIAMOS EL PROCESO
            await sleep (this.difficulty);
            this.increaseHungerAndReduceRest();

        }

        else this.do_losing();  // Si hemos perdido se llama a la rutina que maneja la derrota

    }

    // MÉTODO PARA INCREMENTAR GRADUALMENTE LA DIFICULTAD DESDE EL INICIO DEL JUEGO
    increase_difficulty = async () => {

        await sleep (30000);  // Duración de la introducción (30 segundos aproximandamente)

        // Incremento gradual de la dificultad cada 10 segundos

        await sleep (10000);
        this.difficulty -= 50;

        await sleep (10000);
        this.difficulty -= 100;

        await sleep (10000);
        this.difficulty -= 150;

        await sleep (10000);
        this.difficulty -= 200;

        await sleep (10000);
        this.difficulty -= 200;

        await sleep (10000);
        this.difficulty -= 200;

    }

/* -------------------------------------------------------------------------------------------------------------------- */

    /* MÉTODOS DE LA ANIMACIÓN INTRODUCTORIA */

    // MÉTODO PARA HACER SONAR LOS AUDIOS DESDE EL COMIENZO
    play_intro_audio()
    {

        // SE INICIA LA MÚSICA QUE PERMANECERÁ EN BUCLE Y SE REGULA EL VOLUMEN PARA CUADRARLO CON LA VOZ DE HARRY
        this.background_music = document.querySelector("#music_audio");
        this.background_music.volume = 0.375;
        this.background_music.loop = true;
        this.background_music.play();

        // SE INICIA EL AUDIO INTRODUCTORIO DE HARRY
        this.intro_audio = document.querySelector("#intro_audio");
        this.intro_audio.play();
        
    }

    // MÉTODO PARA CONTROLAR LA ANIMACIÓN INTRODUCTORIA (PARTE VISUAL)
    introduction_animation_controller = async () => {

        // PARPADEO INIICIAL
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (500);
        current_image.src = harry_images_urls[2];

        // PRIMER DIÁLOGO
        await sleep (750);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (750);
        current_image.src = harry_images_urls[2];

        // SEGUNDO DIÁLOGO
        await sleep (500);
        current_image.src = harry_images_urls[3];
        await sleep (750);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];

        // TERCER DIÁLOGO
        await sleep (750);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (500);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (500);
        current_image.src = harry_images_urls[4];

        // CUARTO DIÁLOGO
        await sleep (500);
        current_image.src = harry_images_urls[2];
        await sleep (500);
        current_image.src = harry_images_urls[3];
        await sleep (500);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (250);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (500);
        current_image.src = harry_images_urls[2];

        // DESHABILITAR VOLUMEN DE LA MÚSICA TEMPORALMENTE
        await sleep (275);
        this.background_music.volume = 0;

        // PRIMER DIÁLOGO TENEBROSO
        current_image.src = harry_images_urls[11];
        await sleep (100);
        current_image.src = harry_images_urls[12];
        await sleep (400);
        current_image.src = harry_images_urls[11];
        await sleep (250);
        current_image.src = harry_images_urls[12];
        await sleep (500);
        current_image.src = harry_images_urls[11];
        await sleep (250);
        current_image.src = harry_images_urls[12];
        await sleep (250);
        current_image.src = harry_images_urls[11];
        await sleep (250);
        current_image.src = harry_images_urls[12];
        await sleep (1500);
        current_image.src = harry_images_urls[11];

        // QUINTO DIÁLOGO
        await sleep (375);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (300);
        current_image.src = harry_images_urls[4];

        // SEXTO DIÁLOGO
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (100);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (200);
        current_image.src = harry_images_urls[4];

        // SÉPTIMO DIÁLOGO
        await sleep (200);
        current_image.src = harry_images_urls[3];
        await sleep (200);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (750);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (100);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];

        // REACTIVAR VOLUMEN DE LA MÚSICA
        this.background_music.volume = 0.375;

        // OCTAVO DIÁLOGO
        await sleep (1000);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        await sleep (300);
        current_image.src = harry_images_urls[2];
        await sleep (100);
        current_image.src = harry_images_urls[3];
        
        // SEGUNDO DIÁLOGO TENEBROSO
        await sleep (500);
        current_image.src = harry_images_urls[11];
        await sleep (100);
        current_image.src = harry_images_urls[12];
        await sleep (200);
        current_image.src = harry_images_urls[11];
        await sleep (200);
        current_image.src = harry_images_urls[12];
        await sleep (200);
        current_image.src = harry_images_urls[11];
        await sleep (200);
        current_image.src = harry_images_urls[12];
        await sleep (500);
        current_image.src = harry_images_urls[11];

        // NOVENO DIÁLOGO
        await sleep (500);
        current_image.src = harry_images_urls[2];
        await sleep (500);
        current_image.src = harry_images_urls[4];
        await sleep (100);
        current_image.src = harry_images_urls[5];
        await sleep (250);
        current_image.src = harry_images_urls[4];
        await sleep (1000);
        current_image.src = harry_images_urls[5];
        await sleep (250);
        current_image.src = harry_images_urls[4];

        // SE ESTABLECE LA IMAGEN DE HARRY POR DEFECTO PARA INICIAR EL JUEGO
        await sleep (1000);
        current_image.src = harry_images_urls[2];

        // SE REACTIVA EL BOTÓN DE ALIMENTAR Y SE AÑADE EL LISTENER CON LA FUNCIÓN DE "ALIMENTAR"
        document.querySelector("#feed_button").disabled = false;  // Activar el botón
        document.querySelector("#feed_button").style.display = "inline-block";  // Mostrar el botón en la pantalla
        document.querySelector("#feed_button").addEventListener("click",this.feeding.bind(this));

        // SE REACTIVA EL BOTÓN DE DEJAR DE ALIMENTAR Y SE AÑADE EL LISTENER CON LA FUNCIÓN DE "DEJAR DE ALIMENTAR"
        document.querySelector("#rest_button").disabled = false;  // Activar el botón
        document.querySelector("#rest_button").style.display = "inline-block";  // Mostrar el botón en la pantalla
        document.querySelector("#rest_button").addEventListener("click",this.stop_feeding.bind(this));

        // OBTENER EL TIEMPO EN SEGUNDOS EN EL QUE SE INICIA EL JUEGO
        this.initial_time = new Date().getTime();

        // ARRANCAR LA FUNCIONALIDAD DEL JUEGO
        this.increaseHungerAndReduceRest();

    }

/* -------------------------------------------------------------------------------------------------------------------- */

    /* MÉTODOS PARA CONTROLAR EL ARRANQUE DEL JUEGO TRAS LA CARGA COMPLETA DE LA PÁGINA */

    // MÉTODO PARA COTROLAR EL INICIO DEL JUEGO TRAS PULSAR EL BOTÓN "START"
    start_routine(){

        // DESHABILITAR BOTÓN
        document.getElementById("start_button").disabled = true;  // Desactivar el botón
        document.getElementById("start_button").style.display = "none";  // Ocultar el botón en la pantalla
        
        // LLAMADA A LOS MÉTODOS QUE CONTROLAN LA ANIMACIÓN INICIAL
        this.play_intro_audio();  // Método que activa el audio
        this.introduction_animation_controller();  // Método que controla la parte visual

    }

    // MÉTODO PARA RECARGAR LA PÁGINA AL PULSAR "RESTART"
    restart_routine(){

        location.reload();  // Recargar la página

    }

    // MÉTODO PARA CREAR LA CONFIGURACIÓN INICIAL DEL JUEGO
    initial_configuration(){

        // AÑADIR TODAS LAS FOTOS DE HARRY AL ARRAY
        harry_images_urls[0] = './harryimages/HappyHarryEmpty.png';
        harry_images_urls[1] = './harryimages/HappyHarryDefault.png';
        harry_images_urls[2] = './harryimages/HappyHarryDefaultMouthClosed.png';
        harry_images_urls[3] = './harryimages/HappyHarryDefaultMouthOpen.png';
        harry_images_urls[4] = './harryimages/HappyHarryHappy.png';
        harry_images_urls[5] = './harryimages/HappyHarryHappyHandsUp.png';
        harry_images_urls[6] = './harryimages/HappyHarrySad.png';
        harry_images_urls[7] = './harryimages/HarryDark.png';
        harry_images_urls[8] = './harryimages/HarryDefault.png';
        harry_images_urls[9] = './harryimages/HarryHappy.png';
        harry_images_urls[10] = './harryimages/HarryScaryEmpty.png';
        harry_images_urls[11] = './harryimages/HarryScaryMouthClosed.png';
        harry_images_urls[12] = './harryimages/HarryScaryMouthOpen.png';
        
        // ESPECIFICAR LA IMAGEN INICIAL DEL JUEGO (PREVIA A PULSAR EL BOTÓN START)
        current_image.src = harry_images_urls[0];

        // AÑADIR EVENT LISTENER AL BOTÓN DE START PARA QUE CUANDO SE PULSE SE INICIE LA RUTINA DE "START" Y LA DE INCREMENTAR LA DIFICULTAD.
        let start_button = document.querySelector("#start_button");
        start_button.addEventListener("click",this.start_routine.bind(this));
        start_button.addEventListener("click",this.increase_difficulty.bind(this));

        // AÑADIR EVENT LISTENER AL BOTÓN DE RESTART PARA QUE CUANDO SE PULSE PUEDA RECARGAR LA PÁGINA
        let restart_button = document.querySelector("#restart_button");
        restart_button.addEventListener("click",this.restart_routine.bind(this));

        // DESHABILITAR BOTÓN "ALIMENTAR" AL INICIO
        document.querySelector("#feed_button").disabled = true;  // Desactivar el botón
        document.querySelector("#feed_button").style.display = "none";  // Ocultar el botón en la pantalla

        // DESHABILITAR BOTÓN "DEJAR DE ALIMENTAR" AL INICIO
        document.querySelector("#rest_button").disabled = true;  // Desactivar el botón
        document.querySelector("#rest_button").style.display = "none";  // Ocultar el botón en la pantalla

    }

}

/* -------------------------------------------------------------------------------------------------------------------- */

/* VARIABLES GLOBALES */
var new_game;  // Variable para instanciar el nuevo juego
var harry_images_urls;  // Array de imágenes de Harry
var current_image;  // Imagen que se muestra por pantalla en este momento

/* FUNCIÓN PROPIA PARA CONSEGUIR UN SLEEP SÍNCRONO ELABORADA SIGUIENDO LA GUÍA: https://www.codegrepper.com/code-examples/javascript/javascript+await+sleep */
const sleep = (miliseonds) => new Promise((resolve) => setTimeout(resolve, miliseonds))

/*

<< ANTIGUA FUNCIÓN SLEEP SÍNCRONA >>

function custom_sleep(miliseconds){
    
    let initial_time = new Date().getTime();  // Obtenemos el tiempo inicial
    let time_limit = initial_time + miliseconds;

    while(new Date().getTime() < time_limit){ }

}

*/

/* -------------------------------------------------------------------------------------------------------------------- */

/* FUNCIÓN "ON LOAD" PARA INICIAL EL FUNCIONAMIENTO DEL SCRIPT UNA VEZ LA PÁGINA SE HA CARGADO */
window.onload = function(event){

    // INICIALIZACIÓN DEL ARRAY DE IMÁGENES DE CONFORMAN EL ASPECTO VISUAL DEL JUEGO
    harry_images_urls = new Array();

    // OBTENER EL "RECIPIENTE" DEL HTML DONDE SE ALMACENARÁ LA IMAGEN CORRESPONDIENTE DEL HARRY
    current_image = document.querySelector("#main_image");

    // CREACIÓN DE UN NUEVO JUEGO
    new_game = new HarryGame();  // Instanciación de la clase que controla el juego
    new_game.initial_configuration();  // Llamamos a la función de arranque de la clase


}

/* -------------------------------------------------------------------------------------------------------------------- */