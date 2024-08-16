//bloco responsavel por realizar as importações
import { useState } from "react";
import { FiSearch } from "react-icons/fi"; //icones
import './style.css'; //style
import api from './services/api';

function App(){
  //declarando as variaveis 
  const [input, setInput] = useState('');
  //mostra qual o valor inicial 
  const [cep, setCEP] = useState({});
//função assiicrona 
  async function handleSearch(){
//verifica se o usuario preencheu o valor do CEP e se ele não preencher aparecerá um alerta na tela 
    if(input === ''){
      alert("preencha algum CEP!")
      return;
    }
//esse bloco valida e informa erros que acontecem durante a execusão, quando a execusao da função dá certo, entra no bloco try e quando ocorre um erro ele entra no catch
    try{
      const response = await api.get(`${input}/json`)
      setCEP(response.data)
      setInput("")
  }catch{
      alert("Erro ao buscar CEP")
      setInput("")
  }
  }
  //retorna a requisição 
  return(
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
  //campo onde o usuario vai digitar algo 
    <div className = "containerInput">
      <input
      type="text"
      placeholder="digite seu CEP"
     value={input}
      onChange={(e)=> setInput(e.target.value)}
    />
    //criação de botão, quando você clica em algo ele faz a requisoção 
    <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
      </button>
    </div>
//verifica se tem algo no objeto CEP, se tiver algo ele irá renderizar e mostrar todas as informações 
//ao utilizar o cep.cep você busca o cep, já quando você utiliza o cep.logradouro você visualiza a rua 
    {Object.keys(cep).length> 0 &&(
      <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <span>Rua: {cep.logradouro}</span>
        <span>Complemento{cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
    )}
    </div>
  );
}
//está exportando a função App
export default App;