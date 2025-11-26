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
  habilidades = [
    'Angular',
    'Django',
    'Python',
    'JavaScript',
    'React / React Native',
    'MySQL / MongoDB / Oracle',
    'Docker',
    'Git / GitHub',
  ];

   proyectos = [
    {
      titulo: 'Rendiflow (App de gestión de boletas/gastos)',
      descripcion:
        'Plataforma para captura y gestión de rendiciones: app móvil (React Native/Expo) + backend (Python Clean Architecture) + ETL diario en contenedores y tableros BI. Enfoque en arquitectura, métricas y automatización.',
      link: 'https://github.com/tori-labs/rendiflow', // ajusta si es privado
    },
    {
      titulo: 'Sistema de reservas y gestión para barberías',
      descripcion:
        'Sistema web con gestión de clientes, servicios y agenda. Backend en Laravel, integración con Docker y despliegue orientado a entorno académico/capstone.',
      link: 'https://tu-proyecto.com', // cambia por repositorio/demo real
    },
    {
      titulo: 'GestionNotas (Notas académicas)',
      descripcion:
        'Aplicación web para registro y gestión de notas académicas con .NET Razor Pages + MongoDB. Incluye autenticación/usuarios y CRUD completo.',
      link: 'https://github.com/pate9596/Notas',
    },
  ];

  experiencia = [
    {
      puesto: 'Practicante / Analista BI - Datos',
      empresa: 'Televisión Nacional de Chile (TVN)',
      duracion: '2025 (fechas exactas según tu CV)', // pon mes/año real
      descripcion:
        '• Integración y migración de datos (p. ej., Talana HR API → ETL en Python) hacia BD relacionales.\n' +
        '• Modelado y preparación de datos para análisis y visualización (Looker Studio).\n' +
        '• Automatización de procesos (jobs/containers) y mejoras de calidad de datos (validaciones, limpieza, trazabilidad).',
    },
    {
      puesto: 'Desarrollador Web (Práctica)',
      empresa: 'Almagro',
      duracion: '2024 (fechas exactas según tu CV)', // pon mes/año real
      descripcion:
        '• Desarrollo de funcionalidades web y mantenimiento evolutivo.\n' +
        '• Trabajo con frontend y backend (Angular/Django según corresponda a tu CV).\n' +
        '• Enfoque en buenas prácticas: control de versiones, corrección de bugs y mejoras UI.',
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
