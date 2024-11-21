<template>
    <transition name="modal-fade">
        <div v-if="showPolicyModal" class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-95" style="z-index: 10000; background: rgba(0, 0, 0, 0.8)">
            <div class="w-5/6 max-w-lg bg-white rounded-lg shadow-lg p-5 overflow-y-auto relative">
                <button class="absolute top-2 right-5 text-gray-600 font-bold text-xl" @click="closePolicyModal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <DataProcessing class="mt-5"/>
                <div class="mt-6 flex justify-center">
                    <button class="bg-black hover:bg-zinc-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="closePolicyModal">Cerrar</button>
                </div>
            </div>
        </div>
    </transition>

    <!-- Modal principal de registro -->
    <transition name="modal-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div
            v-if="showModal"
            class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-95"
            style="z-index: 9999; background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url('/noise7.gif'); background-size: cover; background-repeat: no-repeat"
        >
            <div class="w-5/6 max-w-md sm:max-w-lg md:max-w-4xl bg-white rounded-lg shadow-lg flex flex-col sm:flex-row sm:h-3/4 overflow-y-auto" style="height: 90%">
                <!-- Imagen en la parte superior para móviles, en pantallas grandes queda a la izquierda -->
                <div class="sm:hidden w-full h-full bg-cover bg-center rounded-t-lg relative" :style="{ backgroundImage: 'url(/login-background.jpg)' }">
                    <!-- Botón de cerrar en la parte superior derecha de la imagen en móvil -->
                    <button class="absolute top-2 right-3 text-gray-600 font-bold text-xl" @click="closeModal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div class="hidden sm:block sm:w-1/2 bg-cover bg-center rounded-t-lg sm:rounded-l-lg sm:h-full" :style="{ backgroundImage: 'url(/login-background.jpg)' }"></div>

                <!-- Formulario a la derecha (solo en pantallas más grandes) -->
                <div class="w-full sm:w-1/2 p-6 flex flex-col justify-center relative h-full rounded-lg sm:rounded-none overflow-y-auto">
                    <!-- Botón cerrar en la esquina superior derecha para pantallas grandes -->
                    <button class="sm:absolute top-2 right-3 text-gray-600 font-bold text-xl sm:block hidden" @click="closeModal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <h2 class="text-2xl font-bold mb-4">Registrarte</h2>

                    <form @submit.prevent="handleSubmit">
                        <!-- Campos de formulario -->
                        <div class="mb-3">
                            <label for="name" class="block text-gray-700 text-sm font-bold mb-0">Nombre Completo:</label>
                            <input type="text" id="name" v-model="name" required class="input-field" placeholder="Ingresa tu nombre" autocomplete="name" />
                            <div v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="block text-gray-700 text-sm font-bold mb-0">Email:</label>
                            <input type="email" id="email" v-model="email" required class="input-field" placeholder="ejemplo@mail.com" autocomplete="email" />
                            <div v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</div>
                        </div>
                        <div class="mb-3">
                            <label for="phone-number" class="block text-gray-700 text-sm font-bold mb-0">Teléfono:</label>
                            <input type="text" id="phone-number" v-model="phoneNumber" required class="input-field" placeholder="Ingresa tu numero de teléfono" />
                            <div v-if="errors.phone_number" class="text-red-500 text-xs mt-1">{{ errors.phone_number[0] }}</div>
                        </div>

                        <!-- boton de tratamiento de datos -->
                        <div class="mb-3">
                            <input type="checkbox" id="accept_data" v-model="acceptData" required />
                            <label for="accept_data" class="text-gray-700 text-xs">
                                Acepto el tratamiento de mis datos personales según la
                            </label>
                            <span class="text-xs text-blue-600 underline cursor-pointer" @click="openPolicyModal"> política de privacidad </span>.
                            <div v-if="errors.accept_data" class="text-red-500 text-xs mt-1">
                                {{ errors.accept_data[0] }}
                            </div>
                        </div>

                        <!-- Botón de envío -->
                        <div class="flex items-center justify-center">
                            <button class="bg-black hover:bg-zinc-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                <span v-if="formLoading"> <i class="fa-solid fa-spinner fa-spin"></i> Cargando... </span>
                                <!-- <span v-else> ¡Ser parte ahora! </span> -->
                                <!-- <span v-else> Únete y se tú.! </span> -->
                                <span v-else> Join us and Be you.! </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import DataProcessing from './DataProcessing.vue'
import "../css/tailwind.css";
import { useAuth } from "../composables/useAuth";

export default {
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
    },
    components: {
        DataProcessing
    },
    data() {
        return {
            name: "",
            email: "",
            phoneNumber: "",
            formLoading: false,
            errors: {},
            acceptData: null,
            showPolicyModal: false, // Nuevo estado para la política
        };
    },
    created() {
        this.$auth = useAuth();
    },
    methods: {
        async handleSubmit() {
            if (!this.acceptData) {
                alert("Debes aceptar el tratamiento de tus datos personales.");
                return;
            }

            this.formLoading = true;
            this.errors = {};

            const response = await this.$auth.register({
                name: this.name,
                email: this.email,
                phone_number: this.phoneNumber,
                accept_data: this.acceptData,
            });

            if (response.success) {
                this.$emit("update:setUser", response.data.user);
                console.log("Registro exitoso");
                this.resetForm();
                this.closeModal();
            } else {
                this.errors = response.errors || {};
                console.log("Errores de registro:", this.errors);
            }

            this.formLoading = false;
        },
        resetForm() {
            this.name = "";
            this.email = "";
            this.phoneNumber = "";
            this.acceptData = false;
        },
        closeModal() {
            this.$emit("update:showModal", false);
        },
        openPolicyModal() {
            this.showPolicyModal = true;
        },
        closePolicyModal() {
            this.showPolicyModal = false;
        },
        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = "translateY(20px)";
        },
        enter(el, done) {
            el.offsetHeight; // Trigger reflow
            el.style.transition = "transform 0.3s, opacity 0.3s";
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
            done();
        },
        leave(el, done) {
            el.style.transition = "transform 0.3s, opacity 0.3s";
            el.style.opacity = 0;
            el.style.transform = "translateY(20px)";
            done();
        },
    },
};
</script>

<style scoped>
.input-field {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s;
}
.input-field:focus {
    outline: none;
    border-color: #3182ce;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
