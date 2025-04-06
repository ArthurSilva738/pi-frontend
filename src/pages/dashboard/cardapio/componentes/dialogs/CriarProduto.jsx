import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";

export default function CriarProdutoDialog() {
  const [categoria, setCategoria] = useState("");

  const [open, setOpen] = useState(false);
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

  const handleChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Criar Produto
      </Button>
      <Dialog
        sx={{ "& .MuiDialog-paper": { minWidth: 600 } }}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Criar Produto</DialogTitle>
        <DialogContent>
          <DialogContentText>Insira detalhes do produto </DialogContentText>
          Nome:
          <TextField
            required
            id="name"
            name="nome"
            placeholder="ex: pão de alho"
            type="text"
            fullWidth
            variant="outlined"
          />
          Preço:
          <TextField
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
          Categoria:
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
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
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button type="submit">Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
