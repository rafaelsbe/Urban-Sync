const supabase = require('./supabaseClient');

async function saveMessage({ companyId, user, message, from }) {
  const { error } = await supabase.from('messages').insert([
    {
      company_id: companyId,
      user_phone: user,
      message,
      sender: from
    }
  ]);

  if (error) {
    console.error('Erro ao salvar mensagem:', error);
  }
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