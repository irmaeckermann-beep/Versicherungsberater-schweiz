import { useState, useRef, useEffect } from "react";

const TRANSLATIONS = {
  de: {
    appName: "versicherungberater-schweiz.ch",
    tagline: "Ihr digitaler Versicherungsberater",
    tabs: { chat: "Beratung", calculator: "Budgetrechner", documents: "Dokumente", quote: "Offerte", contact: "Berater kontaktieren", advisorContact: "Versicherungen kontaktieren" },
    roleSwitch: { client: "Kunde", advisor: "Berater", loginTitle: "Berater-Login", password: "Passwort", login: "Anmelden", logout: "Abmelden", wrong: "Falsches Passwort", hint: "Nur für autorisierte Berater", mode: "Ansicht" },
    chat: {
      placeholder: "Ihre Frage zur Versicherung...", send: "Senden",
      welcome: "Guten Tag! Ich bin Ihr digitaler Versicherungsberater. Wie kann ich Ihnen heute helfen?\n\nSie können mich zu folgenden Themen befragen:\n• Krankenversicherung (KVG/VVG)\n• Hausrat & Haftpflicht\n• Lebensversicherung\n• Fahrzeugversicherung\n• Vorsorge (Säule 3a/3b)",
      thinking: "Analysiere Ihre Anfrage...",
    },
    calculator: {
      title: "Budget & Einkommensrechner", subtitle: "Berechnen Sie Ihr verfügbares Einkommen nach Versicherungskosten",
      income: "Einkommen", expenses: "Ausgaben", monthly: "Monatliches Bruttoeinkommen", ahv: "AHV/IV/EO Beiträge (~10.6%)",
      tax: "Steuern (geschätzt)", rent: "Miete/Hypothek", health: "Krankenkassenprämie",
      car: "Fahrzeugkosten", insurance: "Sonstige Versicherungen", food: "Lebensmittel & Haushalt", other: "Übrige Ausgaben",
      result: "Verfügbares Einkommen", surplus: "Überschuss", deficit: "Defizit",
      totalIncome: "Gesamteinkommen", totalExpenses: "Gesamtausgaben", available: "Verfügbar",
      tip: "💡 Tipp: Ein Notfallfonds von 3–6 Monatsgehältern ist empfehlenswert.",
    },
    documents: {
      title: "Dokumente hochladen", subtitle: "Laden Sie Ihre Versicherungspolicen und Unterlagen sicher hoch",
      gdpr: "🔒 Datenschutzkonform nach DSGVO/DSG — Alle Daten werden verschlüsselt übertragen und nicht dauerhaft gespeichert.",
      drag: "Dateien hier ablegen oder", browse: "Durchsuchen",
      types: "Akzeptierte Formate: PDF, JPG, PNG, DOCX (max. 10 MB)",
      uploaded: "Hochgeladene Dateien", delete: "Entfernen", noFiles: "Noch keine Dateien hochgeladen",
      categories: ["Krankenversicherung", "Lebensversicherung", "Hausrat", "Fahrzeug", "Vorsorge", "Sonstiges"], category: "Kategorie",
    },
    quote: {
      title: "Offerte anfordern", subtitle: "Erhalten Sie ein unverbindliches Angebot",
      firstName: "Vorname", lastName: "Nachname", email: "E-Mail", phone: "Telefon",
      birthdate: "Geburtsdatum", canton: "Kanton", type: "Versicherungsart",
      types: ["Krankenversicherung", "Hausrat & Haftpflicht", "Lebensversicherung", "Fahrzeugversicherung", "Vorsorge 3a", "Unfallversicherung"],
      coverage: "Gewünschte Deckung", message: "Zusätzliche Informationen",
      submit: "Offerte anfordern", success: "✅ Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden.",
      privacy: "Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.",
    },
    contact: {
      title: "Berater direkt kontaktieren", subtitle: "Schreiben Sie Ihrem persönlichen Versicherungsberater",
      advisorInfo: "Unser Expertenteam steht Ihnen für alle Versicherungsfragen zur Verfügung.",
      yourName: "Ihr Name", yourEmail: "Ihre E-Mail", yourPhone: "Ihre Telefonnummer",
      subject: "Betreff",
      subjects: ["Allgemeine Beratungsanfrage", "Offerte anfordern", "Bestehende Police besprechen", "Schadensmeldung", "Kündigung besprechen", "Dringende Frage"],
      message: "Ihre Nachricht an den Berater", send: "Nachricht senden",
      success: "✅ Ihre Nachricht wurde an Ihren Berater weitergeleitet. Er meldet sich so schnell wie möglich.",
      disclaimer: "Ihr Berater antwortet in der Regel innerhalb von 1 Werktag.", privacy: "Ihre Daten werden vertraulich behandelt.",
    },
    advisorContact: {
      title: "Versicherungen direkt kontaktieren", subtitle: "Berater-Bereich — Nur für interne Nutzung",
      badge: "🔐 BERATER-BEREICH",
      insurers: [
        { name: "Helvetia", email: "partner@helvetia.ch", phone: "058 280 10 00" },
        { name: "Zurich Insurance", email: "partner@zurich.ch", phone: "044 628 28 28" },
        { name: "Allianz Suisse", email: "partner@allianz.ch", phone: "058 358 40 40" },
        { name: "AXA Switzerland", email: "partner@axa.ch", phone: "058 215 11 11" },
        { name: "Die Mobiliar", email: "partner@mobiliar.ch", phone: "031 389 61 11" },
        { name: "Generali", email: "partner@generali.ch", phone: "058 472 40 40" },
        { name: "Vaudoise", email: "partner@vaudoise.ch", phone: "021 618 81 11" },
        { name: "CSS Versicherung", email: "partner@css.ch", phone: "058 277 11 11" },
        { name: "Visana", email: "partner@visana.ch", phone: "031 357 91 11" },
        { name: "Helsana", email: "partner@helsana.ch", phone: "043 340 11 11" },
      ],
      toInsurer: "Versicherung auswählen", subject: "Betreff",
      subjects: ["Kundenanfrage weiterleiten", "Neue Police beantragen", "Bestehende Police ändern", "Schadensmeldung einreichen", "Kündigung einreichen", "Partnerschaftsanfrage", "Interne Rückfrage"],
      clientRef: "Kundenreferenz (optional)", message: "Nachricht an die Versicherung",
      send: "E-Mail an Versicherung senden", success: "✅ Nachricht wurde erfolgreich an die Versicherung weitergeleitet.",
      disclaimer: "Diese Funktion ist ausschliesslich für autorisierte Berater bestimmt.",
    },
  },
  fr: {
    appName: "versicherungberater-schweiz.ch", tagline: "Votre conseiller en assurance numérique",
    tabs: { chat: "Conseil", calculator: "Budget", documents: "Documents", quote: "Offre", contact: "Contacter conseiller", advisorContact: "Contacter assurances" },
    roleSwitch: { client: "Client", advisor: "Conseiller", loginTitle: "Connexion conseiller", password: "Mot de passe", login: "Se connecter", logout: "Se déconnecter", wrong: "Mot de passe incorrect", hint: "Réservé aux conseillers autorisés", mode: "Vue" },
    chat: { placeholder: "Votre question...", send: "Envoyer", welcome: "Bonjour! Je suis votre conseiller numérique.\n\n• Assurance maladie (LAMal/LCA)\n• Ménage & RC\n• Assurance vie\n• Véhicule\n• Prévoyance (pilier 3a/3b)", thinking: "Analyse en cours..." },
    calculator: { title: "Calculateur de budget", subtitle: "Calculez votre revenu disponible", income: "Revenus", expenses: "Dépenses", monthly: "Revenu brut mensuel", ahv: "Cotisations AVS (~10.6%)", tax: "Impôts", rent: "Loyer", health: "Prime maladie", car: "Véhicule", insurance: "Autres assurances", food: "Alimentation", other: "Autres", result: "Revenu disponible", surplus: "Excédent", deficit: "Déficit", totalIncome: "Revenu total", totalExpenses: "Dépenses totales", available: "Disponible", tip: "💡 Un fonds d'urgence de 3-6 mois est recommandé." },
    documents: { title: "Télécharger documents", subtitle: "Téléchargez vos polices en toute sécurité", gdpr: "🔒 Conforme RGPD/LPD — Données chiffrées.", drag: "Déposez ici ou", browse: "Parcourir", types: "PDF, JPG, PNG, DOCX (max. 10 Mo)", uploaded: "Fichiers", delete: "Supprimer", noFiles: "Aucun fichier", categories: ["Maladie", "Vie", "Ménage", "Véhicule", "Prévoyance", "Autres"], category: "Catégorie" },
    quote: { title: "Demander une offre", subtitle: "Offre sans engagement", firstName: "Prénom", lastName: "Nom", email: "E-mail", phone: "Téléphone", birthdate: "Date de naissance", canton: "Canton", type: "Type d'assurance", types: ["Maladie", "Ménage & RC", "Vie", "Véhicule", "Prévoyance 3a", "Accidents"], coverage: "Couverture", message: "Informations", submit: "Demander", success: "✅ Demande transmise. Réponse sous 24h.", privacy: "Données confidentielles." },
    contact: { title: "Contacter votre conseiller", subtitle: "Écrivez directement à votre conseiller", advisorInfo: "Notre équipe est disponible pour toutes vos questions.", yourName: "Votre nom", yourEmail: "Votre e-mail", yourPhone: "Votre téléphone", subject: "Sujet", subjects: ["Demande de conseil", "Demander offre", "Discuter police", "Sinistre", "Résiliation", "Urgent"], message: "Votre message", send: "Envoyer", success: "✅ Message transmis à votre conseiller.", disclaimer: "Réponse sous 1 jour ouvrable.", privacy: "Données confidentielles." },
    advisorContact: { title: "Contacter les assurances", subtitle: "Espace conseiller — Usage interne", badge: "🔐 ESPACE CONSEILLER", insurers: [ { name: "Helvetia", email: "partner@helvetia.ch", phone: "058 280 10 00" }, { name: "Zurich Insurance", email: "partner@zurich.ch", phone: "044 628 28 28" }, { name: "Allianz Suisse", email: "partner@allianz.ch", phone: "058 358 40 40" }, { name: "AXA Switzerland", email: "partner@axa.ch", phone: "058 215 11 11" }, { name: "Die Mobiliar", email: "partner@mobiliar.ch", phone: "031 389 61 11" }, { name: "Generali", email: "partner@generali.ch", phone: "058 472 40 40" }, { name: "Vaudoise", email: "partner@vaudoise.ch", phone: "021 618 81 11" }, { name: "CSS", email: "partner@css.ch", phone: "058 277 11 11" }, { name: "Visana", email: "partner@visana.ch", phone: "031 357 91 11" }, { name: "Helsana", email: "partner@helsana.ch", phone: "043 340 11 11" } ], toInsurer: "Choisir assurance", subject: "Sujet", subjects: ["Transmettre demande", "Nouvelle police", "Modifier police", "Sinistre", "Résiliation", "Partenariat", "Interne"], clientRef: "Référence client (optionnel)", message: "Message", send: "Envoyer e-mail", success: "✅ Message transmis à l'assurance.", disclaimer: "Fonction réservée aux conseillers autorisés." },
  },
  it: {
    appName: "versicherungberater-schweiz.ch", tagline: "Il tuo consulente assicurativo digitale",
    tabs: { chat: "Consulenza", calculator: "Budget", documents: "Documenti", quote: "Offerta", contact: "Contatta consulente", advisorContact: "Contatta assicurazioni" },
    roleSwitch: { client: "Cliente", advisor: "Consulente", loginTitle: "Login consulente", password: "Password", login: "Accedi", logout: "Esci", wrong: "Password errata", hint: "Riservato ai consulenti autorizzati", mode: "Vista" },
    chat: { placeholder: "La tua domanda...", send: "Invia", welcome: "Buongiorno! Sono il suo consulente assicurativo digitale.\n\n• Assicurazione malattia\n• Economia domestica & RC\n• Assicurazione vita\n• Veicoli\n• Previdenza 3a/3b", thinking: "Analisi in corso..." },
    calculator: { title: "Calcolatore di budget", subtitle: "Calcola il reddito disponibile", income: "Entrate", expenses: "Uscite", monthly: "Reddito lordo mensile", ahv: "Contributi AVS (~10.6%)", tax: "Imposte", rent: "Affitto", health: "Premio malattia", car: "Veicolo", insurance: "Altre assicurazioni", food: "Alimentazione", other: "Altro", result: "Reddito disponibile", surplus: "Surplus", deficit: "Deficit", totalIncome: "Reddito totale", totalExpenses: "Spese totali", available: "Disponibile", tip: "💡 Fondo emergenza di 3-6 mesi raccomandato." },
    documents: { title: "Carica documenti", subtitle: "Carica le tue polizze in modo sicuro", gdpr: "🔒 Conforme GDPR/LPD — Dati cifrati.", drag: "Trascina qui o", browse: "Sfoglia", types: "PDF, JPG, PNG, DOCX (max. 10 MB)", uploaded: "File", delete: "Rimuovi", noFiles: "Nessun file", categories: ["Malattia", "Vita", "Casa", "Veicolo", "Previdenza", "Altro"], category: "Categoria" },
    quote: { title: "Richiedi offerta", subtitle: "Offerta senza impegno", firstName: "Nome", lastName: "Cognome", email: "E-mail", phone: "Telefono", birthdate: "Data nascita", canton: "Cantone", type: "Tipo assicurazione", types: ["Malattia", "Casa & RC", "Vita", "Veicolo", "Previdenza 3a", "Infortuni"], coverage: "Copertura", message: "Informazioni", submit: "Richiedi", success: "✅ Richiesta inviata. Risposta entro 24h.", privacy: "Dati riservati." },
    contact: { title: "Contatta il tuo consulente", subtitle: "Scrivi direttamente al tuo consulente", advisorInfo: "Il nostro team è disponibile per tutte le domande.", yourName: "Il tuo nome", yourEmail: "La tua e-mail", yourPhone: "Il tuo telefono", subject: "Oggetto", subjects: ["Richiesta consulenza", "Richiedere offerta", "Discutere polizza", "Denuncia sinistro", "Disdetta", "Urgente"], message: "Il tuo messaggio", send: "Invia", success: "✅ Messaggio inviato al consulente.", disclaimer: "Risposta entro 1 giorno lavorativo.", privacy: "Dati riservati." },
    advisorContact: { title: "Contatta le assicurazioni", subtitle: "Area consulente — Solo uso interno", badge: "🔐 AREA CONSULENTE", insurers: [ { name: "Helvetia", email: "partner@helvetia.ch", phone: "058 280 10 00" }, { name: "Zurich Insurance", email: "partner@zurich.ch", phone: "044 628 28 28" }, { name: "Allianz Suisse", email: "partner@allianz.ch", phone: "058 358 40 40" }, { name: "AXA Switzerland", email: "partner@axa.ch", phone: "058 215 11 11" }, { name: "Die Mobiliar", email: "partner@mobiliar.ch", phone: "031 389 61 11" }, { name: "Generali", email: "partner@generali.ch", phone: "058 472 40 40" }, { name: "Vaudoise", email: "partner@vaudoise.ch", phone: "021 618 81 11" }, { name: "CSS", email: "partner@css.ch", phone: "058 277 11 11" }, { name: "Visana", email: "partner@visana.ch", phone: "031 357 91 11" }, { name: "Helsana", email: "partner@helsana.ch", phone: "043 340 11 11" } ], toInsurer: "Seleziona assicurazione", subject: "Oggetto", subjects: ["Inviare richiesta cliente", "Nuova polizza", "Modificare polizza", "Sinistro", "Disdetta", "Partnership", "Interna"], clientRef: "Riferimento cliente (opzionale)", message: "Messaggio", send: "Invia e-mail", success: "✅ Messaggio inviato all'assicurazione.", disclaimer: "Funzione riservata ai consulenti autorizzati." },
  },
  en: {
    appName: "versicherungberater-schweiz.ch", tagline: "Your digital insurance advisor",
    tabs: { chat: "Advice", calculator: "Budget", documents: "Documents", quote: "Quote", contact: "Contact Advisor", advisorContact: "Contact Insurers" },
    roleSwitch: { client: "Client", advisor: "Advisor", loginTitle: "Advisor Login", password: "Password", login: "Login", logout: "Logout", wrong: "Wrong password", hint: "For authorized advisors only", mode: "View" },
    chat: { placeholder: "Your insurance question...", send: "Send", welcome: "Hello! I'm your digital insurance advisor. How can I help?\n\n• Health insurance (KVG/LAMal)\n• Household & Liability\n• Life insurance\n• Vehicle insurance\n• Pension (Pillar 3a/3b)", thinking: "Analyzing your request..." },
    calculator: { title: "Budget & Income Calculator", subtitle: "Calculate your disposable income", income: "Income", expenses: "Expenses", monthly: "Monthly gross income", ahv: "AHV contributions (~10.6%)", tax: "Taxes", rent: "Rent", health: "Health premium", car: "Vehicle", insurance: "Other insurance", food: "Food", other: "Other", result: "Disposable income", surplus: "Surplus", deficit: "Deficit", totalIncome: "Total income", totalExpenses: "Total expenses", available: "Available", tip: "💡 An emergency fund of 3–6 months' salary is recommended." },
    documents: { title: "Upload Documents", subtitle: "Securely upload your insurance documents", gdpr: "🔒 GDPR/nDSG compliant — Encrypted, not stored.", drag: "Drop files here or", browse: "Browse", types: "PDF, JPG, PNG, DOCX (max. 10 MB)", uploaded: "Files", delete: "Remove", noFiles: "No files", categories: ["Health", "Life", "Household", "Vehicle", "Pension", "Other"], category: "Category" },
    quote: { title: "Request a Quote", subtitle: "Non-binding offer", firstName: "First name", lastName: "Last name", email: "E-mail", phone: "Phone", birthdate: "Date of birth", canton: "Canton", type: "Insurance type", types: ["Health Insurance", "Household & Liability", "Life Insurance", "Vehicle", "Pension 3a", "Accident"], coverage: "Coverage", message: "Additional info", submit: "Request quote", success: "✅ Request submitted. We'll respond within 24 hours.", privacy: "Data treated confidentially." },
    contact: { title: "Contact Your Advisor", subtitle: "Write directly to your personal advisor", advisorInfo: "Our expert team is available for all your insurance questions.", yourName: "Your name", yourEmail: "Your e-mail", yourPhone: "Your phone", subject: "Subject", subjects: ["General inquiry", "Request quote", "Discuss policy", "File a claim", "Cancellation", "Urgent"], message: "Your message", send: "Send message", success: "✅ Message forwarded to your advisor.", disclaimer: "Your advisor typically responds within 1 business day.", privacy: "Data treated confidentially." },
    advisorContact: { title: "Contact Insurers Directly", subtitle: "Advisor Area — Internal use only", badge: "🔐 ADVISOR AREA", insurers: [ { name: "Helvetia", email: "partner@helvetia.ch", phone: "058 280 10 00" }, { name: "Zurich Insurance", email: "partner@zurich.ch", phone: "044 628 28 28" }, { name: "Allianz Suisse", email: "partner@allianz.ch", phone: "058 358 40 40" }, { name: "AXA Switzerland", email: "partner@axa.ch", phone: "058 215 11 11" }, { name: "Die Mobiliar", email: "partner@mobiliar.ch", phone: "031 389 61 11" }, { name: "Generali", email: "partner@generali.ch", phone: "058 472 40 40" }, { name: "Vaudoise", email: "partner@vaudoise.ch", phone: "021 618 81 11" }, { name: "CSS", email: "partner@css.ch", phone: "058 277 11 11" }, { name: "Visana", email: "partner@visana.ch", phone: "031 357 91 11" }, { name: "Helsana", email: "partner@helsana.ch", phone: "043 340 11 11" } ], toInsurer: "Select insurer", subject: "Subject", subjects: ["Forward client request", "New policy", "Change policy", "File claim", "Cancellation", "Partnership", "Internal"], clientRef: "Client reference (optional)", message: "Message to insurer", send: "Send email", success: "✅ Message sent to insurer.", disclaimer: "This feature is exclusively for authorized advisors." },
  },
};

