/* ============================================
   CONFIGURACIÓN EMAILJS - InarexSoft
   Archivo: emailConfig.js
   ============================================ */

// Obtén estos valores de:
// EmailJS Dashboard → Account

export const EMAIL_CONFIG = {
    // Tu Public Key de EmailJS
    publicKey: 'a8QtR6j9vQFPsQYi4',  // ← TU PUBLIC KEY
    
    // Service ID (tu servicio Gmail)
    serviceId: 'service_2x1lpbp',  // ← TU SERVICE ID
    
    // Template ID (crear en EmailJS)
    templateId: 'template_abc123',  // ← TU TEMPLATE ID
    
    // Email destino
    toEmail: 'inarexsoft@gmail.com'
};

// Inicializar EmailJS
export function inicializarEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAIL_CONFIG.publicKey);
        console.log('✅ EmailJS inicializado');
        return true;
    } else {
        console.error('❌ EmailJS no está cargado');
        return false;
    }
}

// Función para enviar email
export async function enviarEmail(datos) {
    try {
        const respuesta = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            {
                to_email: EMAIL_CONFIG.toEmail,
                from_email: datos.email,
                from_name: datos.nombre,
                empresa: datos.empresa,
                nombre: datos.nombre,
                telefono: datos.telefono,
                servicio: datos.servicio,
                mensaje: datos.mensaje,
                fecha: new Date().toLocaleDateString('es-EC')
            }
        );

        console.log('✅ Email enviado:', respuesta);
        return { success: true, respuesta };
    } catch (error) {
        console.error('❌ Error enviando email:', error);
        return { success: false, error };
    }
}