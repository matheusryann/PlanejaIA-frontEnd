document.addEventListener('DOMContentLoaded', function () {
  // 📌 CADASTRO
  const formCadastro = document.querySelector('.form-cadastro'); // Corrigido para diferenciar login e cadastro
  if (formCadastro) {
    formCadastro.addEventListener('submit', async function (event) {
      event.preventDefault();

      const username = document.getElementById('username')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const password = document.getElementById('password')?.value;
      const confirmPassword =
        document.getElementById('confirm-password')?.value;

      if (!username || !email || !password || !confirmPassword) {
        alert('⚠️ Todos os campos devem ser preenchidos!');
        return;
      }

      if (password !== confirmPassword) {
        alert('❌ As senhas não coincidem!');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/cadastro/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        console.log('Resposta do cadastro:', data);

        if (response.ok) {
          alert('✅ Cadastro realizado com sucesso! Agora faça login.');
          window.location.href = 'login.html';
        } else {
          alert('❌ Erro ao cadastrar: ' + (data.error || 'Tente novamente.'));
        }
      } catch (error) {
        console.error('Erro no cadastro:', error);
        alert('❌ Erro ao conectar ao servidor. Verifique sua conexão.');
      }
    });
  }

  // 📌 LOGIN
  const formLogin = document.querySelector('.form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', async function (event) {
      event.preventDefault();

      const loginInput = document.getElementById('login')?.value.trim();
      const password = document.getElementById('password')?.value;

      if (!loginInput || !password) {
        alert('⚠️ Todos os campos devem ser preenchidos!');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login: loginInput, password }),
        });

        const data = await response.json();
        console.log('Resposta do login:', data);

        if (response.ok) {
          alert('✅ Login realizado com sucesso!');
          localStorage.setItem('token', data.token);
          window.location.href = 'index.html';
        } else {
          alert(
            '❌ Erro ao fazer login: ' +
              (data.error || 'Credenciais inválidas.'),
          );
        }
      } catch (error) {
        console.error('Erro no login:', error);
        alert('❌ Erro ao conectar ao servidor. Verifique sua conexão.');
      }
    });
  }

  // 📌 LOGOUT
  const botaoLogout = document.getElementById('botaoLogout');
  if (botaoLogout) {
    botaoLogout.addEventListener('click', function (event) {
      event.preventDefault();
      localStorage.removeItem('token');
      alert('👋 Você saiu da conta.');
      window.location.href = 'login.html';
    });
  }
});
