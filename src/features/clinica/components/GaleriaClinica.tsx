import React, { useState } from 'react';
import { Upload, X, Maximize2, ChevronLeft, ChevronRight, Image as ImageIcon, Calendar } from 'lucide-react';

type CategoriaImagen = 'Todas' | 'Radiografías' | 'Intraorales' | 'Extraorales';

interface ImagenClinica {
  id: string;
  url: string;
  titulo: string;
  fecha: string;
  categoria: CategoriaImagen;
}

// Mock de imágenes usando picsum con seeds específicos para simular consistencia
const MOCK_IMAGENES: ImagenClinica[] = [
  {
    id: 'img1',
    url: 'https://picsum.photos/seed/xray1/800/600?grayscale',
    titulo: 'Radiografía Panorámica Inicial',
    fecha: '2026-01-15',
    categoria: 'Radiografías',
  },
  {
    id: 'img2',
    url: 'https://picsum.photos/seed/xray2/600/800?grayscale',
    titulo: 'Lateral de Cráneo',
    fecha: '2026-01-15',
    categoria: 'Radiografías',
  },
  {
    id: 'img3',
    url: 'https://picsum.photos/seed/smile1/800/600',
    titulo: 'Frente Sonrisa (Pre-tratamiento)',
    fecha: '2026-01-15',
    categoria: 'Extraorales',
  },
  {
    id: 'img4',
    url: 'https://picsum.photos/seed/smile2/800/600',
    titulo: 'Perfil Derecho',
    fecha: '2026-01-15',
    categoria: 'Extraorales',
  },
  {
    id: 'img5',
    url: 'https://picsum.photos/seed/teeth1/800/600',
    titulo: 'Oclusal Superior',
    fecha: '2026-01-15',
    categoria: 'Intraorales',
  },
  {
    id: 'img6',
    url: 'https://picsum.photos/seed/teeth2/800/600',
    titulo: 'Oclusal Inferior',
    fecha: '2026-01-15',
    categoria: 'Intraorales',
  },
  {
    id: 'img7',
    url: 'https://picsum.photos/seed/smile3/800/600',
    titulo: 'Frente Sonrisa (Mes 2)',
    fecha: '2026-03-10',
    categoria: 'Extraorales',
  },
];

export default function GaleriaClinica() {
  const [filtroActivo, setFiltroActivo] = useState<CategoriaImagen>('Todas');
  const [imagenSeleccionada, setImagenSeleccionada] = useState<number | null>(null);

  const imagenesFiltradas = MOCK_IMAGENES.filter(
    img => filtroActivo === 'Todas' || img.categoria === filtroActivo
  );

  const abrirVisor = (index: number) => {
    setImagenSeleccionada(index);
  };

  const cerrarVisor = () => {
    setImagenSeleccionada(null);
  };

  const imagenAnterior = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imagenSeleccionada !== null && imagenSeleccionada > 0) {
      setImagenSeleccionada(imagenSeleccionada - 1);
    }
  };

  const imagenSiguiente = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imagenSeleccionada !== null && imagenSeleccionada < imagenesFiltradas.length - 1) {
      setImagenSeleccionada(imagenSeleccionada + 1);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Header y Controles */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-teal-600" />
            Galería Clínica
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {MOCK_IMAGENES.length} estudios y fotografías registradas
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Filtros */}
          <div className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto hide-scrollbar flex-1 sm:flex-none">
            {['Todas', 'Radiografías', 'Intraorales', 'Extraorales'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroActivo(cat as CategoriaImagen)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  filtroActivo === cat 
                    ? 'bg-white text-teal-700 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Botón Subir */}
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Subir Archivos</span>
          </button>
        </div>
      </div>

      {/* Grid de Imágenes */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {imagenesFiltradas.map((img, index) => (
            <div 
              key={img.id}
              onClick={() => abrirVisor(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 cursor-pointer border border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all"
            >
              <img 
                src={img.url} 
                alt={img.titulo} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">{img.categoria}</span>
                <h4 className="text-white font-medium leading-tight mb-2">{img.titulo}</h4>
                <div className="flex items-center gap-1 text-slate-300 text-xs">
                  <Calendar className="w-3 h-3" />
                  {formatDate(img.fecha)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {imagenesFiltradas.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
            <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium text-slate-600">No hay imágenes en esta categoría</p>
          </div>
        )}
      </div>

      {/* Visor de Imágenes (Lightbox) */}
      {imagenSeleccionada !== null && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={cerrarVisor}
        >
          {/* Botón Cerrar */}
          <button 
            onClick={cerrarVisor}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Controles de Navegación */}
          <button 
            onClick={imagenAnterior}
            disabled={imagenSeleccionada === 0}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={imagenSiguiente}
            disabled={imagenSeleccionada === imagenesFiltradas.length - 1}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Imagen Principal */}
          <div 
            className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={imagenesFiltradas[imagenSeleccionada].url} 
              alt={imagenesFiltradas[imagenSeleccionada].titulo}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
            
            {/* Info de la imagen en el visor */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {imagenesFiltradas[imagenSeleccionada].titulo}
              </h3>
              <div className="flex items-center justify-center gap-4 text-slate-400 text-sm">
                <span className="bg-white/10 px-3 py-1 rounded-full text-teal-300">
                  {imagenesFiltradas[imagenSeleccionada].categoria}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(imagenesFiltradas[imagenSeleccionada].fecha)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
