import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Package, BarChart2, Clock, MapPin, ArrowRight, CheckCircle, Phone, Mail, Users, ShieldCheck, Zap, Star, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const [form, setForm] = useState({ nom: '', telephone: '', materiau: '', message: '' });

  function handleSubmit(e) {
    e.preventDefault();
    alert('Demande envoyée ! Nous vous recontactons rapidement.');
    setForm({ nom: '', telephone: '', materiau: '', message: '' });
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="rounded-lg p-1.5 bg-gray-900">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-xl tracking-tight">CamionSuf</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {['Accueil', 'Services', 'Avantages', 'Contact'].map(item => (
              <a key={item} href={'#' + item.toLowerCase()} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item}</a>
            ))}
          </nav>
          <Link to="/login" className="text-sm px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition-all">
            Commencer
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0d1b2e' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400&q=80&auto=format&fit=crop')" }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,27,46,0.75) 0%, rgba(13,27,46,0.55) 50%, rgba(13,27,46,0.75) 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest" style={{ backgroundColor: 'rgba(245,195,0,0.15)', color: '#f5c300', border: '1px solid rgba(245,195,0,0.3)' }}>
            <Zap className="w-3.5 h-3.5" /> Plateforme BTP N°1 au Sénégal
          </span>
          <h1 className="text-4xl sm:text-6xl leading-tight text-white mb-5" style={{ fontWeight: 600 }}>
            Gérez vos commandes de{' '}
            <span style={{ color: '#f5c300' }}>matériaux BTP</span>{' '}
            en temps réel
          </h1>
          <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
            CamionSuf connecte les fournisseurs de sable, béton et gravier avec les clients à proximité. Acceptez des commandes, coordonnez vos livreurs et pilotez votre activité depuis votre téléphone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link to="/login" className="flex items-center justify-center gap-2 text-sm px-8 py-4 rounded-xl transition-all hover:opacity-90 shadow-xl" style={{ backgroundColor: '#f5c300', color: '#0d1b2e', fontWeight: 600 }}>
              Rejoindre la plateforme <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/dashboard" className="flex items-center justify-center gap-2 text-sm px-8 py-4 rounded-xl transition-all hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>
              Voir la démo <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-10 pt-10 border-t w-full max-w-2xl" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            {[
              { val: '2 400+', label: 'Livraisons effectuées' },
              { val: '98%', label: 'Taux de satisfaction' },
              { val: '< 45 min', label: 'Délai moyen' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl sm:text-4xl text-white" style={{ fontWeight: 600 }}>{val}</p>
                <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-gray-400" style={{ fontWeight: 500 }}>Ce que vous obtenez</span>
            <h2 className="text-3xl sm:text-4xl mt-2" style={{ fontWeight: 600 }}>
              <span style={{ color: '#f5c300' }}>Pourquoi choisir</span>{' '}<span className="text-gray-900">CamionSuf ?</span>
            </h2>
            <p className="text-sm mt-3 max-w-xl mx-auto text-gray-500">Des outils professionnels pensés pour les fournisseurs BTP du Sénégal</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Clock, title: 'Commandes en temps réel', desc: 'Recevez et traitez les demandes des clients proches instantanément avec notifications push.' },
              { icon: MapPin, title: 'Géolocalisation & carte', desc: 'Visualisez les clients proches et suivez vos livreurs sur une carte interactive.' },
              { icon: Users, title: 'Gestion des livreurs', desc: "Commissionnez un livreur disponible en un clic dès qu'une commande est acceptée." },
              { icon: Package, title: 'Gestion des stocks', desc: 'Mettez à jour vos disponibilités en sable, béton, gravier et ciment facilement.' },
              { icon: BarChart2, title: 'Statistiques & revenus', desc: 'Tableau de bord clair : volume livré, chiffre généré, commandes du mois.' },
              { icon: ShieldCheck, title: 'Plateforme sécurisée', desc: 'Inscription vérifiée, profil professionnel validé et données protégées.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-6 transition-all group hover:-translate-y-1 border border-gray-100 hover:shadow-lg hover:border-yellow-100">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-yellow-400" style={{ backgroundColor: 'rgba(245,195,0,0.12)' }}>
                  <Icon className="w-5 h-5 transition-colors group-hover:text-[#0d1b2e]" style={{ color: '#d4a800' }} />
                </div>
                <h3 className="text-gray-900 mb-2 text-[15px]" style={{ fontWeight: 500 }}>{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500" style={{ fontWeight: 400 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + FORMULAIRE */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-10 sm:p-14 flex flex-col justify-center" style={{ backgroundColor: '#0d1b2e' }}>
              <span className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(245,195,0,0.7)', fontWeight: 500 }}>Rejoignez-nous</span>
              <h2 className="text-2xl sm:text-3xl leading-tight mb-5 text-white" style={{ fontWeight: 600 }}>
                Tout commence ici — rejoignez CamionSuf
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
                Des centaines de fournisseurs au Sénégal gèrent déjà leurs commandes sur CamionSuf. Inscrivez-vous gratuitement et commencez à recevoir des clients dès aujourd'hui.
              </p>
              <div className="space-y-3">
                {['Inscription gratuite & rapide', 'Profil vérifié sous 24h', 'Support disponible 7j/7'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#f5c300' }} />
                    <span className="text-sm text-white" style={{ fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-10 sm:p-14 bg-white">
              <h3 className="text-xl mb-1 text-gray-900" style={{ fontWeight: 600 }}>Faire une demande</h3>
              <p className="text-xs text-gray-400 mb-7">Nous vous recontactons sous 24h</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1" style={{ fontWeight: 500 }}>Prénom &amp; Nom</label>
                    <input type="text" placeholder="Dupont Sow" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1" style={{ fontWeight: 500 }}>Téléphone</label>
                    <input type="tel" placeholder="+221 77 000 00 00" value={form.telephone} onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1" style={{ fontWeight: 500 }}>Matériaux proposés</label>
                  <select value={form.materiau} onChange={e => setForm(f => ({ ...f, materiau: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 text-gray-700">
                    <option value="">Sélectionner...</option>
                    <option>Sable</option>
                    <option>Béton</option>
                    <option>Gravier</option>
                    <option>Ciment</option>
                    <option>Parpaing</option>
                    <option>Plusieurs matériaux</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1" style={{ fontWeight: 500 }}>Votre message</label>
                  <textarea placeholder="Zone d'activité, capacité de livraison, questions..." rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none" />
                </div>
                <button type="submit" className="w-full text-sm py-3.5 rounded-xl transition-all hover:opacity-90" style={{ backgroundColor: '#0d1b2e', color: 'white', fontWeight: 500 }}>
                  Envoyer ma demande
                </button>
              </form>
              <p className="text-center text-xs text-gray-400 mt-4">
                Vous avez déjà un compte ?{' '}
                <Link to="/login" className="hover:underline text-gray-900" style={{ fontWeight: 500 }}>Se connecter</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section id="avantages" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-2xl text-gray-900 mb-10" style={{ fontWeight: 600 }}>
            Ils font confiance à <span style={{ color: '#d4a800' }}>CamionSuf</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { name: 'Moussa Diallo', role: 'Fournisseur Sable · Dakar', text: 'Depuis CamionSuf, mes commandes ont doublé. Je gère tout depuis mon téléphone, même en livraison.' },
              { name: 'Fatou Ndiaye', role: 'Fournisseur Béton · Thiès', text: "L'interface est simple, les paiements sont clairs. Je recommande à tous les fournisseurs BTP." },
              { name: 'Ibrahima Sow', role: 'Fournisseur Gravier · Pikine', text: 'Le tableau de bord me permet de voir mes revenus en temps réel. Très professionnel.' },
            ].map(({ name, role, text }) => (
              <div key={name} className="rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#d4a800' }} />)}
                </div>
                <p className="text-sm leading-relaxed mb-5 text-gray-600">"{text}"</p>
                <p className="text-gray-900 text-sm" style={{ fontWeight: 500 }}>{name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0d1b2e' }} className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="rounded-lg p-1.5 bg-white/10">
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-lg" style={{ fontWeight: 600 }}>CamionSuf</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                La plateforme N°1 pour les fournisseurs de matériaux BTP au Sénégal.
              </p>
            </div>
            <div>
              <p className="text-white text-sm mb-4" style={{ fontWeight: 500 }}>Contact</p>
              <div className="space-y-2.5">
                <a href="tel:+221770000000" className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <Phone className="w-3.5 h-3.5 text-white/40" /> +221 77 000 00 00
                </a>
                <a href="mailto:contact@camionsuf.com" className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <Mail className="w-3.5 h-3.5 text-white/40" /> contact@camionsuf.com
                </a>
              </div>
            </div>
            <div>
              <p className="text-white text-sm mb-4" style={{ fontWeight: 500 }}>Accès rapide</p>
              <div className="space-y-2">
                {['Tableau de bord', 'Se connecter', "S'inscrire"].map(l => (
                  <Link key={l} to="/login" className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <ChevronRight className="w-3 h-3 text-white/30" /> {l}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2026 CamionSuf. Tous droits réservés.
          </p>
        </div>
      </footer>

    </div>
  );
}
