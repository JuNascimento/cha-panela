import React from 'react'
import { useState, useEffect } from 'react'
import Logo from './juliaepedro.png'
import Cozinha from './cozinha.png'
import Sala from './sala.png'
import Banheiro from './banheiro.png'
import Limpeza from './limpeza.png'
import Quarto from './quarto.png'
import Utilidades from './utilidades.png'
import Flor from './flor12.png'
import bancoDeDados from './config'
import './App.css';

const ItemsListByCategory = ({ category, setResponsavel, responsavel, lista, presentes, setPresentes }) => {
  const choosePresent = (present) => {
    let presentesCopy = presentes
    presentesCopy[present.presente_id].responsavel = responsavel
    setPresentes(presentesCopy)

    const presenteRef = bancoDeDados.ref(`presentes/${present.presente_id}`)
    presenteRef.update({
      responsavel: responsavel
    })
    
    setResponsavel(null)
  }

  return (
    <>
    <div className='category'>
      <img alt='categoria' src={category} className='categoryImage' />
    </div>
    <div className='items'>
      {Object.keys(lista).map((key, _) => {
        let hasResponsavel = lista[key].responsavel
        let avaliableClass = hasResponsavel  ? 'unavaliable' : 'avaliable'
        return (
          <article className={`item ${avaliableClass}`}>
            <div className='labelBackground'>
              <p className='itemName'>{lista[key].nome} </p>
            </div>
            {lista[key].imagem !== '' && (
              <div className='itemBackground'>
                <img alt='item' className='itemImage' src={lista[key].imagem} />
              </div>
            )}
            <>
              {lista[key].link !== '' && <a className='sugestao-sem-foto'href={lista[key].link} target='_blank' rel="noopener noreferrer">Sugestão</a>}
              {lista[key].link === '' && <span className='sem-sugestao'>Sem sugestão</span>}
            </>
            <div className='labelBackground'>
              {lista[key].responsavel && <p className='itemResponsavel'>{lista[key].responsavel}</p>}
              {!lista[key].responsavel && (
                <div className='inputResponsavel'>
                  <input type="text" onChange={(e) => setResponsavel(e.target.value)} />
                  <button onClick={() => choosePresent(lista[key])}><span role="img" aria-label="heart">❤️</span></button>
                </div>
              )}
            </div>            
          </article>
        )
      })}
    </div>
    </>
  )
}

const ItemsList = ({ setResponsavel, responsavel, presentes, setPresentes }) => {
  const separateByCategory = (categoria) => {
    let lista = []

    Object.keys(presentes).forEach((chave, _) => {
      if (presentes[chave].categoria === categoria) {
        lista.push(presentes[chave])
      }
    })

    return lista
  }

  const listaCozinha = separateByCategory('cozinha')
  const listaQuarto = separateByCategory('quarto')
  const listaBanheiro = separateByCategory('banheiro')
  const listaSala = separateByCategory('sala')
  const listaLimpeza = separateByCategory('limpeza')
  const listaUtilidades = separateByCategory('utilidades')

  return (
    <>
      <ItemsListByCategory category={Quarto} setResponsavel={setResponsavel} responsavel={responsavel} lista={listaQuarto} presentes={presentes} setPresentes={setPresentes} />
      <ItemsListByCategory category={Sala} setResponsavel={setResponsavel} responsavel={responsavel} lista={listaSala} presentes={presentes} setPresentes={setPresentes} />
      <ItemsListByCategory category={Banheiro} setResponsavel={setResponsavel} responsavel={responsavel} lista={listaBanheiro} presentes={presentes} setPresentes={setPresentes} />
      <ItemsListByCategory category={Limpeza} setResponsavel={setResponsavel} responsavel={responsavel} lista={listaLimpeza} presentes={presentes} setPresentes={setPresentes} />
      <ItemsListByCategory category={Utilidades} setResponsavel={setResponsavel} responsavel={responsavel} lista={listaUtilidades} presentes={presentes} setPresentes={setPresentes} />
      <ItemsListByCategory category={Cozinha} setResponsavel={setResponsavel} responsavel={responsavel} lista={listaCozinha} presentes={presentes} setPresentes={setPresentes} />
    </>
  )
}

const App = () => {
  const [responsavel, setResponsavel] = useState('')
  const [presentes, setPresentes] = useState([])

  useEffect(() => {
    const presentesRef = bancoDeDados.ref('presentes/')
    presentesRef.on('value', (data) => {
      let itens = data.val()
      setPresentes(itens)
    })
    
  }, [])

  return (
    <div className="app">
      <img alt='flor' className='flower' src={Flor} />
      <header className='header'>
       <img alt='nome-casal' src={Logo} width='30%' className='coupleName'/>
      </header>
      <section className='container'>
        <h2 className='title'>
          <span className='titleLabel'>Bem vindos à nossa lista do Chá de Panela!</span>
        </h2>
        <section className='subject'>
          <h3>Dia, lugar e hora</h3>
          <div>
            <h4>Nosso chá vai acontecer no dia 17/09/2022, na Rua Joaquim Gomes de Andrade, 37, Coelho da Rocha, São João de Meriti - RJ, ás 16h.</h4>
          </div>
        </section>
        <section className='subject'>
          <h3>Presentinhos</h3>
          <h4>
            Abaixo listamos os presentes separados por categorias. <br/>
            Para escolher, só escrever seu nome no campo abaixo da imagem e clicar no ❤️. <br/>
            Pode escolher quantos quiser, viu? rs
          </h4>
          {Object.keys(presentes).length > 0 && (
            <ItemsList
              setResponsavel={setResponsavel}
              responsavel={responsavel}
              presentes={presentes}
              setPresentes={setPresentes}
            />)}
        </section>
      </section>
      <footer className='footer'>
        <p>#casamentojujupepe</p>
        <p>Desenvolvido pela própria noiva! :) </p>
      </footer>
    </div>
  )
}

export default App;
