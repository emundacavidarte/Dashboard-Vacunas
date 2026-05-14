const locations = [
  { ut: "LAMBAYEQUE", dep: "LAMBAYEQUE", prov: "CHICLAYO", dist: "JOSE LEONARDO ORTIZ", comite: "SAGRADO CORAZON DE JESUS", ciais: ["LOCAL PRIVADO GUEVARA LULIQUIS", "LOCAL PRIVADO SRA DEANIRA VASQUEZ ESCALANTE", "LOCAL COMUNAL LUCIDORO SANCHEZ ALARCÓN", "DULCE MELODÍA"] },
  { ut: "LAMBAYEQUE", dep: "LAMBAYEQUE", prov: "CHICLAYO", dist: "LA VICTORIA", comite: "FE Y ESPERANZA", ciais: ["MIS TALENTOS I", "LOCAL COMUNAL 1° DE JUNIO", "LOCAL COMUNAL PASTOR BOGGIANO", "TRP_CARRUSEL DE NIÑOS_FE Y ESPERANZA", "TCS_CIAI_BURBUJAS DE RAIMONDI_FE Y ESPERANZA"] },
  { ut: "LAMBAYEQUE", dep: "LAMBAYEQUE", prov: "CHICLAYO", dist: "JOSE LEONARDO ORTIZ", comite: "VIRGEN DE LORETO", ciais: ["LOCAL COMUNAL VIRGEN DE LORETO", "LOCAL PRIVADO SRA. GREGORIA GONZALES AYASTA", "NUEVO AMANECER", "TRP_UN MUNDO DE ALEGRIA_VIRGEN DE LORETO", "TRP_LOCAL SALAMANCA_VIRGEN DE LORETO", "TCS_CIAI_COMIENZOS BRILLANTES_VIRGEN DE LORETO"] },
  { ut: "LAMBAYEQUE", dep: "LAMBAYEQUE", prov: "CHICLAYO", dist: "OYOTUN", comite: "SANTA ROSA DE LIMA", ciais: ["LOCAL COMITÉ DE VASO DE LECHE SAN JUAN BAUTISTA", "LOCAL MUNICIPAL SAN MARTIN", "ESTRELLITAS DE JESUS", "MIS ANGELITOS"] },
  { ut: "LAMBAYEQUE", dep: "LAMBAYEQUE", prov: "CHICLAYO", dist: "JOSE LEONARDO ORTIZ", comite: "MADRE TERESA DE CALCUTA", ciais: ["LOCAL COMUNAL VILLA EL SOL", "LOCAL COMUNAL TRABAJANDO CON AMOR", "MIS PRIMEROS PASOS", "VICTOR RAUL HAYA DE LA TORRE", "VILLA HERMOSA"] },
  { ut: "LAMBAYEQUE", dep: "LAMBAYEQUE", prov: "CHICLAYO", dist: "CHICLAYO", comite: "CRISTO REDENTOR", ciais: ["ARCA DE NOE VIII", "LOCAL PRIVADO LOS ARRIAGAS", "LOCAL COMUNAL RICARDO PALMA", "SANTA FE", "TRP_CRECIENDO CON AMOR_CRISTO REDENTOR", "TRP_GOTITAS DE AMOR_CRISTO REDENTOR"] },
  { ut: "LAMBAYEQUE", dep: "LAMBAYEQUE", prov: "CHICLAYO", dist: "CAYALTI", comite: "LOS NIÑOS DE JESUS", ciais: ["COMPLEJO PARROQUIAL", "LOCAL MUNICIPAL LUZ ANGELICA DIAZ GALVEZ"] },
  { ut: "AMAZONAS", dep: "AMAZONAS", prov: "BAGUA", dist: "BAGUA", comite: "GOTITAS DE AMOR", ciais: ["SEMILLITAS DEL FUTURO"] },
  { ut: "AMAZONAS", dep: "AMAZONAS", prov: "BAGUA", dist: "BAGUA", comite: "EL REBAÑO DE JESÚS", ciais: ["SONRISITAS DE AMOR"] },
  { ut: "ANCASH", dep: "ANCASH", prov: "HUARAZ", dist: "INDEPENDENCIA", comite: "LOS PATITOS", ciais: ["RAYITOS DE SOL"] },
  { ut: "ANCASH", dep: "ANCASH", prov: "HUARAZ", dist: "TARICA", comite: "NUEVA ESPERANZA DE TARICA", ciais: ["CHAVIN", "ANTA"] },
  { ut: "APURIMAC", dep: "APURIMAC", prov: "ABANCAY", dist: "CHACOCHE", comite: "06 DE JULIO", ciais: ["LOS AMANCAES", "GOLONDRINAS", "LAS MARIPOSITAS"] },
  { ut: "AREQUIPA", dep: "AREQUIPA", prov: "CAYLLOMA", dist: "MAJES", comite: "EL MAJEÑITO", ciais: ["ESTRELLITAS DEL SUR", "PEDREGAL SUR I-MIS TESORITOS"] },
  { ut: "AREQUIPA", dep: "AREQUIPA", prov: "AREQUIPA", dist: "YURA", comite: "NIÑOS VENCEDORES DE YURA", ciais: ["VILLA TAMBO", "PASITOS DE QUIÑONES", "SONRISAS DE UTUPARA"] },
  { ut: "AREQUIPA", dep: "AREQUIPA", prov: "AREQUIPA", dist: "CERRO COLORADO", comite: "SOR ANA", ciais: ["TAC_ALQUILER_PEQUEÑOS EXPLORADORES", "TAC_ALQUILER_MI MUNDO DE JUEGOS", "TAC_ALQUILER_DULCES TRAVESURAS", "LOS ANGELES"] },
  { ut: "AYACUCHO", dep: "AYACUCHO", prov: "HUAMANGA", dist: "CARMEN ALTO", comite: "SEÑOR DE LOS TEMBLORES", ciais: ["SEÑOR DE LOS TEMBLORES", "LOCAL COMUNAL LA FLORIDA", "TAC_ALQUILER_CIAI_01_SEÑOR DE LOS TEMBLORES"] },
  { ut: "CAJAMARCA CT JAEN", dep: "CAJAMARCA", prov: "JAEN", dist: "JAEN", comite: "SAN JUAN BAUTISTA - MAGLLANAL", ciais: ["SEMILLITAS DEL FUTURO 4", "GOTITAS DE CRISTAL II"] },
  { ut: "CAJAMARCA CT JAEN", dep: "CAJAMARCA", prov: "SAN IGNACIO", dist: "SAN IGNACIO", comite: "MI PEQUEÑO MUNDO FELIZ", ciais: ["RAICES CAÑAVERALES", "LAS ORQUÍDEAS", "SONRISAS FELICES II", "MUNDO DE SONRISAS", "TCS_CIAI1 MI PEQUEÑO MUNDO FELIZ"] },
  { ut: "CALLAO", dep: "CALLAO", prov: "CALLAO", dist: "VENTANILLA", comite: "LOS CEDROS", ciais: ["LUIS FELIPE DE LAS CASAS", "NIÑEZ CON ESPERANZA", "COMUNAL LAS ABEJITAS", "NUEVO AMANECER"] },
  { ut: "CALLAO", dep: "LIMA", prov: "LIMA", dist: "COMAS", comite: "NUEVO AMANECER", ciais: ["HORACIO ZEVALLOS", "SANTA ROSA"] }
];

export const MOCK_DATA = Array.from({ length: 800 }).map((_, i) => {
  const loc = locations[Math.floor(Math.random() * locations.length)];
  const ciai = loc.ciais[Math.floor(Math.random() * loc.ciais.length)];
  const servicio = i % 2 === 0 ? "SCD" : "SAF";
  
  // Edades: SAF 0-36 meses, SCD 6-36 meses
  let ageMonths;
  if (servicio === "SAF") {
    ageMonths = Math.floor(Math.random() * 37); // 0 to 36
  } else {
    ageMonths = Math.floor(Math.random() * 31) + 6; // 6 to 36
  }

  // Mapear meses a ageGroupId
  const ageGroups = ["rn", "2m", "4m", "6m", "7m", "12m", "15m", "18m", "24m", "36m"];
  const ageGroupValues = [0, 2, 4, 6, 7, 12, 15, 18, 24, 36];
  
  let ageGroupIndex = ageGroupValues.findIndex(v => ageMonths <= v);
  if (ageGroupIndex === -1) ageGroupIndex = ageGroups.length - 1;
  const ageGroup = ageGroups[ageGroupIndex];
  
  const allVaccines = ["bcg", "hvb", "pentavalente", "hexavalente", "ipv", "apo", "rotavirus", "neumococo", "influenza", "spr", "varicela", "hepa", "ama", "dpt"];
  
  // Simulación de vacunación progresiva según edad
  // A mayor edad, más vacunas debería tener
  const maxPossibleVaccines = Math.min(allVaccines.length, Math.floor(ageMonths / 2) + 2);
  const isFullyVaccinated = Math.random() > 0.15; // 85% de cumplimiento simulado
  
  const numVaccines = isFullyVaccinated 
    ? Math.min(maxPossibleVaccines, Math.floor(Math.random() * 4) + 8) 
    : Math.floor(Math.random() * 5);
    
  const vaccinatedList = allVaccines.slice(0, numVaccines);

  return {
    id: i.toString(),
    dni: `7${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
    ageMonths,
    ageGroupId: ageGroup,
    vaccinatedList,
    isFullyVaccinated,
    servicio,
    departamento: loc.dep,
    ut: loc.ut,
    provincia: loc.prov,
    distrito: loc.dist,
    comite: loc.comite,
    centroPoblado: `CP ${loc.dist}`,
    ciai: ciai,
  };
});
