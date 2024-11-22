import { ref, onMounted, computed } from 'vue';  // Añadir computed aquí
import axios from 'axios';

export const useAuth = () => {
    // Estado global reactivo para el usuario y token
    const user = ref(null);
    const token = ref(localStorage.getItem('token') || null); // Cargar el token de localStorage si existe

    // Verificar si el usuario ya está registrado
    const isAuthenticated = computed(() => !!user.value && !!token.value);

    // Función para registrar un usuario
    const register = async (details) => {
        try {
            const { data } = await axios.post('https://api.theanswer.com.co/api/register', details);
            console.log(data);

            // Si la respuesta contiene un token, lo guardamos en localStorage y en el estado reactivo
            if (data.token) {
                localStorage.setItem('token', data.token);
                token.value = data.token; // Hacer token reactivo
            }

            // Guarda los datos del usuario en localStorage y actualiza el estado reactivo
            localStorage.setItem('user', JSON.stringify(data.user)); // Convertir a JSON
            user.value = data.user;

            return { success: true, data };
        } catch (error) {
            console.error('Error al registrarse:', error);

            // Manejo de errores detallado
            const errorMessage = error.response
                ? error.response.data.message || 'Ha ocurrido un error en el servidor.'
                : 'Ha ocurrido un error inesperado.';

            const errorDetails = error.response?.data?.errors || null;

            return { success: false, error: errorMessage, errors: errorDetails };
        }
    };

    // Función para cargar el usuario desde localStorage al montar el composable
    const loadUserFromStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user.value = storedUser; // Parsear el usuario almacenado
        }
    };

    // Cargar el usuario al montar el composable
    onMounted(loadUserFromStorage);

    return {
        user,
        token,
        isAuthenticated,
        register,
    };
};
