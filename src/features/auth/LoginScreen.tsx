import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/authStore';
import { Phone, Lock, ArrowRight, Delete } from 'lucide-react';

export default function LoginScreen() {
  const [step, setStep] = useState<'phone' | 'pin'>('phone');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Ingresa un número válido a 10 dígitos');
      return;
    }
    setError('');
    setStep('pin');
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setError('');
      
      // Auto-submit cuando llega a 4 dígitos
      if (newPin.length === 4) {
        authenticate(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  const authenticate = (currentPin: string) => {
    // MOCK LOGIN: Simulamos la validación de Supabase Auth
    // En producción, aquí se llama a supabase.auth.signInWithOtp o signInWithPassword
    
    let role: UserRole = null;
    let path = '';

    // Hardcoded para demostración (Cero Fricción)
    if (phone === '8710000001' && currentPin === '1111') {
      role = 'directora';
      path = '/directora/dashboard';
    } else if (phone === '8710000002' && currentPin === '2222') {
      role = 'operativa';
      path = '/operacion/pacientes';
    } else if (phone === '8710000003' && currentPin === '3333') {
      role = 'doctor';
      path = '/clinica/hoy';
    } else if (phone === '8710000004' && currentPin === '4444') {
      role = 'paciente';
      path = '/portal/inicio';
    } else {
      setError('PIN incorrecto o usuario no encontrado');
      setPin('');
      return;
    }

    login(role, { phone, id: 'mock-id' });
    navigate(path, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-teal-900 px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <h1 className="text-3xl font-serif font-bold text-white relative z-10">Ortodoncia 260</h1>
          <p className="text-teal-200 mt-2 text-sm relative z-10">Sistema Inteligente de Gestión</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-slate-800">Bienvenido</h2>
                <p className="text-slate-500 text-sm mt-1">Ingresa tu número de teléfono para continuar</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Número Celular (10 dígitos)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all font-medium text-lg tracking-wide"
                    placeholder="871 000 0000"
                    autoFocus
                  />
                </div>
                {error && <p className="mt-2 text-sm text-rose-500 font-medium">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={phone.length < 10}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm"
              >
                Siguiente
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Demo Helper */}
              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
                <p className="font-bold text-slate-700 mb-2">Datos de acceso (Demo):</p>
                <ul className="space-y-1">
                  <li>Dra. Cinthia: <span className="font-mono bg-slate-200 px-1 rounded">8710000001</span> (PIN: 1111)</li>
                  <li>Norma: <span className="font-mono bg-slate-200 px-1 rounded">8710000002</span> (PIN: 2222)</li>
                  <li>Doctor: <span className="font-mono bg-slate-200 px-1 rounded">8710000003</span> (PIN: 3333)</li>
                  <li>Paciente: <span className="font-mono bg-slate-200 px-1 rounded">8710000004</span> (PIN: 4444)</li>
                </ul>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Ingresa tu PIN</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Enviado al {phone.slice(0, 3)} *** {phone.slice(-4)}
                  <button onClick={() => setStep('phone')} className="text-teal-600 font-medium ml-2 hover:underline">
                    Cambiar
                  </button>
                </p>
              </div>

              {/* PIN Display */}
              <div className="flex justify-center gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <div 
                    key={index}
                    className={`w-14 h-16 flex items-center justify-center text-2xl font-bold rounded-xl border-2 transition-all ${
                      pin.length > index 
                        ? 'border-teal-500 bg-teal-50 text-teal-700' 
                        : pin.length === index
                        ? 'border-teal-300 bg-white shadow-[0_0_0_4px_rgba(20,184,166,0.1)]'
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    {pin.length > index ? '•' : ''}
                  </div>
                ))}
              </div>
              
              {error && <p className="text-center text-sm text-rose-500 font-medium">{error}</p>}

              {/* Custom Keypad (Cero Fricción) */}
              <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePinInput(num.toString())}
                    className="h-14 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-xl text-xl font-medium text-slate-800 transition-colors"
                  >
                    {num}
                  </button>
                ))}
                <div className="h-14"></div> {/* Empty space */}
                <button
                  onClick={() => handlePinInput('0')}
                  className="h-14 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-xl text-xl font-medium text-slate-800 transition-colors"
                >
                  0
                </button>
                <button
                  onClick={handleDelete}
                  className="h-14 flex items-center justify-center bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-xl text-slate-600 transition-colors"
                >
                  <Delete className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
