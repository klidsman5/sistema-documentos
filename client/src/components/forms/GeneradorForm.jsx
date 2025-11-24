import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { generarPdfRequest } from '../../services/api';
import { FileText, Download, Loader2 } from 'lucide-react';

const GeneradorForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const datosCompletos = {
        ...data,
        tareas: [{ descripcion: "Generado desde Web", horas: 1 }]
      };
      const pdfBlob = await generarPdfRequest(datosCompletos);
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Reporte_${data.nombre}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert("Error: Revisa que el Backend (puerto 3000) esté encendido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6 mt-10 border border-gray-200">
      <div className="flex items-center gap-2 mb-6 text-blue-700">
        <FileText size={28} />
        <h2 className="text-2xl font-bold">Nuevo Reporte</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input {...register("nombre", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Juan Perez" />
          {errors.nombre && <span className="text-red-500 text-xs">Requerido</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
          <input {...register("dni", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" placeholder="12345678" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
          <input {...register("cargo", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Supervisor" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Download />}
          {loading ? "Generando..." : "Descargar PDF"}
        </button>
      </form>
    </div>
  );
};
export default GeneradorForm;