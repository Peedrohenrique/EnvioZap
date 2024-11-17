const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const fs = require('fs'); // Para manipular arquivos
const contatos = require('./contatos.json'); // Importa os contatos do arquivo JSON

// Inicializa o cliente do WhatsApp
const client = new Client();

// Gera o QR Code para autenticar o WhatsApp
client.on('qr', (qr) => {
    console.log('Escaneie este QR Code com o WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Loga quando o cliente está pronto
client.on('ready', () => {
    console.log('Cliente está pronto!');
    enviarMensagensEmMassa();
});

// Função para enviar mensagens em lotes com intervalos
async function enviarMensagensEmMassa() {
    const naoEnviados = []; // Armazena os números que não receberam mensagens
    const loteTamanho = 50; // Tamanho de cada lote de envio
    const intervaloEntreLotes = 60000; // Intervalo entre os lotes em milissegundos (ex: 60000ms = 1 minuto)
    
    for (let i = 0; i < contatos.length; i += loteTamanho) {
        const lote = contatos.slice(i, i + loteTamanho);

        for (const contato of lote) {
            try {
                // Verifica se o número é válido no WhatsApp
                const numeroId = await client.getNumberId(contato.numero);

                if (numeroId) {
                    // Envia a mensagem se o número for válido
                    await client.sendMessage(numeroId._serialized, contato.mensagem);
                    console.log(`Mensagem enviada para ${contato.numero}`);
                } else {
                    console.error(`O número ${contato.numero} não está registrado no WhatsApp.`);
                    naoEnviados.push({
                        numero: contato.numero,
                        motivo: 'Número não registrado no WhatsApp'
                    });
                }
            } catch (error) {
                console.error(`Erro ao enviar mensagem para ${contato.numero}:`, error.message);
                naoEnviados.push({
                    numero: contato.numero,
                    motivo: 'Erro durante o envio: ' + (error.message || 'Erro desconhecido')
                });
            }
        }

        // Aguarda antes de enviar o próximo lote
        console.log(`Aguardando ${intervaloEntreLotes / 1000} segundos antes de enviar o próximo lote...`);
        await new Promise(resolve => setTimeout(resolve, intervaloEntreLotes));
    }

    // Salva os números que não puderam receber mensagens em um arquivo JSON
    if (naoEnviados.length > 0) {
        const relatorioFiltrado = naoEnviados.map((item) => ({
            numero: item.numero,
            motivo: item.motivo.includes('não registrado') ? 'Número não existe no WhatsApp' : item.motivo
        }));

        try {
            // Usando fs.promises para manipulação assíncrona
            await fs.promises.writeFile('./nao_enviados.json', JSON.stringify(relatorioFiltrado, null, 2));
            console.log('Relatório de números não enviados salvo em "nao_enviados.json".');
        } catch (err) {
            console.error('Erro ao salvar o relatório de números não enviados:', err.message);
        }
    } else {
        console.log('Todas as mensagens foram enviadas com sucesso!');
    }

    // Desloga do WhatsApp após o envio de todas as mensagens
    client.destroy().then(() => {
        console.log('Cliente deslogado do WhatsApp com sucesso.');
    }).catch((err) => {
        console.error('Erro ao deslogar do WhatsApp:', err.message);
    });
}

// Inicializa o cliente
client.initialize();
