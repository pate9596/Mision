import { Component } from '@angular/core';
interface Project { title: string; category: string; description: string; tags: string[]; image?: string; link?: string; }
@Component({selector: 'app-home', standalone: true, templateUrl: './home.component.html', styleUrl: './home.component.css'})
export class HomeComponent {
  menuOpen = false;
  year = new Date().getFullYear();
  projects: Project[] = [
    {title:'RendiFlow',category:'MÓVIL · BACKEND',description:'Aplicación para digitalizar rendiciones de gastos. Una experiencia móvil conectada a una API REST, con extracción de datos mediante OCR e IA.',tags:['React Native','Go','PostgreSQL','Docker','Kubernetes'],image:'rendiflowj.png'},
    {title:'Sistema de Gestión de Notas',category:'FULL STACK · AUTENTICACIÓN',description:'Notas personales con operaciones CRUD por usuario. Frontend en React y API en .NET, con autenticación JWT y Google OAuth.',tags:['React · Vite','.NET','MongoDB','JWT'],image:'notas.png',link:'https://github.com/pate9596/GestionnNotas'},
    {title:'Calculadora Académica',category:'DESARROLLO MÓVIL',description:'Cálculo de promedios ponderados, porcentajes y notas mínimas para evaluaciones, desde una aplicación móvil.',tags:['React Native','Expo'],image:'calculadora.png',link:'https://github.com/pate9596/calculadora-academica'},
    {title:'Frases Chuck Norris',category:'MÓVIL · INTEGRACIÓN DE APIs',description:'Consumo de una API REST de frases y una API de traducción para presentar el contenido en español.',tags:['Flutter','Dart','API REST'],image:'appchuck.jpeg',link:'https://github.com/pate9596/app_chuck'},
    {title:'Automatización ETL',category:'INTEGRACIÓN DE DATOS',description:'Automatización de procesos de integración con Python y SQL, con foco en consistencia y trazabilidad de datos.',tags:['Python','SQL']},
    {title:'Dashboards y KPIs',category:'ANÁLISIS DE DATOS',description:'Dashboards orientados a usuarios, con indicadores, filtros y navegación para apoyar el análisis de negocio.',tags:['Looker Studio','SQL','BigQuery']}
  ];
  stack = [
    {name:'Frontend y móvil',items:'Angular · React · React Native · Flutter'},
    {name:'Backend y APIs',items:'.NET · Django · FastAPI · APIs REST'},
    {name:'Bases de datos',items:'MySQL · MongoDB · Oracle · SQLite'},
    {name:'Cloud y datos',items:'Azure · BigQuery · Looker Studio · Python · SQL'},
    {name:'Herramientas',items:'Docker · Git · GitLab · Postman · Selenium'},
    {name:'Despliegue',items:'Vercel · PythonAnywhere · Render'}
  ];
  certifications = ['Scrum Foundation — CertiProf, 2024','Gestión de Proyectos y Metodología Ágil — Santander, 2024','Oracle SQL/PLSQL — 2024','Introducción a Python — Coursera, 2023','Claude Code — Anthropic'];
}
