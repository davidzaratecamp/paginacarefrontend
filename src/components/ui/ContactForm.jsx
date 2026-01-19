import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/api";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  email: z.string().email("Correo electrónico inválido"),
  postalCode: z.string().regex(/^\d{5}$/, "Código postal debe tener 5 dígitos"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la política de privacidad para continuar",
  }),
});

const ContactForm = ({ className = "" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await axios.post(`${API_URL}/api/contact`, data);

      if (response.status === 201) {
        setSubmitMessage("¡Gracias! Un asesor te contactará pronto.");
        reset();
      } else {
        setSubmitMessage("Error al enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch (error) {
      setSubmitMessage("Error de conexión. Verifica tu internet e inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl shadow-soft p-6 ${className}`}
    >
      <h3 className="font-semibold text-xl text-accent-800 mb-6">
        Solicita información gratuita
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Nombre completo *"
            className="w-full px-4 py-3 border border-accent-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-900"
          />
          {errors.name && (
            <p className="text-secondary-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("phone")}
            type="tel"
            placeholder="Teléfono *"
            className="w-full px-4 py-3 border border-accent-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-900"
          />
          {errors.phone && (
            <p className="text-secondary-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Correo electrónico *"
            className="w-full px-4 py-3 border border-accent-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-900"
          />
          {errors.email && (
            <p className="text-secondary-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("postalCode")}
            type="text"
            placeholder="Código postal *"
            className="w-full px-4 py-3 border border-accent-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-900"
          />
          {errors.postalCode && (
            <p className="text-secondary-600 text-sm mt-1">{errors.postalCode.message}</p>
          )}
        </div>

        <div className="flex items-start space-x-3">
          <input
            {...register("acceptTerms")}
            type="checkbox"
            id="acceptTerms"
            className="mt-1 w-4 h-4 text-primary-600 border-accent-300 rounded focus:ring-primary-500 cursor-pointer"
          />
          <label htmlFor="acceptTerms" className="text-sm text-accent-600 cursor-pointer">
            Acepto la{" "}
            <Link
              to="/terminos"
              target="_blank"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              Política de Privacidad y Tratamiento de Datos
            </Link>
            . Autorizo que mis datos sean utilizados para contactarme y brindarme información sobre seguros médicos.
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-secondary-600 text-sm -mt-2">{errors.acceptTerms.message}</p>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Send size={18} />
              <span>Enviar información</span>
            </>
          )}
        </motion.button>

        {submitMessage && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm text-center ${
              submitMessage.includes("Gracias") 
                ? "text-green-600" 
                : "text-secondary-600"
            }`}
          >
            {submitMessage}
          </motion.p>
        )}
      </form>

      <p className="text-xs text-accent-500 mt-4 text-center">
        * Campos obligatorios
      </p>
    </motion.div>
  );
};

export default ContactForm;