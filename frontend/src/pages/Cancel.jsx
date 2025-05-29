export default function Cancel() {
  return (
    <div className="max-w-xl mx-auto mt-12 text-center">
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">
        <h2 className="text-2xl font-bold mb-2">¡Pago cancelado!</h2>
        <p>El pago fue cancelado o hubo un problema al procesarlo. Por favor, intenta nuevamente o contacta soporte.</p>
      </div>
    </div>
  );
}
