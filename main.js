// Constantes de seleção de elementos
const numeroSenha = document.querySelector('.parametro-senha__texto');
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
// Constante que Joana criou para exibir o valor da entropia
const valorEntropia = document.querySelector('.entropia');

// Variáveis de controle
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

// Conjuntos de caracteres
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?'; // Conjunto de símbolos comuns

// Atribuição de eventos
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// Adiciona o evento geraSenha para todos os checkboxes
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Geração inicial da senha ao carregar a página
geraSenha();

// --- Funções de Manipulação de Tamanho ---

function diminuiTamanho() {
    if (tamanhoSenha > 6) { // Limite mínimo de 6 caracteres
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) { // Limite máximo de 20 caracteres
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// --- Funções de Geração e Classificação ---

function geraSenha() {
    let alfabeto = '';
    // Constrói o alfabeto baseado nos checkboxes marcados
    if (checkbox[0].checked) {
        alfabeto += letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto += letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto += numeros;
    }
    if (checkbox[3].checked) {
        alfabeto += simbolos;
    }

    // Garante que pelo menos um conjunto esteja selecionado
    if (alfabeto.length === 0) {
        // Se nenhum estiver marcado, usa apenas letras minúsculas como fallback
        alfabeto = letrasMinusculas;
        checkbox[1].checked = true; 
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    // 1. Calcula a Entropia (em bits)
    // E = L * log2(R)
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(`Entropia calculada: ${entropia.toFixed(2)} bits`);

    // 2. Remove classes de força existentes
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    // 3. Classifica e adiciona a nova classe (Critérios comuns de entropia)
    if (entropia > 70) {
        forcaSenha.classList.add('forte');
    } else if (entropia >= 50) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
    
    // 4. Exibe a Entropia para o Usuário
    // Usa a constante valorEntropia para exibir o valor em bits (com 2 casas decimais)
    valorEntropia.textContent = entropia.toFixed(2);
    
    // NOTA: A linha abaixo no código original exibia um valor de tempo de quebra
    // valorEntropia.textContent = 2**Math.floor(entropia)/(100e6*60*60*24);
    // Para simplificar e focar na variável de entropia em bits, usamos:
    // valorEntropia.textContent = entropia.toFixed(2);
}
