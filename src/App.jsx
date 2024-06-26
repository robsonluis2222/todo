import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const optionsRef = useRef(null);

  // Função para mover item para Doing
  const doingMove = () => {
    if (selectedItem) {
      // Remove o item da lista todo
      const updatedTodo = todo.filter(item => item !== selectedItem);
      const updatedDoing = doing.filter(item => item !== selectedItem);
      setTodo(updatedTodo);
      setDoing(updatedDoing);
      
      // Adiciona o item à lista doing
      setDoing([...doing, selectedItem]);
      
      // Fecha as opções após mover
      opcoesFechar();
    }
  }

  // Função para mover item para Done
  const doneMove = () => {
    if (selectedItem) {
      // Remove o item da lista doing
      const updatedTodo = todo.filter(item => item !== selectedItem);
      const updatedDoing = doing.filter(item => item !== selectedItem);
      setTodo(updatedTodo)
      setDoing(updatedDoing);
      
      // Adiciona o item à lista done
      setDone([...done, selectedItem]);
      
      // Fecha as opções após mover
      opcoesFechar();
    }
  }

  // Função para fechar opções de edição
  const opcoesFechar = () => {
    if (optionsRef.current) {
      optionsRef.current.style.display = "none";
    }
  }

  // Função para abrir opções de edição
  const opcoesAbrir = (item) => {
    setSelectedItem(item);
    if (optionsRef.current) {
      optionsRef.current.style.display = "flex";
    }
  };

  // Função para adicionar uma nova tarefa à lista de To Do
  const addTodo = () => {
    const newTodo = prompt('Digite a nova tarefa:');
    if (newTodo) {
      setTodo([...todo, newTodo.toUpperCase()]);
    }
  };

  return (
    <div className='container'>
      <div className='options' ref={optionsRef}>
        <div className='action'>
          <span className='closeBtn' onClick={opcoesFechar}>X</span>
          {/* Renderiza as opções apenas se um item estiver selecionado */}
          {selectedItem && (
            <>
              <span className='nome-item'>{selectedItem}</span>
              <div className='coluna-acoes'>
                <span className='opt1' onClick={doingMove}>DOING</span>
                <span className='opt2' onClick={doneMove}>DONE</span>
                <span className='opt3'>EDIT</span>
              </div>
              
            </>
          )}
        </div>
      </div>
      <div className='title'>
        <span>by Robson Leite</span>
        <img src="https://i.imgur.com/r9kRL55.png" alt="detalhe" />
      </div>
      <div className='actions-div'>
        <button onClick={addTodo}>Adicionar</button>
      </div>
      <div className='application'>
        <div className='todo'>
          <span className='tag-title'>To Do</span>
          <div className='elements'>
            {/* Mapeia o array todo para exibir cada item */}
            {todo.map((item, index) => (
              <p key={index} onClick={() => opcoesAbrir(item)}>{item}</p>
            ))}
          </div>
        </div>
        <div className='doing'>
          <span className='tag-title'>Doing</span>
          <div className='elements'>
            {/* Mapeia o array doing para exibir cada item */}
            {doing.map((item, index) => (
              <p key={index} onClick={() => opcoesAbrir(item)}>{item}</p>
            ))}
          </div>
        </div>
        <div className='done'>
          <span className='tag-title'>Done</span>
          <div className='elements'>
            {/* Mapeia o array done para exibir cada item */}
            {done.map((item, index) => (
              <p key={index} onClick={() => opcoesAbrir(item)}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
