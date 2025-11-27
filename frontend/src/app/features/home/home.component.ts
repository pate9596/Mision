import { Component, OnInit, PLATFORM_ID, Inject, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

import { TuiButton, TuiTitle, TuiLink } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';

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
      titulo: 'Rendiflow (App de gestión de boletas/gastos)',
      descripcion:
        'Plataforma para captura y gestión de rendiciones: app móvil (React Native/Expo) + backend (Python Clean Architecture) + ETL diario en contenedores y tableros BI. Enfoque en arquitectura, métricas y automatización.',
      link: 'https://github.com/tori-labs/rendiflow',
    },
    {
      titulo: 'App Chuck (Flutter)',
      descripcion:
        'Aplicación móvil en Flutter que consume una API de frases de Chuck Norris y una API de traducción para mostrar frases en español. Incluye interfaz simple y almacenamiento local.',
      link: 'https://github.com/pate9596/app_chuck',
    },
    {
      titulo: 'Ferretería eCommerce (Django + SQLite)',
      descripcion:
        'E-commerce universitario con integración de APIs para cambio de moneda y WebPay para aprobación de pagos. Incluye autenticación de usuarios y restablecimiento de contraseña vía email.',
      link: 'https://github.com/pate9596/Ferremas',
    },
    {
      titulo: 'Sistema de Gestión de Notas (Full Stack .NET + React + Vite + MongoDB)',
      descripcion:
        'App web para gestión de notas personales con Google OAuth/registro de usuarios. Backend .NET 9 (API REST + JWT) y frontend React + Vite + TypeScript, con CRUD por usuario y persistencia en MongoDB.',
      link: 'https://github.com/pate9596/GestionnNotas',
    },
  ];


  experiencia = [
    {
      puesto: 'Practicante / Analista BI - Datos',
      empresa: 'Televisión Nacional de Chile (TVN)',
      duracion: 'Agosto 2025 - Octubre 2025', // pon mes/año real
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
