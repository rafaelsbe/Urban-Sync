# Configuração de Login com Google no Supabase

## ✅ Status: Credenciais Obtidas

**Client ID**: `358973451334-u1l0k0vpfmbt3nobgmf5ndvfemge2p2t.apps.googleusercontent.com`
**Client Secret**: `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`

As credenciais foram adicionadas ao arquivo `.env.local` com segurança.

---

## Próxima Etapa: Configurar no Supabase

### Passo 1: Acessar o Dashboard do Supabase

1. Acesse [Supabase Dashboard](https://app.supabase.com/)
2. Selecione seu projeto: `gnhjdgxezswimkddggoj`
3. Vá para **Authentication** (menu esquerdo)
4. Clique em **Providers**

### Passo 2: Ativar Google OAuth

1. Encontre **Google** na lista de provedores
2. Clique para expandir a seção do Google
3. Clique no toggle para **ativar** o provider
4. Você verá dois campos vazios:
   - **Client ID** (identificado como `Client ID` ou `API Key`)
   - **Client Secret**

### Passo 3: Colar as Credenciais

Cole as credenciais fornecidas nos campos corretos:

- **Client ID**: 
  ```
  358973451334-u1l0k0vpfmbt3nobgmf5ndvfemge2p2t.apps.googleusercontent.com
  ```

- **Client Secret**: 
  ```
  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
  ```

5. Clique em **Save**

### Passo 4: Configurar URLs de Redirecionamento

1. No Supabase, vá para **Authentication > URL Configuration**
2. Verifique se as seguintes URLs estão configuradas:

**Site URL**:
```
https://seu-dominio.com
```

**Redirect URLs** (adicione ambas):
```
https://seu-dominio.com/dashboard/home
http://localhost:9002/dashboard/home
```

3. Clique em **Save**

---

## Passo 5: Testar a Integração Localmente

1. Inicie o servidor:
   ```bash
   npm run dev
   ```

2. Abra seu navegador e vá para:
   - `http://localhost:9002/login/empresa` (login de empresa)
   - `http://localhost:9002/login/cliente` (login de cliente)

3. Clique no botão **"Continuar com Google"**

4. Você será redirecionado para o Google para autenticação

5. Após autorizar, você será redirecionado para `/dashboard/home`

---

## Solução de Problemas

### ❌ Erro: "Redirect URL mismatch"
**Solução**: 
- Verifique se a URL de redirecionamento no Supabase corresponde exatamente à URL da sua aplicação
- Para localhost: `http://localhost:9002/dashboard/home`
- Para produção: use HTTPS

### ❌ Erro: "Invalid Client ID"
**Solução**: 
- Confirme que o Client ID foi copiado corretamente
- Não há espaços extras antes ou depois
- O campo não está vazio

### ❌ Usuário não é criado na tabela `profiles`
**Solução**: 
- Configure um trigger no Supabase para criar um perfil automaticamente (veja seção "Automatizar Criação de Usuários")

### ❌ Erro ao clicar em "Continuar com Google"
**Solução**: 
- Abra o console do navegador (F12) para ver a mensagem de erro completa
- Verifique se as credenciais no Supabase foram salvas corretamente

---

## Automatizar Criação de Usuários (Opcional)

Para criar automaticamente um registro em `profiles` quando um usuário faz login com Google:

### SQL Trigger no Supabase

1. Acesse **SQL Editor** no Supabase
2. Execute a seguinte consulta SQL:

```sql
-- Criar função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.user_metadata->>'full_name', NEW.email),
    'broker',  -- ou 'company_admin' conforme necessário
    true
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

3. Clique em **Run**

Agora, cada novo usuário autenticado com Google terá um perfil criado automaticamente na tabela `profiles`.

---

## Arquivos Envolvidos

- `.env.local` - Credenciais do Google (privadas)
- `src/hooks/useGoogleAuth.ts` - Hook para autenticação
- `src/components/GoogleSignInButton.tsx` - Botão de login
- `src/app/(public)/login/empresa/page.tsx` - Página de login empresa
- `src/app/(public)/login/cliente/page.tsx` - Página de login cliente

---

## ✅ Próximos Passos

1. ✅ Credenciais obtidas ← Você está aqui
2. ⏳ Adicionar credenciais no Supabase (Dashboard)
3. ⏳ Configurar URLs de redirecionamento
4. ⏳ Testar login com Google
5. ⏳ (Opcional) Configurar trigger de criação de usuários
