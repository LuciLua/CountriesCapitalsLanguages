import React, { Children } from "react";
import styles from "../src/css/home.module.scss";

export async function getStaticProps(ctx) {
  const url = `https://servicodados.ibge.gov.br/api/v1/paises/`;

  const consulta = await fetch(url)
    .then((resp) => {
      if (resp.ok) return resp.json();
      throw new Error("Erro!");
    })

    .then((resp) => resp);

  return {
    props: { consulta },
  };
}

export default function Home(props) {
  // destructuring... cada 'paises' 'cidade' é um novo objeto
  // vieram de props.paises e props.cidades
  const { consulta } = props;

  const fun = (c) => {
    if (c.linguas.length == 1) {
      return `${c.linguas[0].nome}`;
    }
    if (c.linguas.length == 2) {
      return `${c.linguas[0].nome} e ${c.linguas[1].nome}`;
    }
    if (c.linguas.length == 3) {
      return `${c.linguas[0].nome}, ${c.linguas[1].nome} e ${c.linguas[2].nome}`;
    }
    if (c.linguas.length == 4) {
      return `${c.linguas[0].nome}, ${c.linguas[1].nome}, ${c.linguas[2].nome} e ${c.linguas[3].nome}`;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1> Total de Países: {consulta.length}</h1>
        <div className={styles.lista}>
          {consulta.map((c) => (
            <div className={styles.itemsDaLista} key={c.id.M49}>
              <p>País: {c.nome.abreviado}</p>
              <div className={styles.allDetalhes}>
                <div className={styles.detalhes}>Capital: {c.governo.capital.nome}</div>
                <div className={styles.quantidadeELinguas}>
                  <div className={styles.detalhes}>Linguas: </div>
                  <div className={styles.detalhes}>{c.linguas.length}</div>
                  <div className={styles.detalhes}>{fun(c)}</div>
                </div>
                <div className={styles.detalhes}>Localização: {`${c.localizacao.regiao.nome}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
