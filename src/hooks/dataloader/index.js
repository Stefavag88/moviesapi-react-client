import { useContext } from "react";
import useAPI from "react-api-hooks";
import LanguageContext from "../../components/LanguageContext";

function useMoviesApi(controllerRoute) {
  const [lang] = useContext(LanguageContext);

 

  const { data = [], error, isLoading } = useAPI(urlWithLang);

  return { data, error, isLoading };
};

export default useMoviesApi;
