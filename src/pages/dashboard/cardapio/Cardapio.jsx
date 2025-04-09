import { useState } from "react";
import CriarProdutoDialog from "./componentes/dialogs/CriarProduto";
import "./styles.css";

export default function CardapioPage() {
  const [produtos, setProdutos] = useState([
    {
      id: "ghjdfbghjsdbf1",
      nome: "X-bacon",
      ingredientes: ["Pão", "carne", "queijo", "bacon"],
      preco: 999,
      categoria: "Burguer",
      disponivel: true,
    },
    {
      id: "abacaxi1",
      nome: "X-abacaxi",
      ingredientes: ["Pão", "carne", "queijo", "abacaxi (sim...)"],
      preco: 1099,
      categoria: "Tropical",
      disponivel: false,
    },
  ]);
  const addProduct = (produto) => {
    setProdutos([...produtos, produto]);
  };

  return (
    <div className="pagina-desktop">
      <div className="topo">
        <h1>🍔 Painel de Cardápio</h1>
        <CriarProdutoDialog addProduct={addProduct} />
      </div>

      <div className="grid-produtos">
        {produtos.map((produto) => (
          <div key={produto.id} className="card-produto">
            <h2>{produto.nome}</h2>
            <p className="categoria">{produto.categoria}</p>
            <p className="preco">R$ {(produto.preco / 100).toFixed(2)}</p>
            <p
              className={`status ${produto.disponivel ? "disponivel" : "indisponivel"}`}
            >
              {produto.disponivel ? "Disponível" : "Indisponível"}
            </p>

            <div className="ingredientes">
              <p>Ingredientes:</p>
              <ul>
                {produto.ingredientes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
