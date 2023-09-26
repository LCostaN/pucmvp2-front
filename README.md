# mvp-2-front

Este projeto front end (componente A) é um website que permite que usuários salvem listas de jogos
com seus jogos favoritos. As features principas são:

- Criar lista de jogos
- Visualizar jogos
- Classificar e publicar listas criadas

## Explicação detalhada

Toda informação de **Jogos** é disponibilizada pela API de [FreeToGame](https://www.freetogame.com/api-doc)

\_Devido a problema com CORS, está sendo utilizado a API disponibilizada via RapidAPI, com URL diferente.
Para usar esta API, requer criação de conta em RapidAPI, porém não há custo além da criação da conta.
[URL via RapidApi](https://rapidapi.com/digiwalls/api/free-to-play-games-database)

Toda informação de **Lista de jogos** é proveniente do projeto api_lista (component B)

Toda informação de **usuário**, incluindo autenticação, é proveniente do projeto api_usuario (component B extra)

As informações relacionadas ao usuário logado são armazenadas no próprio dispositivo (frontend) para facilitar o uso. Devido a isto, alguns dados NÃO são provenientes da API.

- Informação do usuário logado
- Listas criadas pelo usuário logado

## Páginas e Rotas

### Jogos (/ ou /home)

Permite ao usuário visualizar uma lista de jogos.

Caso o jogo já esteja em uma lista do usuário, ele pode removê-la no botão "Remove".

Caso o usuário possua ao menos uma lista sem o jogo adicionado, ele pode adicioná-lo no botão "Add"

Clicar no texto irá abrir uma aba ou janela com o website do jogo.

Clicar na imagem irá mostrar a foto ampliada do jogo.

ROTAS:

- GET Jogos (Externo)

### Listas (/lists)

Permite ao usuário visualizar listas públicas.

Para uma lista se tornar pública, o dono deve marcar a opção na visualização de detalhes da lista ou na sua criação.

ROTAS:

- GET Listas (Api de listas)

### Nova Lista (/lists/new)

Criação de lista. Conta com nome, descrição e configuração de privacidade.

Ao criar a lista, o usuário é redirecionado para a página de detalhes da lista.

ROTAS:

- POST Lista (Api de listas)

### Detalhes de Lista (/lists/:id)

Visualiza os detalhes da lista selecionada pelo id.

Caso a lista exista no usuário logado, ela será carregada do front, porém em caso de atualização, a informação será enviada para o backend.

Se o usuário for dono da lista, permite a edição do nome, descrição e privacidade da lista e os botões de "adicionar" e "remover" serão fixos a lista atual. Também permite apagar a lista.

Se o usuário não for dono, os dados da lista são somente de visualização e os botões de adicionar e remover não afetarão a lista atual.

ROTAS:

- GET Lista (Api de listas)
- PUT Lista (Api de listas)
- DELETE Lista (Api de listas)

### Minhas Listas (/profile)

#### Caso o usuário não esteja logado

Visualiza a página de acesso (Login). Permite ao usuário registrar uma conta ou entrar numa conta já existente.

ROTAS:

- POST Registrar (Api de usuario)
- POST Login (Api de usuario)

#### Caso o usuário esteja logado

Visualiza as listas criadas pelo usuário, sejam públicas ou privadas.

Clicar em uma lista irá redirecionar para a visualização de detalhes da lista.

O botão de "+" na parte inferior da tela redireciona para tela de criação de listas

As listas aqui são todas do usuário logado e portanto **não** há comunicação com o backend nesta visualização.

## Project Setup

O projeto foi "containerizado", permitindo o início rápido por duas alternativas:

### Docker onlys

O comando `docker build` irá executar os comandos no arquivo Dockerfile e gerar a imagem do projeto.
Utilizamos o nome `mvp2front` pra facilitar encontrar esta imagem no próximo comando.

Utilizamos o comando `docker run` para criar o container da imagem. No comando abaixo, utilizamos as flags:

- -d (detach): Coloca o container pra rodar sem travar o terminal com os logs do container.
- -p 8080:8080: Conecta a porta 8080 (esquerda) com a porta 8080 (direita) exposta do container. Caso a porta 8080 já esteja ocupada na máquina atual, alterar o valor da esquerda dos dois pontos, permite a troca da porta. Por exemplo, `-p 8081:8080`
- --rm: Remove o container automaticamente quando o docker é fechado.
- --name mvp2-front: Nome do container. Estamos nomeando mvp2-front para fácil identificação posterior.

Por fim, `mvp2front` no final do comando é o nome da imagem que usaremos pra montar o container. Diferente das _flags_ descritas acima, este é o principal objeto do comando run.

```sh
docker build -t mvp2front .
docker run -d -p 8080:80 --rm --name mvp2-front mvp2front
```

Após os comandos docker, a aplicação deverá estar acessível [na máquina local, porta 8080](http://localhost:8080)

### Docker-compose

`docker-compose` é uma ferramenta de auxílio ao desenvolvimento com docker. Ele permite o uso de um arquivo YAML (.yml) para configurar a criação dos containeres docker.

Sua principal vantagem é permitir a **criação de vários containeres, controlando o fluxo de criação entre eles**. Numa aplicação complexa, significa que um único `arquivo docker-compose.yml` permite a criação do banco de dados, aplicação front, aplicação back, nginx, redis e outras ferramentas de uso de mercado.

Caso o docker-compose esteja disponível, utilize o comando abaixo para rodar o projeto.

```sh
docker-compose up -d
```

O arquivo `docker-compose.yml` irá buscar o mesmo Dockerfile da seção anterior para gerar a imagem e automaticamente iniciará o container. Neste caso, o nome do container deve ser `mvp2_front_app`

Mais informações sobre esta ferramenta estão disponíveis [aqui](https://docs.docker.com/compose/)
