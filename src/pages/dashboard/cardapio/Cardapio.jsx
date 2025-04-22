import { useState } from "react";
import CriarProdutoDialog from "./componentes/dialogs/CriarProduto";
import "./styles.css";
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import EditarProdutoDialog from "./componentes/dialogs/EditarProduto";
import { useNavigate } from "react-router-dom";

export default function CardapioPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = (dialog) => {
    setOpen(dialog);
  };

  const handleClose = () => {
    navigate(``);
    setOpen(false);
  };
  const handleEditar = (id) => {
    handleClickOpen("editar");
    navigate(`?editar-produto=${id}`);
  };

  return (
    <div className="pagina-desktop">
      <div className="topo">
        <h1>🍔 Painel de Cardápio</h1>
        {open == "criar" && (
          <CriarProdutoDialog
            addProduct={addProduct}
            open={open == "criar"}
            handleClose={handleClose}
          />
        )}
        {open == "editar" && (
          <EditarProdutoDialog
            addProduct={addProduct}
            produtos={produtos}
            open={open == "editar"}
            handleClose={handleClose}
          />
        )}
        <Button variant="outlined" onClick={() => handleClickOpen("criar")}>
          Criar Produto
        </Button>
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

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                onClick={() => handleEditar(produto.id)}
              >
                Editar
              </Button>

              <Button sx={{ color: "red" }}>Excluir</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
