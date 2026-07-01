// src/services/leadService.js
const supabase = require("../config/database");

module.exports = {
    async saveNewLead(phone) {
        try {
            // Limpa o formato do número '@c.us'
            const cleanPhone = phone.replace('@c.us', '');

            const { data: existingLead, error: searchError } = await supabase
                .from('leads')
                .select('id')
                .eq('phone', cleanPhone)
                .single();

            // Caso o usuário não for encontrado (PGRST116 é aceitável, significa que é um lead novo)
            if (searchError && searchError.code !== 'PGRST116') {
                throw searchError;
            }

            // Se o usuário existir no banco
            if (existingLead) {
                console.log(`Lead ${cleanPhone} já existe no banco de dados.`);
                return existingLead;
            }

            // Adiciona um novo usuário no banco caso não exista
            const { data: newLead, error: insertError } = await supabase
                .from('leads')
                .insert([{ phone: cleanPhone, status: 'novo' }])
                .select()
                .single();

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
    }
};