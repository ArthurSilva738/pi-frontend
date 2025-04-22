import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";

import { Box, Chip, FormControl, MenuItem, Select, Stack } from "@mui/material";

export default function EditarProdutoDialog(propriedades) {
  const { addProduct, open, handleClose, produtos } = propriedades;
  const [categoria, setCategoria] = useState("");
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    const produtoId = new URLSearchParams(window.location.search).get(
      "editar-produto"
    );

    const produtoEncontrado = produtos.find(
      (produto) => produto.id == produtoId
    );

    console.log(produtoEncontrado);
  }, [open]); // só executa ao montar

  const categorias = [
    "Carnes",
    "Acompanhamento",
    "Prato individual",
    "Molhos",
    "Hamburguer",
    "Extras",
    "Porções",
    "Sobremesas",
    "Bebidas",
  ];

  const criarProduto = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nome = formData.get("nome");
    const preco = formData.get("preco");

    addProduct({ nome, preco, categoria, ingredientes });
    setIngredientes([]);

    handleClose();
  };

  const handleChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleDelete = (ingredienteSelecionado) => {
    const novosIngredientes = ingredientes.filter(
      (ingrediente) => ingrediente !== ingredienteSelecionado
    );
    setIngredientes(novosIngredientes);
  };

  const handleCreate = () => {
    const ingrediente = document.getElementById("ingrediente");
    setIngredientes([...ingredientes, ingrediente.value]);
    ingrediente.value = "";
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { minWidth: 600 } }}
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: criarProduto,
        },
      }}
    >
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <Stack spacing={1.5}>
          {" "}
          <DialogContentText>Insira detalhes do produto </DialogContentText>
          <div>
            Nome:
            <TextField
              sx={{ marginTop: 0.5 }}
              required
              id="name"
              name="nome"
              placeholder="ex: pão de alho"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <div>
            Preço:
            <TextField
              sx={{ marginTop: 0.5 }}
              required
              id="preco"
              name="preco"
              placeholder="ex: 15,50"
              type=""
              fullWidth
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div>
            Categoria:
            <Box sx={{ width: "100%", marginTop: 0.5 }}>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  fullWidth
                  value={categoria}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Selecione a Categoria</em>
                  </MenuItem>
                  {categorias.map((categoria) => (
                    <MenuItem value={categoria}>{categoria}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>
            Ingredientes:
            <TextField
              sx={{ marginTop: 0.5 }}
              id="ingrediente"
              name="ingrediente"
              placeholder="Pão"
              type=""
              fullWidth
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {" "}
                      <Button
                        aria-label="create"
                        sx={{ color: "#1976d2" }}
                        onClick={handleCreate}
                      >
                        {" "}
                        <AddIcon sx={{ mr: 1 }} />
                        Adicionar
                      </Button>{" "}
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div>
            <Box display="flex" gap={1} flexWrap="wrap">
              {ingredientes.map((ingrediente) => (
                <Chip
                  label={ingrediente}
                  variant="outlined"
                  onDelete={() => handleDelete(ingrediente)}
                />
              ))}
            </Box>{" "}
          </div>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
        <Button type="submit">Cadastrar</Button>
      </DialogActions>
    </Dialog>
  );
}
