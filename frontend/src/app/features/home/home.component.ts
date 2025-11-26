import { Component, OnInit, PLATFORM_ID, Inject, HostListener, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { TuiButton, TuiTitle, TuiLink } from '@taiga-ui/core';
import { TuiBadge } from '@taiga-ui/kit';

type Particle = { x: number; y: number; r: number; dx: number; dy: number };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TuiButton, TuiTitle, TuiLink, TuiBadge],
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
      titulo: 'Sistema de Barbería',
      descripcion: 'Sistema completo con agenda, barberos y notificaciones.',
      link: 'https://tu-proyecto.com',
    },
    {
      titulo: 'App de Notas',
      descripcion: 'Web para gestionar notas académicas con MongoDB.',
      link: 'https://otro-proyecto.com',
    },
  ];

  experiencia = [
    {
      puesto: 'Analista de datos',
      empresa: 'Tech Solutions',
      duracion: '2022 - Presente',
      descripcion: 'Análisis de grandes volúmenes de datos para optimizar procesos empresariales.',
    },
    {
      puesto: 'Desarrollador Junior',
      empresa: 'Web Creators',
      duracion: '2020 - 2022',
      descripcion: 'Desarrollo de aplicaciones web utilizando Angular y Django.',
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
