<template>
    <ModalLogin :showModal="showModal" @update:showModal="showModal = $event" @update:setUser="setUser($event)" />
    <div class="app-container">
        <div class="header">
            <img src="/logo_ta_co.webp" alt="Logo" />
        </div>
        <div class="container-button">
            <!-- Condición para mostrar el botón de Join o el de Bienvenida -->
            <button v-if="!user" @click="showModal = true" class="button-waitlist font-league-spartan">JOIN WAITLIST</button>
            <button v-else class="button-waitlist button-welcome font-league-spartan mirror-text">
                {{ user.name }} <br />
                GRACIAS POR UNIRTE A THE ANsWER.
            </button>
            <p class="small-button-text">**¡REGÍSTRATE Y RECIBE BONOS EXCLUSIVOS!**</p>
        </div>
        <div class="countdown">
            <h2>
                BEGINNING <br />
                BLACK FRIDAY IN
            </h2>
            <div class="js-clock">
                <div class="box">
                    <div class="clock-number">{{ days }}</div>
                    <div class="clock-label">Days</div>
                </div>
                <div class="box">
                    <div class="clock-number">{{ hours }}</div>
                    <div class="clock-label">Hrs</div>
                </div>
                <div class="box">
                    <div class="clock-number">{{ minutes }}</div>
                    <div class="clock-label">Min</div>
                </div>
                <div class="box">
                    <div class="clock-number">{{ seconds }}</div>
                    <div class="clock-label">Sec</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModalLogin from "./components/ModalRegister.vue";

export default {
    name: "App",
    components: {
        ModalLogin,
    },
    data() {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            countdownInterval: null,
            showModal: false,
            user: null, // Inicializamos user
        };
    },
    methods: {
        setUser(newUser) {
            console.log(newUser);

            this.user = newUser;
            localStorage.setItem("user", JSON.stringify(newUser));
        },
        startCountdown(targetDate) {
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const targetTime = new Date(targetDate.replace(/-/g, "/")).getTime();

            this.countdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = targetTime - now;

                if (distance < 0) {
                    clearInterval(this.countdownInterval);
                    return;
                }

                // Usamos las propiedades reactivas de Vue
                this.days = Math.floor(distance / day);
                this.hours = Math.floor((distance % day) / hour);
                this.minutes = Math.floor((distance % hour) / minute);
                this.seconds = Math.floor((distance % minute) / second);
            }, second);
        },
    },
    mounted() {
        this.startCountdown("November 29, 2024 16:00 EST");
        // Si el usuario ya está en localStorage, inicialízalo
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            // Solo parseamos si existe un valor válido
            try {
                this.user = JSON.parse(storedUser);
            } catch (e) {
                console.error("Error al analizar el usuario de localStorage", e);
            }
        }
    },
    beforeDestroy() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Caveat+Brush&family=League+Spartan:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
.mirror-text {
    display: inline-block;
    transform: scaleX(-1);
    direction: rtl; /* Asegura que el orden de letras sea correcto */
}

.font-league-spartan {
    font-family: "League Spartan", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    letter-spacing: 0.5px;
    font-size: 18px;
}

.app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 20px 30px;
}

.header {
    width: 25rem;
    margin: 30px 0 20px;
}

/* Estilo general de la imagen */
.header img {
    width: 25rem;
    object-fit: cover;
}

/* Ajuste para dispositivos móviles */
@media (max-width: 768px) {
    .header {
        width: 100%; /* Asegura que el contenedor ocupe el 100% del ancho */
        display: flex; /* Usamos flexbox para centrar el contenido */
        justify-content: center; /* Centra la imagen horizontalmente */
    }

    .header img {
        width: 100%; /* Ajusta el ancho de la imagen a un 90% del contenedor */
        margin: 0; /* Elimina márgenes para evitar desbordamientos */
    }
}

.container-button {
    max-width: 700px;
    text-align: center;
}

.button-waitlist {
    box-shadow: 1px 2px 20px -1px rgba(0, 0, 0, 0.75);
    text-wrap: nowrap;
    background-color: #fff;
    color: #161616;
    padding: 15px 120px;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
}

.button-welcome {
    padding: 10px 80px;
    cursor: pointer;
    font-size: 14px; /* Fuente más pequeña */
    text-align: center;
    line-height: 1.2;
}

.button-welcome br {
    margin: 5px 0; /* Separación en el salto de línea */
}

.small-button-text {
    font-family: "Montserrat", italic;
    font-weight: 600;
    text-align: center;
    font-size: 10px;
    font-style: italic;
    color: #fff;
    margin-top: 10px;
}

.countdown {
    margin-top: 40px;
    padding-bottom: 30px;
    text-align: center;
}

.countdown h2 {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 5px;
}

.js-clock {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    margin: 0 10px;
}

.clock-number {
    font-family: futura-pt, sans-serif;
    color: #f2ede0;
    font-size: 20px;
    font-weight: 700;
    line-height: 1;
}

.clock-label {
    color: #f2ede0;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.2px;
    text-transform: none;
    margin-top: 6px;
}
</style>
