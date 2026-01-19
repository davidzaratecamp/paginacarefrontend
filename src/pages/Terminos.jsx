import { motion } from "framer-motion";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const Terminos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 rounded-full p-4">
                <Shield className="text-primary-600" size={48} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-accent-800 mb-4">
              Política de Privacidad y Tratamiento de Datos
            </h1>
            <p className="text-xl text-accent-600 max-w-2xl mx-auto">
              Tu privacidad es importante para nosotros
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 space-y-8">

              <section>
                <h2 className="text-2xl font-bold text-accent-800 mb-4">
                  1. Responsable del Tratamiento
                </h2>
                <div className="bg-primary-50 rounded-xl p-6 space-y-3">
                  <p className="text-accent-700">
                    <strong>Razón Social:</strong> ASISTE ING S.A.S.
                  </p>
                  <p className="text-accent-700 flex items-center gap-2">
                    <MapPin size={18} className="text-primary-600" />
                    <strong>Dirección:</strong> Carrera 42 Bis 17A – 53, Oficina 402, Bogotá
                  </p>
                  <p className="text-accent-700 flex items-center gap-2">
                    <Mail size={18} className="text-primary-600" />
                    <strong>Correo:</strong> info@asistehealthcare.com
                  </p>
                  <p className="text-accent-700 flex items-center gap-2">
                    <Phone size={18} className="text-primary-600" />
                    <strong>Teléfono:</strong> (786) 533-0345
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-800 mb-4">
                  2. Finalidad del Tratamiento de Datos
                </h2>
                <p className="text-accent-700 mb-4">
                  Al proporcionar sus datos personales a través de nuestros formularios de contacto,
                  usted autoriza a ASISTE ING S.A.S. (operando como Asiste Health Care) para:
                </p>
                <ul className="list-disc list-inside space-y-2 text-accent-700 ml-4">
                  <li>Contactarlo para brindarle información sobre seguros médicos Obamacare (ACA)</li>
                  <li>Asesorarlo en el proceso de selección e inscripción de planes de salud</li>
                  <li>Enviarle comunicaciones relacionadas con los servicios solicitados</li>
                  <li>Dar seguimiento a su solicitud de asesoría</li>
                  <li>Responder a sus consultas y solicitudes de información</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-800 mb-4">
                  3. Datos que Recopilamos
                </h2>
                <p className="text-accent-700 mb-4">
                  A través de nuestros formularios recopilamos únicamente:
                </p>
                <ul className="list-disc list-inside space-y-2 text-accent-700 ml-4">
                  <li>Nombre completo</li>
                  <li>Número de teléfono</li>
                  <li>Correo electrónico</li>
                  <li>Código postal</li>
                </ul>
                <p className="text-accent-700 mt-4">
                  <strong>Importante:</strong> Sus datos serán utilizados exclusivamente para
                  fines de contacto y asesoría en seguros médicos. No vendemos ni compartimos
                  su información con terceros para fines de marketing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-800 mb-4">
                  4. Derechos del Titular
                </h2>
                <p className="text-accent-700 mb-4">
                  De acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013, usted tiene derecho a:
                </p>
                <ul className="list-disc list-inside space-y-2 text-accent-700 ml-4">
                  <li>Conocer, actualizar y rectificar sus datos personales</li>
                  <li>Solicitar prueba de la autorización otorgada</li>
                  <li>Ser informado sobre el uso que se ha dado a sus datos</li>
                  <li>Revocar la autorización y/o solicitar la supresión de sus datos</li>
                  <li>Acceder de forma gratuita a sus datos personales</li>
                  <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-800 mb-4">
                  5. Seguridad de la Información
                </h2>
                <p className="text-accent-700">
                  ASISTE ING S.A.S. implementa medidas de seguridad técnicas, administrativas y
                  físicas para proteger sus datos personales contra acceso no autorizado, pérdida,
                  alteración o destrucción. Sus datos son almacenados en servidores seguros y
                  solo personal autorizado tiene acceso a ellos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-800 mb-4">
                  6. Vigencia
                </h2>
                <p className="text-accent-700">
                  Sus datos personales serán conservados mientras sean necesarios para las
                  finalidades descritas o hasta que usted solicite su eliminación. La autorización
                  otorgada podrá ser revocada en cualquier momento mediante comunicación escrita
                  dirigida a nuestro correo electrónico.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-800 mb-4">
                  7. Contacto para Ejercer sus Derechos
                </h2>
                <p className="text-accent-700 mb-4">
                  Para ejercer sus derechos como titular de datos personales, puede contactarnos a través de:
                </p>
                <div className="bg-secondary-50 rounded-xl p-6 space-y-3">
                  <p className="text-accent-700 flex items-center gap-2">
                    <Mail size={18} className="text-secondary-600" />
                    <strong>Correo:</strong> info@asistehealthcare.com
                  </p>
                  <p className="text-accent-700 flex items-center gap-2">
                    <Phone size={18} className="text-secondary-600" />
                    <strong>Teléfono:</strong> (786) 533-0345
                  </p>
                  <p className="text-accent-700 flex items-center gap-2">
                    <MapPin size={18} className="text-secondary-600" />
                    <strong>Dirección:</strong> Carrera 42 Bis 17A – 53, Oficina 402, Bogotá
                  </p>
                </div>
              </section>

              <section className="border-t border-accent-200 pt-8">
                <p className="text-accent-500 text-sm text-center">
                  Para más información sobre nuestras políticas completas de tratamiento de datos,
                  puede visitar <a href="https://www.asisteing.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.asisteing.com</a>
                </p>
                <p className="text-accent-500 text-sm text-center mt-2">
                  Última actualización: Enero 2025
                </p>
              </section>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terminos;
