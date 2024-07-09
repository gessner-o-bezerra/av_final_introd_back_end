const express = require('express');
const router = express.Router();

const cars = []

const generateId = () => {
  return cars.length+1;
};

//CREATE
router.post('/', (req, res) => {
  const { model, brand, year, color, price } = req.body;

  // Validações
  if (!model || !brand || !year || !color || !price) {
    return res.status(400).send('Por favor, forneça modelo, marca, ano, cor, preço do veículo.');
  }

  // Cria nova viagem
  const newCars = {
    id: generateId(),
    model,
    brand,
    year,
    color,
    price
  };

  cars.push(newCars);

  res.status(201).send(`Veículo de modelo ${model}, marca ${brand}, ano ${year} 
    e cor ${color} criado com sucesso ! Seu
identificador é : ${newCars.id} , e seu preço é : R$ ${price}.`);

});

//READ ALL
router.get('/', (req, res) => {
    if(cars.length === 0){
        return res.status(200).send("Não há veículos cadastrados no momento")
    }
    cars.sort((a, b) => a.price - b.price);
    let response = "Os veículos cadastrados são:\n";
    cars.forEach((car) => {
        response += `ID: ${car.id} | Modelo:${car.model}| Marca: ${car.brand} | Ano: ${car.year} | Cor: ${car.color} |
Preço: R$ ${car.price}\n\n`;
    })
res.status(200).send(response.trim());
});

//READ BY BRAND
router.get('/:brand', (req, res) => {
  const { brand } = req.params;
  
  // Filtrar os veículos que correspondem à marca informada
  const carsFilteredByBrand = cars.filter(
    (car) => car.brand.toLowerCase() === brand.toLowerCase()
  );

  // Verificar se foram encontrados veículos com a marca informada 
  if (carsFilteredByBrand.length === 0) {
     return res.status(404).send(`Nenhum veículo da marca ${brand} encontrado.`);
  } else {
    // Ordenar os veículos filtrados pelo preço (em ordem crescente)
    carsFilteredByBrand.sort((a, b) => a.price - b.price);

    // Exibir os veículos no formato especificado
    let response = `Os veículos da marca ${brand} são:\n`;
    carsFilteredByBrand.forEach((car) => {
       response += `ID: ${car.id} | Modelo: ${car.model} | Cor: ${
          car.color
        } | Preço: R$${car.price.toFixed(2)}\n` 
    });
    return res.status(200).send(response.trim());
  }
});

router.put('/:id',(req, res) => {
  const { id } = req.params;
  const {color, price} = req.body;
  
  // Filtrar os veículos que correspondem à marca informada
  const carsFilteredById = cars.find(car => car.id === id);

  
  // Verificar se foram encontrados veículos com a marca informada 
  if (!carsFilteredById) {
     return res.status(404).send(`"Veículo, não encontrado.`);
  } else {
    if(color) carsFilteredById.color = color;
    if(price) carsFilteredById.price = price;
    return res.status(200).send(`Veículo de identificação ${id} atualizado com sucesso
      , modelo ${carsFilteredById.model} | cor ${carsFilteredById.color} | preço ${carsFilteredById.price}`)
  }
});

router.delete('/', (req, res) => {
  cars = []; // Assume que 'cars' é uma variável global que contém a lista de carros

  return res.status(200).send('Todos os veículos foram deletados com sucesso.');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Encontrar o índice do carro que corresponde ao ID informado
  const carIndex = cars.findIndex(car => car.id === id);

  // Verificar se o carro foi encontrado
  if (carIndex === -1) {
    return res.status(404).send('Veículo não encontrado.');
  } else {
    // Remover o carro da lista
    cars.splice(carIndex, 1);

    return res.status(200).send(`Veículo de identificação ${id} deletado com sucesso.`);
  }
});


module.exports = router;