// src/services/leadService.js
const supabase = require("../config/database");

module.exports = {

    async getNewLead(phone, companyId) {
        try {
            // Limpa o formato do número '@c.us'
            const cleanPhone = phone.replace('@c.us', '');

            const { data, error } = await supabase
                .from('leads')
                .select('current_step', 'status')
                .eq('phone', cleanPhone)
                .eq('company_id', companyId) // Isola a busca por parceiro
                .maybeSingle(); // maybeSingle para não estourar erro caso não exista

            if (error) throw error;
            return data; 
        } catch (err) {
            console.error('Erro ao buscar lead no banco de dados:', err.message || err);
            throw err;
        }
    },

    async saveNewLead(phone, companyId) {
        try {
            const cleanPhone = phone.replace('@c.us', '');

            const { data: existingLead, error: searchError } = await supabase
                .from('leads')
                .select('id')
                .eq('phone', cleanPhone)
                .eq('company_id', companyId)
                .maybeSingle();

            if (searchError && searchError.code !== 'PGRST116') {
                throw searchError;
            }

            // Se o usuário existir na base dessa empresa, reinicia o fluxo do bot
            if (existingLead) {
                await this.updateLead(phone, companyId, { 
                    current_step: 'aguardando_nome', 
                    status: 'aberto' 
                });
                return existingLead;
            }

            // CORRIGIDO: Agora injeta ativamente o company_id no INSERT do novo lead
            const { data: newLead, error: insertError } = await supabase
                .from('leads')
                .insert([{ 
                    phone: cleanPhone, 
                    company_id: companyId, // Vincula o lead à empresa dona deste bot
                    status: 'aberto', 
                    current_step: 'aguardando_nome' 
                }])
                .select()
                .maybeSingle();

            if (insertError) throw insertError;

            console.log(`[Empresa: ${companyId}] Novo lead salvo com sucesso: ${cleanPhone}`);
            return newLead;

        } catch (err) {
            console.error('Erro interno no leadService:', err.message || err);
            throw err;
        }
    },
    
    // CORRIGIDO: Adicionado companyId para garantir que só altera o lead daquela empresa específica
    async updateLead(phone, companyId, updateData) {
        try {
            const cleanPhone = phone.replace('@c.us', '');

            const { data, error } = await supabase
                .from('leads')
                .update(updateData)
                .eq('phone', cleanPhone)
                .eq('company_id', companyId) // Proteção crucial: restringe a alteração ao escopo do parceiro
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