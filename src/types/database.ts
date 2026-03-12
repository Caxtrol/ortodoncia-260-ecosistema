export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      pacientes: {
        Row: {
          id: string;
          codigo_paciente: string;
          nombre_completo: string;
          telefono: string;
          telefono_alternativo: string | null;
          email: string | null;
          fecha_nacimiento: string | null;
          curp: string | null;
          tipo_sangre: string | null;
          lugar_origen: string | null;
          domicilio: string | null;
          foto_url: string | null;
          qr_code_url: string | null;
          sucursal_principal: 'san_pedro' | 'torreon' | 'ambas';
          canal_preferido: 'whatsapp' | 'llamada' | 'ambos';
          nativo_digital: boolean;
          notas_especiales: string | null;
          puntos_smile: number;
          nivel_smile: 'bronce' | 'plata' | 'oro' | 'diamante';
          total_visitas: number;
          fecha_ultima_visita: string | null;
          activo: boolean;
          origen_registro: 'walk_in' | 'whatsapp' | 'facebook' | 'importacion_excel' | 'ocr_ine' | 'qr';
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['pacientes']['Row']>;
        Update: Partial<Database['public']['Tables']['pacientes']['Row']>;
      };
      citas: {
        Row: {
          id: string;
          paciente_id: string;
          sucursal: 'san_pedro' | 'torreon';
          doctor_id: string;
          fecha_hora: string;
          duracion_minutos: number;
          tipo_tratamiento: string | null;
          estado: 'programada' | 'confirmada' | 'en_curso' | 'completada' | 'cancelada' | 'no_show';
          confirmada_por: 'paciente_whatsapp' | 'norma_llamada' | 'norma_app' | 'auto' | null;
          llegada_registrada_at: string | null;
          notificacion_doctor_at: string | null;
          instruccion_cobro: Json | null;
          cobro_total: number | null;
          metodo_pago: 'efectivo' | 'tarjeta' | 'transferencia' | 'parcial' | null;
          cuidados_post_enviados: boolean;
          resena_solicitada: boolean;
          notas_clinicas: string | null;
          cancelacion_motivo: string | null;
          cancelacion_horas_anticipacion: number | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['citas']['Row']>;
        Update: Partial<Database['public']['Tables']['citas']['Row']>;
      };
      expediente_clinico: {
        Row: {
          id: string;
          paciente_id: string;
          doctor_id: string;
          sucursal: string;
          signos_vitales: Json | null;
          antecedentes: Json | null;
          padecimiento_actual: Json | null;
          exploracion_fisica: Json | null;
          odontograma: Json | null;
          diagnostico_cie10: string | null;
          plan_tratamiento: Json | null;
          notas: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['expediente_clinico']['Row']>;
        Update: Partial<Database['public']['Tables']['expediente_clinico']['Row']>;
      };
      // Aquí se agregarán el resto de tablas (doctores, sucursales, leads, etc.)
    };
  };
}
