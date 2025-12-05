/* ============================================
   SERVICIO DE FORMULARIO - InarexSoft
   Archivo: formularioService.js
   ============================================ */

import { supabase, SUPABASE_CONFIG } from './supabaseConfig.js';
import { enviarEmail } from './emailConfig.js';

// ============================================
// VALIDAR DATOS DEL FORMULARIO
// ============================================

export function validarDatos(datos) {
    // Campos requeridos
    if (!datos.nombre || !datos.empresa || !datos.email || 
        !datos.telefono || !datos.servicio || !datos.mensaje) {
        console.warn('⚠️ Campos incompletos');
        return { valido: false, error: 'Completa todos los campos' };
    }

    // Email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datos.email)) {
        console.warn('⚠️ Email inválido');
        return { valido: false, error: 'Email inválido' };
    }

    // Teléfono mínimo 9 dígitos
    const telefonoDigitos = datos.telefono.replace(/\D/g, '');
    if (telefonoDigitos.length < 9) {
        console.warn('⚠️ Teléfono muy corto');
        return { valido: false, error: 'Teléfono inválido' };
    }

    return { valido: true };
}

// ============================================
// GUARDAR EN SUPABASE
// ============================================

export async function guardarCotizacionSupabase(datos) {
    try {
        console.log('💾 Guardando en Supabase...');
        
        const { data, error } = await supabase
            .from(SUPABASE_CONFIG.tabla)
            .insert([{
                nombre: datos.nombre,
                empresa: datos.empresa,
                email: datos.email,
                telefono: datos.telefono,
                servicio: datos.servicio,
                descripcion: datos.mensaje,
                fecha_creacion: new Date().toISOString(),
                estado: 'nueva'
            }]);

        if (error) {
            console.error('❌ Error Supabase:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Guardado en Supabase:', data);
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error al guardar:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// PROCESAR FORMULARIO COMPLETO
// ============================================

export async function procesarFormulario(datos) {
    try {
        console.log('🚀 Procesando formulario...');
        console.log('Datos:', datos);

        // 1. Validar
        const validacion = validarDatos(datos);
        if (!validacion.valido) {
            return { success: false, error: validacion.error };
        }

        // 2. Guardar en Supabase
        const resultadoBD = await guardarCotizacionSupabase(datos);
        if (!resultadoBD.success) {
            console.warn('⚠️ Error guardando en BD, pero continuamos...');
        }

        // 3. Enviar email
        const resultadoEmail = await enviarEmail(datos);
        if (!resultadoEmail.success) {
            console.warn('⚠️ Error enviando email, pero continuamos...');
        }

        // Éxito si al menos una acción funcionó
        if (resultadoBD.success || resultadoEmail.success) {
            console.log('✅ Cotización procesada correctamente');
            return { 
                success: true, 
                mensaje: '✅ ¡Gracias! Tu solicitud ha sido enviada correctamente.\n\nNos contactaremos en las próximas 24 horas.' 
            };
        } else {
            return { 
                success: false, 
                error: 'Error procesando tu solicitud' 
            };
        }

    } catch (error) {
        console.error('❌ Error inesperado:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// OBTENER COTIZACIONES (para admin)
// ============================================

export async function obtenerCotizaciones() {
    try {
        const { data, error } = await supabase
            .from(SUPABASE_CONFIG.tabla)
            .select('*')
            .order('fecha_creacion', { ascending: false });

        if (error) throw error;
        console.log('✅ Cotizaciones:', data.length);
        return data;
    } catch (error) {
        console.error('❌ Error obteniendo cotizaciones:', error);
        return [];
    }
}

// ============================================
// ACTUALIZAR ESTADO
// ============================================

export async function actualizarEstado(id, nuevoEstado) {
    try {
        const { data, error } = await supabase
            .from(SUPABASE_CONFIG.tabla)
            .update({ estado: nuevoEstado })
            .eq('id', id);

        if (error) throw error;
        console.log('✅ Estado actualizado a:', nuevoEstado);
        return { success: true, data };
    } catch (error) {
        console.error('❌ Error actualizando:', error);
        return { success: false, error };
    }
}