import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import type { Drink, DrinkDetail } from "../services/api";
import { getDrinks, getDrinkDetail } from "../services/api";

export default function Consumo() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<DrinkDetail | null>(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const data = await getDrinks();
      setDrinks(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin w-10 h-10 text-cyan-600" />
        <p className="mt-4 text-gray-600 font-medium">Cargando bebidas...</p>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Bebidas: Ordinary Drink
        </h2>

        {/* GRID DE TARJETAS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {drinks.map((drink) => (
            <motion.div
              key={drink.idDrink}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
              onClick={async () => {
                const detail = await getDrinkDetail(drink.idDrink);
                setSelected(detail);
              }}
            >
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{drink.strDrink}</h3>
                <p className="text-sm text-gray-500 mt-1">ID: {drink.idDrink}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MODAL DETALLES */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-bold text-gray-800">
                  {selected.strDrink}
                </h3>

                <button
                  aria-label="Cerrar"
                  title="Cerrar"
                  onClick={() => setSelected(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* CONTENIDO */}
              <div className="p-6 space-y-4">
                <img
                  src={selected.strDrinkThumb}
                  alt={selected.strDrink}
                  className="w-full rounded-lg shadow-md"
                />

                <p>
                  <span className="font-semibold">Categoría:</span>{" "}
                  {selected.strCategory}
                </p>
                <p>
                  <span className="font-semibold">Alcohol:</span>{" "}
                  {selected.strAlcoholic}
                </p>
                <p>
                  <span className="font-semibold">Vaso:</span>{" "}
                  {selected.strGlass}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {selected.strInstructions}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