const CANTONS = ["AG","AI","AR","BE","BL","BS","FR","GE","GL","GR","JU","LU","NE","NW","OW","SG","SH","SO","SZ","TG","TI","UR","VD","VS","ZG","ZH"];
const ADVISOR_PASSWORD = "berater2024";
function formatCHF(v) { return new Intl.NumberFormat("de-CH",{style:"currency",currency:"CHF",minimumFractionDigits:0}).format(v||0); }

export default function App() {
  const [lang, setLang] = useState("de");
  const [tab, setTab] = useState("chat");
  const [isAdvisor, setIsAdvisor] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pw, setPw] = useState(""); const [pwErr, setPwErr] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(""); const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);  const [dragOver, setDragOver] = useState(false);
  const [quoteForm, setQuoteForm] = useState({firstName:"",lastName:"",email:"",phone:"",birthdate:"",canton:"",type:"",coverage:"",message:""});
  const [quoteDone, setQuoteDone] = useState(false);
  const [contactForm, setContactForm] = useState({subject:"",name:"",email:"",phone:"",message:""});
  const [contactDone, setContactDone] = useState(false);
  const [aForm, setAForm] = useState({insurer:"",subject:"",clientRef:"",message:""});
  const [aDone, setADone] = useState(false);
  const [calc, setCalc] = useState({income:8000,tax:1200,rent:1800,health:450,car:300,insurance:150,food:600,other:400});
  const chatEnd = useRef(null); const fileRef = useRef(null);
  const t = TRANSLATIONS[lang];

  useEffect(()=>{ setMessages([{role:"assistant",text:t.chat.welcome}]); },[lang]);
  useEffect(()=>{ chatEnd.current?.scrollIntoView({behavior:"smooth"}); },[messages]);
  useEffect(()=>{ if(!isAdvisor && tab==="advisorContact") setTab("chat"); },[isAdvisor]);

  const ahv = Math.round((parseInt(calc.income)||0)*0.106);
  const totalExp = ahv+["tax","rent","health","car","insurance","food","other"].reduce((s,k)=>s+(parseInt(calc[k])||0),0);
  const avail = (parseInt(calc.income)||0)-totalExp;

  function doLogin() {
    if(pw===ADVISOR_PASSWORD){setIsAdvisor(true);setShowLogin(false);setPw("");setPwErr(false);setTab("advisorContact");}
    else setPwErr(true);
  }

  async function sendMsg() {
    if(!input.trim()||loading) return;
    const u=input.trim(); setInput("");
    setMessages(m=>[...m,{role:"user",text:u}]); setLoading(true);
    try {
      const sys=`You are a professional Swiss insurance advisor. Answer ONLY in ${lang==="de"?"German":lang==="fr"?"French":lang==="it"?"Italian":"English"}. Be concise and helpful about Swiss insurance (KVG,VVG,AHV,3a).`;
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[...messages.slice(-6).map(m=>({role:m.role,content:m.text})),{role:"user",content:u}]})});
      const d=await r.json();
      setMessages(m=>[...m,{role:"assistant",text:d.content?.[0]?.text||"Bitte versuchen Sie es erneut."}]);
    } catch { setMessages(m=>[...m,{role:"assistant",text:"Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."}]); }
    setLoading(false);
  }

  function uploadFiles(list){ setFiles(p=>[...p,...Array.from(list).map(f=>({id:Date.now()+Math.random(),name:f.name,size:f.size,type:f.type,cat:"",date:new Date().toLocaleDateString("de-CH")}))]); }

  const iS={width:"100%",padding:"10px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",color:"#f0f4f8",fontSize:14,boxSizing:"border-box",outline:"none",marginBottom:12};
  const lS={display:"block",color:"#a0b4c8",fontSize:12,marginBottom:4,fontWeight:500,letterSpacing:"0.05em",textTransform:"uppercase"};
  const btnMain={width:"100%",padding:14,borderRadius:12,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#1a3a5c,#2d6a9f)",color:"#fff",fontWeight:700,fontSize:15};
  const btnGold={...btnMain,background:"linear-gradient(135deg,#b8860b,#daa520)"};
  const card={background:"rgba(255,255,255,0.04)",borderRadius:16,border:"1px solid rgba(255,255,255,0.08)",padding:26};

  const visibleTabs = isAdvisor ? ["chat","calculator","documents","quote","contact","advisorContact"] : ["chat","calculator","documents","quote","contact"];
  const selIns = t.advisorContact.insurers.find(i=>i.name===aForm.insurer);

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0a1628 0%,#0d2040 40%,#0a1a35 100%)",fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#f0f4f8",paddingBottom:48}}>

      {/* HEADER */}
      <div style={{background:"rgba(10,22,40,0.95)",borderBottom:"1px solid rgba(45,106,159,0.3)",padding:"0 20px",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:960,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64,gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1a3a5c"/>
                    <stop offset="100%" stopColor="#2d6a9f"/>
                  </linearGradient>
                  <filter id="glow"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <path d="M22 2L40 9V22C40 32.5 32 40.5 22 43C12 40.5 4 32.5 4 22V9Z" fill="url(#sg)" stroke="#4a9fd4" strokeWidth="1" filter="url(#glow)"/>
                <rect x="14" y="14" width="16" height="16" rx="2.5" fill="#D52B1E"/>
                <rect x="12" y="19.5" width="20" height="5" rx="1.2" fill="white"/>
                <rect x="19.5" y="12" width="5" height="20" rx="1.2" fill="white"/>
              </svg>
            <div>
              <div style={{fontWeight:700,fontSize:15}}>{t.appName}</div>
              <div style={{fontSize:11,color:"#a0b4c8"}}>{t.tagline}</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
            <div style={{display:"flex",gap:4}}>
              {["de","fr","it","en"].map(l=>(
                <button key={l} onClick={()=>setLang(l)} style={{padding:"3px 9px",borderRadius:20,border:"1px solid",cursor:"pointer",fontSize:11,fontWeight:700,borderColor:lang===l?"#4a9fd4":"rgba(255,255,255,0.2)",background:lang===l?"rgba(74,159,212,0.2)":"transparent",color:lang===l?"#4a9fd4":"#a0b4c8"}}>{l.toUpperCase()}</button>
              ))}
            </div>
            {isAdvisor ? (
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{background:"rgba(255,165,0,0.15)",border:"1px solid rgba(255,165,0,0.4)",color:"#ffb347",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>🔐 {t.roleSwitch.advisor}</span>
                <button onClick={()=>setIsAdvisor(false)} style={{padding:"3px 9px",borderRadius:20,border:"1px solid rgba(255,255,255,0.2)",background:"transparent",color:"#a0b4c8",cursor:"pointer",fontSize:11}}>{t.roleSwitch.logout}</button>
              </div>
            ) : (
              <button onClick={()=>setShowLogin(true)} style={{padding:"5px 14px",borderRadius:20,border:"1px solid rgba(255,165,0,0.35)",background:"rgba(255,165,0,0.08)",color:"#ffb347",cursor:"pointer",fontSize:11,fontWeight:700}}>🔐 {t.roleSwitch.advisor}</button>
            )}
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{background:"#0d2040",border:"1px solid rgba(255,165,0,0.35)",borderRadius:20,padding:36,width:320,boxShadow:"0 24px 64px rgba(0,0,0,0.6)"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><svg width="48" height="48" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sg3" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#1a3a5c"/><stop offset="100%" stopColor="#2d6a9f"/></linearGradient></defs><path d="M22 2L40 9V22C40 32.5 32 40.5 22 43C12 40.5 4 32.5 4 22V9Z" fill="url(#sg3)" stroke="#4a9fd4" strokeWidth="1"/><rect x="14" y="14" width="16" height="16" rx="2.5" fill="#D52B1E"/><rect x="12" y="19.5" width="20" height="5" rx="1.2" fill="white"/><rect x="19.5" y="12" width="5" height="20" rx="1.2" fill="white"/></svg></div>
            <h3 style={{textAlign:"center",marginBottom:4,fontSize:17}}>{t.roleSwitch.loginTitle}</h3>
            <p style={{textAlign:"center",color:"#a0b4c8",fontSize:12,marginBottom:20}}>{t.roleSwitch.hint}</p>
            <label style={lS}>{t.roleSwitch.password}</label>
            <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setPwErr(false)}} onKeyDown={e=>e.key==="Enter"&&doLogin()} style={{...iS,borderColor:pwErr?"rgba(224,92,92,0.6)":"rgba(255,255,255,0.15)"}} />
            {pwErr && <div style={{color:"#e05c5c",fontSize:12,marginTop:-8,marginBottom:10}}>⚠ {t.roleSwitch.wrong}</div>}
            <button onClick={doLogin} style={{...btnGold,marginBottom:8}}>{t.roleSwitch.login}</button>
            <button onClick={()=>{setShowLogin(false);setPw("");setPwErr(false);}} style={{width:"100%",padding:10,borderRadius:10,border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"#a0b4c8",cursor:"pointer",fontSize:13}}>Abbrechen</button>
            <div style={{marginTop:14,padding:"8px 12px",background:"rgba(255,165,0,0.06)",borderRadius:8,fontSize:11,color:"rgba(160,180,200,0.6)",textAlign:"center"}}>Demo: <b style={{color:"#ffb347"}}>berater2024</b></div>
          </div>
        </div>
      )}

      {/* TABS */}
      <div style={{background:"rgba(10,22,40,0.8)",borderBottom:"1px solid rgba(45,106,159,0.2)"}}>
        <div style={{maxWidth:960,margin:"0 auto",display:"flex",overflowX:"auto"}}>
          {visibleTabs.map(k=>(
            <button key={k} onClick={()=>setTab(k)} style={{padding:"13px 16px",border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:"transparent",color:tab===k?(k==="advisorContact"?"#ffb347":"#4a9fd4"):"#a0b4c8",borderBottom:tab===k?`2px solid ${k==="advisorContact"?"#ffb347":"#4a9fd4"}`:"2px solid transparent",whiteSpace:"nowrap"}}>
              {k==="advisorContact"&&"🔐 "}{t.tabs[k]}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:960,margin:"0 auto",padding:"24px 20px"}}>

        {/* CHAT */}
        {tab==="chat" && (
          <div style={{...card,padding:0,overflow:"hidden"}}>
            <div style={{height:460,overflowY:"auto",padding:20}}>
              {messages.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:12}}>
                  {m.role==="assistant"&&<svg width="30" height="30" viewBox="0 0 44 44" fill="none" style={{flexShrink:0,marginRight:8}} xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sg2" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#1a3a5c"/><stop offset="100%" stopColor="#2d6a9f"/></linearGradient></defs><path d="M22 2L40 9V22C40 32.5 32 40.5 22 43C12 40.5 4 32.5 4 22V9Z" fill="url(#sg2)" stroke="#4a9fd4" strokeWidth="1"/><rect x="14" y="14" width="16" height="16" rx="2.5" fill="#D52B1E"/><rect x="12" y="19.5" width="20" height="5" rx="1.2" fill="white"/><rect x="19.5" y="12" width="5" height="20" rx="1.2" fill="white"/></svg>}
                  <div style={{maxWidth:"75%",padding:"12px 16px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?"linear-gradient(135deg,#1a3a5c,#2d6a9f)":"rgba(255,255,255,0.08)",border:m.role==="user"?"none":"1px solid rgba(255,255,255,0.1)",fontSize:14,lineHeight:1.6,whiteSpace:"pre-wrap"}}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading&&<div style={{display:"flex",gap:8,alignItems:"center",color:"#a0b4c8",fontSize:13}}><span>🛡️</span><span>{t.chat.thinking} ●●●</span></div>}
              <div ref={chatEnd}/>
            </div>
            <div style={{padding:"12px 20px",borderTop:"1px solid rgba(255,255,255,0.08)",display:"flex",gap:10}}>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} placeholder={t.chat.placeholder} style={{...iS,marginBottom:0,flex:1}}/>
              <button onClick={sendMsg} disabled={loading} style={{padding:"10px 22px",borderRadius:10,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#1a3a5c,#2d6a9f)",color:"#fff",fontWeight:600,fontSize:14,opacity:loading?0.6:1}}>{t.chat.send}</button>
            </div>
          </div>
        )}

        {/* CALCULATOR */}
        {tab==="calculator" && (
          <div>
            <h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>{t.calculator.title}</h2>
            <p style={{color:"#a0b4c8",marginBottom:24,fontSize:14}}>{t.calculator.subtitle}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              <div style={card}>
                <h3 style={{color:"#4a9fd4",marginBottom:14,fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase"}}>📈 {t.calculator.income}</h3>
                <label style={lS}>{t.calculator.monthly} (CHF)</label>
                <input type="number" value={calc.income} onChange={e=>setCalc(p=>({...p,income:e.target.value}))} style={iS}/>
                <div style={{background:"rgba(74,159,212,0.1)",borderRadius:8,padding:"10px 12px",fontSize:13,color:"#a0b4c8"}}>{t.calculator.ahv}: <strong style={{color:"#4a9fd4"}}>{formatCHF(ahv)}</strong></div>
              </div>
              <div style={card}>
                <h3 style={{color:"#e05c5c",marginBottom:14,fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase"}}>📉 {t.calculator.expenses}</h3>
                {["tax","rent","health","car","insurance","food","other"].map(k=>(
                  <div key={k}><label style={lS}>{t.calculator[k]} (CHF)</label><input type="number" value={calc[k]} onChange={e=>setCalc(p=>({...p,[k]:e.target.value}))} style={iS}/></div>
                ))}
              </div>
            </div>
            <div style={{marginTop:20,background:avail>=0?"rgba(39,174,96,0.1)":"rgba(224,92,92,0.1)",borderRadius:16,border:`1px solid ${avail>=0?"rgba(39,174,96,0.3)":"rgba(224,92,92,0.3)"}`,padding:24}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,textAlign:"center"}}>
                {[[t.calculator.totalIncome,formatCHF(calc.income),"#4a9fd4"],[t.calculator.totalExpenses,formatCHF(totalExp),"#e05c5c"],[t.calculator.available,formatCHF(avail),avail>=0?"#27ae60":"#e05c5c"]].map(([l,v,c])=>(
                  <div key={l}><div style={{fontSize:11,color:"#a0b4c8",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>{l}</div><div style={{fontSize:22,fontWeight:700,color:c}}>{v}</div></div>
                ))}
              </div>
              <div style={{marginTop:16,padding:"10px 14px",background:"rgba(74,159,212,0.1)",borderRadius:10,fontSize:13,color:"#a0b4c8",borderLeft:"3px solid #4a9fd4"}}>{t.calculator.tip}</div>
            </div>
          </div>
        )}

        {/* DOCUMENTS */}
        {tab==="documents" && (
          <div>
            <h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>{t.documents.title}</h2>
            <p style={{color:"#a0b4c8",marginBottom:16,fontSize:14}}>{t.documents.subtitle}</p>
            <div style={{background:"rgba(39,174,96,0.1)",border:"1px solid rgba(39,174,96,0.25)",borderRadius:10,padding:"12px 16px",marginBottom:20,fontSize:13,color:"#7ecfa0"}}>{t.documents.gdpr}</div>
            <div onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>{e.preventDefault();setDragOver(false);uploadFiles(e.dataTransfer.files)}} onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${dragOver?"#4a9fd4":"rgba(255,255,255,0.2)"}`,borderRadius:16,padding:"36px 24px",textAlign:"center",cursor:"pointer",background:dragOver?"rgba(74,159,212,0.08)":"rgba(255,255,255,0.03)",marginBottom:24}}>
              <div style={{fontSize:32,marginBottom:10}}>📎</div>
              <div style={{color:"#a0b4c8",fontSize:14}}>{t.documents.drag} <span style={{color:"#4a9fd4",textDecoration:"underline"}}>{t.documents.browse}</span></div>
              <div style={{color:"rgba(160,180,200,0.5)",fontSize:12,marginTop:4}}>{t.documents.types}</div>
              <input ref={fileRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.docx" style={{display:"none"}} onChange={e=>uploadFiles(e.target.files)}/>
            </div>
            {files.length>0 ? files.map(f=>(
              <div key={f.id} style={{background:"rgba(255,255,255,0.04)",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",padding:"12px 16px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:22}}>{f.type?.includes("pdf")?"📄":f.type?.includes("image")?"🖼️":"📝"}</div>
                <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{f.name}</div><div style={{fontSize:11,color:"#a0b4c8"}}>{(f.size/1024).toFixed(1)} KB · {f.date}</div></div>
                <select value={f.cat} onChange={e=>setFiles(p=>p.map(x=>x.id===f.id?{...x,cat:e.target.value}:x))} style={{...iS,width:"auto",marginBottom:0,fontSize:12}}>
                  <option value="">{t.documents.category}</option>
                  {t.documents.categories.map(c=><option key={c}>{c}</option>)}
                </select>
                <button onClick={()=>setFiles(p=>p.filter(x=>x.id!==f.id))} style={{background:"rgba(224,92,92,0.15)",border:"1px solid rgba(224,92,92,0.3)",color:"#e05c5c",padding:"4px 10px",borderRadius:8,cursor:"pointer",fontSize:12}}>{t.documents.delete}</button>
              </div>
            )) : <div style={{textAlign:"center",color:"rgba(160,180,200,0.4)",paddingTop:20}}>{t.documents.noFiles}</div>}
          </div>
        )}

        {/* QUOTE */}
        {tab==="quote" && (
          <div>
            <h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>{t.quote.title}</h2>
            <p style={{color:"#a0b4c8",marginBottom:24,fontSize:14}}>{t.quote.subtitle}</p>
            {quoteDone ? (
              <div style={{...card,textAlign:"center"}}>
                <div style={{fontSize:48,marginBottom:12}}>✅</div>
                <div style={{fontSize:15,color:"#7ecfa0"}}>{t.quote.success}</div>
                <button onClick={()=>setQuoteDone(false)} style={{marginTop:20,padding:"10px 24px",borderRadius:10,border:"1px solid rgba(255,255,255,0.2)",background:"transparent",color:"#f0f4f8",cursor:"pointer"}}>← Zurück</button>
              </div>
            ) : (
              <div style={card}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  {[["firstName","text"],["lastName","text"],["email","email"],["phone","tel"],["birthdate","date"]].map(([k,type])=>(
                    <div key={k}><label style={lS}>{t.quote[k]}</label><input type={type} value={quoteForm[k]} onChange={e=>setQuoteForm(p=>({...p,[k]:e.target.value}))} style={iS}/></div>
                  ))}
                  <div><label style={lS}>{t.quote.canton}</label><select value={quoteForm.canton} onChange={e=>setQuoteForm(p=>({...p,canton:e.target.value}))} style={iS}><option value=""></option>{CANTONS.map(c=><option key={c}>{c}</option>)}</select></div>
                </div>
                <label style={lS}>{t.quote.type}</label>
                <select value={quoteForm.type} onChange={e=>setQuoteForm(p=>({...p,type:e.target.value}))} style={iS}><option value=""></option>{t.quote.types.map(tp=><option key={tp}>{tp}</option>)}</select>
                <label style={lS}>{t.quote.coverage}</label>
                <input value={quoteForm.coverage} onChange={e=>setQuoteForm(p=>({...p,coverage:e.target.value}))} style={iS}/>
                <label style={lS}>{t.quote.message}</label>
                <textarea value={quoteForm.message} onChange={e=>setQuoteForm(p=>({...p,message:e.target.value}))} rows={4} style={{...iS,resize:"vertical"}}/>
                <div style={{fontSize:12,color:"rgba(160,180,200,0.5)",marginBottom:16}}>🔒 {t.quote.privacy}</div>
                <button onClick={()=>setQuoteDone(true)} style={btnMain}>{t.quote.submit}</button>
              </div>
            )}
          </div>
        )}

        {/* CLIENT → CONTACT ADVISOR */}
        {tab==="contact" && (
          <div>
            <h2 style={{fontSize:22,fontWeight:700,marginBottom:4}}>{t.contact.title}</h2>
            <p style={{color:"#a0b4c8",marginBottom:20,fontSize:14}}>{t.contact.subtitle}</p>
            <div style={{background:"rgba(74,159,212,0.08)",border:"1px solid rgba(74,159,212,0.25)",borderRadius:14,padding:"18px 22px",marginBottom:24,display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:50,height:50,borderRadius:"50%",background:"linear-gradient(135deg,#1a3a5c,#4a9fd4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>👤</div>
              <div>
                <div style={{fontWeight:700,fontSize:15}}>Domenico Urso</div>
                <div style={{color:"#a0b4c8",fontSize:13,marginTop:2}}>{t.contact.advisorInfo}</div>
                <div style={{color:"#4a9fd4",fontSize:12,marginTop:4}}>📞 +41 78 775 18 82</div>
              </div>
            </div>
            {contactDone ? (
              <div style={{...card,textAlign:"center"}}>
                <div style={{fontSize:48,marginBottom:12}}>📬</div>
                <div style={{fontSize:15,color:"#7ecfa0"}}>{t.contact.success}</div>
                <div style={{fontSize:12,color:"#a0b4c8",marginTop:8}}>{t.contact.disclaimer}</div>
                <button onClick={()=>setContactDone(false)} style={{marginTop:20,padding:"10px 24px",borderRadius:10,border:"1px solid rgba(255,255,255,0.2)",background:"transparent",color:"#f0f4f8",cursor:"pointer"}}>← Zurück</button>
              </div>
            ) : (
              <div style={card}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div><label style={lS}>{t.contact.yourName}</label><input value={contactForm.name} onChange={e=>setContactForm(p=>({...p,name:e.target.value}))} style={iS}/></div>
                  <div><label style={lS}>{t.contact.yourEmail}</label><input type="email" value={contactForm.email} onChange={e=>setContactForm(p=>({...p,email:e.target.value}))} style={iS}/></div>
                  <div style={{gridColumn:"1/-1"}}><label style={lS}>{t.contact.yourPhone}</label><input type="tel" value={contactForm.phone} onChange={e=>setContactForm(p=>({...p,phone:e.target.value}))} style={iS}/></div>
                </div>
                <label style={lS}>{t.contact.subject}</label>
                <select value={contactForm.subject} onChange={e=>setContactForm(p=>({...p,subject:e.target.value}))} style={iS}><option value=""></option>{t.contact.subjects.map(s=><option key={s}>{s}</option>)}</select>
                <label style={lS}>{t.contact.message}</label>
                <textarea value={contactForm.message} onChange={e=>setContactForm(p=>({...p,message:e.target.value}))} rows={5} style={{...iS,resize:"vertical"}}/>
                <div style={{fontSize:12,color:"rgba(160,180,200,0.5)",marginBottom:16}}>🔒 {t.contact.privacy}</div>
                <button onClick={()=>setContactDone(true)} style={btnMain}>{t.contact.send}</button>
              </div>
            )}
          </div>
        )}

        {/* ADVISOR ONLY: CONTACT INSURERS */}
        {tab==="advisorContact" && isAdvisor && (
          <div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
              <h2 style={{fontSize:22,fontWeight:700,margin:0}}>{t.advisorContact.title}</h2>
              <span style={{background:"rgba(255,165,0,0.15)",border:"1px solid rgba(255,165,0,0.4)",color:"#ffb347",padding:"3px 12px",borderRadius:20,fontSize:11,fontWeight:700}}>{t.advisorContact.badge}</span>
            </div>
            <p style={{color:"#a0b4c8",marginBottom:20,fontSize:14}}>{t.advisorContact.subtitle}</p>
            <div style={{background:"rgba(255,165,0,0.06)",border:"1px solid rgba(255,165,0,0.2)",borderRadius:10,padding:"10px 16px",marginBottom:24,fontSize:13,color:"#ffb347"}}>⚠️ {t.advisorContact.disclaimer}</div>

            {/* Insurer cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,marginBottom:24}}>
              {t.advisorContact.insurers.map(ins=>(
                <div key={ins.name} onClick={()=>setAForm(p=>({...p,insurer:ins.name}))}
                  style={{background:aForm.insurer===ins.name?"rgba(255,165,0,0.12)":"rgba(255,255,255,0.04)",border:`1px solid ${aForm.insurer===ins.name?"rgba(255,165,0,0.5)":"rgba(255,255,255,0.08)"}`,borderRadius:12,padding:"13px 14px",cursor:"pointer",transition:"all 0.18s"}}>
                  <div style={{fontWeight:700,fontSize:12,marginBottom:4}}>{ins.name}</div>
                  <div style={{fontSize:10,color:"#a0b4c8"}}>✉ {ins.email}</div>
                  <div style={{fontSize:10,color:"#a0b4c8"}}>📞 {ins.phone}</div>
                </div>
              ))}
            </div>

            {aDone ? (
              <div style={{...card,textAlign:"center"}}>
                <div style={{fontSize:48,marginBottom:12}}>📤</div>
                <div style={{fontSize:15,color:"#7ecfa0"}}>{t.advisorContact.success}</div>
                <button onClick={()=>setADone(false)} style={{marginTop:20,padding:"10px 24px",borderRadius:10,border:"1px solid rgba(255,255,255,0.2)",background:"transparent",color:"#f0f4f8",cursor:"pointer"}}>← Zurück</button>
              </div>
            ) : (
              <div style={{...card,border:"1px solid rgba(255,165,0,0.15)"}}>
                <label style={lS}>{t.advisorContact.toInsurer}</label>
                <select value={aForm.insurer} onChange={e=>setAForm(p=>({...p,insurer:e.target.value}))} style={iS}><option value=""></option>{t.advisorContact.insurers.map(i=><option key={i.name}>{i.name}</option>)}</select>
                {selIns && (
                  <div style={{background:"rgba(74,159,212,0.08)",border:"1px solid rgba(74,159,212,0.2)",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:13,color:"#a0b4c8"}}>
                    📧 {selIns.email} &nbsp;·&nbsp; 📞 {selIns.phone}
                  </div>
                )}
                <label style={lS}>{t.advisorContact.subject}</label>
                <select value={aForm.subject} onChange={e=>setAForm(p=>({...p,subject:e.target.value}))} style={iS}><option value=""></option>{t.advisorContact.subjects.map(s=><option key={s}>{s}</option>)}</select>
                <label style={lS}>{t.advisorContact.clientRef}</label>
                <input value={aForm.clientRef} onChange={e=>setAForm(p=>({...p,clientRef:e.target.value}))} placeholder="z.B. Max Muster, Ref. #12345" style={iS}/>
                <label style={lS}>{t.advisorContact.message}</label>
                <textarea value={aForm.message} onChange={e=>setAForm(p=>({...p,message:e.target.value}))} rows={6} style={{...iS,resize:"vertical"}}/>
                <button onClick={()=>setADone(true)} style={btnGold}>{t.advisorContact.send}</button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
