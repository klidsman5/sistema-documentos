// client/src/components/ui/ModalDocumento.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Download, Loader2 } from 'lucide-react';
import { generarPdfRequest } from '../../services/api';

const ModalDocumento = ({ documento, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Enviamos tipoDoc para que el backend sepa qué plantilla usar
      const payload = {
        tipoDoc: documento.codigo,
        titulo: documento.titulo,
        ...data,
        // Tareas dummy para que no falle el backend si espera tareas
        tareas: [{ descripcion: "Generado desde Dashboard", horas: 1 }]
      };

      const pdfBlob = await generarPdfRequest(payload);
      
      // Descargar
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${documento.id}_${data.nombre || 'doc'}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      onClose(); // Cerrar modal al terminar
    } catch (error) {
      alert("Error al generar. Revisa la consola.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="bg-blue-700 p-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-sm">{documento.id}</h3>
          <button onClick={onClose} className="text-white hover:bg-blue-800 rounded-full p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h4 className="text-blue-900 font-semibold text-sm">{documento.titulo}</h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre Trabajador / Rep.</label>
            <input {...register("nombre", { required: true })} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Juan Perez" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">DNI / RUC</label>
            <input {...register("dni", { required: true })} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: 12345678" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cargo</label>
            <input {...register("cargo", { required: true })} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Supervisor" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 mt-4">
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Download className="h-4 w-4" />}
            Generar Documento
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalDocumento;