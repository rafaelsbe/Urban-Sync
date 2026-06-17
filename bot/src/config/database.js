const { createrClient } = require("@supabase/ssr");
require('dotenv').config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Caso não conecte com o supabase ou pelo Url ou Key
if (!supabaseUrl || !supabaseKey) {
    console.error('Erro: SUPABASE_URL ou SUPABASE_KEY não foram definidos no arquivo .env');
    process.exit(1);
}

const supabase = createrClient(supabaseUrl, supabaseKey);

module.exports = supabase;
