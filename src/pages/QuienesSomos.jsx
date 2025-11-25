import { motion } from "framer-motion";
import { Heart, Users, Shield, Award, Clock, Globe } from "lucide-react";

const QuienesSomos = () => {
  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description: "Estamos dedicados a ayudar a cada familia a encontrar la protección médica que necesita.",
    },
    {
      icon: Users,
      title: "Cercanía",
      description: "Entendemos tu cultura y hablamos tu idioma para brindarte un servicio personalizado.",
    },
    {
      icon: Shield,
      title: "Confianza",
      description: "Más de 10 años de experiencia respaldando a familias latinas en Estados Unidos.",
    },
    {
      icon: Award,
      title: "Excelencia",
      description: "Reconocidos por nuestra calidad de servicio y satisfacción del cliente.",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Familias atendidas" },
    { number: "8+", label: "Aseguradoras aliadas" },
    { number: "24/7", label: "Soporte disponible" },
    { number: "100%", label: "Satisfacción garantizada" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <img
                  src="/images/logobama.png"
                  alt="Asiste Health Care Logo"
                  className="object-contain drop-shadow-lg w-full h-full"
                />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-accent-800 mb-6">
              <span className="text-gradient">Quiénes Somos</span>
            </h1>
            <p className="text-xl text-accent-600 max-w-3xl mx-auto leading-relaxed">
              Somos tu aliado confiable en el camino hacia una cobertura médica completa y asequible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-accent-800 mb-6">
                Nuestra Misión
              </h2>
              <div className="space-y-6 text-accent-600 leading-relaxed">
                <p className="text-lg">
                  En Asiste Health Care, nos dedicamos a hacer que el acceso a seguros médicos 
                  de calidad sea simple, transparente y asequible para todas las familias latinas 
                  en Estados Unidos.
                </p>
                <p>
                  Sabemos que navegar el sistema de salud puede ser complicado, especialmente 
                  cuando el idioma y la cultura presentan barreras adicionales. Por eso, nuestro 
                  equipo de expertos bilingües está aquí para guiarte en cada paso.
                </p>
                <p>
                  Nos enorgullece ser más que simples intermediarios; somos consejeros, 
                  defensores y aliados en tu búsqueda de protección médica integral.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary-300/30 rounded-full translate-y-10 -translate-x-10" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <Globe className="text-primary-600" size={32} />
                    <h3 className="text-xl font-bold text-accent-800">
                      Alcance Nacional
                    </h3>
                  </div>
                  <p className="text-accent-600 mb-6">
                    Atendemos a familias en todos los estados, conectándote con las mejores 
                    opciones de seguro médico disponibles en tu área.
                  </p>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-secondary-600" size={24} />
                    <span className="font-semibold text-accent-700">
                      Disponibles 7 días a la semana
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:from-primary-200 group-hover:to-secondary-200 transition-all duration-300">
                    <Icon className="text-primary-600" size={32} />
                  </div>
                  <h3 className="font-semibold text-lg text-accent-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-accent-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12 text-white"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestros Números Hablan
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                La confianza de nuestros clientes es nuestro mayor logro
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg opacity-90">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent-800 mb-8">
              ¿Listo para comenzar tu camino hacia la tranquilidad?
            </h2>
            <p className="text-xl text-accent-600 mb-8 max-w-2xl mx-auto">
              Contáctanos hoy y descubre cómo podemos ayudarte a proteger lo que más te importa
            </p>
            <a
              href="/contacto"
              className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-4 px-8 rounded-xl hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-soft text-lg"
            >
              Contáctanos ahora
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;