import React, { useState, useEffect } from "react";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer-main";

const CurrencyChange = () => {
  const apiKey = process.env.REACT_APP_FCA_API_KEY;
  const [eurToJpy, setEurToJpy] = useState(null);
  const [amountInEur, setAmountInEur] = useState("");
  const [convertedValue, setConvertedValue] = useState(null);

  // Récupération des taux de change
  useEffect(() => {
    if (apiKey) {
      const fetchExchangeRate = async () => {
        try {
          const currency = new Freecurrencyapi(apiKey);
          const response = await currency.latest();
          const eurToJpyRate = response.data.JPY;

          if (eurToJpyRate) {
            setEurToJpy(eurToJpyRate);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des taux de change:",
            error
          );
        }
      };

      fetchExchangeRate();
    }
  }, [apiKey]);

  // Gérer la conversion
  const handleConversion = () => {
    if (amountInEur && eurToJpy) {
      const convertedToJpy = parseFloat(amountInEur) * eurToJpy;
      setConvertedValue(convertedToJpy);
    }
  };

  const handleAmountChange = (e) => {
    setAmountInEur(e.target.value);
    setConvertedValue(null);
  };

  return (
    <div className="page-currency">
      <Navigation />
      <div className="currency-change-container">
        <h2 className="heading">Convertisseur de devises (EUR vers JPY)</h2>
        <div className="input-container">
          <label htmlFor="amountInEur" className="input-label">
            Montant en EUR:
          </label>
          <input
            type="number"
            id="amountInEur"
            className="input-field"
            value={amountInEur}
            onChange={handleAmountChange}
            placeholder="Entrez un montant en EUR"
          />
        </div>
        <button onClick={handleConversion} className="convert-button">
          Convertir
        </button>
        {convertedValue !== null && (
          <div className="result-container">
            <h3 className="result-heading">Résultat de la conversion:</h3>
            <p className="result-text">
              {amountInEur} EUR équivalent à {convertedValue.toFixed(2)} JPY
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CurrencyChange;
