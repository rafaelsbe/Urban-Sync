const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeImage = require('qrcode');
const messageService = require('../handler/messageHandler.js');

// Objeto na memória do servidor para guardar as instâncias e estados de cada empresa
const activeSessions = {};

/**
 * Inicializa ou recupera o bot do WhatsApp de uma empresa específica
 */
const getWhatsAppClient = (companyId, io) => {
    // Se o cliente dessa empresa já existe, apenas retorna ele
    if (activeSessions[companyId]) {
        return activeSessions[companyId].client;
    }

    console.log(`🤖 Inicializando bot para a empresa: ${companyId}`);

    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: `company-${companyId}` // Guarda a sessão separada para cada parceiro
        }),                        
        puppeteer: {
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });

    // Cria a estrutura de estado na memória para esta empresa
    activeSessions[companyId] = {
        client,
        statusAtual: 'connecting',
        ultimoQrCode: ''
    };

    // --- EVENTOS DO WHATSAPP DO PARCEIRO ---
    
    client.on('qr', (qr) => {
        activeSessions[companyId].statusAtual = 'scan_me';
        
        qrcodeImage.toDataURL(qr, (err, url) => {
            if (!err) {
                activeSessions[companyId].ultimoQrCode = url;
                
                // Envia APENAS para a sala (room) daquela empresa no Socket
                io.to(`company_room_${companyId}`).emit('status', 'scan_me');
                io.to(`company_room_${companyId}`).emit('qr_code', url);
            }
        });
    });

    client.on('ready', () => {
        console.log(`✅ WhatsApp da empresa ${companyId} conectado com sucesso!`);
        activeSessions[companyId].statusAtual = 'ready';
        activeSessions[companyId].ultimoQrCode = '';
        io.to(`company_room_${companyId}`).emit('status', 'ready');
    });

    client.on('disconnected', () => {
        console.log(`❌ WhatsApp da empresa ${companyId} desconectado.`);
        activeSessions[companyId].statusAtual = 'disconnected';
        activeSessions[companyId].ultimoQrCode = '';
        io.to(`company_room_${companyId}`).emit('status', 'disconnected');
    });

    client.on('message_create', async (msg) => {
        try {
            // 👈 Repassa o companyId para o seu Handler saber qual empresa salvando o lead
            await messageService(client, msg, companyId);
        } catch (error) {
            console.error(`Erro no messageService da empresa ${companyId}:`, error);
        }
    });

    client.initialize();
    return client;
};

/**
 * Configuração principal do Socket.io para gerenciar as conexões do Dashboard
 */
const initWhatsappDashboard = (io) => {
    io.on('connection', (socket) => {
        // 👈 O frontend deve enviar qual empresa está conectando via query string
        const companyId = socket.handshake.query.companyId;

        if (!companyId) {
            console.log('⚠️ Conexão socket rejeitada: companyId não informado.');
            return socket.disconnect();
        }

        // Coloca o canal desse usuário em uma "sala" exclusiva da sua empresa
        socket.join(`company_room_${companyId}`);
        console.log(`🎯 Dashboard da empresa [${companyId}] conectado via Socket:`, socket.id);

        // Garante que a instância do bot dessa empresa exista
        getWhatsAppClient(companyId, io);

        // Puxa o estado atualizado da memória para esta empresa específica
        const session = activeSessions[companyId];
        
        socket.emit('status', session.statusAtual);
        if (session.statusAtual === 'scan_me' && session.ultimoQrCode) {
            socket.emit('qr_code', session.ultimoQrCode);
        }

        // Checagem em tempo real no Puppeteer da empresa
        session.client.getState().then(state => {
            if (state === 'CONNECTED') {
                session.statusAtual = 'ready';
                socket.emit('status', 'ready');
            }
        }).catch(() => {
            socket.emit('status', session.statusAtual);
        });
    });
};

module.exports = { initWhatsappDashboard, getWhatsAppClient, activeSessions };