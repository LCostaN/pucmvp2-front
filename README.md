# mvp-2-front

Este projeto front end (componente A) é um website que permite que usuários salvem listas de jogos
com seus jogos favoritos. As features principas são:

- Criar lista de jogos
- Visualizar jogos
- Classificar e publicar listas criadas

Toda informação relativa ao **jogo** vem de um serviço externo.

Toda informação de **lista de jogos** é proveniente do projeto mvp2_back1 (component B)

Toda informação de **usuário**, incluindo autenticação, é proveniente do projeto mvp2_back2 (component B extra)

## Explicação detalhada

### Página Jogos (/ ou /home)

Permite ao usuário visualizar uma lista de jogos.

O botão de "Visualizar", permite que o usuário acesse o site oficial do jogo selecionado.

As informações são disponibilizadas pela API de [FreeToGame](https://www.freetogame.com/api-doc)

_Devido a problema com CORS, está sendo utilizado a API disponibilizada via RapidAPI, com URL diferente.
Para usar esta API, requer criação de conta em RapidAPI, porém não há custo além da criação da conta.
[URL via RapidApi](https://rapidapi.com/digiwalls/api/free-to-play-games-database)

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
docker run -d -p 8080:8080 --rm --name mvp2-front mvp2front
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
