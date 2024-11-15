<template>
    <div class="app-container">
        <div class="header">
            <img src="/logo_ta.gif" alt="Logo" />
        </div>
        <form>
            <input type="password" placeholder="Password" />
            <button type="submit">ENTER</button>
        </form>
        <button class="join-waitlist">JOIN WAITLIST FOR PASSWORD</button>
        <p>BLACK FRIDAY: THE ONLY SALES OF THE YEAR</p>
        <div class="countdown">
            <p>BLACK FRIDAY IN</p>
            <div class="time">
                <span class="days">13</span>
                <span>Days</span>
                <span class="hours">20</span>
                <span>Hrs</span>
                <span class="minutes">39</span>
                <span>Min</span>
                <span class="seconds">57</span>
                <span>Sec</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            minutes: 0,
            seconds: 0,
            timer: null,
        };
    },
    methods: {
        startTimer() {
            if (this.timer) clearInterval(this.timer);
            this.minutes = 0;
            this.seconds = 0;
            this.timer = setInterval(() => {
                if (this.seconds < 59) {
                    this.seconds++;
                } else {
                    this.seconds = 0;
                    this.minutes++;
                }
            }, 1000);
        },
    },
};
</script>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column; /* Cambiar a diseño vertical */
    align-items: center; /* Centrar los elementos horizontalmente */
    justify-content: flex-start; /* Alinear hacia arriba inicialmente */
    height: auto;
    width: 100%;
    max-width: 100vw;
}

.header {
    width: 50rem;
    object-fit: cover;
    margin-bottom: 20px; /* Espacio debajo del logo */
}

.header img {
    width: 50rem;
    object-fit: cover;
}

form {
    margin-top: 20px;
}

input[type="password"] {
    padding: 10px;
    border: none;
    border-bottom: 1px solid #fff;
    width: 200px;
    margin-bottom: 10px;
}

button {
    background-color: #fff;
    color: #000;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

.join-waitlist {
    margin-top: 20px;
}

p {
    margin-top: 20px;
}

.countdown {
    margin-top: 40px;
    text-align: center;
}

.time {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
