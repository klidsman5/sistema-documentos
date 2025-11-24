// client/src/App.jsx
import { useState } from 'react';
import { listaDocumentos } from './data/documentos';
import ModalDocumento from './components/ui/ModalDocumento';
import { Plus, FileText } from 'lucide-react';

function App() {
  const [documentoActivo, setDocumentoActivo] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      
      {/* Encabezado Dashboard */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl text-gray-800 font-light mb-6 flex items-center gap-2">
          <FileText className="text-blue-600" />
          Cumplimientos de Obligaciones <span className="font-bold text-gray-900">Contratistas</span>
          <span className="text-gray-400 text-sm ml-2 bg-white px-2 py-1 rounded border">Periodo 2025</span>
        </h1>

        {/* Tabla de Documentos */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          
          {/* Cabecera de Tabla */}
          <div className="grid grid-cols-12 bg-slate-800 text-white text-xs font-bold uppercase py-3 px-4 tracking-wider">
            <div className="col-span-2 md:col-span-1">Cód</div>
            <div className="col-span-8 md:col-span-10">Documento Requerido</div>
            <div className="col-span-2 md:col-span-1 text-center">Acción</div>
          </div>

          {/* Filas */}
          {listaDocumentos.map((doc, index) => (
            <div 
              key={doc.id} 
              className={`grid grid-cols-12 border-b border-gray-100 text-sm items-center transition-colors hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
            >
              <div className="col-span-2 md:col-span-1 p-4 text-blue-600 font-bold">{doc.id}</div>
              <div className="col-span-8 md:col-span-10 p-4 text-gray-700 font-medium">{doc.titulo}</div>
              <div className="col-span-2 md:col-span-1 p-4 flex justify-center">
                <button 
                  onClick={() => setDocumentoActivo(doc)}
                  className="bg-white hover:bg-blue-600 hover:text-white text-gray-500 border border-gray-300 rounded-md p-2 shadow-sm transition-all transform hover:scale-110"
                  title="Generar Documento"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal (Solo aparece si documentoActivo tiene datos) */}
      {documentoActivo && (
        <ModalDocumento 
          documento={documentoActivo} 
          onClose={() => setDocumentoActivo(null)} 
        />
      )}

    </div>
  );
}

export default App;