import {useState} from "react";

function Square({value, cliqueNoQuadrado}) {
  return (
    <button className="square" onClick={cliqueNoQuadrado}>
      {value}
    </button>
  );
}
    
function Board({xEoProximo, quadrados, emJogo}) {
  function alcaClique(i){
    if (calcularVencedor(quadrados) || quadrados[i]) {
      return;
    }
    const ProximosQuadrados = quadrados.slice();
    if (xEoProximo){
      ProximosQuadrados[i] = "x"
    } 
    else {
      ProximosQuadrados[i] = "0";
    }    
    emJogo(ProximosQuadrados);
  
  }
  const ganhador = calcularVencedor(quadrados);
  let status;
  if (ganhador) {
    status = "Vitória: " + ganhador;
  } else {
    status = "Próximo jogador: " + (xEoProximo ? "X" : "0");
  }

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row"> {/* board-row = linha de tabuleiro */}
      <Square value={quadrados[0]} cliqueNoQuadrado={() => alcaClique(0)} />
      <Square value={quadrados[1]} cliqueNoQuadrado={() => alcaClique(1)} />
      <Square value={quadrados[2]} cliqueNoQuadrado={() => alcaClique(2)} />
    </div>
    <div className="board-row">
      <Square value={quadrados[3]} cliqueNoQuadrado={() => alcaClique(3)} />
      <Square value={quadrados[4]} cliqueNoQuadrado={() => alcaClique(4)} />
      <Square value={quadrados[5]} cliqueNoQuadrado={() => alcaClique(5)} />
    </div>
    <div className="board-row">
      <Square value={quadrados[6]} cliqueNoQuadrado={() => alcaClique(6)} />
      <Square value={quadrados[7]} cliqueNoQuadrado={() => alcaClique(7)} />
      <Square value={quadrados[8]} cliqueNoQuadrado={() => alcaClique(8)} />
    </div>
    </>
  );
}

export default function Jogo() {
  const [historia, definirHistorico] = useState([Array(9).fill(null)]);
  const [movimentoAtual, definirMovimentoAtual] =  useState(0)
  const xEoProximo = movimentoAtual % 2 == 0;
  const quadradosAtuais = historia[movimentoAtual];

  function lidarComOJogo(ProximosQuadrados){
    const proximaHistoria = [...historia.slice(0, movimentoAtual + 1), ProximosQuadrados];
    definirHistorico(proximaHistoria);
    definirMovimentoAtual(proximaHistoria.length - 1);
  }
  
  function pularPara(proximoMovimento){
    definirMovimentoAtual(proximoMovimento);
  }

  const movimentos =  historia.map((quadrados, mover) => {
    let descricao;
    if (mover > 0) {
      descricao = 'Ir para mover #' + mover;
    } else {
      descricao = 'Ir para o início do jogo';
    }
    return (
      <li key={mover}>
        <button onClick={() => pularPara(mover)}>{descricao}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xEoProximo={xEoProximo} quadrados={quadradosAtuais} emJogo={lidarComOJogo} />
      </div>
      <div className="game-info">
        <ol>{movimentos}</ol>
      </div>
    </div>
  );
}

function calcularVencedor(quadrados) {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return quadrados[a];
    }
  }
  return null;
}
