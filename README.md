# Lista de Usuários

Este é um projeto que exibe uma lista de usuários com funcionalidades de busca e filtro por nome e cidade. Os dados dos usuários são obtidos a partir da API externa JSONPlaceholder.

## Funcionalidades

- **Busca por Nome:** O usuário pode digitar um nome para filtrar a lista de usuários com base no nome.
- **Filtro por Cidade:** O usuário pode filtrar os usuários por cidade.
- **Armazenamento Local:** A aplicação mantém os filtros de busca (nome e cidade) mesmo após o recarregamento da página, utilizando o armazenamento local do navegador.
- **Indicador de Carregamento:** Uma mensagem é exibida enquanto os dados são carregados da API.
- **Tratamento de Erros:** Se ocorrer um erro ao carregar os dados, uma mensagem de erro é exibida.
- **Responsividade:** O layout é adaptado para funcionar bem em diferentes tamanhos de tela, incluindo dispositivos móveis.

## Instruções de Execução

1. **Baixe o repositório**
2. **Vá a pasta e procure o arquivo.html**
3. **Abra o arquivo index.html no seu navegador**

- **Você pode abrir diretamente o arquivo index.html no seu navegador para visualizar a aplicação.**

## Estrutura de Arquivos

A estrutura do projeto é a seguinte:

- **index.html:** O arquivo HTML principal que contém a estrutura da página.
- **styles.css:** O arquivo de estilos que define a aparência da aplicação.
- **app.js:** O arquivo JavaScript que contém a lógica principal, incluindo a obtenção dos dados da API, aplicação de filtros e manipulação de eventos.

## Expansão do Projeto

Aqui estão algumas sugestões de como você pode expandir este projeto:

- **Adicionar paginação:** Em volumes grandes em vez de carregar todos os usuários de uma vez, você pode implementar paginação para exibir um número limitado de usuários por vez.
- **Validação de entrada:** Adicionar validação de entrada para o campo de busca, garantindo que os usuários só possam digitar caracteres válidos.
