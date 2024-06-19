![stocklibre_logo](https://github.com/rwrodrigoa/StockLibre/assets/55023310/34a43a00-17ef-4850-aeb5-288765a5d8d2)

StockLibre é uma solução de código aberto para a gestão de estoque e inventário, projetada especificamente para atender às necessidades de pequenas empresas. O sistema é fácil de usar, altamente personalizável e oferece uma gama de funcionalidades que ajudam a otimizar a gestão de estoque e reduzir custos operacionais.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Acesso ao sistema](#acesso-ao-sistema)
- [Instalação](#instalação)
- [Licença](#licença)
- [Contato](#contato)

## Sobre o Projeto

O StockLibre foi desenvolvido para fornecer uma alternativa acessível e eficiente às soluções proprietárias de gestão de stoque disponíveis no mercado. Ele permite que pequenas empresas gerenciem seus estoques de maneira eficaz, com funcionalidades que incluem:

- Cadastro de produtos
- Cadastro de fornecedores
- Gerenciamento por categorias
- Rastreio de estoque
- Geração de relatórios detalhados
- Integração com código de barras

A motivação por trás deste projeto é a escassez de ferramentas acessíveis que atendam às necessidades de pequenas empresas com orçamentos limitados.

## Tecnologias Utilizadas

- **Backend:** PHP com Laravel
- **Frontend:** React
- **Estilização:** TailwindCSS
- **Banco de Dados:** MySQL (pode ser utilizado SQLite3 também)

## Instalação

### Pré-requisitos

Antes de iniciar a instalação, certifique-se de ter os seguintes softwares instalados:

- [PHP > 8.1](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org)
- [Node.js e npm](https://nodejs.org)

### Passos para Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rwrodrigoa/StockLibre.git
   cd StockLibre
   ```
   
2. **Configure o ambiente:**
   Copie o arquivo de exemplo `.env` e ajuste as configurações conforme necessário:
   ```bash
   cp .env.example .env
   ```

3. **Instale as dependências do backend:**
   ```bash
   composer install
   ```

4. **Instale as dependências do frontend:**
   ```bash
   npm install
   ```

5. **Inicie o banco de dados:**
   ```bash
   php artisan migrate
   ```

6. **Gere a chave de aplicação:**
   ```bash
   php artisan key:generate
   ```

7. **Criar link simbólico do storage:**
   ```bash
   php artisan storage:link
   ```

8. **Inicie o servidor frontend:**
   ```bash
   npm run dev
   ```

9. **Inicie o servidor backend:**
    ```bash
    php artisan serve
    ```

O StockLibre estará disponível em `http://localhost:8000`.

## Acesso ao Sistema

O StockLibre está hospedado para uso [aqui](https://stocklibre.com.br/). De forma gratuita e sem limitações. O que acha de criar uma conta agora mesmo?

## Licença

Este projeto está licenciado sob a [MIT license](https://opensource.org/licenses/MIT).

## Contato

Rodrigo Alfredo Weiss - suporte@rodrigoweiss.com
Sinta-se à vontade para enviar um e-mail caso tenha perguntas ou sugestões!

---

Agradeço por usar o StockLibre e espero que ele atenda às suas necessidades de gestão de estoque!
