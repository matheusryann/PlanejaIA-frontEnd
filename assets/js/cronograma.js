document.addEventListener('DOMContentLoaded', function () {
  let respostas = JSON.parse(localStorage.getItem('respostas')) || {};

  // Capturar os formulários das páginas
  const form = document.querySelector('.form-container');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Capturar os valores preenchidos no formulário
      const inputs = form.querySelectorAll('input, select');
      let preenchido = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          preenchido = false;
        } else {
          respostas[input.name] = input.value;
        }
      });

      if (!preenchido) {
        alert('⚠️ Todos os campos devem ser preenchidos antes de prosseguir.');
        return;
      }

      // Salvar as respostas no localStorage
      localStorage.setItem('respostas', JSON.stringify(respostas));

      // Ir para a próxima página
      const proximaPagina = form.getAttribute('data-next');
      if (proximaPagina) {
        window.location.href = proximaPagina;
      }
    });
  }

  // Se estiver na última página, gerar cronograma
  if (window.location.pathname.includes('result.html')) {
    gerarCronograma();
  }
});

// Função para gerar o cronograma otimizado
async function gerarCronograma() {
  const respostas = JSON.parse(localStorage.getItem('respostas'));

  if (!respostas) {
    alert('⚠️ Não há dados suficientes para gerar um cronograma.');
    return;
  }

  // Criar a prompt para a IA
  const prompt = `
    O usuário deseja um cronograma de estudos. Aqui estão as respostas dele:
    - Nome: ${respostas.name}
    - Tempo diário disponível: ${respostas.time}
    - Matérias escolhidas: ${respostas.subjects}
    - Duração do cronograma: ${respostas.duration}
    - Nível de dificuldade: ${respostas.dificuldade}
    - Objetivo: ${respostas.objetivo}
    - Método de estudo: ${respostas.metodo}
    - Disponibilidade nos fins de semana: ${respostas.disponibilidade}

    Com base nessas informações, gere um cronograma detalhado e organizado, dividindo as matérias de forma equilibrada por dia e horário.
  `;

  try {
    // Conectar à API do ChatGPT Mini (gratuita)
    const respostaIA = await fetch(
      'https://api.chatgptmini.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer SUA_API_KEY_AQUI', // Substitua pela sua API_KEY real
        },
        body: JSON.stringify({
          model: 'gpt-mini',
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    );

    const data = await respostaIA.json();
    const cronogramaGerado = data.choices[0].message.content;

    // Exibir o cronograma na tela final
    document.querySelector(
      '.cronogramas',
    ).innerHTML = `<pre>${cronogramaGerado}</pre>`;
  } catch (error) {
    console.error('Erro ao gerar cronograma:', error);
    alert('❌ Ocorreu um erro ao gerar o cronograma. Tente novamente.');
  }
}

// Função de logout
function logout() {
  localStorage.clear();
  alert('👋 Você saiu da conta.');
  window.location.href = 'login.html';
}
