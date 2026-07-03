// src/services/leadService.js
const supabase = require("../config/database");

module.exports = {

    async getNewLead(phone) {
        try {
            // Limpa o formato do número '@c.us'
            const cleanPhone = phone.replace('@c.us', '');

            const { data, error } = await supabase
                .from('leads')
                .select('current_step', 'status')
                .eq('phone', cleanPhone)
                .maybesingle();  //maybeSingle para não estourar erro caso não exista

            if (error)
                throw error;
            return data; // Retorna os dados do lead encontrado
        } catch (err) {
            console.error('Erro ao buscar lead no banco de dados:', err.message || err);
            throw err;
        }
    },

    async saveNewLead(phone) {
        try {
            // Limpa o formato do número '@c.us'
            const cleanPhone = phone.replace('@c.us', '');

            const { data: existingLead, error: searchError } = await supabase
                .from('leads')
                .select('id')
                .eq('phone', cleanPhone)
                .maybesingle();

            // Caso o usuário não for encontrado (PGRST116 é aceitável, significa que é um lead novo)
            if (searchError && searchError.code !== 'PGRST116') {
                throw searchError;
            }

            // Se o usuário existir no banco adicionamos um fluxo inicial
            if (existingLead) {
                await this.updateLead(phone, { current_step: 'aguardando_nome', status: 'aberto' });
                return existingLead;
            }

            // Adiciona um novo usuário no banco caso não exista
            const { data: newLead, error: insertError } = await supabase
                .from('leads')
                .insert([{ phone: cleanPhone, status: 'aberto', current_step: 'aguardando_nome' }])
                .select()
                .maybesingle();

            if (insertError) {
                throw insertError;
            }

            console.log(`Novo lead salvo com sucesso: ${cleanPhone}`);
            return newLead; // CORRIGIDO: Retornando o lead que acabou de ser criado

        } catch (err) { // Alterado para 'err' para evitar qualquer conflito com o console
            // Caso não consiga salvar o lead no banco
            console.error('Erro interno no leadService:', err.message || err);
            throw err;
        }
    },
    
    // Função genérica para atualizar qualquer coluna do lead (nome, serviço, etapas, status)
    async updateLead(phone, updateData) {
        try {
            const cleanPhone = phone.replace('@c.us', '');

            const { data, error } = await supabase
                .from('leads')
                .update(updateData)
                .eq('phone', cleanPhone)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (err) {
            console.error(`❌ Erro ao atualizar lead (${cleanPhone}) no leadService:`, err.message || err);
            throw err;
        }
    }
};