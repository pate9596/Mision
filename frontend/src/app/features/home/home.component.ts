import { Component, OnInit, PLATFORM_ID, Inject, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

import { TuiButton, TuiTitle, TuiLink } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';
import { truncate } from 'node:fs/promises';
import { link } from 'node:fs';

type Particle = { x: number; y: number; r: number; dx: number; dy: number };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TuiButton, TuiTitle, TuiLink, TuiBadge],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  stack = [
    { label: 'Lenguajes', items: ['Java', 'JavaScript', 'Python', 'HTML', 'CSS'] },
    { label: 'Frontend', items: ['Angular', 'React', 'React Native', 'Expo', 'Vite'] },
    { label: 'Backend', items: ['.NET', 'Django'] },
    { label: 'Bases de datos', items: ['MySQL', 'Oracle', 'MongoDB'] },
    { label: 'BI / Dashboards', items: ['Looker Studio', 'Power BI'] },
    { label: 'Tooling / DevOps', items: ['Docker', 'Git / GitHub'] },
  ];

  proyectos = [
    {
      titulo: 'Rendiflow',
      descripcion:
        'Aplicación móvil para digitalizar y automatizar rendiciones de gastos mediante IA. App desarrollada en React Native conectada a una API REST en Go (Golang), con OCR y modelos LLM (LLAMA) para extracción automática de datos. Infraestructura contenerizada con Docker y Kubernetes, base de datos PostgreSQL y observabilidad con Middleware.io.',
      imagen: 'assets/images/proyectos/rendiflowj.png',
      orientacion: 'portrait',
      tecnologias: ['React Native', 'Go', 'PostgreSQL', 'Docker', 'Kubernetes', 'AI/ML'],
      link: 'Repositorio privado',
      privado: true,
    },
    {
      titulo: 'App Chuck Norris',
      descripcion:
        'Aplicación móvil en Flutter que consume una API de frases de Chuck Norris y una API de traducción para mostrar frases en español. Incluye interfaz simple y almacenamiento local.',
      imagen: 'assets/images/proyectos/appchuck.jpeg',
      orientacion: 'portrait',
      tecnologias: ['Flutter', 'Dart', 'API REST'],
      link: 'https://github.com/pate9596/app_chuck',
      privado: false,
    },
    {
      titulo: 'Ferretería eCommerce',
      descripcion:
        'E-commerce universitario con integración de APIs para cambio de moneda y WebPay para aprobación de pagos. Incluye autenticación de usuarios y restablecimiento de contraseña vía email.',
      imagen: 'assets/images/proyectos/ferremas.png',
      orientacion: 'landscape',
      tecnologias: ['Django', 'JavaScript', 'SQLite', 'WebPay'],
      link: 'https://github.com/pate9596/Ferremas',
      privado: false,
    },
    {
      titulo: 'Sistema de Gestión de Notas',
      descripcion:
        'App web para gestión de notas personales con Google OAuth/registro de usuarios. Backend .NET 9 (API REST + JWT) y frontend React + Vite + TypeScript, con CRUD por usuario y persistencia en MongoDB.',
      imagen: 'assets/images/proyectos/notas.png',
      orientacion: 'landscape',
      tecnologias: ['.NET', 'React', 'TypeScript', 'MongoDB', 'JWT'],
      link: 'https://github.com/pate9596/GestionnNotas',
      privado: false,
    },
    {
      titulo: 'Plataforma Web de Gestión y Difusión – Misión Puente Alto ',
      descripcion:
        'Plataforma web para la gestión y difusión de contenido multimedia de una misión cristiana en proceso de desarrollo. Permite visualizar galerías y documentos públicos, y administrar imágenes, videos y PDFs mediante autenticación segura. Desarrollada con React + Vite y Django REST Framework, usando JWT y arquitectura desacoplada.',
      imagen: 'assets/images/proyectos/ppagcris.png',
      orientacion: 'landscape',
      tecnologias: ['Django', 'React', 'TypeScript', 'SqlLite', 'JWT','Vercel','PythonAnywhere'],
      link: 'https://mision-sembradores-puente-alto.vercel.app/',
      privado: false,
    },
    {
      titulo: 'calculadora-academica',
      descripcion:
        'Aplicación académica móvil para el cálculo de porcentajes, Fracciones promedios ponderados y estimación de notas mínimas en evaluaciones, desarrollada con React Native, Expo y UI Kitten.',
      imagen: 'assets/images/proyectos/calculadora.png',
      orientacion: 'landscape',
      tecnologias: ['React Native', 'Expo', 'UI Kitten'],
      link: 'https://github.com/pate9596/calculadora-academica',
      privado: false,

      app: {
        tipo: 'apk', // 'apk' | 'play'
        url: 'assets/apps/app-universal-realease.apk',
      }
    },
  ];

  experiencia = [
    {
      puesto: 'Practicante / Analista BI - Datos',
      empresa: 'Televisión Nacional de Chile (TVN)',
      duracion: 'Agosto 2024 - Octubre 2024',
      descripcion:
        '• Integración y migración de datos (p. ej., Talana HR API → ETL en Python) hacia BD relacionales.\n' +
        '• Modelado y preparación de datos para análisis y visualización (Looker Studio).\n' +
        '• Automatización de procesos (jobs/containers) y mejoras de calidad de datos (validaciones, limpieza, trazabilidad).',
    },
    {
      puesto: 'Práctica Laboral en Ingeniería en Informática',
      empresa: 'ALMAGRO S.A.',
      duracion: 'Enero 2024 - Marzo 2024',
      descripcion:
        '• Realicé testing de plataformas, ejecuté casos de prueba y reporté incidencias a los equipos de desarrollo.\n' +
        '• Creé mockups y recreación de vistas de aplicaciones utilizando Miro.\n' +
        '• Gestioné tareas con Microsoft Planner bajo metodologías ágiles (Scrum y Kanban).\n' +
        '• Estudié metodologías de construcción como BIM y Gemelos Digitales (Digital Twin).',
    },
  ];

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private rafId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startParticles();
    }
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private startParticles(): void {
    const canvas = document.getElementById('bgCanvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.canvas = canvas;
    this.ctx = ctx;

    this.resizeCanvas();

    const numParticles = 80;
    this.particles = Array.from({ length: numParticles }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
    }));

    const animate = () => {
      if (!this.canvas || !this.ctx) return;

      const { width, height } = this.canvas;

      this.ctx.clearRect(0, 0, width, height);

      for (const p of this.particles) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(102, 86, 255, 0.45)';
        this.ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }

      this.rafId = requestAnimationFrame(animate);
    };

    animate();
  }
}
