import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query; // Recebe o parâmetro de busca da query string

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${
        process.env.LOCATION_IQ_API_KEY
      }&q=${encodeURIComponent(
        query as string
      )}&countrycodes=br&format=json&addressdetails=1&limit=2`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar endereço");
    }

    const data = await response.json();

    // Processa os dados para retornar apenas a cidade e a UF
    const processedData = data.map((location: any) => {
      const displayName = location.display_name;
      const city =
        location.address.city ||
        location.address.town ||
        location.address.village;
      const state = location.address.state;

      return {
        display_name: city && state ? `${city}-${state}` : displayName,
      };
    });

    res.status(200).json(processedData); // Retorna os dados processados
  } catch (error) {
    console.error("Erro na requisição:", error);
    res.status(500).json({ error: "Erro ao buscar endereço" });
  }
}
