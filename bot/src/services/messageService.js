const supabase = require('./supabaseClient');

async function saveLeadInteraction({ companyId, user, message, name }) {

  const { error } = await supabase
    .from('leads') 
    .upsert({
      company_id: companyId,
      client_phone: user, 
      message: message,   
      client_name: name,   
      status: 'novo'       
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