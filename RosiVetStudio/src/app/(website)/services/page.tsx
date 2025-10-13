// fake information for the services page:

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">I Nostri Servizi Veterinari</h1>
        <p className="text-xl text-gray-600">Cure complete per i tuoi amici a quattro zampe</p>
      </div>

      {/* Servizi Principali */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Servizi Principali</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Visite Generali</h3>
            <p className="text-gray-600 mb-4">
              Controlli di routine, vaccinazioni e check-up completi per mantenere i tuoi animali in
              perfetta salute.
            </p>
            <span className="text-blue-600 font-semibold">Da €45</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Chirurgia</h3>
            <p className="text-gray-600 mb-4">
              Interventi chirurgici di routine e d'urgenza con tecnologie all'avanguardia e
              anestesia sicura.
            </p>
            <span className="text-green-600 font-semibold">Da €120</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Odontoiatria</h3>
            <p className="text-gray-600 mb-4">
              Cure dentali specializzate, pulizia, estrazioni e trattamenti per l'igiene orale dei
              tuoi animali.
            </p>
            <span className="text-purple-600 font-semibold">Da €80</span>
          </div>
        </div>
      </section>

      {/* Servizi Specializzati */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">
          Servizi Specializzati
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-orange-700">Fisioterapia Animale</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Riabilitazione post-operatoria</li>
              <li>• Terapia laser per dolori articolari</li>
              <li>• Massaggi terapeutici</li>
              <li>• Idroterapia per cani</li>
            </ul>
            <div className="mt-4">
              <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                €65/seduta
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4 text-pink-700">Servizi Estetici</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Toelettatura completa</li>
              <li>• Taglio unghie e pulizia orecchie</li>
              <li>• Bagni medicati</li>
              <li>• Styling per esposizioni</li>
            </ul>
            <div className="mt-4">
              <span className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                €35-€80
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi per Animali Esotici */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-emerald-600">Animali Esotici</h2>
        <div className="bg-emerald-50 rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐰</span>
              </div>
              <h4 className="font-semibold text-emerald-800">Conigli</h4>
              <p className="text-sm text-gray-600">
                Controlli dentali, vaccinazioni, sterilizzazione
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐹</span>
              </div>
              <h4 className="font-semibold text-emerald-800">Roditori</h4>
              <p className="text-sm text-gray-600">Cure per criceti, cavie, topolini</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🦎</span>
              </div>
              <h4 className="font-semibold text-emerald-800">Rettili</h4>
              <p className="text-sm text-gray-600">Tartarughe, lucertole, serpenti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi di Emergenza */}
      <section className="mb-12">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-700">🚨 Servizi di Emergenza 24/7</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-red-800 mb-2">Pronto Soccorso</h3>
              <p className="text-gray-700 mb-4">
                Servizio di emergenza disponibile 24 ore su 24, 7 giorni su 7 per situazioni
                critiche.
              </p>
              <div className="bg-red-100 p-3 rounded">
                <p className="text-red-800 font-semibold">📞 Numero Emergenza: 333-123-4567</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-red-800 mb-2">Ambulanza Veterinaria</h3>
              <p className="text-gray-700">
                Trasporto sicuro per animali feriti o in difficoltà con personale specializzato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi Aggiuntivi */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">Servizi Aggiuntivi</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🏥</div>
            <h4 className="font-semibold text-indigo-800">Ricovero</h4>
            <p className="text-sm text-gray-600">Ospedalizzazione con monitoraggio 24h</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🧬</div>
            <h4 className="font-semibold text-indigo-800">Analisi</h4>
            <p className="text-sm text-gray-600">Esami del sangue e laboratorio</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📱</div>
            <h4 className="font-semibold text-indigo-800">Telemedicina</h4>
            <p className="text-sm text-gray-600">Consulenze online e videochiamate</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🏠</div>
            <h4 className="font-semibold text-indigo-800">Visite a Domicilio</h4>
            <p className="text-sm text-gray-600">Servizio veterinario a casa tua</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Prenota la tua visita</h2>
        <p className="text-xl mb-6">
          I nostri esperti sono pronti a prendersi cura del tuo amico a quattro zampe
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
          Prenota Ora
        </button>
      </div>
    </div>
  );
}
