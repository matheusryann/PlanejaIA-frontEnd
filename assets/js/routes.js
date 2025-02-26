// 📌 Verifica se o usuário está autenticado antes de acessar páginas restritas
function verificarAutenticacao() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa estar logado para acessar esta página!');
    window.location.href = 'login.html'; // 🔄 Redireciona para login
  }
}

// 📌 Proteger páginas restritas (BEGIN e RESULT)
document.addEventListener('DOMContentLoaded', function () {
  if (
    window.location.pathname.includes('begin.html') ||
    window.location.pathname.includes('result.html')
  ) {
    verificarAutenticacao();
  }
});

// 📌 Redirecionar botões de navegação
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    const botaoCadastro = document.getElementById('botaoCadastro');
    console.log('Botão Cadastrar-se encontrado:', botaoCadastro);

    if (botaoCadastro) {
      botaoCadastro.addEventListener('click', function () {
        console.log('Botão Cadastrar-se clicado!');
        window.location.href = 'cadastro.html';
      });
    } else {
      console.error('Erro: Botão Cadastrar-se não encontrado!');
    }
  }, 1000);
  // Aguarda 1 segundo para garantir que o HTML carregou
  const botaoVoltar = document.getElementById('botaoVoltar');
  if (botaoVoltar) {
    botaoVoltar.addEventListener('click', function () {
      window.location.href = 'login.html'; // 🔄 Volta para login
    });
  }
});
