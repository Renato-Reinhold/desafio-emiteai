import axios from "axios";

export const useViaCep = () => {
  const fetchEndereco = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) return null;
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { fetchEndereco };
};
