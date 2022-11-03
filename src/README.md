# Cadastro de Carro
**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possivel listar todas as categorias.

**RNF**
--//--

**RN** (Regra de negócio)
Não deve ser possivel cadastrar um carro com uma placa já existente.
Não deve ser possivel alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com disponibilidade ativa por padrão.
O usuario responsavel pelo cadastro deve ser um usuario administrador.

# Listagem de Carros

**RF**
Deve ser possivel listar todos os carros disponíveis pelo nome da categoria.
Deve ser possivel listar todos os carros disponíveis pelo nome do carro.
Deve ser possivel listar todos os carros disponíveis pelo nome da marca.
Deve ser possivel listar todos os carros disponíveis.


**RN**
O usuario não precisa estar logado no sistema.

# Cadastro de espeficicação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro
Deve ser possivel listar todas as espeficicações
Deve ser possivel listar todos os carros

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.
O usuario responsavel pelo cadastro deve ser um usuario administrador.


# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro.
Deve ser possivel listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuario deve poder cadastrar msi de uma imagem para o mesmo carro.
O usuario responsavel pelo cadastro deve ser um usuario administrador.

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario.
Não deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro.