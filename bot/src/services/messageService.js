const supabase = require('./supabaseClient');

async function saveLeadInteraction({ companyId, user, message, name }) {
  
  const { error } = await supabase
    .from('leads') 
    .upsert({
      company_id: companyId,
      client_phone: user, // Nome da coluna no seu print: client_phone
      message: message,    // Nome da coluna no seu print: message
      client_name: name,   // Nome da coluna no seu print: client_name
      status: 'novo'       // Status inicial conforme seu enum no print
    }, { onConflict: 'client_phone' });

  if (error) console.error('Erro Supabase:', error.message);
}

async function getMessages(user) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_phone', user)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

module.exports = { saveMessage, getMessages };