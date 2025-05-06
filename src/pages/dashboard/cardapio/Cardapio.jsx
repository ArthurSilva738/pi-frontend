import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const menu = {
  mesa: 7,
  categorias: [
    {
      nome: "Hambúrgueres",
      produtos: [
        {
          nome: "X-Bacon",
          ingredientes:
            "pão de hambúrguer, hambúrguer bovino, queijo mussarela, bacon.",
          preco: 9.99,
        },
        {
          nome: "X-Egg-Bacon",
          ingredientes:
            "pão de hambúrguer, hambúrguer bovino, queijo mussarela, bacon, ovo.",
          preco: 11.99,
        },
      ],
    },
    {
      nome: "Carnes na Brasa",
      produtos: [
        {
          nome: "Choripan",
          ingredientes:
            "legumes, queijo coalho com melado de cana e pão de alho cremoso.",
          preco: 28.99,
        },
        {
          nome: "Franbacon 400g",
          ingredientes:
            "peito de frango com bacon, mandioca, molho de mel e mostarda.",
          preco: 48.99,
        },
        {
          nome: "Mandioca 200g",
          ingredientes: "Esses são complementos adicionais.",
          preco: 14.99,
        },
      ],
    },
    {
      nome: "Bebidas",
      produtos: [
        { nome: "Coca-Cola 350ml", ingredientes: "", preco: 7.99 },
        { nome: "Fanta 350ml", ingredientes: "", preco: 6.99 },
      ],
    },
  ],
};

export default function CardapioPage() {
  const [quantidades, setQuantidades] = useState({});

  const alterarQuantidade = (produtoNome, delta) => {
    setQuantidades((prev) => {
      const atual = prev[produtoNome] || 0;
      const novaQtd = Math.max(0, atual + delta);
      return { ...prev, [produtoNome]: novaQtd };
    });
  };

  const calcularTotal = () => {
    let total = 0;
    menu.categorias.forEach((categoria) => {
      categoria.produtos.forEach((produto) => {
        const quantidade = quantidades[produto.nome] || 0;
        total += quantidade * produto.preco;
      });
    });
    return total;
  };

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#121212",
        color: "#fff",
        pb: 10,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ p: 2 }}>
        Mesa: {menu.mesa}
      </Typography>

      {menu.categorias.map((categoria) => (
        <Accordion
          key={categoria.nome}
          defaultExpanded
          sx={{ bgcolor: "#1e1e1e", color: "white" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            <Typography variant="h6" sx={{ color: "orange" }}>
              {categoria.nome}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {categoria.produtos.map((produto) => (
              <Card
                key={produto.nome}
                sx={{
                  bgcolor: "#2c2c2c",
                  color: "#fff",
                  width: "100%",
                  my: 2,
                  borderRadius: 0,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {produto.nome}
                  </Typography>
                  {produto.ingredientes && (
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {produto.ingredientes}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      R${produto.preco.toFixed(2)}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        color="warning"
                        size="small"
                        onClick={() => alterarQuantidade(produto.nome, -1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>
                        {quantidades[produto.nome] || 0}
                      </Typography>
                      <IconButton
                        color="warning"
                        size="small"
                        onClick={() => alterarQuantidade(produto.nome, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {categoria.nome === "Bebidas" && (
              <FormControlLabel
                control={<Checkbox sx={{ color: "white" }} />}
                label="Deseja receber junto com o prato principal?"
                sx={{ mt: 2 }}
              />
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "#1e1e1e",
          p: 2,
          borderTop: "1px solid #333",
        }}
      >
        <Button variant="contained" color="warning" fullWidth>
          Finalizar Pedido - Total: R${calcularTotal().toFixed(2)}
        </Button>
      </Box>
    </Box>
  );
}
