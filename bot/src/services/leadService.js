const { error } = require("console");
const supabase = require("../config/database");

module.exports = {
    async saveNewLead(phone) {
        try {
            //Limpa o formao do numero '@c.us'
            const cleanPhone = phone.replace('@c.us', '');

            const { data: existingLead, error: searchError } = await supabase
                .from('leads')
                .select('id')
                .eq('phone', cleanPhone)
                .single();

            //Caso o usuario nao for encontrado
            if (searchError && searchError.code !== 'PGRST116') {
                throw searchError;
            }

            //Se o usuario existir no banco
            if (existingLead) {
                console.log('Lead ${cleanPhone} já existe no banco de dados.');
                return existingLead;
            }

            //Adiciona um nove usuario no banco caso não exista
            const { data: newLead, error: insertError } = await supabase
                .from('leads')
                .insert([{ phone: cleanPhone, status: 'novo' }])
                .select()
                .single();

            if (insertError) {
                throw insertError;
            }

            console.log('Lead ${cleanPhone} já existe no banco de dados.');
            return existingLead;

        } catch {
            //Caso o consiga salvar o lead no banco
            console.error('Erro ao salvar lead no Supabase:', error.message);
            throw error;
        }

    }
};