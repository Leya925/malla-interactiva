// script.js
const cursos = {
  // PRIMER SEMESTRE
  "Matemáticas básicas": [],
  "Química fundamental": [],
  "Deporte y salud": [],
  "Inserción a la vida universitaria": [],
  "Introducción a la ingeniería": [],
  "Informática I": [],

  // SEGUNDO
  "Física I + lab": ["Matemáticas básicas"],
  "Cálculo monovariable": ["Matemáticas básicas"],
  "Álgebra lineal": ["Matemáticas básicas"],
  "Química orgánica": ["Química fundamental"],
  "Fundamentos de sistemas socioecológicos": [],
  "Seminario constitución, legislación ambiental y ética de la profesión": [],

  // TERCERO
  "Fundamentos de ecología": ["Fundamentos de sistemas socioecológicos"],
  "Cálculo multivariable": ["Cálculo monovariable", "Álgebra lineal"],
  "Ecuaciones diferenciales": ["Álgebra lineal"],
  "Taller I ISA": ["Fundamentos de sistemas socioecológicos"],
  "Fisicoquímica ambiental": ["Física I + lab", "Química fundamental"],

  // CUARTO
  "Química ambiental + lab": ["Química orgánica"],
  "Fundamentos de gestión ambiental": [
    "Fundamentos de sistemas socioecológicos",
    "Fundamentos de ecología",
    "Seminario constitución, legislación ambiental y ética de la profesión"
  ],
  "Microbiología de la contaminación y el saneamiento + lab": [],
  "Taller II ISA": ["Taller I ISA", "Fisicoquímica ambiental"],
  "Probabilidad y estadística": ["Cálculo multivariable"],

  // QUINTO
  "Cartografía y SIG": ["Probabilidad y estadística"],
  "Fundamentos de procesos sociales": [],
  "GA de proyectos y empresas": ["Fundamentos de gestión ambiental"],
  "Fundamentos de fluidos para ISA": ["Ecuaciones diferenciales"],
  "Taller III ISA": ["Taller II ISA"],
  "Procesos ambientales I": ["Ecuaciones diferenciales", "Química ambiental + lab"],

  // SEXTO
  "Hidrología": ["Cartografía y SIG"],
  "Hidráulica para ISA": ["Fundamentos de fluidos para ISA"],
  "Principios de epidemiología y salud ambiental": ["Microbiología de la contaminación y el saneamiento + lab", "Probabilidad y estadística"],
  "Fundamentos de suelos": ["Química ambiental + lab"],
  "Procesos ambientales II + lab": ["Procesos ambientales I"],

  // SÉPTIMO
  "Evaluación económica, social y ambiental de proyectos para ISA": ["GA de proyectos y empresas"],
  "SANEAMIENTO AMBIENTAL PARA ZONAS RURALES Y PERIURBANAS": ["Principios de epidemiología y salud ambiental"],
  "SISTEMAS DE ABASTECIMIENTO DE AGUA POTABLE": ["Hidrología", "Hidráulica para ISA"],
  "PROCESOS AMBIENTALES III + LAB": ["Procesos ambientales II + lab"],
  "TALLER IV ISA": ["Taller III ISA"],
  "GESTIÓN INTEGRAL DE RESIDUOS SÓLIDOS": [],

  // OCTAVO
  "SEMINARIO DE TRABAJO DE GRADO": [],
  "DISEÑO PTAP": [],
  "GESTIÓN DE LA CALIDAD DEL AIRE": ["Probabilidad y estadística", "Química ambiental + lab"],
  "TALLER V ISA": ["TALLER IV ISA"],
  "ELECTIVA PROFESIONAL I": [],
  "ELECTIVA COMPLEMENTARIA II": [],

  // NOVENO
  "TRABAJO DE GRADO I": ["SEMINARIO DE TRABAJO DE GRADO"],
  "SISTEMAS DE ALCANTARILLADO": [],
  "INSTALACIONES HIDROSANITARIAS": [],
  "ELECTIVA PROFESIONAL II": [],
  "TALLER VI ISA": ["TALLER V ISA"],

  // DÉCIMO
  "TRABAJO DE GRADO II": ["TRABAJO DE GRADO I"],
  "DISEÑO PTAR": [],
  "ELECTIVA PROFESIONAL III": []
};

const aprobados = new Set();

function requisitosAprobados(curso) {
  return cursos[curso].every(req => aprobados.has(req));
}

function crearMalla() {
  const contenedor = document.getElementById('malla');
  contenedor.innerHTML = '';

  Object.entries(cursos).forEach(([nombre, prereqs]) => {
    const div = document.createElement('div');
    div.classList.add('curso');
    div.innerText = nombre;

    if (!requisitosAprobados(nombre)) {
      div.classList.add('bloqueado');
    } else if (aprobados.has(nombre)) {
      div.classList.add('aprobado');
    }

    div.onclick = () => aprobarCurso(nombre);
    contenedor.appendChild(div);
  });
}

function aprobarCurso(nombre) {
  if (!requisitosAprobados(nombre) || aprobados.has(nombre)) return;
  aprobados.add(nombre);
  crearMalla(); // Re-render con nuevos desbloqueos
}

window.onload = crearMalla;

