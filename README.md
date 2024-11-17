# EnvioZap

EnvioZap é um sistema automatizado para o envio de mensagens em massa pelo WhatsApp, com controle de envio por lotes e intervalos configuráveis, ideal para campanhas e comunicações em larga escala. A ferramenta gera relatórios de falhas e desconecta automaticamente após o envio.

## Funcionalidades

- **Envio de mensagens em massa**: Envie mensagens para múltiplos contatos de forma automatizada.
- **Controle por lotes**: Mensagens são enviadas em lotes para evitar bloqueios.
- **Intervalos configuráveis**: Pausas entre os lotes de envio para evitar detecção de comportamento suspeito.
- **Relatórios de falhas**: Geração de um relatório em JSON com os números que não receberam a mensagem.
- **Desconexão automática**: O sistema se desloga do WhatsApp automaticamente após o envio de todas as mensagens.

## Tecnologias utilizadas

- **whatsapp-web.js**: Biblioteca para interagir com o WhatsApp Web de forma programática.
- **qrcode-terminal**: Para gerar e exibir o QR Code necessário para autenticação no WhatsApp.
- **Node.js**: Ambiente de execução JavaScript para backend.
- **fs**: Para manipulação de arquivos, como o armazenamento de relatórios.

## Como usar

### Requisitos

- Node.js instalado (versão 12 ou superior).
- Conta no WhatsApp.

### Passos para execução

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/enviozap.git
   cd enviozap

   ```

2. **Instale as dependências**:

   ```bash
   npm install

   ```

3. **Configure os contatos:**:
   ```bash
   [
   {
    "numero": "+5511999999999",
    "mensagem": "Sua mensagem personalizada"
   },
   {
    "numero": "+5511888888888",
    "mensagem": "Outra mensagem personalizada"
   }
   ]
   ```
4. **Inicie o sistema:**:

   ```bash
   node index.js

   ```

5. **Escaneie o QR Code:**:

   - O sistema gerará um QR Code no terminal, que você deverá escanear com o WhatsApp para autenticação.

6. **Envio de mensagens:**:

- Após a autenticação, o sistema começará a enviar as mensagens para os contatos listados em `contatos.json`.

7. **Relatório de falhas:**:

- Caso algum número não tenha recebido a mensagem, o sistema gerará um arquivo `nao_enviados.json` com os detalhes.

## Contribuição

1. Faça um fork deste repositório.
2. Crie uma branch para suas modificações (git checkout -b minha-modificacao).
3. Faça commit das suas alterações (git commit -am 'Adicionando nova funcionalidade').
4. Envie para o repositório remoto (git push origin minha-modificacao).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

Esse `README.md` fornece todas as informações necessárias sobre como usar, instalar e contribuir para o seu projeto, além de explicar claramente a funcionalidade principal do sistema.

---

Feito com ❤️ por [Pedro Henrique](https://github.com/Peedrohenrique)
